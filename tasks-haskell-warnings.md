# Remove Haskell Warnings in NammaYatri Backend

## Fix Warnings in Rider Platform
- workdir: /Users/ilamara/Documents/code/nammayatri
- model: opus
- effort: high
- allowedTools: Read Grep Glob Bash Edit Write Agent

Your goal is to find and fix all GHC warnings in the rider-platform Haskell code under `Backend/app/rider-platform/`.

Steps:
1. First, try building the rider-platform packages to see current warnings:
   ```
   cd Backend && cabal build rider-app 2>&1 | grep -i "warning" | head -100
   ```
   If cabal build is not available or takes too long, search for common warning patterns instead.

2. Search for and fix these common warning sources:
   - Unused imports: find imports that are not used and remove them
   - Unused variables/bindings: prefix with `_` or remove if dead code
   - Incomplete pattern matches: add missing cases
   - Redundant constraints: remove unnecessary typeclass constraints
   - Missing signatures: add type signatures where GHC complains
   - Shadowed bindings: rename shadowed variables
   - `-Wno-*` pragmas: check if the underlying issue can be fixed so the suppression can be removed

3. Search for `{-# OPTIONS_GHC -Wno-` pragmas in this directory — try to fix the root cause and remove the suppression where possible. Don't remove `-Wno-orphans` if actual orphan instances are needed.

4. Make sure not to change any logic — only fix warnings.

5. Create a git commit with your changes: `git add -A Backend/app/rider-platform && git commit -m "fix: remove GHC warnings in rider-platform"`

## Fix Warnings in Provider Platform (Driver App)
- workdir: /Users/ilamara/Documents/code/nammayatri
- model: opus
- effort: high
- allowedTools: Read Grep Glob Bash Edit Write Agent

Your goal is to find and fix all GHC warnings in the provider-platform (driver app) Haskell code under `Backend/app/provider-platform/`.

Steps:
1. First, try building to see current warnings:
   ```
   cd Backend && cabal build dynamic-offer-driver-app 2>&1 | grep -i "warning" | head -100
   ```
   If cabal build is not available or takes too long, search for common warning patterns instead.

2. Search for and fix these common warning sources:
   - Unused imports: find imports that are not used and remove them
   - Unused variables/bindings: prefix with `_` or remove if dead code
   - Incomplete pattern matches: add missing cases
   - Redundant constraints: remove unnecessary typeclass constraints
   - Missing signatures: add type signatures where GHC complains
   - Shadowed bindings: rename shadowed variables
   - `-Wno-*` pragmas: check if the underlying issue can be fixed so the suppression can be removed

3. Search for `{-# OPTIONS_GHC -Wno-` pragmas — try to fix the root cause and remove the suppression where possible. Don't remove `-Wno-orphans` if actual orphan instances are needed.

4. Make sure not to change any logic — only fix warnings.

5. Create a git commit with your changes: `git add -A Backend/app/provider-platform && git commit -m "fix: remove GHC warnings in provider-platform"`

## Fix Warnings in Dashboard Apps
- workdir: /Users/ilamara/Documents/code/nammayatri
- model: opus
- effort: high
- allowedTools: Read Grep Glob Bash Edit Write Agent

Your goal is to find and fix all GHC warnings in the dashboard Haskell code under `Backend/app/dashboard/`.

Steps:
1. Search for and fix these common warning sources:
   - Unused imports: find imports that are not used and remove them
   - Unused variables/bindings: prefix with `_` or remove if dead code
   - Incomplete pattern matches: add missing cases
   - Redundant constraints: remove unnecessary typeclass constraints
   - Shadowed bindings: rename shadowed variables
   - `-Wno-*` pragmas: check if the underlying issue can be fixed

2. Also check `Backend/app/unified-dashboard/` and `Backend/app/safety-dashboard/`.

3. Make sure not to change any logic — only fix warnings.

4. Create a git commit with your changes: `git add -A Backend/app/dashboard Backend/app/unified-dashboard Backend/app/safety-dashboard && git commit -m "fix: remove GHC warnings in dashboard apps"`

## Fix Warnings in Backend Libraries
- workdir: /Users/ilamara/Documents/code/nammayatri
- model: opus
- effort: high
- allowedTools: Read Grep Glob Bash Edit Write Agent

Your goal is to find and fix all GHC warnings in the shared libraries under `Backend/lib/`.

This includes: utils, shared-services, payment, scheduler, location-updates, beckn-services, beckn-spec, finance-kernel, producer, sessionizer-metrics, webhook, yudhishthira, dashcam, external, special-zone.

Steps:
1. Search for and fix these common warning sources across all libraries:
   - Unused imports: find imports that are not used and remove them
   - Unused variables/bindings: prefix with `_` or remove if dead code
   - Incomplete pattern matches: add missing cases
   - Redundant constraints: remove unnecessary typeclass constraints
   - Shadowed bindings: rename shadowed variables

2. Search for `{-# OPTIONS_GHC -Wno-` pragmas — try to fix the root cause and remove the suppression where possible. Don't remove `-Wno-orphans` if actual orphan instances are needed. Don't remove `-Wno-ambiguous-fields` if the code genuinely uses ambiguous field names from DuplicateRecordFields.

