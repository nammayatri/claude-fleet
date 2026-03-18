# P3 Financial Module — Parallel Implementation Tasks
# Run with: fleet tasks-p3-financial.md
# Each initiative gets multiple agents (backend, control-center, provider-app)
# Total: 24 agents across 8 initiatives × 3 repos

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# INITIATIVE 1: Subscription Plan Admin & Lifecycle Management
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## I1-Backend: Subscription Plan Admin - Backend Implementation
- workdir: /home/user/nammayatri
- model: opus
- effort: high
- allowedTools: Read Grep Glob Bash Edit Write Agent

Read the implementation plan at /home/user/control-center/docs/p3-financial-module-plans/01-subscription-plan-admin.md

Implement the backend changes for Initiative 1: Subscription Plan Admin & Lifecycle Management.

1. Extend SubscriptionConfig YAML spec in Backend/app/provider-platform/dynamic-offer-driver-app/Main/spec/Storage/ to add versioning fields (version, scheduledActivationDate, scheduledDeactivationDate, parentPlanId, benefits)
2. Create new Dashboard API module Domain.Action.Dashboard.SubscriptionPlan in Backend/app/provider-platform/dynamic-offer-driver-app/Main/src/Domain/Action/Dashboard/
3. Implement plan CRUD handlers: create, update (with versioning), deactivate, activate, analytics
4. Add dashboard API routes for subscription plan management
5. Run NammaDSL code generation if applicable
6. Follow existing patterns from other Dashboard modules (check existing Dashboard API modules for reference)
7. Ensure multi-tenancy (merchantId, cityId) is respected in all handlers

Reference existing code:
- Backend/app/provider-platform/dynamic-offer-driver-app/Main/spec/Storage/ for YAML spec patterns
- Backend/app/provider-platform/dynamic-offer-driver-app/Main/src/Domain/Action/Dashboard/ for dashboard API patterns
- Backend/lib/finance-kernel/ for financial entity patterns

## I1-ControlCenter: Subscription Plan Admin - Control Center UI
- workdir: /home/user/control-center
- model: opus
- effort: high
- allowedTools: Read Grep Glob Bash Edit Write Agent

Read the implementation plan at /home/user/control-center/docs/p3-financial-module-plans/01-subscription-plan-admin.md

Implement the control center UI for Initiative 1: Subscription Plan Admin.

1. Create src/modules/finances/subscription-plans/ directory with:
   - SubscriptionPlansPage.tsx — Main list view with filterable table (Active/Inactive status filter, search, date range)
   - CreatePlanDialog.tsx — Form for creating new plans (plan name, type, billing frequency, base amount, GST rate, payment mode, entity type, benefits)
   - EditPlanDialog.tsx — Edit form that creates new version (show version number, warn about active subscribers)
   - PlanDetailsSheet.tsx — Detailed view with subscriber count and revenue metrics
   - PlanAnalyticsCard.tsx — Metrics cards (total subscribers, active, revenue, churn)
   - columns.tsx — Table column definitions
2. Add API functions to src/services/subscription.ts: updatePlan(), getPlanAnalytics()
3. Add React Query hooks to src/hooks/ following useFinanceApi.ts patterns
4. Add routing in src/modules/finances/index.tsx
5. Follow AI_CODING_PRINCIPLES.md strictly (no `any`, DRY, config-driven, shadcn/Radix UI)
6. Use react-hook-form + zod for form validation

Reference existing code:
- src/modules/finances/SubscriptionsPage.tsx for UI patterns
- src/services/subscription.ts for existing API patterns
- src/modules/finances/ReconciliationPage.tsx for table + filter patterns
- AI_CODING_PRINCIPLES.md for coding standards

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# INITIATIVE 2: Settlement Dashboard & Management
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## I2-Backend: Settlement Dashboard - Backend Implementation
- workdir: /home/user/nammayatri
- model: opus
- effort: high
- allowedTools: Read Grep Glob Bash Edit Write Agent

