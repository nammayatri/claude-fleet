import { createActor } from "xstate";
import { compileWorkflow } from "./machine";
import { execClaude } from "./process";
import type { WorkflowDef, NodeId } from "./types";

interface ExecutorOptions {
  task?: string;
  maxVisits?: number;
  verbose?: boolean;
}

const C = "\x1b[0;36m";
const G = "\x1b[0;32m";
const R = "\x1b[0;31m";
const Y = "\x1b[1;33m";
const N = "\x1b[0m";

function ts() {
  return new Date().toTimeString().slice(0, 8);
}

function log(msg: string) {
  console.error(`${C}[flow ${ts()}]${N} ${msg}`);
}

export async function executeWorkflow(
  def: WorkflowDef,
  opts: ExecutorOptions = {},
): Promise<Record<NodeId, string>> {
  const { task, maxVisits = 3, verbose = false } = opts;
  const machine = compileWorkflow(def);
  const actor = createActor(machine);

  log(`Workflow: ${G}${def.name}${N}`);
  log(`Start: ${G}${def.start}${N}`);
  if (task) log(`Task: ${task}`);
  console.error("");

  return new Promise((resolve, reject) => {
    const visits: Record<NodeId, number> = {};

    actor.subscribe((snapshot) => {
      const state = typeof snapshot.value === "string"
        ? snapshot.value
        : String(snapshot.value);

      // Final states
      if (state === "done") {
        log(`${G}═══ Workflow complete ═══${N}`);
        actor.stop();
        resolve(snapshot.context.outputs);
        return;
      }
      if (state === "failed") {
        log(`${R}═══ Workflow failed ═══${N}`);
        actor.stop();
        reject(new Error("Workflow reached failed state"));
        return;
      }

      // Check visit count for cycle safety
      visits[state] = (visits[state] ?? 0) + 1;
      if (visits[state] > maxVisits) {
        log(`${R}Node '${state}' hit visit limit (${maxVisits})${N}`);
        actor.stop();
        reject(new Error(`Node '${state}' exceeded max visits (${maxVisits})`));
        return;
      }

      const node = def.nodes[state];
      if (!node) {
        log(`${R}Unknown node: ${state}${N}`);
        actor.stop();
        reject(new Error(`Unknown node: ${state}`));
        return;
      }

      // Get upstream outputs for context
      const upstreamEdges = def.edges.filter((e) => e.to === state);
      const upstreamOutputs: Record<string, string> = {};
      for (const edge of upstreamEdges) {
        const output = snapshot.context.outputs[edge.from];
        if (output) upstreamOutputs[edge.from] = output;
      }

      log(
        `▶ ${G}${state}${N} [visit ${visits[state]}/${maxVisits}, model=${node.model ?? "sonnet"}]`,
      );

      // Spawn claude process (async, outside XState)
      execClaude(node, upstreamOutputs, task)
        .then((result) => {
          if (verbose) {
            console.error(`${Y}--- output from '${state}' ---${N}`);
            console.error(result.output.slice(-2000));
            console.error(`${Y}--- end '${state}' ---${N}\n`);
          }

          if (result.exitCode !== 0) {
            log(`${Y}Node '${state}' exited with code ${result.exitCode}${N}`);
          }

          actor.send({
            type: "NODE_COMPLETE",
            nodeId: state,
            output: result.output,
          });
        })
        .catch((err) => {
          log(`${R}Node '${state}' error: ${err.message}${N}`);
          actor.send({
            type: "NODE_FAILED",
            nodeId: state,
            error: err.message,
          });
        });
    });

    actor.start();
  });
}
