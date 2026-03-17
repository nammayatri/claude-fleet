# Happy Coder Audit Tasks Template
# Copy this file, customize the tasks you need, then: fleet tasks-happy-audit.md

## CLI Security Audit
- workdir: ~/happy/packages/happy-cli
- model: opus
- effort: high
- allowedTools: Read Grep Glob Agent
- appendSystemPrompt: You are auditing Happy CLI's security. Focus on encryption, auth flows, key storage, and session management. The CLI uses TweetNaCl for E2E encryption and challenge-response auth.

Audit security across the CLI codebase:
1. Review encryption implementation in src/api/encryption.ts — check for weak patterns
2. Audit key storage in ~/.handy/access.key — permissions, rotation, exposure risks
3. Check auth flow (challenge-response) for replay attack vulnerabilities
4. Review WebSocket connections for token leaks or insecure transport
5. Check for secrets in logs (file-based logging in ~/.happy-dev/logs/)
6. Review process spawning and PTY management for injection risks
Write a detailed security report with file paths and line numbers.

## Server API Security Audit
- workdir: ~/happy/packages/happy-server
- model: opus
- effort: high
- allowedTools: Read Grep Glob Agent
- appendSystemPrompt: You are auditing Happy Server's API security. Fastify 5 backend with Prisma ORM, PostgreSQL, Redis, Socket.io. Check auth, input validation, data exposure.

Audit API security across the server:
1. Check auth middleware — are all endpoints properly protected?
2. Review Zod validation schemas — are inputs thoroughly validated?
3. Check for sensitive data exposure in API responses (tokens, keys, PII)
4. Review Socket.io event handlers for auth bypass risks
5. Check Redis pub/sub for message injection possibilities
6. Review Prisma queries for potential data leaks via JSON fields
7. Check CORS and rate limiting configuration
Write a detailed security report.

## App Code Quality Audit
- workdir: ~/happy/packages/happy-app
- model: opus
- effort: high
- allowedTools: Read Grep Glob Agent
- appendSystemPrompt: You are auditing the Happy Coder mobile/web app. React Native with Expo SDK 54, TypeScript, Unistyles, Expo Router v6. Focus on code quality and performance.

Audit the app for:
1. Performance issues (unnecessary re-renders, missing memoization, heavy computations on render)
2. Error handling in sync operations and API calls
3. Memory leaks in WebSocket/Socket.io connections
4. i18n coverage — find hardcoded strings that should use t() function
5. Type safety gaps — any use of `any` or type assertions that bypass safety
6. Accessibility issues across screens
Write a detailed code quality report.

## Server Error Handling Audit
- workdir: ~/happy/packages/happy-server
- model: opus
- effort: high
- allowedTools: Read Grep Glob Agent
- appendSystemPrompt: You are auditing error handling in Happy Server. Fastify 5 with Prisma, Redis, Socket.io. Check for silent failures, missing error boundaries, inconsistent error responses.

Audit error handling across the server:
1. Check Fastify error hooks and global error handler configuration
2. Review transaction error handling — are inTx failures properly propagated?
3. Look for silently swallowed errors (empty catch blocks, catch-and-log-only)
4. Check Redis/Socket.io disconnect and reconnection handling
5. Review background job error handling (media processing, event bus)
6. Verify error response format consistency across all API routes
Write a detailed report with file paths and line numbers.

## Wire Schema Consistency Audit
- workdir: ~/happy
- model: opus
- effort: high
- allowedTools: Read Grep Glob Agent
- appendSystemPrompt: You are auditing the shared wire types in Happy Coder. The happy-wire package defines Zod schemas shared between CLI, app, and server. Check for schema drift and inconsistencies.

Audit the wire protocol and schema consistency:
1. Review all Zod schemas in packages/happy-wire — check completeness
2. Compare wire types against actual API request/response shapes in the server
3. Check if CLI and app are using the same wire types or have diverged
4. Look for places where raw objects are sent instead of validated wire types
5. Check for backward-incompatible schema changes without versioning
6. Review Socket.io event payloads — are they validated against wire schemas?
Write a detailed consistency report.

## E2E Encryption Audit
- workdir: ~/happy
- model: opus
- effort: high
- allowedTools: Read Grep Glob Agent
- appendSystemPrompt: You are auditing the end-to-end encryption implementation across Happy Coder. CLI uses TweetNaCl, mobile uses libsodium. Check for encryption gaps and implementation correctness.

Audit the encryption implementation across all packages:
1. Compare TweetNaCl (CLI) vs libsodium (mobile) — are they interoperable?
2. Check for data that transits the server unencrypted when it should be encrypted
3. Review key exchange mechanisms between CLI and mobile
4. Check session key lifecycle — generation, storage, rotation, destruction
5. Look for encryption bypasses in debug/development code paths
6. Review the server — does it ever have access to plaintext user data?
Write a detailed encryption audit report.
