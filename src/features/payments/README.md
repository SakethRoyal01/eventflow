# Feature: Payments (`src/features/payments`)

## Responsibilities
- Payment reconciliation dashboard for offline bank transfers, UPI receipts, and online gateways.
- Transaction verification queue with approve/reject workflow.
- Financial audit logs and invoice/receipt generation.

## Target Supabase Interactions
- Tables: `payments`, `payment_logs`.
- Functions: `verify-payment` Edge Function verifying incoming webhook signatures.
