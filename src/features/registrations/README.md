# Feature: Registrations (`src/features/registrations`)

## Responsibilities
- Public registration form validation and submission.
- Custom field management (student ID, dietary preferences, department, t-shirt size).
- Batch registration approval and status workflow (`pending`, `confirmed`, `waitlisted`, `cancelled`).

## Target Supabase Interactions
- Tables: `registrations`, `registration_fields`.
- Functions: `submit-registration` (Edge Function generating pass tokens upon submission).
