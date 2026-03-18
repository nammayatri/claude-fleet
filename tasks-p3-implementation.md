# P3 Non-Finance Module - Implementation Tasks
# MSIL Fleet Marketplace Platform (NammaYatri)
# Run: fleet-convert tasks-p3-implementation.md tasks-p3-implementation.json && fleet tasks-p3-implementation.json

## P3-01 MSIL Driver Directory - Backend
- workdir: /home/user/nammayatri
- model: opus
- effort: high
- allowedTools: Read Grep Glob Bash Edit Write Agent
- appendSystemPrompt: You are implementing the MSIL Driver Directory feature for the NammaYatri fleet marketplace. This is a Haskell backend using Servant + Beam ORM + PostgreSQL. The provider platform is at Backend/app/provider-platform/dynamic-offer-driver-app/. Read the implementation plan at /home/user/control-center/docs/p3-implementation-plans/driver-interface/01-msil-driver-directory.md before starting.

Implement the backend for "Option to join MSIL driver directory". Drivers should be able to opt-in to an MSIL driver directory, making their profile discoverable by fleet owners and admins.

Tasks:
1. Create the DriverDirectory domain type and Beam model (new table: driver_directory_entry)
2. Add API endpoints: POST /driver/directory/optIn, DELETE /driver/directory/optOut, GET /driver/directory/search
3. Create domain action handlers in Domain/Action/UI/DriverDirectory.hs
4. Add dashboard API for admin to view/search directory entries
5. Create necessary database migrations
6. Ensure proper access control and data validation

Follow existing patterns from DriverProfile.hs and FleetDriverAssociation.hs.

## P3-01 MSIL Driver Directory - Provider App
- workdir: /home/user/ny-react-native
- model: opus
- effort: high
- allowedTools: Read Grep Glob Bash Edit Write Agent
- appendSystemPrompt: You are implementing the MSIL Driver Directory UI for the NammaYatri provider app. This is a React Native + TypeScript app. Provider screens are at provider/src/screens/. Read the implementation plan at /home/user/control-center/docs/p3-implementation-plans/driver-interface/01-msil-driver-directory.md before starting.

Implement the provider app UI for "Option to join MSIL driver directory".

Tasks:
1. Create DriverDirectoryScreen in provider/src/screens/ProfileFlow/ or a new DriverDirectoryFlow/
2. Add opt-in/opt-out toggle on the driver profile
3. Create a directory profile editing screen (select skills, experience, availability)
4. Add navigation entries
5. Integrate with backend API endpoints
6. Follow existing screen patterns from ProfileFlow/

## P3-01 MSIL Driver Directory - Control Center
- workdir: /home/user/control-center
- model: opus
- effort: high
- allowedTools: Read Grep Glob Bash Edit Write Agent
- appendSystemPrompt: You are implementing the MSIL Driver Directory admin view for the NammaYatri control center. This is a React + TypeScript + Vite app with Radix UI. Modules at src/modules/. Read the implementation plan at /home/user/control-center/docs/p3-implementation-plans/driver-interface/01-msil-driver-directory.md before starting.

Implement the admin dashboard for viewing and managing the MSIL driver directory.

Tasks:
1. Create DriverDirectoryPage.tsx in src/modules/operations/
2. Add search and filter capabilities
3. Create DriverDirectoryDetailPage.tsx for individual driver profiles
4. Add navigation routes
5. Follow existing patterns from DriversPage.tsx and DriverDetailPage.tsx

## P3-02 Fuel Station Locator - Backend
- workdir: /home/user/nammayatri
- model: opus
- effort: high
- allowedTools: Read Grep Glob Bash Edit Write Agent
- appendSystemPrompt: You are implementing the Fuel Station Locator feature backend for NammaYatri. Haskell backend using Servant + Beam + PostgreSQL. Read the implementation plan at /home/user/control-center/docs/p3-implementation-plans/driver-interface/02-fuel-station-locator.md before starting.

Implement the backend for "Fuel Station Locator map".

