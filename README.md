# claude-fleet

A parallel task orchestrator for running hundreds of [Claude Code](https://docs.anthropic.com/en/docs/claude-code) sessions concurrently. Maximize your Claude Max subscription by running audit, fix, and verification tasks in parallel batches.

## Quick Start

```bash
# Install
git clone https://github.com/nammayatri/claude-fleet.git
cd claude-fleet
./install.sh  # symlinks to ~/.local/bin

# Create tasks
cat > tasks.md << 'EOF'
# My Tasks

## Review Auth Module
- workdir: /path/to/repo
- model: opus
- effort: high
- allowedTools: Read Grep Glob Bash

Review the auth module for security issues. Check for SQL injection,
XSS, and improper session handling.

## Audit Logging
- workdir: /path/to/repo
- model: sonnet
- effort: high
- allowedTools: Read Grep Glob

Audit all logging statements for PII leaks.
EOF

# Convert and run
fleet-convert tasks.md tasks.json
fleet tasks.json

# Or with more parallelism
MAX_PARALLEL=10 fleet tasks.json

# Monitor with TUI dashboard
fleet-dashboard tasks.json
```

## Commands

| Command | Description |
|---------|-------------|
| `fleet <tasks.json>` | Run tasks in parallel |
| `fleet-convert <tasks.md> [tasks.json]` | Convert markdown to JSON |
| `fleet-add <id> <name> <workdir> <prompt>` | Add a single task |
| `fleet-reset <tasks.json>` | Reset all tasks to pending |
| `fleet-pipeline <pipeline.json>` | Run multi-stage pipeline |
| `fleet-dashboard <tasks.json>` | Real-time TUI dashboard |

## Task Format (Markdown)

```markdown
# Title (ignored)

## Task Name
- workdir: /path/to/repo
- model: opus
- effort: high
- allowedTools: Read Grep Glob Bash Edit Write Agent
- appendSystemPrompt: Optional extra instructions

Prompt text here. Everything until the next ## heading.
```

## Task Format (JSON)

```json
{
  "tasks": [
    {
      "id": "task-name",
      "name": "Task Name",
      "prompt": "The full prompt...",
      "workdir": "/path/to/repo",
      "model": "opus",
      "effort": "high",
      "status": "pending",
      "allowedTools": "Read Grep Glob Bash",
      "appendSystemPrompt": "Optional"
    }
  ]
}
```

## Configuration

Fleet loads config from (in order, later overrides earlier):

1. `~/.config/claude-fleet/config`
2. `$FLEET_CONFIG` (env var pointing to a config file)
3. `./fleet.conf` (project-local)
4. Environment variables

Config files are bash-sourceable:

```bash
MAX_PARALLEL=10
POLL_INTERVAL=10
MODEL=opus
EFFORT=high
MODE=batch
CLAUDE_CMD=claude
LOG_DIR=./logs
```

## Multi-Stage Pipelines

Run sequential stages where each stage's tasks run in parallel:

```json
{
  "stages": [
    {
      "name": "Audit",
      "tasks": [
        {"file": "tasks-audit.json", "max_parallel": 10}
      ]
    },
    {
      "name": "Fix",
      "tasks": [
        {"file": "tasks-fixes.json", "max_parallel": 5}
      ]
    }
  ]
}
```

```bash
fleet-pipeline pipeline.json
```

## Dashboard

The TUI dashboard shows real-time task progress:

```
┏━━ claude-fleet ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ Tasks: 12/40 done  3 running  25 pending  0 failed     ┃
┃ Elapsed: 1h 23m                                         ┃
┃                                                         ┃
┃ RUNNING                                                 ┃
┃  ● audit-payment-svc    opus  12m 34s  ████░░░░         ┃
┃  ● review-auth-module   opus   8m 12s  ███░░░░░         ┃
┃  ● fix-logging-config   sonnet 3m 45s  █░░░░░░░         ┃
┃                                                         ┃
┃ RECENT                                                  ┃
┃  ✓ audit-user-svc       14m 22s                         ┃
┃  ✗ fix-cache-layer       7m 33s  (failed)               ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

Requires `pip install rich`.

## Output

```
logs/
  20260314-230527/           # timestamp per run
    task-id.stream.jsonl     # raw stream output
    task-id.output.md        # extracted text
    task-id.log              # stderr
    state.json               # live status for dashboard
```

## Tips

- Read-only tasks: omit `Edit Write` from allowedTools for safety
- Multiple orchestrators: run several `fleet` instances with different task files
- Background: `MAX_PARALLEL=10 fleet tasks.json > /tmp/fleet.log 2>&1 &`
- Reset stuck tasks: `fleet-reset tasks.json`

## Requirements

- [Claude Code CLI](https://docs.anthropic.com/en/docs/claude-code) (`claude` or `happy`)
- `jq`
- Python 3 (for `fleet-convert` and `fleet-dashboard`)
- `rich` Python package (for dashboard only): `pip install rich`

## License

MIT