3. Make sure not to change any logic — only fix warnings.

4. Create a git commit with your changes: `git add -A Backend/lib && git commit -m "fix: remove GHC warnings in backend libraries"`

## Fix Warnings in Kafka Consumers and Other Apps
- workdir: /Users/ilamara/Documents/code/nammayatri
- model: opus
- effort: high
- allowedTools: Read Grep Glob Bash Edit Write Agent

Your goal is to find and fix all GHC warnings in the remaining Haskell apps under `Backend/app/` that are NOT rider-platform, provider-platform, or dashboard.

This includes: kafka-consumers, alchemist, sdk-event-pipeline, special-zone, beckn-cli, example-service, mocks.

Steps:
1. Search for and fix these common warning sources:
   - Unused imports: find imports that are not used and remove them
   - Unused variables/bindings: prefix with `_` or remove if dead code
   - Incomplete pattern matches: add missing cases
   - Redundant constraints: remove unnecessary typeclass constraints
   - Shadowed bindings: rename shadowed variables
   - `-Wno-*` pragmas: check if the underlying issue can be fixed

2. Also check `Backend/hunit-tests/` and `Backend/test/` for warnings.

3. Make sure not to change any logic — only fix warnings.

4. Create a git commit with your changes: `git add -A Backend/app/kafka-consumers Backend/app/alchemist Backend/app/sdk-event-pipeline Backend/app/special-zone Backend/app/beckn-cli Backend/app/example-service Backend/app/mocks Backend/hunit-tests Backend/test && git commit -m "fix: remove GHC warnings in remaining backend apps"`

## Fix Warnings in Shared Kernel
- workdir: /Users/ilamara/Documents/code/shared-kernel
- model: opus
- effort: high
- allowedTools: Read Grep Glob Bash Edit Write Agent

Your goal is to find and fix all GHC warnings in the shared-kernel repository. This is NammaYatri's core shared library (mobility-core).

Key directories:
- `lib/mobility-core/` — the main library
- `test-settlement-parser/` — test utilities
- `cli-tools/` — CLI tools

Steps:
1. Search for and fix these common warning sources:
   - Unused imports: find imports that are not used and remove them
   - Unused variables/bindings: prefix with `_` or remove if dead code
   - Incomplete pattern matches: add missing cases
   - Redundant constraints: remove unnecessary typeclass constraints
   - Shadowed bindings: rename shadowed variables
   - `-Wno-*` pragmas: check if the underlying issue can be fixed so the suppression can be removed

2. Note: files under `auto-generated/` directories may be generated code — still fix warnings there but be extra careful not to change logic.

3. Make sure not to change any logic — only fix warnings.

4. Create a git commit with your changes: `git add -A && git commit -m "fix: remove GHC warnings in shared-kernel"`

## Fix Warnings in Beckn Gateway
- workdir: /Users/ilamara/Documents/code/beckn-gateway
- model: opus
- effort: high
- allowedTools: Read Grep Glob Bash Edit Write Agent

Your goal is to find and fix all GHC warnings in the beckn-gateway repository. This includes the gateway app and mock-registry.

Steps:
1. Search for and fix these common warning sources across all Haskell files:
   - Unused imports: find imports that are not used and remove them
   - Unused variables/bindings: prefix with `_` or remove if dead code
   - Incomplete pattern matches: add missing cases
   - Redundant constraints: remove unnecessary typeclass constraints
   - Shadowed bindings: rename shadowed variables
   - `-Wno-*` pragmas: check if the underlying issue can be fixed

2. Make sure not to change any logic — only fix warnings.

3. Create a git commit with your changes: `git add -A && git commit -m "fix: remove GHC warnings in beckn-gateway"`

## Fix Warnings in JSON Logic HS
- workdir: /Users/ilamara/Documents/code/json-logic-hs
- model: sonnet
- effort: high
- allowedTools: Read Grep Glob Bash Edit Write Agent

Your goal is to find and fix all GHC warnings in the json-logic-hs library.

Steps:
1. Search for and fix these common warning sources:
   - Unused imports, unused variables/bindings, incomplete pattern matches
   - Redundant constraints, shadowed bindings
   - `-Wno-*` pragmas: check if the underlying issue can be fixed

2. Make sure not to change any logic — only fix warnings.

3. Create a git commit with your changes: `git add -A && git commit -m "fix: remove GHC warnings in json-logic-hs"`

## Fix Warnings in Anomaly Detection HS
- workdir: /Users/ilamara/Documents/code/anomaly-detection-hs
- model: sonnet
- effort: high
- allowedTools: Read Grep Glob Bash Edit Write Agent

Your goal is to find and fix all GHC warnings in the anomaly-detection-hs library.

Steps:
1. Search for and fix these common warning sources:
   - Unused imports, unused variables/bindings, incomplete pattern matches
   - Redundant constraints, shadowed bindings
   - `-Wno-*` pragmas: check if the underlying issue can be fixed

2. Make sure not to change any logic — only fix warnings.

3. Create a git commit with your changes: `git add -A && git commit -m "fix: remove GHC warnings in anomaly-detection-hs"`
