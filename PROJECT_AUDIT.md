# EventFlow project audit and cleanup plan

Reviewed branch: `feature/gatepass-core-frontend`
Working branch: `cleanup/core-workflows`
Audit date: 2026-11-20

## Executive summary

The repository has a useful modular React/Vite foundation and a clear event-operations direction, but the current application is still a frontend preview. Several screens display sample data and present controls that imply real operations even though they do not persist anything. Supabase SQL and Edge Functions are scaffolding, not a working backend yet.

The cleanup should reduce the visible product to a small set of dependable workflows while preserving advanced modules in the codebase until their dependencies and real use cases are implemented. Do not delete database tables, migrations, or feature folders just because their UI is not ready.

## Keep in the first usable release

1. **Authentication and workspace access** — real sign-in, sign-out, session restore, workspace membership, and role checks.
2. **Overview** — trustworthy counts and recent activity derived from saved records, plus shortcuts to the core workflows.
3. **Events** — create, edit, publish/unpublish, archive, and select an event. This is the parent record for registrations and operations.
4. **Registrations / participant import** — CSV/TSV parsing, column mapping, duplicate review, preview, and an explicitly confirmed import with server-side validation.
5. **Participants** — searchable participant records, registration status, and pass status.
6. **Team** — invite members and assign a small, clear set of roles.
7. **Gate check-in** — retain as a core event-day workflow, but only expose scanning as operational once server-side token validation and duplicate protection are real.
8. **Basic settings** — workspace name, timezone, and profile/session controls.

## Defer from the primary navigation (do not delete yet)

- **Advanced analytics:** keep a basic event summary; defer funnels, heatmaps, historical comparisons, and PDF report builders until real data exists.
- **Standalone attendance dashboards:** derive attendance from gate logs first; avoid maintaining a second source of truth.
- **Activities / catering / meal redemptions:** defer until the core registration and check-in lifecycle is stable.
- **Payments / reconciliation:** defer gateway webhooks, refunds, and financial ledgers until a payment provider and verification policy are selected.
- **Multi-workspace administration and custom branding/domains:** retain the schema direction, but defer advanced workspace switching and white-label controls until single-workspace auth and access control work reliably.

## Confirmed problems in the reviewed code

- `LoginPage.tsx`: the email form does not authenticate. It only displays a message; the preview link bypasses auth and navigates to the dashboard.
- `AppLayout.tsx`: the header labels a link “Sign in” even when the user is already inside the app; it is not a sign-out action. Workspace and user details come from mock services.
- `useWorkspace.ts` and `useDashboardData.ts`: both use mock data. The dashboard hook duplicates its initial fetch logic, and its loading/error lifecycle is incomplete.
- `DashboardPage.tsx`: create-event and invite-member handlers only show alerts. The modal footer invokes handlers directly even though the handlers expect a form event and call `preventDefault()`; this can throw. The form inputs are not connected to a real persistence layer.
- `OperationsPage.tsx`: all listed modules share one generic sample-data table. The primary action only displays a “frontend preview” notice; export also only displays a notice. The status filter does not match every module's status vocabulary.
- `RegistrationsPage.tsx`: CSV/TSV parsing, mapping, duplicate preview, and CSV export are useful and should stay. The page explicitly does not save imported records or issue passes.
- `supabase/functions/submit-registration`, `validate-pass`, and `invite-member`: return generated or hard-coded demo responses; they do not call Supabase or persist/verify anything.
- `supabase/migrations/20260101000000_initial_schema.sql`: RLS is enabled, but the visible policies are incomplete for a functioning application. Several tables have no policies, and the schema does not yet provide a complete safe create/update/delete lifecycle. Review policies and ownership bootstrap before connecting the UI.
- `src/components/layout/Sidebar.tsx` and `AppLayout.tsx` represent two different navigation shells. The router currently uses `AppLayout`; the unused sidebar architecture should not be maintained as a second competing layout.
- `route-config.ts` describes future capabilities and Edge Functions that do not all exist. Treat these as roadmap metadata, not implemented functionality.

## Cleanup rules

- Remove dead/duplicate components only after confirming they are not imported by the active app.
- Keep one active navigation/layout implementation.
- Do not display fake metrics as if they were live. Label seed/demo data clearly or show honest empty states.
- A visible button must either complete a real action, navigate to a real screen, or be clearly disabled with an explanation. Never show a success toast for a mock action.
- Keep import preview/export local and functional; require an explicit confirmation before any future database import.
- Keep secrets out of `VITE_*` variables. Only the Supabase URL and publishable/anon key belong in the browser.
- Do not claim QR validation, payment verification, invitations, or attendance are secure until Edge Functions enforce authentication, authorization, validation, and atomic writes.
- Preserve the current visual direction unless a component is actively harming usability or accessibility.

## Recommended implementation order

### Phase 1 — Stabilize the frontend
- Keep the active routes limited to Overview, Events, Registrations, Participants, Team, Gate Check-in, and basic Settings.
- Remove duplicate/unused layout code after import verification.
- Fix broken form submission and keyboard/accessibility behavior.
- Make event selection explicit and scope all event-related screens to it.
- Replace dead buttons with working UI actions or honest disabled states.
- Keep the registration import preview and export.

### Phase 2 — Connect Supabase correctly
- Add a single typed Supabase client and environment validation.
- Implement Auth session handling, sign-in, sign-out, and protected routes.
- Add workspace creation/ownership bootstrap and membership reads.
- Complete RLS policies for every table and test cross-workspace isolation.
- Replace mock service calls with typed Supabase services; retain mocks only for tests/demo mode.

### Phase 3 — Deliver core workflows
- Events CRUD and lifecycle.
- Team invitations and role enforcement.
- Registration import with server-side duplicate checks and atomic pass issuance.
- Participant directory and pass lookup.
- Gate scanner backed by atomic, idempotent validation and gate logs.

### Phase 4 — Add advanced operations only when justified
- Payment provider integration and reconciliation.
- Food/activity allocation.
- Attendance reports and analytics.
- PDF exports, custom domains, and white-label settings.

## Local development and verification

From the project root:

```bash
npm install
npm run dev
```

Before pushing changes:

```bash
npm run lint
npm run build
```

Create `.env.local` from `.env.example` only after a Supabase project is ready. Set `VITE_SUPABASE_URL` and the publishable/anon key. Never put a service-role key or database password in a Vite client environment file.

## Important verification boundary

This audit was performed against the GitHub source tree and selected source files. A local dependency install, browser interaction test, lint run, and production build have not yet been executed in this environment. Do not treat this document as a passing test report.
