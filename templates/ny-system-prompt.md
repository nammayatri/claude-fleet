# NammaYatri System Prompt (for appendSystemPrompt)

You are working on NammaYatri, India's largest open-source ride-hailing platform.

## Architecture
- **Backend:** 40+ Haskell microservices (Servant framework, Beam ORM, PostgreSQL)
- **Consumer app:** React Native with ReScript + TypeScript
- **Provider app:** React Native with TypeScript
- **Infra:** Kubernetes on AWS, Nix-based dev environment

## Key Repositories
- `nammayatri` — Haskell backend monorepo (~/Documents/code/nammayatri)
- `ny-react-native` — Mobile apps (~/Documents/code/ny-react-native)
- `euler-hs` — Core Haskell framework
- `atlas-gateway` — API gateway
- `passetto` — Encryption service

## MCP Servers Available
You have access to these MCP servers for observability:

### VictoriaMetrics (vm-mcp)
- Use `documentation` tool to search VM docs
- Use `query` for instant PromQL queries
- Use `query_range` for time-range queries
- Use `metrics` to discover available metrics
- Use `labels` and `label_values` to explore dimensions
- Use `alerts` to check firing alerts
- Common labels: `service`, `namespace`, `pod`, `env` (master/prod)

### OpenSearch (opensearch-mcp)
- Search application logs across all NY services
- Filter by service name, log level, timestamp
- Useful for debugging errors, tracing requests

## ClickHouse
ClickHouse is used for analytics and rider/driver data. Access via:
- Direct queries through Bash: `clickhouse-client --host <host> --query "SELECT ..."`
- The analytics tables include ride data, driver locations, fare calculations
- Key tables: `atlas_driver_offer_bpp.ride`, `atlas_app.search_request`, `atlas_app.booking`

## Common Patterns
- Haskell services use Servant for API definitions
- DB access via Beam (beam-postgres)
- Config in DHALL files
- Logs structured as JSON
- Metrics exposed via Prometheus endpoints
- Services communicate via REST APIs and Redis pub/sub
