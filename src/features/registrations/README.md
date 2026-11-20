# Participant imports

This feature owns the frontend import pipeline for participant lists.

## GatePass-inspired workflow

1. Accept CSV, TSV, semicolon-delimited text, and pasted spreadsheet cells.
2. Detect whether a header row exists.
3. Infer participant name and contact columns from labels and sampled values.
4. Prefer phone/WhatsApp as the contact field when both phone and email exist.
5. Preview valid participants and report blank and duplicate rows before import.
6. De-duplicate using normalized name + contact. A shared phone number alone must not merge family members or teammates.

## Current implementation

- `lib/participant-import.ts` contains pure parsing, column analysis, preview, and CSV-export utilities.
- `pages/RegistrationsPage.tsx` provides a local preview UI for file upload and spreadsheet paste.
- The page enforces a 5 MB / 5,000-row preview limit and allows column remapping.
- It does not write to a database or issue passes.

## Backend phase requirements

- Revalidate every row server-side and enforce event-scoped access with RLS.
- Re-check duplicate identities in the database; browser-side duplicate detection is only a preview aid.
- Never trust participant IDs, pass tokens, or role claims supplied by the browser.
- Keep import file contents out of logs and audit metadata.