Read the implementation plan at /home/user/control-center/docs/p3-financial-module-plans/02-settlement-dashboard.md

Implement the backend changes for Initiative 2: Settlement Dashboard.

1. Extend PgPaymentSettlementReport YAML spec in Backend/lib/finance-kernel/spec/Storage/ to add disputeStatus, chargebackAmount, reconciliationStatus fields
2. Create new Chargeback entity YAML spec with fields: settlementId, transactionId, reason, amount, status, evidenceUrl, responseDeadline
3. Create Domain.Action.Dashboard.Settlement module with handlers for settlement summary, settlement list, settlement details, chargeback list, chargeback respond, settlement trend
4. Add caching (Redis) for settlement summary aggregation (5-min TTL)
5. Run NammaDSL code generation
6. Follow finance-kernel patterns for entity definitions

## I2-ControlCenter: Settlement Dashboard - Control Center UI
- workdir: /home/user/control-center
- model: opus
- effort: high
- allowedTools: Read Grep Glob Bash Edit Write Agent

Read the implementation plan at /home/user/control-center/docs/p3-financial-module-plans/02-settlement-dashboard.md

Implement the control center UI for Initiative 2: Settlement Dashboard.

1. Create src/modules/finances/settlements/ directory with:
   - SettlementDashboard.tsx — Overview with summary cards (Total Settled, Pending, Failed, Disputed) + trend chart
   - SettlementListPage.tsx — Filterable table (date range, gateway, status, amount range, search by settlement/transaction/RRN/booking ID)
   - SettlementDetailsSheet.tsx — Drill-down with linked transactions
   - ChargebackListPage.tsx — Chargeback management with kanban-style board (Open → Evidence Submitted → Won/Lost)
   - ChargebackResponseDialog.tsx — Accept/reject with reason
   - SettlementTrendChart.tsx — Line chart for settlement trends
   - columns.tsx, types.ts
2. Add APIs to src/services/finance.ts: getSettlementSummary(), getSettlementDetails(), getChargebackList(), respondToChargeback(), getSettlementTrend()
3. Add hooks and routing
4. Follow ReconciliationPage.tsx patterns for consistency

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# INITIATIVE 3: Driver Payout Method Management
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## I3-Backend: Payout Method Management - Backend Implementation
- workdir: /home/user/nammayatri
- model: opus
- effort: high
- allowedTools: Read Grep Glob Bash Edit Write Agent

Read the implementation plan at /home/user/control-center/docs/p3-financial-module-plans/03-payout-method-management.md

Implement the backend changes for Initiative 3: Driver Payout Method Management.

1. Create PayoutMethod YAML spec: driverId, methodType (UPI_VPA, BANK_ACCOUNT), vpa, bankAccountNumber, ifscCode, bankName, beneficiaryName, isPrimary, verificationStatus, isBlocked
2. Create PayoutFeeConfig YAML spec: merchantId, methodType, payoutType (INSTANT, STANDARD), feePercentage, fixedFee, minFee, maxFee
3. Create PayoutLimit YAML spec: merchantId, dailyLimit, weeklyLimit, monthlyLimit, perTransactionMin, perTransactionMax
4. Create Domain.Action.UI.PayoutMethod module with driver-facing CRUD APIs (list, add, delete, setPrimary, verify, feeEstimate)
5. Create Domain.Action.Dashboard.PayoutConfig module for admin fee/limit configuration
6. Implement VPA validation integration point (stub for Juspay VPA validation)
7. Run NammaDSL code generation

## I3-ProviderApp: Payout Method Management - Provider App UI
- workdir: /home/user/ny-react-native
- model: opus
- effort: high
- allowedTools: Read Grep Glob Bash Edit Write Agent

Read the implementation plan at /home/user/control-center/docs/p3-financial-module-plans/03-payout-method-management.md

