# Feature: Gates (`src/features/gates`)

## Responsibilities
- Real-time optical QR code scanning interface (`@zxing/browser`).
- Multi-station gate synchronization (Gate 1 North, Gate 2 South, VIP Gate).
- Offline-first check-in queue with reconciliation upon network restoration.

## Target Supabase Interactions
- Tables: `gate_stations`, `gate_logs`.
- Functions: `validate-pass` (Deno Edge Function enforcing single-entry or multi-entry constraints).
