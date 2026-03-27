import { parse as parseYaml } from "yaml";
import type { WorkflowDef, WorkflowNode, Edge, NodeId } from "./types";

interface RawWorkflow {
  name: string;
  start?: string;
  nodes: Record<string, {
    prompt: string;
    model?: string;
    tools?: string[];
    maxTurns?: number;
    systemPrompt?: string;
  }>;
  edges: string[];
}

// Parse edge shorthand: "from -> to" or "from -> to [PATTERN]"
function parseEdge(s: string): Edge {
  const match = s.match(/^(\S+)\s*->\s*(\S+)(?:\s+\[(.+)\])?$/);
  if (!match) {
    throw new Error(`Invalid edge syntax: "${s}" — expected "from -> to" or "from -> to [PATTERN]"`);
  }
  const [, from, to, condition] = match;
  return { from, to, ...(condition ? { condition } : {}) };
}

export function parseWorkflow(yamlStr: string): WorkflowDef {
  const raw = parseYaml(yamlStr) as RawWorkflow;

  if (!raw.name) throw new Error("Workflow must have a 'name' field");
  if (!raw.nodes || Object.keys(raw.nodes).length === 0) {
    throw new Error("Workflow must have at least one node");
  }
  if (!raw.edges || raw.edges.length === 0) {
    throw new Error("Workflow must have at least one edge");
  }

  // Build nodes with IDs
  const nodes: Record<NodeId, WorkflowNode> = {};
  for (const [id, raw_node] of Object.entries(raw.nodes)) {
    nodes[id] = {
      id,
      prompt: raw_node.prompt,
      model: raw_node.model as WorkflowNode["model"],
      tools: raw_node.tools,
      maxTurns: raw_node.maxTurns,
      systemPrompt: raw_node.systemPrompt,
    };
  }

  // Parse edges
  const edges = raw.edges.map(parseEdge);

  // Determine start node
  const start = raw.start ?? findEntryNode(nodes, edges);

  // Validate
  validate(start, nodes, edges);

  return { name: raw.name, start, nodes, edges };
}

function findEntryNode(nodes: Record<NodeId, WorkflowNode>, edges: Edge[]): NodeId {
  const targets = new Set(edges.map((e) => e.to));
  const entries = Object.keys(nodes).filter((id) => !targets.has(id));
  if (entries.length === 0) {
    throw new Error("No entry node found — every node is a target of some edge");
  }
  if (entries.length > 1) {
    throw new Error(`Multiple entry nodes found: ${entries.join(", ")}. Set 'start' explicitly.`);
  }
  return entries[0];
}

function validate(start: NodeId, nodes: Record<NodeId, WorkflowNode>, edges: Edge[]): void {
  if (!nodes[start]) {
    throw new Error(`Start node "${start}" not found in nodes`);
  }

  for (const edge of edges) {
    if (edge.from !== "done" && !nodes[edge.from]) {
      throw new Error(`Edge references unknown source node: "${edge.from}"`);
    }
    if (edge.to !== "done" && !nodes[edge.to]) {
      throw new Error(`Edge references unknown target node: "${edge.to}"`);
    }
  }

  // Check all non-terminal nodes have outgoing edges
  const sources = new Set(edges.map((e) => e.from));
  for (const id of Object.keys(nodes)) {
    if (!sources.has(id)) {
      // Terminal node — must have an implicit edge to "done" or be okay as terminal
      // We'll auto-add "-> done" in the machine compiler
    }
  }
}