Implement the provider app changes for Initiative 3: Driver Payout Method Management.

1. Create provider/src/screens/EarningsFlow/PayoutMethods/ directory with:
   - PayoutMethodsScreen.tsx — List registered methods (UPI/Bank) with primary badge, verification status, delete button
   - AddPayoutMethodSheet.tsx — Bottom sheet with tabs for UPI VPA and Bank Account forms
   - VerifyMethodScreen.tsx — Verification flow showing status (PENDING, VERIFIED, FAILED)
   - PayoutMethodCard.tsx — Card component for each method
   - components/UpiForm.tsx — UPI VPA input with @handle validation
   - components/BankAccountForm.tsx — IFSC + account number with bank name auto-fill
2. Create provider/src/state/zustand/usePayoutMethodsState.ts — Zustand store for payout methods
3. Modify provider/src/screens/EarningsFlow/PrePaid/EarningBalance/View.tsx — Add "Manage Payout Methods" button
4. Modify provider/src/screens/EarningsFlow/PrePaid/EarningBalance/components/PayoutPopup.tsx — Replace hardcoded fee=0 with dynamic fee, add method selection dropdown
5. Follow existing screen patterns (check PostPaid/AutopayDetailsScreen for reference)

## I3-ControlCenter: Payout Config - Control Center UI
- workdir: /home/user/control-center
- model: opus
- effort: high
- allowedTools: Read Grep Glob Bash Edit Write Agent

Read the implementation plan at /home/user/control-center/docs/p3-financial-module-plans/03-payout-method-management.md

Implement the control center changes for Initiative 3.

1. Create src/modules/finances/payout-config/ with:
   - PayoutConfigPage.tsx — Fee configuration (UPI/Bank × Instant/Standard matrix) + limit management
   - DriverPayoutMethodsSheet.tsx — View/block driver's payout methods (accessible from driver detail)
2. Add APIs to src/services/finance.ts: getPayoutFeeConfig(), updatePayoutFeeConfig(), getPayoutLimits(), updatePayoutLimits(), getDriverPayoutMethods(), blockPayoutMethod()
3. Add hooks and routing

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# INITIATIVE 4: Financial Audit Trail & Compliance
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## I4-SharedKernel: Audit Types - Shared Kernel
- workdir: /home/user/shared-kernel
- model: opus
- effort: high
- allowedTools: Read Grep Glob Bash Edit Write Agent

Read the implementation plan at /home/user/control-center/docs/p3-financial-module-plans/04-financial-audit-trail.md

Implement shared kernel changes for Initiative 4: Financial Audit Trail.

1. Add new types in lib/mobility-core/src/Kernel/Types/: AuditEntityType, AuditAction, AuditActorType enums
2. Follow existing type patterns in the Kernel/Types/ directory
3. Ensure proper derivations (Show, Eq, Read, Generic, ToJSON, FromJSON, ToSchema, ToParamSchema)
4. Export from appropriate module hierarchy

## I4-Backend: Audit Trail - Backend Implementation
- workdir: /home/user/nammayatri
- model: opus
- effort: high
- allowedTools: Read Grep Glob Bash Edit Write Agent

Read the implementation plan at /home/user/control-center/docs/p3-financial-module-plans/04-financial-audit-trail.md

Implement the backend changes for Initiative 4: Financial Audit Trail.

1. Extend AuditEntry YAML spec in Backend/lib/finance-kernel/spec/Storage/Audit.yaml to add: previousState, newState, metadata, ipAddress, hashChain fields
2. Run NammaDSL code generation
3. Create withFinancialAudit middleware wrapper in Lib.Finance.Audit.Service
4. Create dashboard audit APIs in Domain.Action.Dashboard.FinancialAudit: list (paginated, filtered), details, summary, admin-actions, suspicious-activity, export
5. Retrofit audit capture to key financial operations: Invoice creation/status changes, LedgerEntry creation/reversals, Payout initiation/completion, Subscription purchase/cancel
6. Ensure audit entries are immutable (no UPDATE/DELETE queries generated)