Tasks:
1. Create FuelStation domain type and Beam model
2. Add API endpoints: GET /driver/fuelStations/nearby (lat, lon, radius params)
3. Integrate with external fuel station data API or seed data
4. Add caching layer for station data (Redis)
5. Create domain action handler in Domain/Action/UI/FuelStation.hs
6. Add admin API for managing fuel station data

## P3-02 Fuel Station Locator - Provider App
- workdir: /home/user/ny-react-native
- model: opus
- effort: high
- allowedTools: Read Grep Glob Bash Edit Write Agent
- appendSystemPrompt: You are implementing the Fuel Station Locator map UI for the NammaYatri provider app. React Native + TypeScript. Read the implementation plan at /home/user/control-center/docs/p3-implementation-plans/driver-interface/02-fuel-station-locator.md before starting.

Implement the provider app UI for "Fuel Station Locator map".

Tasks:
1. Create FuelStationLocatorScreen with map integration
2. Show markers for nearby fuel stations on map
3. Add fuel station detail cards (name, address, fuel types, prices if available)
4. Add navigation/directions to selected station
5. Integrate with backend API for nearby stations
6. Follow existing map patterns from HomeFlow/

## P3-03 Social Media Integration - Backend
- workdir: /home/user/nammayatri
- model: opus
- effort: high
- allowedTools: Read Grep Glob Bash Edit Write Agent
- appendSystemPrompt: You are implementing Social Media Integration backend for NammaYatri. Haskell + Servant + Beam. Read the implementation plan at /home/user/control-center/docs/p3-implementation-plans/driver-interface/03-social-media-integration.md before starting.

Implement the backend for "Social Media Integration".

Tasks:
1. Create ShareableContent domain type for generating shareable cards
2. Add API endpoints: GET /driver/share/milestones, GET /driver/share/referral, POST /driver/share/generate
3. Generate shareable image/content with driver stats (rides completed, rating, badges)
4. Track share events for analytics
5. Create domain action handler in Domain/Action/UI/SocialShare.hs

## P3-03 Social Media Integration - Provider App
- workdir: /home/user/ny-react-native
- model: opus
- effort: high
- allowedTools: Read Grep Glob Bash Edit Write Agent
- appendSystemPrompt: You are implementing Social Media Integration UI for the NammaYatri provider app. React Native + TypeScript. Read the implementation plan at /home/user/control-center/docs/p3-implementation-plans/driver-interface/03-social-media-integration.md before starting.

Implement the provider app UI for "Social Media Integration".

Tasks:
1. Create SocialShareScreen and share components
2. Add share buttons to milestone/achievement screens
3. Integrate with React Native Share API for WhatsApp, Facebook, Twitter, Instagram
4. Create shareable card templates with driver stats
5. Add referral code sharing flow
6. Follow patterns from BenefitsFlow/ screens

## P3-04 AI Voice Update - Backend
- workdir: /home/user/nammayatri
- model: opus
- effort: high
- allowedTools: Read Grep Glob Bash Edit Write Agent
- appendSystemPrompt: You are implementing AI Voice Update backend for NammaYatri. Haskell + Servant + Beam. Read the implementation plan at /home/user/control-center/docs/p3-implementation-plans/driver-interface/04-ai-voice-update.md before starting.

Implement the backend for "AI Voice update".

Tasks:
1. Create VoiceNotification domain type and configuration
2. Add API endpoints for voice preference settings: PUT /driver/voice/settings
3. Integrate with TTS service (Google Cloud TTS or similar)
4. Create context-aware notification content generator (ride requests, navigation, earnings summaries)
5. Add voice notification templates in multiple languages
6. Create domain action handler in Domain/Action/UI/VoiceNotification.hs

## P3-04 AI Voice Update - Provider App
- workdir: /home/user/ny-react-native
- model: opus
- effort: high
- allowedTools: Read Grep Glob Bash Edit Write Agent
- appendSystemPrompt: You are implementing AI Voice Update UI for the NammaYatri provider app. React Native + TypeScript. Read the implementation plan at /home/user/control-center/docs/p3-implementation-plans/driver-interface/04-ai-voice-update.md before starting.

