import type { WorkflowNode } from "./types";

export interface ExecResult {
  output: string;
  exitCode: number;
}

export async function execClaude(
  node: WorkflowNode,
  upstreamContext: Record<string, string>,
  task?: string,
): Promise<ExecResult> {
  // Build prompt: task + upstream context + node prompt
  const parts: string[] = [];

  if (task) {
    parts.push(`Task: ${task}`);
  }

  const contextEntries = Object.entries(upstreamContext);
  if (contextEntries.length > 0) {
    for (const [id, output] of contextEntries) {
      parts.push(`--- Output from '${id}' ---\n${output.slice(-4000)}\n--- End '${id}' ---`);
    }
  }

  parts.push(node.prompt);

  const prompt = parts.join("\n\n");

  // Build command
  const cmd = ["claude", "--print", "--model", node.model ?? "sonnet"];

  if (node.tools?.length) {
    cmd.push("--allowedTools", ...node.tools);
  }
  if (node.maxTurns) {
    cmd.push("--max-turns", String(node.maxTurns));
  }
  if (node.systemPrompt) {
    cmd.push("--append-system-prompt", node.systemPrompt);
  }

  const proc = Bun.spawn(cmd, {
    stdin: new Blob([prompt]),
    stdout: "pipe",
    stderr: "pipe",
  });

  const output = await new Response(proc.stdout).text();
  const exitCode = await proc.exited;

  return { output, exitCode };
}