## I4-ControlCenter: Audit Trail - Control Center UI
- workdir: /home/user/control-center
- model: opus
- effort: high
- allowedTools: Read Grep Glob Bash Edit Write Agent

Read the implementation plan at /home/user/control-center/docs/p3-financial-module-plans/04-financial-audit-trail.md

Implement the control center UI for Initiative 4: Financial Audit Trail.

1. Create src/modules/finances/audit/ directory with:
   - AuditLogPage.tsx — Timeline-style filterable audit log (entity type, action, actor type, date range, search)
   - AuditDetailsSheet.tsx — Expandable detail with state diff viewer
   - AuditSummaryPage.tsx — Monthly compliance summary with cards
   - AdminActionsPage.tsx — Admin-specific audit trail
   - StateDiffViewer.tsx — Side-by-side JSON diff component (highlight changes in green/red)
   - columns.tsx, types.ts
2. Add APIs to src/services/finance.ts: getAuditList(), getAuditDetails(), getAuditSummary(), getAdminActions(), exportAudit()
3. Add hooks and routing
4. Support CSV/PDF export for compliance

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# INITIATIVE 5: Financial Alerts & Notifications
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## I5-Backend: Financial Alerts - Backend Implementation
- workdir: /home/user/nammayatri
- model: opus
- effort: high
- allowedTools: Read Grep Glob Bash Edit Write Agent

Read the implementation plan at /home/user/control-center/docs/p3-financial-module-plans/05-financial-alerts-notifications.md

Implement the backend changes for Initiative 5: Financial Alerts & Notifications.

1. Create FinancialAlertRule YAML spec: merchantId, name, alertType (THRESHOLD, EVENT, ANOMALY), category (PAYOUT, SETTLEMENT, etc.), condition (JSON), severity, channels, cooldownMinutes, escalationMinutes
2. Create FinancialAlert YAML spec: ruleId, severity, title, message, status (OPEN, ACKNOWLEDGED, RESOLVED, ESCALATED), linkedEntityType/Id
3. Create DriverFinancialNotification YAML spec: driverId, category (PAYOUT_STATUS, SUBSCRIPTION_EXPIRY, LOW_BALANCE, etc.), title, message, isRead, deepLink
4. Run NammaDSL code generation
5. Implement admin alert rule CRUD APIs
6. Implement alert feed APIs (list, acknowledge, resolve, summary)
7. Implement driver notification APIs (feed, markRead, preferences)
8. Create background workers: financialAlertMonitor (every 5 min), alertEscalationWorker (every 15 min)
9. Create Kafka consumer for driver financial notification events

## I5-ControlCenter: Financial Alerts - Control Center UI
- workdir: /home/user/control-center
- model: opus
- effort: high
- allowedTools: Read Grep Glob Bash Edit Write Agent

Read the implementation plan at /home/user/control-center/docs/p3-financial-module-plans/05-financial-alerts-notifications.md

Implement the control center UI for Initiative 5: Financial Alerts.

1. Create src/modules/finances/alerts/ with:
   - AlertRulesPage.tsx — Alert rule CRUD with condition builder (threshold value, event selector, anomaly config)
   - CreateAlertRuleDialog.tsx — Form with severity, channels (email/slack/in-app), conditions
   - AlertFeedPage.tsx — Alert inbox with severity badges, acknowledge/resolve buttons
   - AlertDetailsSheet.tsx — Alert detail with linked entity navigation
   - AlertSummaryCards.tsx — Count by severity (INFO/WARNING/CRITICAL)
2. Create src/components/notifications/FinancialNotificationBell.tsx — Header notification bell with unread count badge
3. Add to DashboardLayout header
4. Add APIs, hooks, routing

