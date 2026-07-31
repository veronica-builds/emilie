import type { EmilieWorkflow } from "../shared/types";

// Canonical built-in workflow data lives in the backend package
// (backend/src/lib/builtinWorkflowsData.json) — single source of truth,
// also consumed by the backend chat workflow store (builtinWorkflows.ts there).
import rawWorkflows from "../../../../../backend/src/lib/builtinWorkflowsData.json";

export const BUILT_IN_WORKFLOWS = rawWorkflows as unknown as EmilieWorkflow[];

export const BUILT_IN_IDS = new Set(BUILT_IN_WORKFLOWS.map((wf) => wf.id));
