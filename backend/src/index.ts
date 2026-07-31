import "dotenv/config";
import path from "path";
import express from "express";
import cors from "cors";
import { chatRouter } from "./routes/chat";
import { projectsRouter } from "./routes/projects";
import { projectChatRouter } from "./routes/projectChat";
import { documentsRouter } from "./routes/documents";
import { tabularRouter } from "./routes/tabular";
import { workflowsRouter } from "./routes/workflows";
import { userRouter } from "./routes/user";
import { downloadsRouter } from "./routes/downloads";
import { authRouter } from "./routes/auth";
import { buildContentDisposition } from "./lib/storage";

const app = express();
const PORT = process.env.PORT ?? 3001;

app.use(
    cors({
        origin: process.env.FRONTEND_URL ?? "http://localhost:3000",
        credentials: true,
    }),
);

app.use(express.json({ limit: "50mb" }));

app.use("/auth", authRouter);
app.use("/chat", chatRouter);
app.use("/projects", projectsRouter);
app.use("/projects/:projectId/chat", projectChatRouter);
app.use("/single-documents", documentsRouter);
app.use("/tabular-review", tabularRouter);
app.use("/workflows", workflowsRouter);
app.use("/user", userRouter);
app.use("/users", userRouter);
app.use("/download", downloadsRouter);

app.get("/health", (_req, res) => res.json({ ok: true }));

// Local file server — only active when R2 env vars are not set
app.get("/local-storage/*", (req, res) => {
  const key = (req.params as Record<string, string>)[0];
  const uploadsRoot = path.resolve(process.cwd(), "uploads");
  const filePath = path.resolve(uploadsRoot, key);
  // Reject anything that resolves outside uploads/ (path traversal).
  if (filePath !== uploadsRoot && !filePath.startsWith(uploadsRoot + path.sep)) {
    return res.status(403).json({ detail: "Forbidden" });
  }
  const dl = req.query.dl as string | undefined;
  if (dl) {
    res.setHeader("Content-Disposition", buildContentDisposition("attachment", dl));
  }
  res.sendFile(filePath, { root: "/" }, (err) => {
    if (err) res.status(404).json({ detail: "File not found" });
  });
});

app.listen(PORT, () => {
    console.log(`Emilie backend running on port ${PORT}`);
});
