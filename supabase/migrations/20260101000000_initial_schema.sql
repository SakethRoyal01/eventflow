-- ============================================================================
-- EventFlow Database Schema - Initial Migration
-- Production-ready multi-tenant schema with Row Level Security (RLS)
-- ============================================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ----------------------------------------------------------------------------
-- 1. WORKSPACES TABLE
-- ----------------------------------------------------------------------------
create table if not exists public.workspaces (
  id uuid primary key default uuid_generate_v4(),
  name text not null check (char_length(name) >= 2),
  slug text not null unique check (slug ~ '^[a-z0-9-]+$'),
  description text,
  avatar_url text,
  tier text not null default 'starter' check (tier in ('starter', 'pro', 'campus', 'enterprise')),
  owner_id uuid not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ----------------------------------------------------------------------------
-- 2. WORKSPACE MEMBERS TABLE (RBAC)
-- ----------------------------------------------------------------------------
create table if not exists public.workspace_members (
  id uuid primary key default uuid_generate_v4(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  user_id uuid not null,
  email text not null,
  full_name text not null,
  role text not null check (role in ('owner', 'organizer', 'coordinator', 'gate_staff', 'analyst')),
  title text,
  joined_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique (workspace_id, user_id)
);

-- ----------------------------------------------------------------------------
-- 3. EVENTS TABLE
-- ----------------------------------------------------------------------------
create table if not exists public.events (
  id uuid primary key default uuid_generate_v4(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  title text not null check (char_length(title) >= 3),
  slug text not null,
  description text,
  cover_image_url text,
  status text not null default 'draft' check (status in ('draft', 'published', 'in_progress', 'completed', 'cancelled')),
  visibility text not null default 'public' check (visibility in ('public', 'private', 'unlisted')),
  start_date timestamp with time zone not null,
  end_date timestamp with time zone not null,
  venue jsonb not null default '{}'::jsonb,
  capacity integer not null default 500 check (capacity > 0),
  category text not null default 'General',
  tags text[] default '{}'::text[],
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique (workspace_id, slug)
);

-- ----------------------------------------------------------------------------
-- 4. REGISTRATIONS TABLE
-- ----------------------------------------------------------------------------
create table if not exists public.registrations (
  id uuid primary key default uuid_generate_v4(),
  event_id uuid not null references public.events(id) on delete cascade,
  full_name text not null,
  email text not null,
  phone text,
  ticket_tier text not null default 'Standard',
  status text not null default 'confirmed' check (status in ('pending', 'confirmed', 'waitlisted', 'cancelled')),
  custom_fields jsonb default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique (event_id, email)
);

-- ----------------------------------------------------------------------------
-- 5. QR PASSES TABLE
-- ----------------------------------------------------------------------------
create table if not exists public.qr_passes (
  id uuid primary key default uuid_generate_v4(),
  registration_id uuid not null references public.registrations(id) on delete cascade unique,
  event_id uuid not null references public.events(id) on delete cascade,
  pass_token text not null unique,
  qr_code_data text not null,
  status text not null default 'active' check (status in ('active', 'revoked', 'expired')),
  issued_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ----------------------------------------------------------------------------
-- 6. GATE STATIONS TABLE
-- ----------------------------------------------------------------------------
create table if not exists public.gate_stations (
  id uuid primary key default uuid_generate_v4(),
  event_id uuid not null references public.events(id) on delete cascade,
  name text not null,
  location text,
  is_active boolean not null default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ----------------------------------------------------------------------------
-- 7. GATE LOGS (ATTENDANCE AUDIT TRAIL)
-- ----------------------------------------------------------------------------
create table if not exists public.gate_logs (
  id uuid primary key default uuid_generate_v4(),
  gate_station_id uuid not null references public.gate_stations(id) on delete cascade,
  event_id uuid not null references public.events(id) on delete cascade,
  pass_id uuid not null references public.qr_passes(id) on delete cascade,
  scanned_by uuid not null,
  scan_result text not null check (scan_result in ('granted', 'duplicate_entry', 'invalid_token', 'revoked')),
  scanned_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ----------------------------------------------------------------------------
-- 8. ACTIVITIES & WORKSHOPS
-- ----------------------------------------------------------------------------
create table if not exists public.activities (
  id uuid primary key default uuid_generate_v4(),
  event_id uuid not null references public.events(id) on delete cascade,
  title text not null,
  type text not null default 'workshop' check (type in ('keynote', 'workshop', 'breakout', 'food', 'social')),
  capacity integer check (capacity is null or capacity > 0),
  venue_room text,
  start_time timestamp with time zone not null,
  end_time timestamp with time zone not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ----------------------------------------------------------------------------
-- INDEXES FOR HIGH-THROUGHPUT LOOKUPS
-- ----------------------------------------------------------------------------
create index ifidx_events_workspace_id on public.events(workspace_id);
create index ifidx_events_status on public.events(status);
create index ifidx_registrations_event_id on public.registrations(event_id);
create index ifidx_registrations_email on public.registrations(email);
create index ifidx_qr_passes_token on public.qr_passes(pass_token);
create index ifidx_gate_logs_event_time on public.gate_logs(event_id, scanned_at);

-- ----------------------------------------------------------------------------
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ----------------------------------------------------------------------------
alter table public.workspaces enable row level security;
alter table public.workspace_members enable row level security;
alter table public.events enable row level security;
alter table public.registrations enable row level security;
alter table public.qr_passes enable row level security;
alter table public.gate_stations enable row level security;
alter table public.gate_logs enable row level security;
alter table public.activities enable row level security;

-- Workspace member read policy
create policy "Workspace members can view their workspace"
  on public.workspaces for select
  using (
    id in (
      select workspace_id from public.workspace_members
      where user_id = auth.uid()
    )
  );

-- Events viewable by workspace members or if published
create policy "Published events are viewable by public"
  on public.events for select
  using (
    status = 'published' or
    workspace_id in (
      select workspace_id from public.workspace_members
      where user_id = auth.uid()
    )
  );

-- Gate logs insertable by authorized gate staff
create policy "Gate staff can insert scan logs"
  on public.gate_logs for insert
  with check (
    event_id in (
      select e.id from public.events e
      join public.workspace_members wm on wm.workspace_id = e.workspace_id
      where wm.user_id = auth.uid()
      and wm.role in ('owner', 'organizer', 'coordinator', 'gate_staff')
    )
  );
