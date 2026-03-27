# claude-fleet

A parallel task orchestrator for running hundreds of [Claude Code](https://docs.anthropic.com/en/docs/claude-code) sessions concurrently. Maximize your Claude Max subscription by running audit, fix, and verification tasks in parallel batches.

## Install

### Nix (recommended)

```bash
# Run fleet (default program)
nix run github:nammayatri/claude-fleet -- tasks.json

# Run other scripts
nix shell github:nammayatri/claude-fleet -c fleet-dashboard tasks.json
nix shell github:nammayatri/claude-fleet -c fleet-spawn "audit error handling"

# Or install all scripts to profile
nix profile install github:nammayatri/claude-fleet
```

### Manual

```bash
git clone https://github.com/nammayatri/claude-fleet.git
cd claude-fleet
./install.sh  # symlinks to ~/.local/bin
```

## Quick Start

```bash

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

### CLI

| Command | Description |
|---------|-------------|
| `fleet <tasks.json>` | Run tasks in parallel |
| `fleet-convert <tasks.md> [tasks.json]` | Convert markdown to JSON |
| `fleet-add <id> <name> <workdir> <prompt>` | Add a single task |
| `fleet-reset <tasks.json>` | Reset all tasks to pending |
| `fleet-pipeline <pipeline.json>` | Run multi-stage pipeline |
| `fleet-dashboard <tasks.json>` | Real-time TUI dashboard |
| `fleet-validate <tasks.json> [log-dir]` | Post-run quality report (PASS/WARN/FAIL) |
| `fleet-spawn <prompt>` | Quick single-task launcher |

### Claude Code Slash Commands

Fleet installs global slash commands so you can orchestrate fleets **from within any Claude Code session** — no terminal switching, no context loss:

| Command | What it does |
|---------|-------------|
| `/fleet <tasks-file-or-description>` | Spawn a fleet of parallel Claude sessions. Pass a task file path to run immediately, or describe what you want in natural language and fleet creates the tasks for you. |
| `/fleet-task <description>` | Create task files from a prompt. Describe what you need ("audit all NY repos for error handling") and it generates properly formatted task markdown with workdirs, models, tools, and detailed prompts. |
| `/fleet-status [tasks-file]` | Check running fleet status without leaving your session. Shows done/running/pending/failed counts, active task details, and recent completions. |

**Why this matters:** You stay in your Claude session doing focused work while fleet runs 10-30 parallel sessions in the background. Check status, spawn new fleets, create tasks — all without opening a terminal. The AI understands your codebase context and generates better task prompts than you'd write manually.

```
# Inside any Claude Code session:
> /fleet-task "audit payment, booking, and allocation services for error handling"
  → Creates tasks-audit-services.md with 3 focused tasks

> /fleet tasks-audit-services.md
  → Spawns 3 parallel Claude sessions, runs in background

> /fleet-status
  → Fleet Status: 1/3 done | 2 running | 0 pending | 0 failed
```

## Task Format (Markdown)

```markdown
# Title (ignored)

## Task Name
- workdir: /path/to/repo
- model: opus
- effort: high
- allowedTools: Read Grep Glob Bash Edit Write Agent
- appendSystemPrompt: Optional extra instructions
- maxTokens: 50000
- taskType: fix
- allowedFiles: src/worker.js, src/utils.js
- stage: 1
- maxTurns: 10
- dependsOn: task-a, task-b
- autoVerify: true

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
      "appendSystemPrompt": "Optional",
      "maxTokens": 50000,
      "taskType": "fix",
      "allowedFiles": ["src/worker.js", "src/utils.js"],
      "stage": 1,
      "maxTurns": 10,
      "dependsOn": ["task-a", "task-b"],
      "autoVerify": true
    }
  ]
}
```

### Anti-Junk Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `maxTokens` | number | 50k (fix), 30k (audit), 15k (verify) | Token budget per task. At 80% a warning is logged; at 95% the task is force-stopped. |
| `taskType` | string | `fix` | Task category: `fix`, `audit`, `review`, `verify`, `check`. Determines default token budget. |
| `allowedFiles` | array/csv | — | Files the task is allowed to modify. Violations are flagged. Overlapping scopes between tasks trigger sequential execution. Pre-flight warns if any target file is >500 lines. |
| `stage` | number | — | Execution stage (1, 2, 3...). All tasks in stage N must complete before stage N+1 starts. Use to ensure verification runs after fixes. |
| `maxTurns` | number | — | Max tool-use rounds for the agent. Limits how many actions the agent can take. |
| `dependsOn` | string/array | — | Task ID(s) that must complete before this task starts. Supports DAG graphs. Upstream outputs are auto-forwarded to this task's prompt. |
| `autoVerify` | boolean | `false` | Auto-generates a read-only verification task that runs after this task completes. |

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

## Anti-Junk Framework

Fleet includes guardrails to prevent low-quality output from parallel tasks:

1. **Token budget enforcement** — Each task has a `maxTokens` budget (default: 50k for fixes, 30k for audits, 15k for verification). At 80% usage a warning is logged. At 95% the task is force-stopped and partial output saved.

2. **Scope lock files** — Tasks with `allowedFiles` write a `.fleet-lock` in the workdir. After completion, git diff is checked against the allowed list and violations are flagged.

3. **Checkpoint commits** — Tasks with >30k token budgets get an automatic `WIP: [task-name] checkpoint` commit at 50% budget usage, preventing total loss if the agent derails.

4. **Output quality scoring** — Every completed task is scored PASS/WARN/FAIL based on: output existence, stream size (wandering detection), scope violations, and diff size (<500 lines expected). Scores show in the dashboard and summary.

5. **Anti-wandering prompt injection** — Every task prompt is prefixed with an aggressive 8-rule constraint list: no unnecessary reads, no refactoring, no comments on unchanged lines, smallest correct change wins.

6. **Conflict detection** — Before launch, tasks with overlapping `allowedFiles` are detected and run sequentially instead of in parallel, preventing merge conflicts.

7. **Large file warnings** — Pre-flight check scans `allowedFiles` and warns when any target file exceeds 500 lines. Agents handle 200-line files well but struggle with monoliths — split large files before running fleet.

8. **Stage ordering** — Add `stage: 1` / `stage: 2` to tasks in a single file. All stage-1 tasks must complete before stage-2 starts. No more verification tasks running in parallel with fixes.

9. **Max turns** — `maxTurns` field passes `--max-turns` to the Claude CLI, hard-limiting how many tool-use rounds an agent can take. Combine with `maxTokens` for double-layered wandering prevention.

10. **DAG dependencies** — `dependsOn` supports arrays (`["task-a", "task-b"]`) for multi-parent task graphs. Tasks wait for all parents to complete.

11. **Output forwarding** — When a task has `dependsOn`, the outputs from upstream tasks are automatically injected into the downstream task's prompt (last 2000 chars per upstream). Downstream tasks can build on findings from earlier tasks.

12. **Auto-verify** — Set `autoVerify: true` on any fix task. Fleet auto-generates a read-only verification task that runs after the fix completes, checking for compilation errors, minimal diffs, and test regressions.

Run `fleet-validate tasks.json` after a fleet run for a detailed quality report.

### Example: DAG with output forwarding

```markdown
## Audit auth module
- stage: 1
- taskType: audit
- allowedTools: Read Grep Glob

