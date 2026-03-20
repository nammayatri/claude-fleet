Spawn a fleet of parallel Claude sessions.

Usage: /fleet <tasks-file-or-description>

Arguments:
- $ARGUMENTS: Either a path to a tasks.md/tasks.json file, or a natural language description of what to do

Instructions:

1. If $ARGUMENTS is a path to an existing file (`.md` or `.json`), run fleet directly:
   ```
   fleet "$ARGUMENTS" > /tmp/fleet-$(date +%s).log 2>&1 &
   ```
   Then immediately run `fleet-dashboard "$ARGUMENTS"` output to show initial status.

2. If $ARGUMENTS is a description/prompt, help the user create a tasks file:
   - Ask what repos/workdirs to target
   - Ask how many parallel tasks and what model
   - Generate a `tasks-<name>.md` file in the current directory
   - Offer to run it

3. If no arguments, show available task files:
   ```
   ls *.md *.json 2>/dev/null | grep -i task
   ```

Common patterns:
- `fleet tasks-audit.md` — run existing task file
- `fleet "audit all NY repos for error handling"` — create + run

For NammaYatri tasks, suggest using the NY templates:
- `~/Documents/code/claude-fleet/templates/tasks-ny-audit.md` (audit template)
- Remind user about `--appendSystemPrompt` with NY MCP context

Always run fleet in background and show how to monitor:
```
fleet-dashboard <tasks-file>
```