Implement the provider app for "AI Voice update".

Tasks:
1. Create VoiceSettingsScreen for voice notification preferences
2. Integrate React Native TTS library for text-to-speech
3. Add voice notification triggers for ride requests, navigation updates, earnings
4. Create voice notification queue and playback system
5. Add language selection for voice
6. Settings integration in ProfileFlow/

## P3-05 Personal Details Capture - Backend
- workdir: /home/user/nammayatri
- model: opus
- effort: high
- allowedTools: Read Grep Glob Bash Edit Write Agent
- appendSystemPrompt: You are implementing Personal Details Capture backend for NammaYatri. Haskell + Servant + Beam. Read the implementation plan at /home/user/control-center/docs/p3-implementation-plans/driver-interface/05-personal-details-capture.md before starting.

Implement the backend for "Capturing personal details: Birthday, anniversary".

Tasks:
1. Extend Person/DriverProfile Beam model with birthday, anniversary fields
2. Add API endpoints: PUT /driver/profile/personalDetails
3. Create automated birthday/anniversary notification triggers
4. Add engagement event tracking
5. Modify existing profile domain actions in DriverProfile.hs
6. Create database migration for new columns

## P3-05 Personal Details Capture - Provider App
- workdir: /home/user/ny-react-native
- model: opus
- effort: high
- allowedTools: Read Grep Glob Bash Edit Write Agent
- appendSystemPrompt: You are implementing Personal Details Capture UI for the NammaYatri provider app. React Native + TypeScript. Read the implementation plan at /home/user/control-center/docs/p3-implementation-plans/driver-interface/05-personal-details-capture.md before starting.

Implement the provider app for "Capturing personal details: Birthday, anniversary".

Tasks:
1. Add birthday and anniversary date pickers to profile editing screen
2. Create PersonalDetailsSection component
3. Show birthday/anniversary celebration UI on special dates
4. Integrate with backend profile API
5. Modify existing ProfileFlow screens

## P3-06 Gamification - Backend
- workdir: /home/user/nammayatri
- model: opus
- effort: high
- allowedTools: Read Grep Glob Bash Edit Write Agent
- appendSystemPrompt: You are implementing Gamification backend for NammaYatri. Haskell + Servant + Beam. Read the implementation plan at /home/user/control-center/docs/p3-implementation-plans/driver-interface/06-gamification-lifetime-journey.md before starting.

Implement the backend for "Gamification feature with lifetime ride journey".

Tasks:
1. Create Gamification domain types: Badge, Level, Milestone, DriverAchievement
2. Create Beam models and database tables
3. Add API endpoints: GET /driver/gamification/profile, GET /driver/gamification/badges, GET /driver/gamification/milestones
4. Implement achievement unlock logic (ride count thresholds, rating achievements, streak tracking)
5. Create notification triggers for new badges/milestones
6. Consider existing DriverCoin.hs patterns for point systems

## P3-06 Gamification - Provider App
- workdir: /home/user/ny-react-native
- model: opus
- effort: high
- allowedTools: Read Grep Glob Bash Edit Write Agent
- appendSystemPrompt: You are implementing Gamification UI for the NammaYatri provider app. React Native + TypeScript. Read the implementation plan at /home/user/control-center/docs/p3-implementation-plans/driver-interface/06-gamification-lifetime-journey.md before starting.

Implement the provider app for "Gamification feature with lifetime ride journey".

Tasks:
1. Create GamificationScreen with lifetime ride journey visualization
2. Create BadgesScreen showing earned and available badges
3. Create MilestonesTimeline component
4. Add level/progress indicators
5. Create achievement unlock celebration animations
6. Integrate in BenefitsFlow/ or new GamificationFlow/

