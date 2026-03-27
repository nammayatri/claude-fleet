export type NodeId = string;

export interface WorkflowNode {
  id: NodeId;
  prompt: string;
  model?: "opus" | "sonnet" | "haiku";
  tools?: string[];
  maxTurns?: number;
  systemPrompt?: string;
}

export interface Edge {
  from: NodeId;
  to: NodeId;
  condition?: string; // grep pattern on output of `from`
}

export interface WorkflowDef {
  name: string;
  start: NodeId;
  nodes: Record<NodeId, WorkflowNode>;
  edges: Edge[];
}

export interface NodeRun {
  nodeId: NodeId;
  visit: number;
  output: string;
  exitCode: number;
  startedAt: number;
  finishedAt: number;
}
