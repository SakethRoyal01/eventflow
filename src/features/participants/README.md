# Feature: Participants (`src/features/participants`)

## Responsibilities
- Searchable master registry of participants across workspace events.
- Participant profile inspector (registered events, attendance records, credentials).
- Resend pass email and SMS notifications.

## Target Supabase Interactions
- Tables: `participants`, `registrations`.
- Realtime: Subscriptions to pass generation and attendance status.
