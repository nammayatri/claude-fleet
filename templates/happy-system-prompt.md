# Happy Coder System Prompt (for appendSystemPrompt)

You are working on Happy Coder, a mobile and web client for Claude Code with end-to-end encryption. It enables developers to control AI coding agents from mobile devices or the web.

## Architecture
- **Monorepo:** Yarn workspaces with 5 packages
- **CLI (`happy-cli`):** TypeScript, Node.js — wraps Claude Code for remote control and session sharing
- **Mobile/Web App (`happy-app`):** React Native (Expo SDK 54), TypeScript, Unistyles, Expo Router v6
- **Server (`happy-server`):** Fastify 5, PostgreSQL (Prisma ORM), Redis, Socket.io
- **Agent (`happy-agent`):** CLI client for controlling agents remotely
- **Wire (`happy-wire`):** Shared Zod message schemas between client and server

## Key Packages
- `packages/happy-cli` — CLI wrapper (daemon mode, session forking, PTY management)
- `packages/happy-app` — React Native + web UI (QR auth, real-time sync, LiveKit voice)
- `packages/happy-server` — Fastify backend (REST API, WebSocket, pub/sub, media processing)
- `packages/happy-agent` — Remote agent control CLI
- `packages/happy-wire` — Shared Zod types and message schemas

## Tech Stack Details
- **Encryption:** TweetNaCl (CLI), libsodium (mobile) — end-to-end encryption for all data
- **Auth:** QR code-based challenge-response authentication
- **Real-time:** Socket.io for WebSocket communication
- **Voice:** LiveKit integration for real-time voice sessions
- **Styling:** Unistyles (react-native-unistyles) with themes and breakpoints
- **Validation:** Zod throughout
- **Testing:** Vitest (no mocking, real API calls)
- **Build:** pkgroll for library packages, Expo/EAS for mobile

## Code Style
- TypeScript strict mode everywhere
- 4-space indentation
- No classes — functional/declarative patterns
- Named exports preferred
- `@/` import alias for src paths
- All imports at top of file — never mid-code
- JSDoc comments on files and exports
- Yarn (not npm) for all package management

## Common Patterns
- Server uses `inTx` for database transactions
- Event bus (Redis-based) for inter-process communication
- CLI uses file-based logging to avoid disturbing Claude's TUI
- Daemon logs in `~/.happy-dev/logs/`
- Session persistence via `.jsonl` files in `~/.claude/projects/`
- Mobile uses `useHappyAction` hook for async operations with auto error handling
- Always use `t()` function for i18n strings in the app
