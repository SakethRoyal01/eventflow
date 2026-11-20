/**
 * EventFlow Hook: useWorkspace
 * Manages active workspace state and switcher
 */

import { useCallback, useEffect, useState } from 'react';
import { mockWorkspaceService } from '@/services/mock/workspace-service.ts';
import type { Workspace, WorkspaceMember } from '@/types/workspace.ts';

export interface UseWorkspaceReturn {
  currentWorkspace: Workspace | null;
  workspaces: Workspace[];
  currentUser: WorkspaceMember | null;
  isLoading: boolean;
  switchWorkspace: (workspaceId: string) => void;
}

export function useWorkspace(): UseWorkspaceReturn {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [currentWorkspace, setCurrentWorkspace] = useState<Workspace | null>(null);
  const [currentUser, setCurrentUser] = useState<WorkspaceMember | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadWorkspaces() {
      try {
        const [wsList, user] = await Promise.all([
          mockWorkspaceService.listWorkspaces(),
          mockWorkspaceService.getCurrentUser(),
        ]);
        if (mounted) {
          setWorkspaces(wsList);
          setCurrentWorkspace(wsList[0] ?? null);
          setCurrentUser(user);
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    loadWorkspaces();

    return () => {
      mounted = false;
    };
  }, []);

  const switchWorkspace = useCallback(
    (workspaceId: string) => {
      const found = workspaces.find((w) => w.id === workspaceId);
      if (found) {
        setCurrentWorkspace(found);
      }
    },
    [workspaces]
  );

  return {
    currentWorkspace,
    workspaces,
    currentUser,
    isLoading,
    switchWorkspace,
  };
}
