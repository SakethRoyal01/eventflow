/**
 * EventFlow Core Constants & Navigation Definitions
 */

import type { Role } from '@/types/permissions.ts';

export const APP_CONFIG = {
  name: 'EventFlow',
  tagline: 'Multi-Event Management Platform',
  version: '1.0.0-foundation',
  supportEmail: 'support@eventflow.dev',
} as const;

export interface NavItem {
  id: string;
  label: string;
  path: string;
  iconName:
    | 'LayoutDashboard'
    | 'Calendar'
    | 'Users'
    | 'ClipboardList'
    | 'UserCheck'
    | 'CreditCard'
    | 'QrCode'
    | 'ShieldCheck'
    | 'Layers'
    | 'BarChart3'
    | 'Settings';
  requiredRole?: Role[];
  badge?: string | number;
}

export const MAIN_NAV_ITEMS: readonly NavItem[] = [
  {
    id: 'dashboard',
    label: 'Overview',
    path: '/dashboard',
    iconName: 'LayoutDashboard',
  },
  {
    id: 'events',
    label: 'Events',
    path: '/events',
    iconName: 'Calendar',
  },
  {
    id: 'team',
    label: 'Team',
    path: '/team',
    iconName: 'Users',
  },
  {
    id: 'registrations',
    label: 'Registrations',
    path: '/registrations',
    iconName: 'ClipboardList',
  },
  {
    id: 'participants',
    label: 'Participants',
    path: '/participants',
    iconName: 'UserCheck',
  },
  {
    id: 'payments',
    label: 'Payments',
    path: '/payments',
    iconName: 'CreditCard',
  },
  {
    id: 'gates',
    label: 'Gates',
    path: '/gates',
    iconName: 'QrCode',
  },
  {
    id: 'attendance',
    label: 'Attendance',
    path: '/attendance',
    iconName: 'ShieldCheck',
  },
  {
    id: 'activities',
    label: 'Activities',
    path: '/activities',
    iconName: 'Layers',
  },
  {
    id: 'analytics',
    label: 'Analytics',
    path: '/analytics',
    iconName: 'BarChart3',
  },
] as const;

export const SETTINGS_NAV_ITEM: NavItem = {
  id: 'settings',
  label: 'Settings',
  path: '/settings',
  iconName: 'Settings',
} as const;
