# Feature: Attendance (`src/features/attendance`)

## Responsibilities
- Real-time attendee counter (current in-venue vs total registrations).
- Hourly entrance throughput velocity and peak arrival analytics.
- Gate station performance benchmarking and security audit trails.

## Target Supabase Interactions
- Tables: `gate_logs`, `attendance_summaries`.
- Realtime: Postgres change streams broadcasting check-in events to connected gate monitors.