## P3-07 Earning Projector - Backend
- workdir: /home/user/nammayatri
- model: opus
- effort: high
- allowedTools: Read Grep Glob Bash Edit Write Agent
- appendSystemPrompt: You are implementing Real-time Earning Projector backend for NammaYatri. Haskell + Servant + Beam. Read the implementation plan at /home/user/control-center/docs/p3-implementation-plans/driver-interface/07-realtime-earning-projector.md before starting.

Implement the backend for "Real-time earning projector for day/week".

Tasks:
1. Create EarningProjection domain type
2. Add API endpoints: GET /driver/earnings/projection?period=day|week
3. Implement projection algorithm based on: historical earnings, current location demand, time patterns, day-of-week trends
4. Use ClickHouse analytics data for historical patterns
5. Create caching strategy for projections (Redis, 15-min TTL)
6. Add domain action handler in Domain/Action/UI/EarningProjection.hs

## P3-07 Earning Projector - Provider App
- workdir: /home/user/ny-react-native
- model: opus
- effort: high
- allowedTools: Read Grep Glob Bash Edit Write Agent
- appendSystemPrompt: You are implementing Real-time Earning Projector UI for the NammaYatri provider app. React Native + TypeScript. Read the implementation plan at /home/user/control-center/docs/p3-implementation-plans/driver-interface/07-realtime-earning-projector.md before starting.

Implement the provider app for "Real-time earning projector for day/week".

Tasks:
1. Create EarningProjectorWidget for the home screen
2. Create detailed EarningProjectionScreen with day/week toggle
3. Show projection as a range (min-max estimate)
4. Add progress indicator showing actual vs projected
5. Integrate in EarningsFlow/ screens
6. Add charts/graphs for earning trends

## P3-08 MSIL Workshops & Bodyshops - Backend
- workdir: /home/user/nammayatri
- model: opus
- effort: high
- allowedTools: Read Grep Glob Bash Edit Write Agent
- appendSystemPrompt: You are implementing MSIL Workshops & Bodyshops backend for NammaYatri. Haskell + Servant + Beam. Read the implementation plan at /home/user/control-center/docs/p3-implementation-plans/driver-interface/08-msil-workshops-bodyshops.md before starting.

Implement the backend for "Access of MSIL Workshops & Bodyshops".

Tasks:
1. Create Workshop/Bodyshop domain type and Beam model
2. Add API endpoints: GET /driver/msil/workshops/nearby, GET /driver/msil/workshops/{id}
3. Seed MSIL workshop/bodyshop data (location, services, contact, hours)
4. Add geolocation-based search with radius filtering
5. Create admin API for managing workshop data
6. Create domain action handler in Domain/Action/UI/MsilWorkshop.hs

## P3-08 MSIL Workshops & Bodyshops - Provider App
- workdir: /home/user/ny-react-native
- model: opus
- effort: high
- allowedTools: Read Grep Glob Bash Edit Write Agent
- appendSystemPrompt: You are implementing MSIL Workshops & Bodyshops UI for the NammaYatri provider app. React Native + TypeScript. Read the implementation plan at /home/user/control-center/docs/p3-implementation-plans/driver-interface/08-msil-workshops-bodyshops.md before starting.

Implement the provider app for "Access of MSIL Workshops & Bodyshops".

Tasks:
1. Create WorkshopLocatorScreen with map integration
2. Show MSIL workshop markers on map
3. Create workshop detail cards (name, services, distance, hours, contact)
4. Add navigation to selected workshop
5. Add workshop list view as alternative to map
6. Reuse map patterns from HomeFlow/

## P3-09 Operator Request Info - Backend
- workdir: /home/user/nammayatri
- model: opus
- effort: high
- allowedTools: Read Grep Glob Bash Edit Write Agent
- appendSystemPrompt: You are implementing Operator Request Additional Information backend for NammaYatri. Haskell + Servant + Beam. Read the implementation plan at /home/user/control-center/docs/p3-implementation-plans/operator-interface/01-request-additional-information.md before starting.

Implement the backend for operator "Request additional information" feature.

