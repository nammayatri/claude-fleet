# claude-fleet: Run 400 Claude Code Tasks in a Weekend

## The Problem

Claude Code is the most capable coding agent available. It's also sequential.

You give it one task. It finishes. You give it the next. Repeat. A thorough audit of a 15-repo microservices platform? That's hundreds of tasks. At 10-15 minutes each, sequential execution takes **weeks**.

Meanwhile, your Claude Max subscription sits idle between tasks. You're paying for a firehose and using a garden hose.

The math is simple: if one Claude session can audit a module in 12 minutes, 30 concurrent sessions can audit 30 modules in 12 minutes. **The bottleneck isn't Claude — it's the orchestration layer.**

## What claude-fleet Does

**claude-fleet** is a parallel task orchestrator for Claude Code. It runs N concurrent sessions from a simple task file, with a real-time dashboard and multi-stage pipelines.

| Capability | How |
|---|---|
| **Parallel execution** | Up to N concurrent Claude Code sessions (`MAX_PARALLEL=10`) |
| **Markdown task authoring** | Write tasks in `.md`, convert to JSON with `fleet-convert` |
| **Multi-stage pipelines** | Sequential stages (audit → fix → verify), parallel tasks within each |
| **Real-time TUI dashboard** | Live progress, elapsed time, pass/fail status per task |
| **Multiple orchestrators** | Run 3 `fleet` instances simultaneously for 30+ concurrent sessions |
| **Tool control** | Per-task `allowedTools` — read-only audits can't accidentally edit code |
| **Config hierarchy** | Project-local, env var, or global config. All bash-sourceable |

The workflow:

```
Write tasks.md → fleet-convert → fleet tasks.json → monitor with fleet-dashboard
                                                   → outputs in logs/
```

## Case Study: NammaYatri — 403 Tasks, 48 Hours, 15 Repos