## I5-ProviderApp: Driver Notifications - Provider App UI
- workdir: /home/user/ny-react-native
- model: opus
- effort: high
- allowedTools: Read Grep Glob Bash Edit Write Agent

Read the implementation plan at /home/user/control-center/docs/p3-financial-module-plans/05-financial-alerts-notifications.md

Implement the provider app changes for Initiative 5: Driver Financial Notifications.

1. Create provider/src/screens/EarningsFlow/Notifications/ with:
   - FinancialNotificationsScreen.tsx — Notification list grouped by date, with unread indicators
   - NotificationCard.tsx — Individual notification with icon by category, deep link navigation
   - NotificationPreferences.tsx — Toggle switches for each notification category
2. Create provider/src/state/zustand/useFinancialNotifications.ts — Store with unread count, notifications list
3. Modify EarningBalance/View.tsx — Add notification bell with unread badge
4. Modify CurrentPlanScreen/View.tsx — Show subscription expiry warning banner (3 days before)
5. Follow existing screen patterns and navigation

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# INITIATIVE 6: Configurable Penalty & Deduction Engine
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## I6-Backend: Penalty Engine - Backend Implementation
- workdir: /home/user/nammayatri
- model: opus
- effort: high
- allowedTools: Read Grep Glob Bash Edit Write Agent

Read the implementation plan at /home/user/control-center/docs/p3-financial-module-plans/06-penalty-deduction-engine.md

Implement the backend changes for Initiative 6: Configurable Penalty Engine.

1. Create PenaltyRule YAML spec: merchantId, cityId, name, triggerEvent, conditions (JSON), penaltyType (FIXED, PERCENTAGE, FORMULA), amounts, gracePeriodCount/Window, priority, isActive, startDate/endDate
2. Create PenaltyRecord YAML spec: driverId, ruleId, triggerEvent, triggerEntityId, amount, reason, disputeStatus, disputeReason/Evidence/ResolvedBy
3. Create DriverGracePeriodTracker YAML spec: driverId, ruleId, offenseCount, windowStart/End
4. Run NammaDSL code generation
5. Implement evaluateAndApplyPenalty engine function — evaluates rules, checks grace period, applies highest-priority match, creates LedgerEntry + Invoice
6. Integrate penalty evaluation into ride cancellation handler
7. Implement admin penalty rule CRUD APIs
8. Implement driver penalty history and dispute APIs
9. Create auto-close worker for undisputed penalties (48h deadline)

## I6-ControlCenter: Penalty Management - Control Center UI
- workdir: /home/user/control-center
- model: opus
- effort: high
- allowedTools: Read Grep Glob Bash Edit Write Agent

Read the implementation plan at /home/user/control-center/docs/p3-financial-module-plans/06-penalty-deduction-engine.md

Implement the control center UI for Initiative 6: Penalty Management.

1. Create src/modules/finances/penalties/ with:
   - PenaltyRulesPage.tsx — Rule CRUD with visual condition builder (trigger event, time windows, frequency thresholds, grace periods)
   - CreatePenaltyRuleDialog.tsx — Multi-step form (trigger → conditions → amount → grace period → scope)
   - PenaltyListPage.tsx — All penalties with dispute status badges
   - PenaltyDisputesPage.tsx — Dispute review queue with waive/reject actions
   - DisputeReviewDialog.tsx — Review dispute with evidence viewer, waive/reject buttons
   - PenaltyAnalyticsPage.tsx — Dashboard: total penalties, dispute rate, waiver rate, rule effectiveness
   - ConditionBuilder.tsx — Visual condition builder component
   - columns.tsx, types.ts
2. Add APIs, hooks, routing

## I6-ProviderApp: Penalty Visibility - Provider App UI
- workdir: /home/user/ny-react-native
- model: opus
- effort: high
- allowedTools: Read Grep Glob Bash Edit Write Agent

Read the implementation plan at /home/user/control-center/docs/p3-financial-module-plans/06-penalty-deduction-engine.md