Tasks:
1. Create InformationRequest domain type and Beam model
2. Add API endpoints: POST /operator/request/{fleetOwnerId}/info, GET /operator/requests, PUT /operator/request/{id}/resolve
3. Add notification triggers to fleet owner when info is requested
4. Track request status (pending, responded, resolved)
5. Create domain action handler in Domain/Action/Dashboard/Operator/InformationRequest.hs
6. Follow existing Operator dashboard patterns

## P3-09 Operator Request Info - Control Center
- workdir: /home/user/control-center
- model: opus
- effort: high
- allowedTools: Read Grep Glob Bash Edit Write Agent
- appendSystemPrompt: You are implementing Operator Request Additional Information UI for NammaYatri control center. React + TypeScript + Vite + Radix UI. Read the implementation plan at /home/user/control-center/docs/p3-implementation-plans/operator-interface/01-request-additional-information.md before starting.

Implement the control center UI for operator "Request additional information".

Tasks:
1. Add "Request Info" button to FleetOwnerDetailPage or driver detail views
2. Create InformationRequestDialog with form fields
3. Create InformationRequestsPage listing all requests with status
4. Add notification/status tracking for responses
5. Follow existing patterns from operations module

## P3-10 Outstanding Payout View - Backend
- workdir: /home/user/nammayatri
- model: opus
- effort: high
- allowedTools: Read Grep Glob Bash Edit Write Agent
- appendSystemPrompt: You are implementing Operator Outstanding Payout View backend for NammaYatri. Haskell + Servant + Beam. Read the implementation plan at /home/user/control-center/docs/p3-implementation-plans/operator-interface/02-outstanding-payout-view.md before starting.

Implement the backend for "View total outstanding payout to operator".

Tasks:
1. Create OperatorPayoutSummary domain type
2. Add API endpoint: GET /operator/payouts/outstanding
3. Aggregate outstanding payout data from existing ride and payment tables
4. Add filtering by date range, fleet owner, status
5. Create domain action handler in Domain/Action/Dashboard/Operator/PayoutSummary.hs

## P3-10 Outstanding Payout - Control Center
- workdir: /home/user/control-center
- model: opus
- effort: high
- allowedTools: Read Grep Glob Bash Edit Write Agent
- appendSystemPrompt: You are implementing Operator Outstanding Payout View UI for NammaYatri control center. React + TypeScript + Vite + Radix UI. Read the implementation plan at /home/user/control-center/docs/p3-implementation-plans/operator-interface/02-outstanding-payout-view.md before starting.

Implement the control center UI for "View total outstanding payout to operator".

Tasks:
1. Create OperatorPayoutDashboard component
2. Show total outstanding payout with breakdown
3. Add date range and fleet owner filters
4. Create data table with sortable columns
5. Add export to CSV functionality
6. Follow existing patterns from PaymentsAdminPage.tsx

## P3-11 Total Received View - Backend
- workdir: /home/user/nammayatri
- model: opus
- effort: high
- allowedTools: Read Grep Glob Bash Edit Write Agent
- appendSystemPrompt: You are implementing Operator Total Received View backend for NammaYatri. Haskell + Servant + Beam. Read the implementation plan at /home/user/control-center/docs/p3-implementation-plans/operator-interface/03-total-received-view.md before starting.

Implement the backend for "View total amount received by operator till date".

Tasks:
1. Create OperatorEarningsSummary domain type
2. Add API endpoint: GET /operator/earnings/cumulative
3. Aggregate lifetime earnings from payment/payout tables
4. Include monthly/quarterly breakdown
5. Create domain action handler in Domain/Action/Dashboard/Operator/EarningsSummary.hs

## P3-11 Total Received - Control Center
- workdir: /home/user/control-center
- model: opus
- effort: high
- allowedTools: Read Grep Glob Bash Edit Write Agent
- appendSystemPrompt: You are implementing Operator Total Received View UI for NammaYatri control center. React + TypeScript + Vite + Radix UI. Read the implementation plan at /home/user/control-center/docs/p3-implementation-plans/operator-interface/03-total-received-view.md before starting.

Implement the control center UI for "View total amount received by operator till date".

