# NammaYatri Audit Tasks Template
# Copy this file, customize the tasks you need, then: fleet tasks-ny-audit.json

## Backend Error Handling Audit
- workdir: ~/Documents/code/nammayatri
- model: opus
- effort: high
- allowedTools: Read Grep Glob Agent
- appendSystemPrompt: You are auditing NammaYatri's Haskell backend. 40+ microservices using Servant + Beam. Focus on error handling patterns — look for uncaught exceptions, missing error types, inconsistent error responses.

Audit the error handling across all backend services. For each service:
1. Check exception handling patterns
2. Identify places where errors are silently swallowed
3. Check if error responses follow a consistent format
4. Look for TODO/FIXME/HACK comments related to error handling
Write a detailed report with file paths and line numbers.

## Backend API Security Audit
- workdir: ~/Documents/code/nammayatri
- model: opus
- effort: high
- allowedTools: Read Grep Glob Agent
- appendSystemPrompt: You are auditing NammaYatri's Haskell backend for security issues. Check authentication, authorization, input validation, and data exposure.

Audit API security across all services:
1. Check auth middleware usage — are all endpoints protected?
2. Look for endpoints missing authorization checks
3. Check for sensitive data in API responses (tokens, passwords, PII)
4. Review input validation on request bodies
5. Check for SQL injection risks in raw queries
Write a detailed security report.

## Consumer App Code Quality
- workdir: ~/Documents/code/ny-react-native
- model: opus
- effort: high
- allowedTools: Read Grep Glob Agent
- appendSystemPrompt: You are auditing the NammaYatri consumer app. It's a React Native app using ReScript + TypeScript. Focus on code quality, performance, and best practices.

Audit the consumer app for:
1. Performance issues (unnecessary re-renders, missing memoization, large bundles)
2. Error handling in API calls
3. Accessibility issues
4. Dead code and unused imports
5. Type safety gaps between ReScript and TypeScript boundaries

## Observability Check
- workdir: ~/Documents/code/nammayatri
- model: opus
- effort: high
- allowedTools: Read Grep Glob Bash Agent
- appendSystemPrompt: You are auditing NammaYatri's observability setup. Check logging, metrics, alerting across all services. Use vm-mcp for VictoriaMetrics and opensearch-mcp for log queries.

Audit observability across all services:
1. Check which services have proper structured logging
2. Identify services missing health check endpoints
3. Review Prometheus metric definitions — are key business metrics tracked?
4. Check for services without alerting rules
5. Verify log levels are appropriate (no sensitive data in info/debug logs)

## Database Migration Safety
- workdir: ~/Documents/code/nammayatri
- model: opus
- effort: high
- allowedTools: Read Grep Glob Agent
- appendSystemPrompt: You are auditing NammaYatri's database migrations. The backend uses Beam ORM with PostgreSQL. Check migration safety and data integrity.

Audit database migrations:
1. Find all migration files and check for destructive operations (DROP, DELETE, ALTER TYPE)
2. Check if migrations have rollback scripts
3. Look for migrations that could lock tables for extended periods
4. Verify foreign key constraints are consistent
5. Check for missing indexes on frequently queried columns
