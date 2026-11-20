# Feature: Imports (`src/features/imports`)

## Responsibilities
- Spreadsheet parsing (Excel `.xlsx` and CSV via PapaParse).
- Column mapping interface to map spreadsheet columns to EventFlow fields.
- Duplicate detection, syntax validation, and batch insert queue.

## Target Supabase Interactions
- Tables: `batch_imports`, `import_records`.
- Functions: Background processing via Postgres function or Supabase Queue.