Implement the provider app changes for Initiative 6: Penalty Visibility.

1. Create provider/src/screens/EarningsFlow/Penalties/ with:
   - PenaltyHistoryScreen.tsx — List of all penalties with date, amount, reason, dispute status
   - PenaltyDetailScreen.tsx — Full context: ride details, cancellation time, rule applied, dispute status
   - DisputeFormSheet.tsx — Bottom sheet with reason text input and optional evidence text
   - GracePeriodCard.tsx — Shows "X of Y free cancellations used this week"
2. Create provider/src/state/zustand/usePenaltyState.ts
3. Modify EarningBalance/View.tsx — Add "View Penalties" link in deductions section
4. Modify DueDetailsScreen.tsx — Add dispute button on penalty items, navigate to detail

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# INITIATIVE 7: Driver Financial Statement & Download
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## I7-Backend: Financial Statement - Backend Implementation
- workdir: /home/user/nammayatri
- model: opus
- effort: high
- allowedTools: Read Grep Glob Bash Edit Write Agent

Read the implementation plan at /home/user/control-center/docs/p3-financial-module-plans/07-driver-financial-statement.md

Implement the backend changes for Initiative 7: Driver Financial Statement.

1. Create DriverFinancialStatement YAML spec: driverId, merchantId, referenceNumber, periodType, periodStart/End, all financial aggregates (grossEarnings, platformFees, subscriptionCharges, incentives, penalties, tollReimbursements, gstCollected, tdsDeducted, netEarnings, totalPayouts, openingBalance, closingBalance), pdfUrl, verificationHash
2. Create StatementTemplate YAML spec: merchantId, logoUrl, headerText, footerText, disclaimerText
3. Run NammaDSL code generation
4. Implement generateDriverStatement service — aggregate from earnings, payouts, subscriptions, penalties, tolls, taxes APIs
5. Implement PDF generation (use existing invoice PDF patterns)
6. Implement verification API (public endpoint): given referenceNumber, validate hash
7. Implement driver APIs: list, generate, download, summary
8. Implement dashboard APIs: view driver statements, bulk generate, template config
9. Create monthly auto-generation background worker (1st of each month)

## I7-ProviderApp: Financial Statement - Provider App UI
- workdir: /home/user/ny-react-native
- model: opus
- effort: high
- allowedTools: Read Grep Glob Bash Edit Write Agent

Read the implementation plan at /home/user/control-center/docs/p3-financial-module-plans/07-driver-financial-statement.md

Implement the provider app changes for Initiative 7: Driver Financial Statement.

1. Create provider/src/screens/EarningsFlow/Statements/ with:
   - StatementsListScreen.tsx — List of available statements (monthly auto-generated + custom)
   - StatementSummaryScreen.tsx — View summary without downloading (key numbers: gross, net, payouts, tax)
   - GenerateStatementSheet.tsx — Bottom sheet with calendar date range picker
   - StatementCard.tsx — Card showing period, net earnings, download/share buttons
2. Modify EarningBalance/View.tsx — Add "Financial Statements" card/button
3. Implement PDF download using React Native file system (RNFS)
4. Implement share via React Native Share module (WhatsApp, email)
5. Show generation progress (may take seconds) with loading indicator

## I7-ControlCenter: Statement Admin - Control Center UI
- workdir: /home/user/control-center
- model: opus
- effort: high
- allowedTools: Read Grep Glob Bash Edit Write Agent

Read the implementation plan at /home/user/control-center/docs/p3-financial-module-plans/07-driver-financial-statement.md

Implement the control center changes for Initiative 7.

1. Create src/modules/finances/statements/ with:
   - DriverStatementsPage.tsx — Admin view: search by driver ID, list statements, download
   - BulkGenerateDialog.tsx — Trigger monthly bulk generation with progress
   - StatementTemplateConfig.tsx — Configure branding (logo URL, header/footer text, disclaimer)
   - StatementPreview.tsx — Preview template changes
