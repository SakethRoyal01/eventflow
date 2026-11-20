-- ============================================================================
-- EventFlow Database Schema Verification Tests
-- ============================================================================

do $$
begin
  -- 1. Verify core tables exist
  assert (select count(*) from information_schema.tables where table_name = 'workspaces') = 1,
    'Table workspaces does not exist';
  assert (select count(*) from information_schema.tables where table_name = 'workspace_members') = 1,
    'Table workspace_members does not exist';
  assert (select count(*) from information_schema.tables where table_name = 'events') = 1,
    'Table events does not exist';
  assert (select count(*) from information_schema.tables where table_name = 'registrations') = 1,
    'Table registrations does not exist';
  assert (select count(*) from information_schema.tables where table_name = 'qr_passes') = 1,
    'Table qr_passes does not exist';
  assert (select count(*) from information_schema.tables where table_name = 'gate_stations') = 1,
    'Table gate_stations does not exist';
  assert (select count(*) from information_schema.tables where table_name = 'gate_logs') = 1,
    'Table gate_logs does not exist';

  -- 2. Verify RLS is enabled
  assert (select relrowsecurity from pg_class where relname = 'workspaces') = true,
    'RLS is not enabled on workspaces';
  assert (select relrowsecurity from pg_class where relname = 'events') = true,
    'RLS is not enabled on events';

  raise notice 'All EventFlow database schema tests passed successfully.';
end $$;
