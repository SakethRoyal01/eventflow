# Feature: Workspaces (`src/features/workspaces`)

## Responsibilities
- Multi-tenant workspace switching and hierarchy.
- Institution/Department profile configuration (e.g. university branding, logos, vanity slugs).
- Membership lifecycle and workspace quota controls (events limit, attendee limits).

## Target Supabase Interactions
- Tables: `workspaces`, `workspace_members`.
- Policies: Row-Level Security ensuring tenant data isolation by `workspace_id`.