2. Add APIs, hooks, routing

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# INITIATIVE 8: Toll Reimbursement Automation
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## I8-Backend: Toll Reimbursement - Backend Implementation
- workdir: /home/user/nammayatri
- model: opus
- effort: high
- allowedTools: Read Grep Glob Bash Edit Write Agent

Read the implementation plan at /home/user/control-center/docs/p3-financial-module-plans/08-toll-reimbursement.md

Implement the backend changes for Initiative 8: Toll Reimbursement Automation.

1. Create TollBooth YAML spec: name, location (LatLong), geofenceRadius, tollType (FIXED, DISTANCE_BASED, TIME_BASED), merchantOperatingCityId, isActive
2. Create TollRate YAML spec: tollBoothId, vehicleType, amount, effectiveFrom/To, isActive
3. Create TollReimbursement YAML spec: driverId, rideId, tollBoothId, amount, detectionMethod (GPS_GEOFENCE, FASTAG, MANUAL_CLAIM), reimbursementStatus (DETECTED, CREDITED, DISPUTED, REJECTED), ledgerEntryId, disputeReason/Evidence
4. Run NammaDSL code generation
5. Implement detectTollsForRide service — geofence-based toll detection using route GPS points
6. Integrate toll detection into ride completion handler
7. Implement automatic wallet credit on toll detection
8. Implement admin toll booth/rate CRUD APIs + CSV bulk import
9. Implement driver toll reimbursement list and manual claim APIs
10. Implement admin dispute review APIs

## I8-ControlCenter: Toll Management - Control Center UI
- workdir: /home/user/control-center
- model: opus
- effort: high
- allowedTools: Read Grep Glob Bash Edit Write Agent

Read the implementation plan at /home/user/control-center/docs/p3-financial-module-plans/08-toll-reimbursement.md

Implement the control center UI for Initiative 8: Toll Management.

1. Create src/modules/finances/tolls/ with:
   - TollBoothsPage.tsx — Toll booth list + map view with markers, add/edit/deactivate
   - CreateTollBoothDialog.tsx — Form with map picker for GPS coordinates and geofence radius
   - TollRatesPage.tsx — Matrix view (toll booth × vehicle type) for rate management
   - TollReimbursementsPage.tsx — Reimbursement history with ride links
   - TollDisputesPage.tsx — Manual claim review queue with evidence viewer
   - TollAnalyticsPage.tsx — Total reimbursements, detection accuracy, most frequent routes
   - BulkImportDialog.tsx — CSV upload for toll booth data
   - TollMapView.tsx — Map component (use existing map library if available, or leaflet/mapbox)
   - columns.tsx, types.ts
2. Add APIs, hooks, routing

## I8-ProviderApp: Toll Visibility - Provider App UI
- workdir: /home/user/ny-react-native
- model: opus
- effort: high
- allowedTools: Read Grep Glob Bash Edit Write Agent

Read the implementation plan at /home/user/control-center/docs/p3-financial-module-plans/08-toll-reimbursement.md

Implement the provider app changes for Initiative 8: Toll Visibility.

1. Create provider/src/screens/EarningsFlow/Tolls/ with:
   - TollHistoryScreen.tsx — List of toll reimbursements with status, amount, ride link
   - TollClaimSheet.tsx — Bottom sheet for manual toll claim (toll booth name autocomplete, amount input, receipt photo)
   - TollClaimCamera.tsx — Camera integration for receipt photo capture
   - TollReimbursementCard.tsx — Card component for each reimbursement
2. Create provider/src/state/zustand/useTollState.ts
3. Modify EarningBalance/View.tsx — Add toll reimbursement section in earnings breakdown
4. Modify EarningBreakDown.tsx — Show toll reimbursements as distinct addition line item
5. Push notification integration: "Toll of ₹X credited for ride on NH-48"
