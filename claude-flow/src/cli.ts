import { readFileSync } from "fs";
import { parseWorkflow } from "./core/parser";
import { executeWorkflow } from "./core/executor";

const args = Bun.argv.slice(2);
const command = args[0];

function usage() {
  console.log(`claude-flow — State machine orchestrator for Claude Code

Usage:
  claude-flow run <workflow.yaml> [task-description] [--verbose]
  claude-flow validate <workflow.yaml>

Examples:
  claude-flow run workflows/hello-world.yaml "add a fibonacci function"
  claude-flow run workflows/dev.yaml "fix the login bug" --verbose
  claude-flow validate workflows/hello-world.yaml`);
}

async function run() {
  const file = args[1];
  if (!file) {
    console.error("Error: workflow file required");
    usage();
    process.exit(1);
  }

  const verbose = args.includes("--verbose");
  const taskArgs = args.slice(2).filter((a) => !a.startsWith("--"));
  const task = taskArgs.join(" ") || undefined;

  const yamlStr = readFileSync(file, "utf-8");
  const def = parseWorkflow(yamlStr);

  const outputs = await executeWorkflow(def, { task, verbose });

  // Print final output (last node's output to stdout)
  const lastNodeId = Object.keys(outputs).pop();
  if (lastNodeId) {
    console.log(outputs[lastNodeId]);
  }
}

function validate() {
  const file = args[1];
  if (!file) {
    console.error("Error: workflow file required");
    process.exit(1);
  }

  const yamlStr = readFileSync(file, "utf-8");
  const def = parseWorkflow(yamlStr);

  console.log(`✓ Valid workflow: ${def.name}`);
  console.log(`  Nodes: ${Object.keys(def.nodes).join(", ")}`);
  console.log(`  Start: ${def.start}`);
  console.log(`  Edges: ${def.edges.length}`);
  for (const edge of def.edges) {
    const cond = edge.condition ? ` [${edge.condition}]` : "";
    console.log(`    ${edge.from} -> ${edge.to}${cond}`);
  }
}

switch (command) {
  case "run":
    await run();
    break;
  case "validate":
    validate();
    break;
  default:
    usage();
    if (command && command !== "--help" && command !== "-h") {
      process.exit(1);
    }
}
