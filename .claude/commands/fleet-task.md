Create fleet task(s) from a prompt description.

Usage: /fleet-task <description of what you want done>

Arguments:
- $ARGUMENTS: Natural language description of the task(s) to create

Instructions:

1. Parse the user's description to determine:
   - How many tasks (single task or multiple parallel tasks)
   - What repos/workdirs to target
   - Whether it's read-only (audit/review) or read-write (fix/refactor)
   - Whether NammaYatri context is needed (mentions NY, nammayatri, rider, driver, backend, consumer app, provider app)

2. For each task, determine sensible defaults:
   - **workdir**: Infer from context. Common paths:
     - NammaYatri backend: `~/Documents/code/nammayatri`
     - NY mobile apps: `~/Documents/code/ny-react-native`
     - Current directory if unclear
   - **model**: `opus` for complex analysis/fixes, `sonnet` for simpler tasks
   - **effort**: `high` for audits and fixes, `medium` for simple searches
   - **allowedTools**: `Read Grep Glob Agent` for read-only, add `Bash Edit Write` for fixes
   - **appendSystemPrompt**: Include NY context from `~/Documents/code/claude-fleet/templates/ny-system-prompt.md` if NY-related

3. Generate a tasks markdown file with proper format:
   ```markdown
   # <Title>

   ## Task Name
   - workdir: /path/to/repo
   - model: opus
   - effort: high
   - allowedTools: Read Grep Glob Agent
   - appendSystemPrompt: <context>

   Detailed prompt here with clear instructions on what to do and what output format to produce.
   ```

4. Write the file to the current working directory as `tasks-<slug>.md`

5. Show the user what was created and ask if they want to:
   - Edit any tasks before running
   - Run it now: `fleet tasks-<slug>.md`
   - Add more tasks to the file

Key rules:
- Write detailed, specific prompts — each task runs independently with no shared context
- Always include "Write a detailed report with file paths and line numbers" for audit tasks
- For fix tasks, include "Create a git commit with your changes" at the end
- Split large scopes into multiple focused tasks (e.g., one per service or one per concern)
- If the user says "across all services" or "every repo", create one task per repo/service area
