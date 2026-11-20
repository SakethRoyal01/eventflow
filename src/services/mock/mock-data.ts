/**
 * EventFlow Realistic Mock Data
 * Isolated from UI components for clean future Supabase client integration
 */

import type { Event } from '@/types/event.ts';
import type { Workspace, WorkspaceMember } from '@/types/workspace.ts';

export interface DashboardMetric {
  id: string;
  label: string;
  value: number | string;
  changePercent?: number;
  changeLabel?: string;
  trend?: 'up' | 'down' | 'neutral';
  format?: 'number' | 'currency' | 'percentage';
  subtext?: string;
}

export type ActivityType =
  | 'registration'
  | 'payment'
  | 'event_created'
  | 'member_invited'
  | 'gate_checkin';

export interface ActivityItem {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  actor: {
    name: string;
    email: string;
    avatarUrl?: string;
  };
  targetEvent?: string;
  timestamp: string;
  statusBadge?: {
    label: string;
    variant: 'primary' | 'accent' | 'success' | 'warning' | 'neutral';
  };
}

export const MOCK_WORKSPACES: Workspace[] = [
  {
    id: 'ws-apex-2026',
    name: 'Apex Institute of Technology',
    slug: 'apex-institute',
    description: 'Central events and conference administration workspace',
    tier: 'campus',
    ownerId: 'user-arthur-vance',
    memberCount: 18,
    eventCount: 14,
    createdAt: '2025-08-10T00:00:00.000Z',
    updatedAt: '2026-02-15T00:00:00.000Z',
  },
  {
    id: 'ws-dev-guild',
    name: 'Global Developers Guild',
    slug: 'global-dev-guild',
    description: 'Regional hackathons and tech meetups network',
    tier: 'pro',
    ownerId: 'user-arthur-vance',
    memberCount: 8,
    eventCount: 6,
    createdAt: '2025-11-01T00:00:00.000Z',
    updatedAt: '2026-01-20T00:00:00.000Z',
  },
  {
    id: 'ws-horizon-fest',
    name: 'Horizon Annual Cultural Fest',
    slug: 'horizon-fest',
    description: 'Inter-collegiate cultural arts and music fest',
    tier: 'campus',
    ownerId: 'user-elena-rostova',
    memberCount: 24,
    eventCount: 22,
    createdAt: '2025-09-12T00:00:00.000Z',
    updatedAt: '2026-02-01T00:00:00.000Z',
  },
];

export const MOCK_CURRENT_USER: WorkspaceMember = {
  id: 'member-arthur',
  workspaceId: 'ws-apex-2026',
  userId: 'user-arthur-vance',
  email: 'a.vance@apex.edu',
  fullName: 'Dr. Arthur Vance',
  role: 'owner',
  title: 'Director of University Events',
  createdAt: '2025-08-10T00:00:00.000Z',
  updatedAt: '2026-02-01T00:00:00.000Z',
};

export const MOCK_DASHBOARD_METRICS: DashboardMetric[] = [
  {
    id: 'total-events',
    label: 'Total Events',
    value: 14,
    changePercent: 16.7,
    changeLabel: 'vs last semester',
    trend: 'up',
    format: 'number',
    subtext: '4 active, 8 completed, 2 draft',
  },
  {
    id: 'active-events',
    label: 'Active Events',
    value: 4,
    changePercent: 33.3,
    changeLabel: 'new this month',
    trend: 'up',
    format: 'number',
    subtext: 'Registration open',
  },
  {
    id: 'total-registrations',
    label: 'Total Registrations',
    value: 3840,
    changePercent: 24.5,
    changeLabel: 'growth trajectory',
    trend: 'up',
    format: 'number',
    subtext: '92.4% pass generation rate',
  },
  {
    id: 'total-attendance',
    label: 'Total Attendance',
    value: 2910,
    changePercent: 75.8,
    changeLabel: 'check-in conversion',
    trend: 'up',
    format: 'number',
    subtext: 'Across 6 active gate stations',
  },
];