Tasks:
1. Create OperatorEarningsPage with cumulative earnings display
2. Add monthly/quarterly charts using existing charting library
3. Add breakdown by fleet owner
4. Create earnings trend visualization
5. Add export functionality

## P3-12 Payment Invoices - Backend
- workdir: /home/user/nammayatri
- model: opus
- effort: high
- allowedTools: Read Grep Glob Bash Edit Write Agent
- appendSystemPrompt: You are implementing Payment Invoice Management backend for NammaYatri. Haskell + Servant + Beam. Read the implementation plan at /home/user/control-center/docs/p3-implementation-plans/operator-interface/04-payment-invoices.md before starting.

Implement the backend for "View, download & upload payment invoices".

Tasks:
1. Create Invoice domain type and Beam model (or extend existing FinanceInvoice)
2. Add API endpoints: GET /operator/invoices, GET /operator/invoices/{id}/download, POST /operator/invoices/upload
3. Implement PDF generation for invoices
4. Add S3 storage integration for uploaded invoices
5. Create domain action handlers
6. Check existing FinanceInvoice.hs patterns

## P3-12 Payment Invoices - Control Center
- workdir: /home/user/control-center
- model: opus
- effort: high
- allowedTools: Read Grep Glob Bash Edit Write Agent
- appendSystemPrompt: You are implementing Payment Invoice Management UI for NammaYatri control center. React + TypeScript + Vite + Radix UI. Read the implementation plan at /home/user/control-center/docs/p3-implementation-plans/operator-interface/04-payment-invoices.md before starting.

Implement the control center UI for "View, download & upload payment invoices".

Tasks:
1. Create InvoiceManagementPage in operator section
2. Add invoice list with search, filter, sort
3. Implement PDF download functionality
4. Create invoice upload dialog with drag-and-drop
5. Add invoice detail view
6. Follow patterns from existing InvoicesSearchPage.tsx and InvoiceDetailPage.tsx

## P3-13 Fleet Access Driver Directory - Backend
- workdir: /home/user/nammayatri
- model: opus
- effort: high
- allowedTools: Read Grep Glob Bash Edit Write Agent
- appendSystemPrompt: You are implementing Fleet Owner Access to Driver Directory backend for NammaYatri. Haskell + Servant + Beam. Read the implementation plan at /home/user/control-center/docs/p3-implementation-plans/fleet-owners/01-access-driver-directory.md before starting.

Implement the backend for fleet owners to "Access driver directory".

Tasks:
1. Add fleet-owner scoped API: GET /fleet/directory/search (depends on P3-01 driver directory)
2. Add driver contact/invite functionality: POST /fleet/directory/invite/{driverId}
3. Implement search filters (location, experience, vehicle type, availability)
4. Track fleet owner directory interactions for analytics
5. Create domain actions in Dashboard/Fleet/DriverDirectory.hs

## P3-13 Fleet Access Driver Directory - Control Center
- workdir: /home/user/control-center
- model: opus
- effort: high
- allowedTools: Read Grep Glob Bash Edit Write Agent
- appendSystemPrompt: You are implementing Fleet Owner Driver Directory access UI for NammaYatri control center. React + TypeScript + Vite + Radix UI. Read the implementation plan at /home/user/control-center/docs/p3-implementation-plans/fleet-owners/01-access-driver-directory.md before starting.

Implement the control center UI for fleet owners to "Access driver directory".

Tasks:
1. Create FleetDriverDirectoryPage accessible from fleet owner view
2. Add driver search with filters
3. Create driver profile cards
4. Add invite/contact driver action
5. Follow patterns from existing FleetOwnerDetailPage.tsx

## P3-14 Ride Value Distribution - Backend
- workdir: /home/user/nammayatri
- model: opus
- effort: high
- allowedTools: Read Grep Glob Bash Edit Write Agent
- appendSystemPrompt: You are implementing Ride Value Distribution backend for NammaYatri. Haskell + Servant + Beam. Read the implementation plan at /home/user/control-center/docs/p3-implementation-plans/fleet-owners/02-ride-value-distribution.md before starting.

