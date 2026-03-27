import { setup, assign } from "xstate";
import type { WorkflowDef, NodeId } from "./types";

export interface FlowContext {
  task: string;
  outputs: Record<NodeId, string>;
  visits: Record<NodeId, number>;
  currentOutput: string;
}

export type FlowEvent =
  | { type: "NODE_COMPLETE"; nodeId: NodeId; output: string }
  | { type: "NODE_FAILED"; nodeId: NodeId; error: string };

export function compileWorkflow(def: WorkflowDef) {
  const states: Record<string, any> = {};

  for (const [id] of Object.entries(def.nodes)) {
    const outEdges = def.edges.filter((e) => e.from === id);

    if (outEdges.length === 0) {
      // Terminal node — auto-transition to done
      states[id] = {
        on: {
          NODE_COMPLETE: {
            target: "done",
            actions: "storeOutput",
          },
        },
      };
    } else {
      // Build transitions: conditional edges first, then unconditional default
      const conditionalEdges = outEdges.filter((e) => e.condition);
      const defaultEdges = outEdges.filter((e) => !e.condition);

      const transitions: any[] = [];

      for (const edge of conditionalEdges) {
        transitions.push({
          target: edge.to,
          guard: {
            type: "outputMatches",
            params: { pattern: edge.condition },
          },
          actions: "storeOutput",
        });
      }

      for (const edge of defaultEdges) {
        transitions.push({
          target: edge.to,
          actions: "storeOutput",
        });
      }

      states[id] = {
        on: {
          NODE_COMPLETE: transitions.length === 1 ? transitions[0] : transitions,
        },
      };
    }
  }

  states["done"] = { type: "final" as const };
  states["failed"] = { type: "final" as const };

  return setup({
    types: {
      context: {} as FlowContext,
      events: {} as FlowEvent,
    },
    guards: {
      outputMatches: ({ event }, params: { pattern: string }) => {
        if (event.type !== "NODE_COMPLETE") return false;
        return new RegExp(params.pattern, "im").test(event.output);
      },
    },
    actions: {
      storeOutput: assign(({ context, event }) => {
        if (event.type !== "NODE_COMPLETE") return {};
        return {
          outputs: { ...context.outputs, [event.nodeId]: event.output },
          currentOutput: event.output,
          visits: {
            ...context.visits,
            [event.nodeId]: (context.visits[event.nodeId] ?? 0) + 1,
          },
        };
      }),
    },
  }).createMachine({
    id: def.name,
    initial: def.start,
    context: {
      task: "",
      outputs: {},
      visits: {},
      currentOutput: "",
    },
    states,
  });
}
