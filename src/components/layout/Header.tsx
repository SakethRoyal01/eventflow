/**
 * EventFlow Layout: Header Component
 * Fixed top bar with title, search, notifications, and profile
 */

import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Bell,
  LogOut,
  Moon,
  Search,
  User,
} from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar.tsx';
import { Dropdown } from '@/components/ui/Dropdown.tsx';
import { SearchBar } from '@/components/shared/SearchBar.tsx';
import { Modal } from '@/components/ui/Modal.tsx';
import { cn } from '@/lib/utils/index.ts';
import type { WorkspaceMember } from '@/types/workspace.ts';

export interface HeaderProps {
  currentUser: WorkspaceMember | null;
  onOpenMobileNav?: () => void;
  className?: string;
}

const ROUTE_TITLES: Record<string, string> = {
  '/dashboard': 'Overview',
  '/events': 'Events & Schedule',
  '/team': 'Team Members',
  '/registrations': 'Registrations',
  '/participants': 'Participants',
  '/payments': 'Payments & Verification',
  '/gates': 'Gates & QR Stations',
  '/attendance': 'Attendance Logs',
  '/activities': 'Activities & Food',
  '/analytics': 'Analytics & Reports',
  '/settings': 'Workspace Settings',
};

export const Header: React.FC<HeaderProps> = ({
  currentUser,
  className,
}) => {
  const location = useLocation();
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const currentTitle = ROUTE_TITLES[location.pathname] ?? 'EventFlow';

  // Listen for Cmd+K / Ctrl+K
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchModalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const userMenuItems = [
    {
      id: 'profile',
      label: 'Signed in as ' + (currentUser?.fullName ?? 'Organizer'),
      icon: <User size={15} />,
      disabled: true,
    },
    {
      id: 'theme',
      label: 'Dark Mode (Always Active)',
      icon: <Moon size={15} />,
      disabled: true,
    },
    {
      id: 'logout',
      label: 'Sign Out',
      icon: <LogOut size={15} />,
      danger: true,
      dividerBefore: true,
      onClick: () => {
        // Safe placeholder for future auth sign out
        alert('Signed out from workspace session');
      },
    },
  ];

  return (
    <header className={cn('ef-header', className)}>
      <div className="ef-header__left">
        <h2 className="ef-header__title">{currentTitle}</h2>
      </div>

      <div className="ef-header__center">
        <button
          type="button"
          onClick={() => setIsSearchModalOpen(true)}
          className="ef-header-search-trigger"
          aria-label="Open search dialog"
        >
          <Search size={15} className="ef-header-search-icon" />
          <span className="ef-header-search-text">Search events, tickets, gates...</span>
          <kbd className="ef-header-search-kbd">⌘K</kbd>
        </button>
      </div>

      <div className="ef-header__right">
        {/* Notifications button */}
        <button
          type="button"
          className="ef-header__action-btn"
          aria-label="Notifications"
          title="Notifications"
        >
          <Bell size={18} />
          <span className="ef-notif-indicator" />
        </button>

        {/* User profile dropdown */}
        <Dropdown
          align="right"
          trigger={
            <div className="ef-header-user">
              <Avatar
                name={currentUser?.fullName ?? 'Arthur Vance'}
                size="sm"
                status="online"
              />
              <div className="ef-header-user__meta">
                <span className="ef-header-user__name truncate">
                  {currentUser?.fullName ?? 'Dr. Arthur Vance'}
                </span>
                <span className="ef-header-user__role truncate">
                  {currentUser?.role ? `${currentUser.role.replace('_', ' ')}` : 'Lead Organizer'}
                </span>
              </div>
            </div>
          }
          items={userMenuItems}
        />
      </div>

      {/* Global Search Dialog Modal */}
      <Modal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        title="Search Workspace"
        description="Quickly jump to events, participants, gate stations, or reports."
        maxWidth="lg"
      >
        <div className="ef-search-modal-content">
          <SearchBar autoFocus placeholder="Type a keyword to jump to any event or pass..." />
          <div className="ef-search-modal-suggestions">
            <span className="ef-search-section-label">Suggested Jumps</span>
            <div className="ef-search-pills">
              <span className="ef-search-pill" onClick={() => setIsSearchModalOpen(false)}>
                AI & Autonomous Systems Conclave
              </span>
              <span className="ef-search-pill" onClick={() => setIsSearchModalOpen(false)}>
                CodeForge X Hackathon
              </span>
              <span className="ef-search-pill" onClick={() => setIsSearchModalOpen(false)}>
                Gate Station #1 (North Entrance)
              </span>
            </div>
          </div>
        </div>
      </Modal>

      <style>{`
        .ef-header {
          height: var(--header-height);
          background-color: var(--color-surface);
          border-bottom: 1px solid var(--color-border);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 var(--space-6);
          position: sticky;
          top: 0;
          z-index: var(--z-header);
        }

        .ef-header__left {
          display: flex;
          align-items: center;
          gap: var(--space-4);
        }

        .ef-header__title {
          font-size: var(--text-base);
          font-weight: var(--font-weight-semibold);
          color: var(--color-text);
          letter-spacing: var(--tracking-tight);
        }

        .ef-header__center {
          flex: 1;
          max-width: 440px;
          margin: 0 var(--space-4);
        }

        .ef-header-search-trigger {
          display: flex;
          align-items: center;
          width: 100%;
          height: 36px;
          padding: 0 12px;
          border-radius: var(--radius-md);
          background-color: var(--color-surface-subtle);
          border: 1px solid var(--color-border);
          color: var(--color-text-muted);
          font-size: var(--text-xs);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .ef-header-search-trigger:hover {
          border-color: var(--color-border-strong);
          background-color: var(--color-surface-hover);
          color: var(--color-text);
        }

        .ef-header-search-icon {
          margin-right: 8px;
          color: var(--color-text-muted);
        }

        .ef-header-search-text {
          flex: 1;
          text-align: left;
        }

        .ef-header-search-kbd {
          padding: 2px 6px;
          font-size: 10px;
          font-family: var(--font-mono);
          background-color: var(--color-surface-elevated);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-xs);
          color: var(--color-text-muted);
        }

        .ef-header__right {
          display: flex;
          align-items: center;
          gap: var(--space-4);
        }

        .ef-header__action-btn {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: var(--radius-md);
          background-color: var(--color-surface-subtle);
          border: 1px solid var(--color-border);
          color: var(--color-text-secondary);
          transition: all var(--transition-fast);
        }

        .ef-header__action-btn:hover {
          background-color: var(--color-surface-hover);
          color: var(--color-text);
          border-color: var(--color-border-strong);
        }

        .ef-notif-indicator {
          position: absolute;
          top: 8px;
          right: 8px;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: var(--color-accent); /* Turbo dot */
          box-shadow: 0 0 6px rgba(240, 225, 0, 0.6);
        }

        .ef-header-user {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 4px 8px;
          border-radius: var(--radius-md);
          transition: background-color var(--transition-fast);
        }

        .ef-header-user:hover {
          background-color: var(--color-surface-hover);
        }

        .ef-header-user__meta {
          display: flex;
          flex-direction: column;
          text-align: left;
        }

        .ef-header-user__name {
          font-size: var(--text-xs);
          font-weight: var(--font-weight-medium);
          color: var(--color-text);
          max-width: 140px;
        }

        .ef-header-user__role {
          font-size: 10px;
          color: var(--color-primary);
          text-transform: capitalize;
          letter-spacing: var(--tracking-wide);
        }

        .ef-search-modal-content {
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
        }

        .ef-search-modal-suggestions {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .ef-search-section-label {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: var(--tracking-wider);
          color: var(--color-text-muted);
        }

        .ef-search-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .ef-search-pill {
          font-size: var(--text-xs);
          padding: 6px 12px;
          background-color: var(--color-surface-subtle);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-full);
          color: var(--color-text-secondary);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .ef-search-pill:hover {
          background-color: var(--color-primary-subtle);
          color: var(--color-text);
          border-color: var(--color-primary-border);
        }

        @media (max-width: 768px) {
          .ef-header__center {
            display: none;
          }
          .ef-header-user__meta {
            display: none;
          }
        }
      `}</style>
    </header>
  );
};