Implement the backend for "Distribution of ride value for each driver".

Tasks:
1. Create RideValueDistribution domain type
2. Add API endpoint: GET /fleet/drivers/rideValueDistribution
3. Aggregate ride revenue per driver with breakdown (fare, commission, incentives)
4. Add date range filtering and sorting
5. Create domain action in Dashboard/Fleet/RideValueDistribution.hs

## P3-14 Ride Value Distribution - Control Center
- workdir: /home/user/control-center
- model: opus
- effort: high
- allowedTools: Read Grep Glob Bash Edit Write Agent
- appendSystemPrompt: You are implementing Ride Value Distribution UI for NammaYatri control center. React + TypeScript + Vite + Radix UI. Read the implementation plan at /home/user/control-center/docs/p3-implementation-plans/fleet-owners/02-ride-value-distribution.md before starting.

Implement the control center UI for "Distribution of ride value for each driver".

Tasks:
1. Create RideValueDistributionPage
2. Show per-driver earnings breakdown table
3. Add pie/bar chart visualization
4. Add date range filter and sort options
5. Add export to CSV
6. Integrate into fleet owner detail section

## P3-15 Training Feedback - Backend
- workdir: /home/user/nammayatri
- model: opus
- effort: high
- allowedTools: Read Grep Glob Bash Edit Write Agent
- appendSystemPrompt: You are implementing Training Module Feedback backend for NammaYatri. Haskell + Servant + Beam. Read the implementation plan at /home/user/control-center/docs/p3-implementation-plans/admin-interface/01-training-feedback-view.md before starting.

Implement the backend for admin to "View feedback on training modules".

Tasks:
1. Create TrainingFeedback domain type and Beam model
2. Add driver API: POST /driver/training/{moduleId}/feedback
3. Add admin API: GET /admin/training/feedback, GET /admin/training/{moduleId}/feedback/summary
4. Aggregate feedback statistics (ratings, completion rates, comments)
5. Create domain actions for both driver and dashboard sides

## P3-15 Training Feedback - Control Center
- workdir: /home/user/control-center
- model: opus
- effort: high
- allowedTools: Read Grep Glob Bash Edit Write Agent
- appendSystemPrompt: You are implementing Training Module Feedback admin UI for NammaYatri control center. React + TypeScript + Vite + Radix UI. Read the implementation plan at /home/user/control-center/docs/p3-implementation-plans/admin-interface/01-training-feedback-view.md before starting.

Implement the control center UI for "View feedback on training modules".

Tasks:
1. Create TrainingFeedbackPage in a knowledge-center or operations module
2. Show training module list with average ratings
3. Create feedback detail view with individual responses
4. Add charts for rating distributions
5. Add export functionality

## P3-16 Admin Driver Directory View - Backend
- workdir: /home/user/nammayatri
- model: opus
- effort: high
- allowedTools: Read Grep Glob Bash Edit Write Agent
- appendSystemPrompt: You are implementing Admin Driver Directory View backend for NammaYatri. Haskell + Servant + Beam. Read the implementation plan at /home/user/control-center/docs/p3-implementation-plans/admin-interface/02-driver-directory-view.md before starting.

Implement the backend for admin to "View individual drivers in driver directory".

Tasks:
1. Add admin API: GET /admin/directory/drivers, GET /admin/directory/drivers/{id}
2. Include detailed driver profile with directory metadata
3. Add admin actions: approve/suspend directory listing
4. Add filtering and pagination
5. Extend Dashboard/Driver/ domain actions (depends on P3-01 driver directory foundation)

## P3-16 Admin Driver Directory - Control Center
- workdir: /home/user/control-center
- model: opus
- effort: high
- allowedTools: Read Grep Glob Bash Edit Write Agent
- appendSystemPrompt: You are implementing Admin Driver Directory View UI for NammaYatri control center. React + TypeScript + Vite + Radix UI. Read the implementation plan at /home/user/control-center/docs/p3-implementation-plans/admin-interface/02-driver-directory-view.md before starting.

