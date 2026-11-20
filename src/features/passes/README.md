# Feature: Passes (`src/features/passes`)

## Responsibilities
- Cryptographic QR pass generation (`qrcode` library) with encrypted payload tokens.
- Digital mobile pass display with anti-screenshot/timestamp verification cues.
- PDF batch pass export for lanyard badge printing.

## Target Supabase Interactions
- Tables: `qr_passes`.
- Security: HMAC-SHA256 signed validation tokens to prevent pass forgery.
