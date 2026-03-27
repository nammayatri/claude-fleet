# Aarokya Phase 1: Foundation Infrastructure
# 4 parallel tasks to build the Aarokya healthcare platform foundation
# Usage: fleet-convert templates/tasks-aarokya-phase1.md tasks.json && fleet tasks.json

## Backend Core Setup
- workdir: /path/to/aarokya
- model: opus
- effort: high
- allowedTools: Read Grep Glob Bash Edit Write Agent

Implement the Aarokya Rust backend with Actix-web. Read /path/to/aarokya/docs/implementation/IMPLEMENTATION_STRATEGY.md for the full schema and architecture. Implement:
1. Actix-web server with CORS, tracing
2. PostgreSQL migrations (users, HSAs, contributions, partners, insurance, claims, health profiles, audit logs)
3. Auth system (phone OTP, JWT, RBAC middleware)
4. HSA engine (create account, balance, dashboard, insurance eligibility)
5. Contribution API (create with idempotency + DB transaction, list, summary)
6. Partner API (register, workers, bulk contribute, dashboard)
7. Insurance API (plans, subscribe, policies, claims, review)
8. Error handling, input validation, audit logging
Ensure it compiles with `cargo check`.

## Customer App Setup
- workdir: /path/to/aarokya
- model: opus
- effort: high
- allowedTools: Read Grep Glob Bash Edit Write Agent

Set up the React Native customer app at apps/customer/. Read /path/to/aarokya/docs/prd/PRD_V1.md for requirements. Implement:
1. Project structure with TypeScript, React Navigation, Zustand, React Query, i18next
2. Theme system (Aarokya design: Primary #2563EB, Secondary #10B981, Accent #F59E0B)
3. Auth flow (Welcome → Phone → OTP)
4. Home screen with HSA balance card, insurance progress, quick actions, recent contributions
5. HSA detail, contribute, insurance, health profile, profile screens
6. API client layer connecting to backend
7. i18n with English and Hindi translations

## Partner App Setup
- workdir: /path/to/aarokya
- model: opus
- effort: high
- allowedTools: Read Grep Glob Bash Edit Write Agent

Set up the React Native partner app at apps/partner/. Read /path/to/aarokya/docs/prd/PRD_V1.md. Implement:
1. Partner onboarding (business type selection, details, contribution scheme)
2. Dashboard with metrics (total workers, contributions, coverage rate)
3. Worker management (list, search, add, detail)
4. Contribution management (individual and bulk)
5. Reports (date range, CSR, export)
6. API integration and state management

## Control Center Setup
- workdir: /path/to/aarokya
- model: opus
- effort: high
- allowedTools: Read Grep Glob Bash Edit Write Agent

Set up the Next.js control center at apps/control-center/. Read /path/to/aarokya/docs/prd/PRD_V1.md. Implement:
1. Next.js 14 with App Router, Tailwind CSS, Recharts
2. Login page with JWT auth
3. Dashboard with stat cards, user growth chart, contribution chart
4. Users page (table, search, filters, user detail)
5. Finances page (transactions, reconciliation)
6. Insurance page (policies, claims review queue)
7. Analytics page (charts, funnels)
8. Settings page (roles, config)
9. Sidebar navigation, role-based access