Implement the control center UI for "View individual drivers in driver directory".

Tasks:
1. Create AdminDriverDirectoryPage with search and filters
2. Create AdminDriverDirectoryDetailPage
3. Add approve/suspend actions
4. Show directory enrollment status and profile completeness
5. Follow patterns from DriversPage.tsx

## P3-17 Driver Directory KPIs - Backend
- workdir: /home/user/nammayatri
- model: opus
- effort: high
- allowedTools: Read Grep Glob Bash Edit Write Agent
- appendSystemPrompt: You are implementing Driver Directory KPIs backend for NammaYatri. Haskell + Servant + Beam. Read the implementation plan at /home/user/control-center/docs/p3-implementation-plans/admin-interface/03-driver-directory-kpis.md before starting.

Implement the backend for "KPIs to assess driver directory tool efficiency".

Tasks:
1. Create DirectoryKPI domain type
2. Add API endpoint: GET /admin/directory/kpis
3. Calculate KPIs: enrollment rate, search frequency, match rate (searches leading to contacts), time-to-hire, retention rate
4. Use ClickHouse for historical analytics queries
5. Add date range and city filtering
6. Create domain action in Dashboard/Driver/DirectoryKPIs.hs

## P3-17 Driver Directory KPIs - Control Center
- workdir: /home/user/control-center
- model: opus
- effort: high
- allowedTools: Read Grep Glob Bash Edit Write Agent
- appendSystemPrompt: You are implementing Driver Directory KPIs UI for NammaYatri control center. React + TypeScript + Vite + Radix UI. Read the implementation plan at /home/user/control-center/docs/p3-implementation-plans/admin-interface/03-driver-directory-kpis.md before starting.

Implement the control center UI for "KPIs to assess driver directory tool efficiency".

Tasks:
1. Create DriverDirectoryKPIsPage in analytics module
2. Create KPI cards (enrollment rate, search volume, match rate, etc.)
3. Add trend charts over time
4. Add city and date filters
5. Follow patterns from AnalyticsOverviewPage.tsx and ExecutiveMetricsPage.tsx

## P3-18 Ride Allocation Framework - Backend
- workdir: /home/user/nammayatri
- model: opus
- effort: high
- allowedTools: Read Grep Glob Bash Edit Write Agent
- appendSystemPrompt: You are implementing Ride Allocation Framework backend for NammaYatri. Haskell + Servant + Beam. Read the implementation plan at /home/user/control-center/docs/p3-implementation-plans/admin-interface/04-ride-allocation-framework.md before starting.

Implement the backend for "Ride allocation framework to fleet owners".

Tasks:
1. Create RideAllocationPolicy domain type and Beam model
2. Add admin API: POST /admin/rideAllocation/policy, GET /admin/rideAllocation/policies, PUT /admin/rideAllocation/policy/{id}
3. Implement allocation rules engine (fleet priority, driver availability, location proximity, fleet size weighting)
4. Integrate with existing ride allocation algorithm
5. Add policy versioning and audit trail
6. Create domain actions in Dashboard/Management/RideAllocation.hs

## P3-18 Ride Allocation Framework - Control Center
- workdir: /home/user/control-center
- model: opus
- effort: high
- allowedTools: Read Grep Glob Bash Edit Write Agent
- appendSystemPrompt: You are implementing Ride Allocation Framework admin UI for NammaYatri control center. React + TypeScript + Vite + Radix UI. Read the implementation plan at /home/user/control-center/docs/p3-implementation-plans/admin-interface/04-ride-allocation-framework.md before starting.

Implement the control center UI for "Ride allocation framework to fleet owners".

Tasks:
1. Create RideAllocationPoliciesPage
2. Create policy editor with rule builder (fleet priority, weights, conditions)
3. Add policy activation/deactivation toggle
4. Show policy simulation/preview
5. Add audit trail view
6. Follow patterns from config module for rule-based interfaces
