/**
 * EventFlow Role-Based Permissions
 */

export type Role =
  | 'owner'
  | 'organizer'
  | 'coordinator'
  | 'gate_staff'
  | 'analyst';

export type Permission =
  | 'workspace:manage'
  | 'workspace:delete'
  | 'team:invite'
  | 'team:manage'
  | 'events:create'
  | 'events:edit'
  | 'events:delete'
  | 'registrations:read'
  | 'registrations:import'
  | 'registrations:manage'
  | 'payments:verify'
  | 'gates:scan'
  | 'gates:manage'
  | 'attendance:view'
  | 'attendance:export'
  | 'analytics:view';

export const ROLE_PERMISSIONS: Record<Role, readonly Permission[]> = {
  owner: [
    'workspace:manage',
    'workspace:delete',
    'team:invite',
    'team:manage',
    'events:create',
    'events:edit',
    'events:delete',
    'registrations:read',
    'registrations:import',
    'registrations:manage',
    'payments:verify',
    'gates:scan',
    'gates:manage',
    'attendance:view',
    'attendance:export',
    'analytics:view',
  ],
  organizer: [
    'team:invite',
    'events:create',
    'events:edit',
    'registrations:read',
    'registrations:import',
    'registrations:manage',
    'payments:verify',
    'gates:scan',
    'gates:manage',
    'attendance:view',
    'attendance:export',
    'analytics:view',
  ],
  coordinator: [
    'events:edit',
    'registrations:read',
    'registrations:manage',
    'gates:scan',
    'attendance:view',
    'attendance:export',
  ],
  gate_staff: [
    'gates:scan',
    'attendance:view',
  ],
  analyst: [
    'registrations:read',
    'attendance:view',
    'attendance:export',
    'analytics:view',
  ],
} as const;

export function hasPermission(role: Role, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}

export interface UserSession {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  activeRole: Role;
}
