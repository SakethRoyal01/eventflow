-- ============================================================================
-- EventFlow Initial Development Seed Data
-- ============================================================================

-- 1. Create Default Workspace
insert into public.workspaces (id, name, slug, description, tier, owner_id)
values (
  'a0000000-0000-0000-0000-000000000001',
  'Apex Institute of Technology',
  'apex-institute',
  'Central events and conference administration workspace',
  'campus',
  'b0000000-0000-0000-0000-000000000001'
) on conflict (slug) do nothing;

-- 2. Add Workspace Owner
insert into public.workspace_members (workspace_id, user_id, email, full_name, role, title)
values (
  'a0000000-0000-0000-0000-000000000001',
  'b0000000-0000-0000-0000-000000000001',
  'a.vance@apex.edu',
  'Dr. Arthur Vance',
  'owner',
  'Director of University Events'
) on conflict (workspace_id, user_id) do nothing;

-- 3. Add Sample Events
insert into public.events (id, workspace_id, title, slug, description, status, visibility, start_date, end_date, venue, capacity, category, tags)
values (
  'c0000000-0000-0000-0000-000000000001',
  'a0000000-0000-0000-0000-000000000001',
  'AI & Autonomous Systems Conclave 2026',
  'ai-autonomous-systems-2026',
  'Flagship academic conference bringing together AI researchers, robotics labs, and industry leaders.',
  'published',
  'public',
  '2026-03-14 09:00:00+00',
  '2026-03-16 18:00:00+00',
  '{"name": "Main Auditorium & Hall B", "city": "San Francisco, CA"}'::jsonb,
  1000,
  'Technology & AI',
  array['AI', 'Robotics', 'Keynote']
) on conflict (workspace_id, slug) do nothing;

-- 4. Add Gate Stations
insert into public.gate_stations (id, event_id, name, location, is_active)
values (
  'd0000000-0000-0000-0000-000000000001',
  'c0000000-0000-0000-0000-000000000001',
  'Gate 1 (North Entrance)',
  'North Quad Plaza',
  true
),
(
  'd0000000-0000-0000-0000-000000000002',
  'c0000000-0000-0000-0000-000000000001',
  'Gate 2 (VIP & Media Access)',
  'Administration Rotunda',
  true
) on conflict (id) do nothing;
