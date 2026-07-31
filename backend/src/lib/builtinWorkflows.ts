// Canonical built-in workflow data lives in builtinWorkflows.json (single
// source of truth, also imported by the frontend). The chat workflow store
// exposes only the document-summary workflows listed here.
import rawWorkflows from "./builtinWorkflowsData.json";

const CHAT_BUILTIN_IDS = new Set([
    "builtin-cp-checklist",
    "builtin-credit-summary",
    "builtin-sha-summary",
]);

export const BUILTIN_WORKFLOWS: { id: string; title: string; prompt_md: string }[] =
    rawWorkflows
        .filter((wf) => CHAT_BUILTIN_IDS.has(wf.id) && typeof wf.prompt_md === "string")
        .map((wf) => ({ id: wf.id, title: wf.title, prompt_md: wf.prompt_md as string }));
