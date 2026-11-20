# Feature: Events (`src/features/events`)

## Responsibilities
- Event creation wizard with multi-track scheduling and agenda management.
- Ticket tier configuration (pricing, quotas, public/private visibility).
- Venue mapping, room allocation, and banner imagery.
- Event lifecycle automation: `draft` -> `published` -> `in_progress` -> `completed`.

## Target Supabase Interactions
- Tables: `events`, `event_tracks`, `ticket_tiers`.
- Functions: `publish-event`, `archive-event`.
