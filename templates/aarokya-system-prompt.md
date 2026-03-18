# Aarokya Platform Context

## What is Aarokya?
Open-source healthcare platform for India's 200M gig/informal workers. Three pillars:
1. **Save & Insure**: Health Savings Accounts with micro-contributions from multiple sources
2. **Prevent with AI**: AI health assistant in 12+ Indian languages
3. **Hyperlocal Care**: Transform pharmacies into digital healthcare nodes

## Tech Stack
- Backend: Rust (Actix-web, SQLx, PostgreSQL)
- Customer App: React Native + TypeScript
- Partner App: React Native + TypeScript
- Control Center: Next.js 14, Tailwind CSS, Recharts
- Auth: JWT + Phone OTP + ABHA ID
- State: Zustand + React Query

## Key Domain Rules
- Money always in paise (BIGINT), never floats. 1 ₹ = 100 paise
- HSA balance >= 399900 paise (₹3,999) → basic insurance eligible
- HSA balance >= 1000000 paise (₹10,000) → premium insurance eligible
- Contribution sources: self, employer, platform, family, tip, csr, community, government
- User types: customer, partner, operator
- Operator roles: super_admin, insurance_ops, support, analytics, partner_manager
- All financial operations must use DB transactions with idempotency keys
- Format currency as ₹X,XXX.XX (paise ÷ 100)

## Design System
- Primary: #2563EB (Trust Blue)
- Secondary: #10B981 (Health Green)
- Accent: #F59E0B (Warmth Amber)
- Background: #F8FAFC
- Text: #1E293B

## Quality Bar
- Multi-agent adversarial review on all code
- >80% test coverage, 100% on critical paths (financial operations)
- API response < 200ms p95
- OWASP top 10 compliance
- DPDP Act compliant (consent-driven, minimal collection)
