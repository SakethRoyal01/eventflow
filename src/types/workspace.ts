/**
 * EventFlow Workspace Types
 */

import type { BaseEntity, ID } from './common.ts';
import type { Role } from './permissions.ts';

export type WorkspaceTier = 'starter' | 'pro' | 'campus' | 'enterprise';

export interface Workspace extends BaseEntity {
  name: string;
  slug: string;
  description?: string;
  avatarUrl?: string;
  tier: WorkspaceTier;
  ownerId: ID;
  memberCount: number;
  eventCount: number;
}

export interface WorkspaceMember extends BaseEntity {
  workspaceId: ID;
  userId: ID;
  email: string;
  fullName: string;
  avatarUrl?: string;
  role: Role;
  title?: string;
  invitedBy?: ID;
  joinedAt?: string;
}

export interface WorkspaceContextValue {
  currentWorkspace: Workspace | null;
  workspaces: Workspace[];
  isLoading: boolean;
  switchWorkspace: (workspaceId: ID) => void;
}
