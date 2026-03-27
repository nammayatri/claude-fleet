# claude-flow

State machine orchestrator for Claude Code CLI sessions.

Define workflows as YAML — nodes are Claude prompts, edges are transitions with optional conditions. The orchestrator walks the graph, running `claude --print` at each node, forwarding output between steps.

## Quickstart

```bash
nix develop          # or: bun install
just hello           # runs plan → execute with a sample task
```

## Usage

```bash
# Run a workflow with a task description
claude-flow run workflows/hello-world.yaml "add a fibonacci function"

# Run with verbose output (shows node outputs)
claude-flow run workflows/hello-world.yaml "fix the login bug" --verbose

# Validate a workflow file
claude-flow validate workflows/hello-world.yaml
```

## Workflow Format

```yaml
name: my-workflow
start: plan

nodes:
  plan:
    prompt: |
      Create an implementation plan. Do NOT implement.
    model: sonnet
    tools: [Read, Grep, Glob]

  execute:
    prompt: |
      Implement the plan.
    tools: [Read, Grep, Glob, Bash, Edit, Write]

  review:
    prompt: |
      Review the implementation. Output LGTM or NEEDS_CHANGES.
    model: opus
    tools: [Read, Grep, Glob]

edges:
  - "plan -> execute"
  - "execute -> review"
  - "review -> execute [NEEDS_CHANGES]"
  - "review -> done [LGTM]"
```

### Nodes

Each node runs a `claude --print` session with the given prompt. Available fields:

| Field | Default | Description |
|-------|---------|-------------|
| `prompt` | required | The prompt sent to Claude |
| `model` | `sonnet` | `opus`, `sonnet`, or `haiku` |
| `tools` | all | Allowed tools list |
| `maxTurns` | — | Max agent tool-use rounds |
| `systemPrompt` | — | Appended to system prompt |

### Edges

Edge syntax: `"from -> to"` or `"from -> to [PATTERN]"`

- No pattern = unconditional (default/fallback)
- `[PATTERN]` = case-insensitive regex matched against the source node's output
- Conditional edges are evaluated first; the first match wins
- `done` is a built-in terminal node

### Output Forwarding

Each node receives its upstream node's output as context in the prompt. When a node is revisited (e.g., after a CI failure loop), it sees the latest outputs from all upstream edges.

### Cycle Safety

Nodes have a visit limit (default: 3). If a node is entered more times than the limit, the workflow fails. Set `MAX_VISITS` env var to override.