export const MOCK_UPCOMING_EVENTS: Event[] = [
  {
    id: 'evt-ai-robotics-2026',
    workspaceId: 'ws-apex-2026',
    title: 'AI & Autonomous Systems Conclave 2026',
    slug: 'ai-autonomous-systems-2026',
    description: 'Flagship academic conference bringing together AI researchers, robotics labs, and industry leaders.',
    status: 'published',
    visibility: 'public',
    category: 'Technology & AI',
    startDate: '2026-03-14T09:00:00.000Z',
    endDate: '2026-03-16T18:00:00.000Z',
    venue: {
      name: 'Main Auditorium & Hall B',
      address: 'North Quad Building, Apex Campus',
      city: 'San Francisco, CA',
    },
    metrics: {
      totalCapacity: 1000,
      registeredCount: 840,
      checkedInCount: 0,
      revenue: 42000,
      currency: 'USD',
    },
    organizerName: 'Faculty of Computing',
    tags: ['AI', 'Robotics', 'Keynote', 'Workshops'],
    createdAt: '2026-01-10T00:00:00.000Z',
    updatedAt: '2026-02-18T00:00:00.000Z',
  },
  {
    id: 'evt-codeforge-x',
    workspaceId: 'ws-apex-2026',
    title: 'CodeForge X: 36h Collegiate Hackathon',
    slug: 'codeforge-x-hackathon',
    description: 'High-intensity 36-hour hackathon tackling urban sustainability, fintech, and edge computing.',
    status: 'in_progress',
    visibility: 'public',
    category: 'Hackathon',
    startDate: '2026-03-22T08:00:00.000Z',
    endDate: '2026-03-23T20:00:00.000Z',
    venue: {
      name: 'Innovation Hub Labs 1-4',
      address: 'Engineering Annex, Apex Campus',
      city: 'San Francisco, CA',
    },
    metrics: {
      totalCapacity: 450,
      registeredCount: 450,
      checkedInCount: 412,
      revenue: 0,
      currency: 'USD',
    },
    organizerName: 'Student Developer Society',
    tags: ['Hackathon', 'Coding', 'OpenSource'],
    createdAt: '2026-01-15T00:00:00.000Z',
    updatedAt: '2026-02-19T00:00:00.000Z',
  },
  {
    id: 'evt-design-systems-symp',
    workspaceId: 'ws-apex-2026',
    title: 'Modern Design Systems & UX Symposium',
    slug: 'design-systems-ux-symposium',
    description: 'An editorial exploration into scalable tokens, motion guidelines, and accessible web experiences.',
    status: 'published',
    visibility: 'public',
    category: 'Design & UX',
    startDate: '2026-04-05T10:00:00.000Z',
    endDate: '2026-04-05T17:00:00.000Z',
    venue: {
      name: 'Amphitheatre Center',
      address: 'School of Arts & Media',
      city: 'San Francisco, CA',
    },
    metrics: {
      totalCapacity: 600,
      registeredCount: 310,
      checkedInCount: 0,
      revenue: 15500,
      currency: 'USD',
    },
    organizerName: 'Creative Technologies Dept',
    tags: ['Design', 'UI/UX', 'DesignSystems'],
    createdAt: '2026-01-28T00:00:00.000Z',
    updatedAt: '2026-02-14T00:00:00.000Z',
  },
  {
    id: 'evt-leadership-summit',
    workspaceId: 'ws-apex-2026',
    title: 'Executive Alumni Leadership Summit',
    slug: 'leadership-summit-2026',
    description: 'Annual gathering of department alumni, university benefactors, and graduating fellows.',
    status: 'draft',
    visibility: 'private',
    category: 'Networking',
    startDate: '2026-04-18T17:00:00.000Z',
    endDate: '2026-04-18T22:00:00.000Z',
    venue: {
      name: 'Founders Hall & Terrace',
      address: 'Administration Block',
      city: 'San Francisco, CA',
    },
    metrics: {
      totalCapacity: 250,
      registeredCount: 0,
      checkedInCount: 0,
      revenue: 0,
      currency: 'USD',
    },
    organizerName: 'Alumni Relations Office',
    tags: ['Leadership', 'Networking', 'Private'],
    createdAt: '2026-02-05T00:00:00.000Z',
    updatedAt: '2026-02-12T00:00:00.000Z',
  },
];

export const MOCK_RECENT_ACTIVITIES: ActivityItem[] = [
  {
    id: 'act-01',
    type: 'registration',
    title: 'New registration confirmed',
    description: 'Elena Rostova registered for AI & Autonomous Systems Conclave 2026',
    actor: {
      name: 'Elena Rostova',
      email: 'elena.rostova@mit.edu',
    },
    targetEvent: 'AI & Autonomous Systems Conclave 2026',
    timestamp: new Date(Date.now() - 4 * 60 * 1000).toISOString(),
    statusBadge: {
      label: 'Pass Issued',
      variant: 'success',
    },
  },
  {
    id: 'act-02',
    type: 'payment',
    title: 'Payment verified',
    description: 'Transaction #PAY-8921 confirmed for $120.00 (Standard Tier)',
    actor: {
      name: 'Marcus Chen',
      email: 'm.chen@stanford.edu',
    },
    targetEvent: 'AI & Autonomous Systems Conclave 2026',
    timestamp: new Date(Date.now() - 18 * 60 * 1000).toISOString(),
    statusBadge: {
      label: 'Verified',
      variant: 'accent',
    },
  },
  {
    id: 'act-03',
    type: 'gate_checkin',
    title: 'Gate #2 Check-in',
    description: 'Pass QR-4412 scanned and verified at North Entrance Gate',
    actor: {
      name: 'Gate Station Alpha',
      email: 'gate.alpha@apex.edu',
    },
    targetEvent: 'CodeForge X: 36h Collegiate Hackathon',
    timestamp: new Date(Date.now() - 42 * 60 * 1000).toISOString(),
    statusBadge: {
      label: 'Checked In',
      variant: 'primary',
    },
  },
  {
    id: 'act-04',
    type: 'event_created',
    title: 'Event draft updated to Published',
    description: 'Modern Design Systems & UX Symposium published for public registration',
    actor: {
      name: 'Dr. Arthur Vance',
      email: 'a.vance@apex.edu',
    },
    targetEvent: 'Modern Design Systems & UX Symposium',
    timestamp: new Date(Date.now() - 95 * 60 * 1000).toISOString(),
    statusBadge: {
      label: 'Published',
      variant: 'primary',
    },
  },
  {
    id: 'act-05',
    type: 'member_invited',
    title: 'Team coordinator joined',
    description: 'Sophia Sterling accepted invitation as Lead Gate Coordinator',
    actor: {
      name: 'Sophia Sterling',
      email: 'sophia.s@apex.edu',
    },
    timestamp: new Date(Date.now() - 180 * 60 * 1000).toISOString(),
    statusBadge: {
      label: 'Coordinator',
      variant: 'neutral',
    },
  },
];
