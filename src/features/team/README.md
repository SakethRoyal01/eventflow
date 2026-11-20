# Feature: Team (`src/features/team`)

## Responsibilities
- Staff and volunteer invitation management via tokenized email invites.
- Role-based access control assignments (`owner`, `organizer`, `coordinator`, `gate_staff`, `analyst`).
- Gate station pinning and coordinator shift scheduling.

## Target Supabase Interactions
- Tables: `workspace_members`, `role_permissions`.
- Functions: `invite-member` (Deno Edge Function with SMTP/Resend integration).
