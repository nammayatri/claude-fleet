# CLAUDE.md

This file provides guidance to Claude Code when working with this repository.

# claude-fleet

A parallel task orchestrator for running hundreds of Claude Code sessions concurrently.

## Structure

```
bin/
  fleet              # Main orchestrator — runs tasks in parallel
  fleet-convert      # Converts tasks.md → tasks.json
  fleet-add          # Adds a single task to a tasks JSON file
  fleet-reset        # Resets all tasks to pending
  fleet-pipeline     # Multi-stage pipeline runner (sequential stages, parallel tasks)
  fleet-dashboard    # Real-time TUI dashboard (Python + rich)
  fleet-spawn        # Quick single-task launcher (with --ny flag for NammaYatri context)
templates/
  ny-system-prompt.md    # appendSystemPrompt for NammaYatri tasks (MCP, architecture, ClickHouse)
  tasks-ny-audit.md      # Pre-built NY audit task templates
  happy-system-prompt.md # appendSystemPrompt for Happy Coder tasks (monorepo, encryption, stack)
  tasks-happy-audit.md   # Pre-built Happy Coder audit task templates
examples/
  tasks-hello-world.md   # Example tasks
  pipeline.json          # Example multi-stage pipeline config
```

## Key Design Decisions

1. **Prompt via stdin**: `echo "$prompt" | claude --print ...` because `--allowedTools` is variadic and would consume the prompt arg.
2. **Stream output**: Tasks use `--output-format stream-json` piped through `jq` to extract text in real-time to `.output.md` files.
3. **Config hierarchy**: `./fleet.conf` > `$FLEET_CONFIG` > `~/.config/claude-fleet/config` > defaults. All bash-sourceable.
4. **state.json**: The orchestrator writes `$LOG_DIR/state.json` on every task transition for the dashboard to poll.
5. **MCP in --print mode**: SSE (`/sse`) works; Streamable HTTP (`/mcp`) does NOT work in `--print` mode.
6. **Multiple orchestrators**: Run several `fleet` instances with different task files for max parallelism.

## Task Format

### Markdown (author-friendly)

```markdown
# Title (ignored)

## Task Name Here
- workdir: /path/to/repo
- model: opus
- effort: high
- allowedTools: Read Grep Glob Bash Edit Write Agent
- appendSystemPrompt: Optional extra instructions

Prompt text here. Everything until the next ## heading.
```

Convert: `fleet-convert tasks.md tasks.json`

### JSON (machine format)

```json
{
  "tasks": [{
    "id": "task-name-slugified",
    "name": "Task Name",
    "prompt": "Full prompt...",
    "workdir": "/path/to/repo",
    "model": "opus",
    "effort": "high",
    "status": "pending",
    "allowedTools": "Read Grep Glob Bash",
    "appendSystemPrompt": "Optional"
  }]
}
```

Status values: `pending` → `running` → `done` | `failed`

## Running

```bash
./install.sh                          # symlink bin/* to ~/.local/bin
fleet tasks.json                      # run with 5 parallel (default)
MAX_PARALLEL=10 fleet tasks.json      # run with 10 parallel
fleet-dashboard tasks.json            # TUI monitor
fleet-pipeline pipeline.json          # multi-stage pipeline
```

## Environment Variables

| Variable | Default | Description |
|---|---|---|
| `MAX_PARALLEL` | `5` | Max concurrent Claude sessions |
| `POLL_INTERVAL` | `10` | Seconds between reap/schedule cycles |
| `MODE` | `batch` | `batch` (--print) or `interactive` (--worktree --tmux) |
| `CLAUDE_CMD` | `claude` | CLI binary (`claude` or `happy`) |
| `FLEET_CONFIG` | — | Path to config file override |

## Output

```
logs/
  20260314-230527/           # timestamp per run
    task-id.stream.jsonl     # raw stream-json output
    task-id.output.md        # extracted text content
    task-id.log              # stderr/errors
    state.json               # live status for dashboard
```

## Spawning from Claude Sessions

Global slash commands are installed at `~/.claude/commands/`:
- `/fleet <tasks-file>` — spawn a fleet run from any Claude session
- `/fleet-status` — check status of running fleet

Quick single-task spawn:
```bash
fleet-spawn "audit error handling" --ny --workdir ~/Documents/code/nammayatri --readonly
fleet-spawn "fix logging in rider service" --ny --workdir ~/Documents/code/nammayatri
fleet-spawn "audit encryption" --happy --workdir ~/happy --readonly
```

The `--ny` flag automatically injects NammaYatri context (architecture, MCP instructions, ClickHouse tables) via `appendSystemPrompt`.
The `--happy` flag automatically injects Happy Coder context (monorepo architecture, encryption, tech stack) via `appendSystemPrompt`.

## NammaYatri Templates

Pre-built task templates in `templates/`:
- `tasks-ny-audit.md` — 5 audit tasks (error handling, security, code quality, observability, migrations)
- `ny-system-prompt.md` — shared context injected via `appendSystemPrompt`

Copy and customize:
```bash
cp templates/tasks-ny-audit.md tasks-my-audit.md
# edit as needed
fleet tasks-my-audit.md
```

## Happy Coder Templates

Pre-built task templates for the Happy Coder project (mobile/web client for Claude Code):
- `tasks-happy-audit.md` — 6 audit tasks (CLI security, server API security, app code quality, error handling, wire schema consistency, E2E encryption)
- `happy-system-prompt.md` — shared context injected via `appendSystemPrompt`

Copy and customize:
```bash
cp templates/tasks-happy-audit.md tasks-my-happy-audit.md
# edit as needed
fleet tasks-my-happy-audit.md
```

Quick spawn with Happy context:
```bash
fleet-spawn "audit encryption" --happy --workdir ~/happy --readonly
fleet-spawn "fix error handling in server" --happy --workdir ~/happy/packages/happy-server
```

## Tips
- Read-only tasks: omit `Edit Write` from allowedTools for safety
- Reset stuck tasks: `fleet-reset tasks.json`
- Background: `fleet tasks.json > /tmp/fleet.log 2>&1 &`