This is not a toy demo. This is what happened when claude-fleet was pointed at [NammaYatri](https://nammayatri.in/), India's largest open-source ride-hailing platform: a Haskell monorepo, 4 Rust services, Kubernetes infrastructure, and release systems.

### The Numbers

| Metric | Value |
|---|---|
| Total tasks executed | **403** |
| Batches | 15 |
| Orchestrator runs | 31 |
| Peak concurrency | **30 sessions** (3 orchestrators x 10 parallel) |
| Repositories covered | 15 |
| Wall clock time | **48 hours** (one weekend) |
| Languages | Haskell, Rust, YAML, Python, Bash |

### Wave 1 — Systematic Reliability Audit (225 tasks, overnight)

Started Friday night. Finished Saturday morning.

**125-task reliability audit** covering:
- API inventory and endpoint mapping
- Kafka topic mapping and consumer group analysis
- Redis key patterns and pool utilization
- Database relationship and index analysis
- Error handling and recovery patterns
- Auth and rate limiting coverage
- Circuit breaker and retry configurations
- Payment flow integrity
- N+1 query detection
- Concurrency safety review

**55-task production error RCA** using live VictoriaMetrics and OpenSearch data:
- 5XX error classification and root cause
- Timeout pattern analysis
- Database connection pool exhaustion
- Redis connection and command failures
- Kafka consumer lag and offset issues
- Memory leak detection

**45-task file-by-file deep code review** of critical payment, booking, and driver allocation modules.

### Wave 2 — Automated Fixes (40 tasks)

Each task targeted a specific fix identified in Wave 1:

- Missing database indices on hot query paths
- N+1 query elimination in booking list endpoints
- Timeout configuration alignment across service boundaries
- Silent error swallowing replaced with structured logging
- Redis connection pool tuning (pool size, idle timeout, retry policy)
- Kafka offset commit handling and rebalance safety
- Health check endpoints for all services
- Graceful shutdown with in-flight request draining

### Wave 3 — Verification (41 tasks)

Automated verification that fixes compile and don't regress:

- GHC compile checks across all Haskell services
- `cargo clippy` + `cargo check` for all Rust services
- Error rate regression analysis against production baselines

### Wave 4 — Critical Bug Fixes (22 tasks)

Bugs found by Wave 1 that required immediate attention:

| Bug | Impact |
|---|---|
| Gupshup API credentials logged in error responses | **Credential leak in production logs** |
| Redis `HMGET` called with wrong argument count | Silent data corruption on cache reads |
| `PayoutConfig` JSON decode mismatch | Payout failures for specific merchant configs |
| Booking creation missing idempotency key check | Duplicate bookings under retry storms |
| Search timeout 3x higher than client-side timeout | **265% search failure rate** from client timeouts |
| Driver pool allocation race condition | Double-allocation of drivers during peak load |

### Wave 5 — Observability (13 tasks)

Infrastructure-level findings:

- **Cardinality explosion**: `eta-compute` metric responsible for 8.7M of 10.1M total series (86%). Single metric consuming majority of TSDB resources.
- Designed 7 Grafana dashboards (API latency, Kafka lag, Redis ops, DB pool, error budget, deployment, SLO)
- ClickHouse cluster: 3 of 5 nodes down — identified and documented recovery steps
- Kafka JMX exporter: all 4 brokers returning empty metrics — identified config issue

### Reports Produced

| Type | Count | Detail |
|---|---|---|
| Comprehensive audit reports | 11 | 743–1,192 lines each |
| Targeted findings with fix plans | 13 | Specific bugs with reproduction steps |
| Architecture roadmaps | 2 | Reliability and observability improvement plans |
| Incident playbooks | 3 | Runbooks for top recurring failure modes |
| SLO definitions | 1 | Proposed SLOs for all critical user journeys |

**Total output: ~30,000 lines of structured analysis, fixes, and documentation in one weekend.**

## The Overnight Pipeline Pattern

The most powerful pattern: a 3-stage pipeline that runs unattended.

```json
{
  "stages": [
    {
      "name": "Audit",
      "tasks": [
        {"file": "tasks-reliability-audit.json", "max_parallel": 10},
        {"file": "tasks-error-rca.json", "max_parallel": 10},
        {"file": "tasks-code-review.json", "max_parallel": 10}
      ]
    },
    {
      "name": "Fix",
      "tasks": [
        {"file": "tasks-fixes.json", "max_parallel": 5}
      ]
    },
    {
      "name": "Verify",
      "tasks": [
        {"file": "tasks-compile-check.json", "max_parallel": 10}
      ]
    }
  ]
}
```

```bash
# Friday evening
fleet-pipeline pipeline.json > /tmp/pipeline.log 2>&1 &

# Saturday morning: read the reports
ls logs/*/tasks-*.output.md
```

For maximum throughput, run multiple orchestrators simultaneously:

```bash
MAX_PARALLEL=10 fleet tasks-audit-batch1.json &
MAX_PARALLEL=10 fleet tasks-audit-batch2.json &
MAX_PARALLEL=10 fleet tasks-audit-batch3.json &
# 30 concurrent Claude sessions
```

## Getting Started

```bash
# Install
git clone https://github.com/nammayatri/claude-fleet.git
cd claude-fleet && ./install.sh

# Write your tasks
vim tasks.md

# Convert and run
fleet-convert tasks.md tasks.json
MAX_PARALLEL=10 fleet tasks.json

# Monitor
fleet-dashboard tasks.json
```

Task files are dead simple. This is a complete read-only audit task:

```markdown
## Audit Payment Module
- workdir: /path/to/your/repo
- model: opus
- effort: high
- allowedTools: Read Grep Glob Bash Agent

Review the payment module for error handling gaps, missing retries,
and silent failures. Produce a findings report with severity ratings.
```

## Why Open Source

Every team with a Claude Max subscription has unused parallel capacity. claude-fleet unlocks it with:

- **Zero infrastructure** — bash scripts, runs on your laptop
- **Any codebase, any language** — tasks are just prompts with a working directory
- **Granular tool control** — read-only audits can't modify code; fix tasks get write access
- **Simple enough to modify** — the orchestrator is ~200 lines of bash

The 403-task NammaYatri case study wasn't produced by a specialized platform. It was produced by six bash scripts and a Python dashboard. The leverage is in the orchestration pattern, not the tooling complexity.

**The gap between "Claude Code can do this" and "we actually did this across our entire platform" is just a task file and a `fleet` command.**

---

MIT License | [GitHub](https://github.com/nammayatri/claude-fleet)
