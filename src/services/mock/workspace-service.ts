/**
 * EventFlow Workspace Service (Mock Implementation)
 */

import { MOCK_CURRENT_USER, MOCK_WORKSPACES } from './mock-data.ts';
import type { Workspace, WorkspaceMember } from '@/types/workspace.ts';

export interface WorkspaceService {
  listWorkspaces: () => Promise<Workspace[]>;
  getWorkspaceById: (id: string) => Promise<Workspace | null>;
  getCurrentUser: () => Promise<WorkspaceMember>;
}

export const mockWorkspaceService: WorkspaceService = {
  async listWorkspaces(): Promise<Workspace[]> {
    return Promise.resolve(MOCK_WORKSPACES);
  },

  async getWorkspaceById(id: string): Promise<Workspace | null> {
    const ws = MOCK_WORKSPACES.find((w) => w.id === id);
    return Promise.resolve(ws ?? null);
  },

  async getCurrentUser(): Promise<WorkspaceMember> {
    return Promise.resolve(MOCK_CURRENT_USER);
  },
};
