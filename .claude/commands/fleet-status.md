Check the status of running fleet tasks.

Usage: /fleet-status [tasks-file-or-log-dir]

Arguments:
- $ARGUMENTS: Optional path to tasks.json or logs directory

Instructions:

1. Find the active fleet run:
   - If $ARGUMENTS is provided, use that
   - Otherwise, find the most recent log directory: `ls -td logs/*/state.json 2>/dev/null | head -1`
   - Also check for running fleet processes: `ps aux | grep '[f]leet'`

2. Read and display the state:
   - Read `state.json` from the log directory
   - Show: total tasks, running, done, failed, pending
   - For running tasks, check their `.stream.jsonl` for last activity
   - For failed tasks, show the last few lines of their `.log` file

3. Display format:
   ```
   Fleet Status: 15/40 done | 5 running | 20 pending | 0 failed
   Elapsed: 23m

   Running:
     - task-name (opus, 4m) — last: Edit bin/foo.sh
     - task-name-2 (sonnet, 1m) — last: Grep "pattern"

   Recent completions:
     - task-done-1 ✓ (12m, 4.2K output)
     - task-done-2 ✓ (8m, 2.1K output)

   Failed:
     - task-fail-1 ✗ — error: <last line of .log>
   ```

4. If no fleet is running, say so and suggest: `fleet <tasks-file>` to start one.
