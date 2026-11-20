/**
 * EventFlow Layout: MobileNavigation Component
 * Responsive mobile drawer and bottom navigation bar
 */

import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Calendar,
  Layers,
  LayoutDashboard,
  Menu,
  QrCode,
  Sparkles,
  X,
} from 'lucide-react';
import { MAIN_NAV_ITEMS, SETTINGS_NAV_ITEM } from '@/lib/constants/index.ts';
import { cn } from '@/lib/utils/index.ts';
import type { Workspace } from '@/types/workspace.ts';

export interface MobileNavigationProps {
  currentWorkspace: Workspace | null;
  className?: string;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
  currentWorkspace,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Top App Bar */}
      <div className={cn('ef-mobile-topbar', className)}>
        <div className="ef-mobile-topbar__brand">
          <div className="ef-brand-icon-sm">
            <Sparkles size={16} />
          </div>
          <span className="ef-mobile-brand-title">EventFlow</span>
        </div>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="ef-mobile-menu-trigger"
          aria-label="Open mobile navigation drawer"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Slide-over Drawer Backdrop & Panel */}
      {isOpen && (
        <div className="ef-mobile-drawer-root" role="dialog" aria-modal="true">
          <div
            className="ef-mobile-drawer-backdrop"
            onClick={() => setIsOpen(false)}
          />
          <div className="ef-mobile-drawer">
            <div className="ef-mobile-drawer__header">
              <div className="ef-mobile-topbar__brand">
                <div className="ef-brand-icon-sm">
                  <Sparkles size={16} />
                </div>
                <span className="ef-mobile-brand-title">EventFlow</span>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="ef-mobile-drawer__close"
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>

            {currentWorkspace && (
              <div className="ef-mobile-drawer__workspace">
                <span className="ef-mobile-ws-label">Current Workspace</span>
                <span className="ef-mobile-ws-name">{currentWorkspace.name}</span>
              </div>
            )}

            <nav className="ef-mobile-drawer__nav">
              <ul className="ef-mobile-nav-list">
                {MAIN_NAV_ITEMS.map((item) => (
                  <li key={item.id}>
                    <NavLink
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) =>
                        cn(
                          'ef-mobile-nav-link',
                          isActive && 'ef-mobile-nav-link--active'
                        )
                      }
                    >
                      <span>{item.label}</span>
                    </NavLink>
                  </li>
                ))}
                <li>
                  <NavLink
                    to={SETTINGS_NAV_ITEM.path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        'ef-mobile-nav-link',
                        isActive && 'ef-mobile-nav-link--active'
                      )
                    }
                  >
                    <span>{SETTINGS_NAV_ITEM.label}</span>
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}

      {/* Bottom Quick-Action Dock for Mobile */}
      <nav className="ef-mobile-bottom-dock" aria-label="Quick Mobile Navigation">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            cn('ef-dock-item', isActive && 'ef-dock-item--active')
          }
        >
          <LayoutDashboard size={20} />
          <span>Overview</span>
        </NavLink>
        <NavLink
          to="/events"
          className={({ isActive }) =>
            cn('ef-dock-item', isActive && 'ef-dock-item--active')
          }
        >
          <Calendar size={20} />
          <span>Events</span>
        </NavLink>
        <NavLink
          to="/gates"
          className={({ isActive }) =>
            cn('ef-dock-item', isActive && 'ef-dock-item--active')
          }
        >
          <QrCode size={20} />
          <span>Gates</span>
        </NavLink>
        <NavLink
          to="/activities"
          className={({ isActive }) =>
            cn('ef-dock-item', isActive && 'ef-dock-item--active')
          }
        >
          <Layers size={20} />
          <span>Activities</span>
        </NavLink>
      </nav>

      <style>{`
        .ef-mobile-topbar {
          display: none;
          height: var(--header-height);
          background-color: var(--color-surface);
          border-bottom: 1px solid var(--color-border);
          padding: 0 var(--space-4);
          align-items: center;
          justify-content: space-between;
          position: sticky;
          top: 0;
          z-index: var(--z-header);
        }

        .ef-mobile-topbar__brand {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .ef-brand-icon-sm {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: var(--radius-sm);
          background-color: var(--color-primary);
          color: var(--color-primary-contrast);
        }

        .ef-mobile-brand-title {
          font-size: var(--text-base);
          font-weight: var(--font-weight-bold);
          color: var(--color-text);
        }

        .ef-mobile-menu-trigger {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: var(--radius-md);
          color: var(--color-text);
          background-color: var(--color-surface-subtle);
          border: 1px solid var(--color-border);
        }

        .ef-mobile-drawer-root {
          position: fixed;
          inset: 0;
          z-index: var(--z-overlay);
          display: flex;
        }

        .ef-mobile-drawer-backdrop {
          position: fixed;
          inset: 0;
          background-color: var(--color-surface-overlay);
          backdrop-filter: blur(4px);
        }

        .ef-mobile-drawer {
          position: relative;
          z-index: 1;
          width: 280px;
          max-width: 80vw;
          height: 100%;
          background-color: var(--color-surface);
          border-right: 1px solid var(--color-border);
          display: flex;
          flex-direction: column;
          box-shadow: var(--shadow-lg);
        }

        .ef-mobile-drawer__header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: var(--header-height);
          padding: 0 var(--space-4);
          border-bottom: 1px solid var(--color-border);
        }

        .ef-mobile-drawer__close {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          color: var(--color-text-muted);
          border-radius: var(--radius-sm);
        }

        .ef-mobile-drawer__workspace {
          padding: var(--space-4);
          background-color: var(--color-surface-subtle);
          border-bottom: 1px solid var(--color-border);
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .ef-mobile-ws-label {
          font-size: 10px;
          text-transform: uppercase;
          color: var(--color-text-muted);
          letter-spacing: var(--tracking-wider);
        }

        .ef-mobile-ws-name {
          font-size: var(--text-sm);
          font-weight: var(--font-weight-semibold);
          color: var(--color-text);
        }

        .ef-mobile-drawer__nav {
          flex: 1;
          overflow-y: auto;
          padding: var(--space-4);
        }

        .ef-mobile-nav-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .ef-mobile-nav-link {
          display: block;
          padding: 10px 14px;
          border-radius: var(--radius-md);
          color: var(--color-text-secondary);
          font-size: var(--text-sm);
          font-weight: var(--font-weight-medium);
        }

        .ef-mobile-nav-link--active {
          background-color: var(--color-primary);
          color: var(--color-primary-contrast);
        }

        .ef-mobile-bottom-dock {
          display: none;
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          height: var(--mobile-nav-height);
          background-color: var(--color-surface);
          border-top: 1px solid var(--color-border);
          z-index: var(--z-sticky);
          align-items: center;
          justify-content: space-around;
        }

        .ef-dock-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
          color: var(--color-text-muted);
          font-size: 10px;
          font-weight: var(--font-weight-medium);
          padding: 4px 12px;
          border-radius: var(--radius-sm);
        }

        .ef-dock-item--active {
          color: var(--color-primary);
        }

        @media (max-width: 768px) {
          .ef-mobile-topbar {
            display: flex;
          }
          .ef-mobile-bottom-dock {
            display: flex;
          }
        }
      `}</style>
    </>
  );
};
