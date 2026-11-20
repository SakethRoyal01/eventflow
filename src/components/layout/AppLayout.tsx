/**
 * EventFlow Layout: AppLayout Shell
 * Master application layout embedding Sidebar, Header, Content, Mobile Navigation, and Grain Overlay
 */

import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar.tsx';
import { Header } from './Header.tsx';
import { MainContent } from './MainContent.tsx';
import { MobileNavigation } from './MobileNavigation.tsx';
import { useWorkspace } from '@/hooks/useWorkspace.ts';

export const AppLayout: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const { currentWorkspace, workspaces, switchWorkspace, currentUser } = useWorkspace();

  return (
    <div className="ef-app-shell">
      {/* Editorial Grain Overlay */}
      <div className="grain-layer" aria-hidden="true" />

      {/* Responsive Left Sidebar (Desktop / Tablet) */}
      <div className="ef-app-shell__sidebar-wrapper">
        <Sidebar
          currentWorkspace={currentWorkspace}
          workspaces={workspaces}
          onSelectWorkspace={(ws) => switchWorkspace(ws.id)}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed((prev) => !prev)}
        />
      </div>

      {/* Main Column */}
      <div className="ef-app-shell__main-wrapper">
        <MobileNavigation currentWorkspace={currentWorkspace} />
        <Header currentUser={currentUser} />
        <MainContent>
          <Outlet />
        </MainContent>
      </div>

      <style>{`
        .ef-app-shell {
          display: flex;
          min-height: 100vh;
          background-color: var(--color-background);
          position: relative;
        }

        .ef-app-shell__sidebar-wrapper {
          display: flex;
          flex-shrink: 0;
        }

        .ef-app-shell__main-wrapper {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-width: 0; /* Prevents flex overflow */
          min-height: 100vh;
        }

        @media (max-width: 768px) {
          .ef-app-shell__sidebar-wrapper {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};