Find all security issues in the auth module.

## Fix auth issues
- stage: 2
- dependsOn: audit-auth-module
- autoVerify: true
- allowedFiles: src/auth.js

Fix the issues found by the audit. (Upstream audit output is auto-injected here.)
```

The verify task is auto-generated — no need to write it manually.

### Recommended task design

- **One feature per task, one file per task** — never two tasks editing the same file in parallel
- **Split large files first** — agents handle 200-line files, not 2500-line monoliths
- **Use stages** — `stage: 1` for fixes, `stage: 2` for verification
- **Set `allowedFiles`** — enables conflict detection, scope checking, and large file warnings
- **Use `autoVerify: true`** — every fix gets a free verification pass
- **Use `dependsOn`** — build task DAGs where downstream tasks receive upstream outputs

## Tips

- Read-only tasks: omit `Edit Write` from allowedTools for safety
- Multiple orchestrators: run several `fleet` instances with different task files
- Background: `MAX_PARALLEL=10 fleet tasks.json > /tmp/fleet.log 2>&1 &`
- Reset stuck tasks: `fleet-reset tasks.json`

## Updating

If you've already installed claude-fleet, pull the latest and re-run the installer:

```bash
cd /path/to/claude-fleet
git pull
./install.sh  # re-symlinks all bin/* scripts
```

Since install uses symlinks, `git pull` alone updates the scripts. Re-running `./install.sh` is only needed when new commands are added (like `fleet-validate`).

## Requirements

- [Claude Code CLI](https://docs.anthropic.com/en/docs/claude-code) (`claude` or `happy`)
- `jq`
- Python 3 (for `fleet-convert` and `fleet-dashboard`)
- `rich` Python package (for dashboard only): `pip install rich`

## License

MIT
