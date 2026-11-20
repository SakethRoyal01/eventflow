/**
 * EventFlow Layout: Sidebar Component
 * Collapsible left navigation shell strictly styled with design tokens
 */

import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  BarChart3,
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  CreditCard,
  Layers,
  LayoutDashboard,
  QrCode,
  Settings,
  ShieldCheck,
  Sparkles,
  UserCheck,
  Users,
} from 'lucide-react';
import { MAIN_NAV_ITEMS, SETTINGS_NAV_ITEM } from '@/lib/constants/index.ts';
import { cn } from '@/lib/utils/index.ts';
import type { Workspace } from '@/types/workspace.ts';

const ICON_MAP = {
  LayoutDashboard,
  Calendar,
  Users,
  ClipboardList,
  UserCheck,
  CreditCard,
  QrCode,
  ShieldCheck,
  Layers,
  BarChart3,
  Settings,
} as const;

export interface SidebarProps {
  currentWorkspace: Workspace | null;
  workspaces: Workspace[];
  onSelectWorkspace: (workspace: Workspace) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentWorkspace,
  workspaces,
  onSelectWorkspace,
  isCollapsed,
  onToggleCollapse,
  className,
}) => {
  const [isWorkspaceDropdownOpen, setIsWorkspaceDropdownOpen] = useState(false);

  return (
    <aside
      className={cn(
        'ef-sidebar',
        isCollapsed && 'ef-sidebar--collapsed',
        className
      )}
      aria-label="Sidebar Navigation"
    >
      {/* Brand Header */}
      <div className="ef-sidebar__brand">
        <div className="ef-brand-logo">
          <div className="ef-brand-icon">
            <Sparkles size={18} />
          </div>
          {!isCollapsed && (
            <div className="ef-brand-text">
              <span className="ef-brand-name">EventFlow</span>
              <span className="ef-brand-badge">PRO</span>
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={onToggleCollapse}
          className="ef-sidebar__collapse-btn"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
        </button>
      </div>

      {/* Workspace Selector */}
      <div className="ef-sidebar__workspace-wrapper">
        <button
          type="button"
          onClick={() => setIsWorkspaceDropdownOpen((prev) => !prev)}
          className={cn(
            'ef-workspace-btn',
            isWorkspaceDropdownOpen && 'ef-workspace-btn--open'
          )}
          title={currentWorkspace?.name ?? 'Select Workspace'}
        >
          <div className="ef-workspace-avatar">
            {currentWorkspace?.name ? currentWorkspace.name.slice(0, 2).toUpperCase() : 'EF'}
          </div>
          {!isCollapsed && (
            <div className="ef-workspace-info">
              <span className="ef-workspace-name truncate">
                {currentWorkspace?.name ?? 'Select Workspace'}
              </span>
              <span className="ef-workspace-tier">
                {currentWorkspace?.tier ? `${currentWorkspace.tier} plan` : 'Workspace'}
              </span>
            </div>
          )}
          {!isCollapsed && (
            <ChevronDown size={14} className="ef-workspace-chevron" />
          )}
        </button>

        {isWorkspaceDropdownOpen && (
          <div className="ef-workspace-menu">
            <div className="ef-workspace-menu__header">Workspaces</div>
            {workspaces.map((ws) => (
              <button
                key={ws.id}
                type="button"
                className={cn(
                  'ef-workspace-menu__item',
                  ws.id === currentWorkspace?.id && 'ef-workspace-menu__item--active'
                )}
                onClick={() => {
                  onSelectWorkspace(ws);
                  setIsWorkspaceDropdownOpen(false);
                }}
              >
                <div className="ef-workspace-menu__avatar">
                  {ws.name.slice(0, 2).toUpperCase()}
                </div>
                <div className="ef-workspace-menu__details">
                  <span className="ef-workspace-menu__name truncate">{ws.name}</span>
                  <span className="ef-workspace-menu__events">{ws.eventCount} events</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Navigation Links */}
      <nav className="ef-sidebar__nav">
        <ul className="ef-nav-list">
          {MAIN_NAV_ITEMS.map((item) => {
            const IconComponent = ICON_MAP[item.iconName] ?? LayoutDashboard;
            return (
              <li key={item.id} className="ef-nav-item">
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    cn(
                      'ef-nav-link',
                      isActive && 'ef-nav-link--active'
                    )
                  }
                  title={isCollapsed ? item.label : undefined}
                >
                  <span className="ef-nav-icon">
                    <IconComponent size={18} />
                  </span>
                  {!isCollapsed && (
                    <span className="ef-nav-label">{item.label}</span>
                  )}
                  {!isCollapsed && item.badge && (
                    <span className="ef-nav-badge">{item.badge}</span>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom Settings Navigation */}
      <div className="ef-sidebar__footer">
        <NavLink
          to={SETTINGS_NAV_ITEM.path}
          className={({ isActive }) =>
            cn(
              'ef-nav-link',
              'ef-nav-link--footer',
              isActive && 'ef-nav-link--active'
            )
          }
          title={isCollapsed ? SETTINGS_NAV_ITEM.label : undefined}
        >
          <span className="ef-nav-icon">
            <Settings size={18} />
          </span>
          {!isCollapsed && (
            <span className="ef-nav-label">{SETTINGS_NAV_ITEM.label}</span>
          )}
        </NavLink>
      </div>

      <style>{`
        .ef-sidebar {
          width: var(--sidebar-width);
          min-width: var(--sidebar-width);
          height: 100vh;
          background-color: var(--color-surface);
          border-right: 1px solid var(--color-border);
          display: flex;
          flex-direction: column;
          position: sticky;
          top: 0;
          z-index: var(--z-sidebar);
          transition: width var(--transition-normal), min-width var(--transition-normal);
          user-select: none;
        }

        .ef-sidebar--collapsed {
          width: var(--sidebar-collapsed-width);
          min-width: var(--sidebar-collapsed-width);
        }

        .ef-sidebar__brand {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: var(--header-height);
          padding: 0 var(--space-4);
          border-bottom: 1px solid var(--color-border);
        }

        .ef-brand-logo {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .ef-brand-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: var(--radius-md);
          background-color: var(--color-primary);
          color: var(--color-primary-contrast);
          box-shadow: 0 0 16px rgba(131, 77, 251, 0.4);
          flex-shrink: 0;
        }

        .ef-brand-text {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .ef-brand-name {
          font-size: var(--text-base);
          font-weight: var(--font-weight-bold);
          color: var(--color-text);
          letter-spacing: var(--tracking-tight);
        }

        .ef-brand-badge {
          font-size: 10px;
          font-weight: var(--font-weight-bold);
          color: var(--color-accent-contrast);
          background-color: var(--color-accent); /* Turbo */
          padding: 1px 5px;
          border-radius: var(--radius-xs);
          line-height: 1.2;
        }

        .ef-sidebar__collapse-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          border-radius: var(--radius-sm);
          color: var(--color-text-muted);
          background: transparent;
          transition: all var(--transition-fast);
        }

        .ef-sidebar__collapse-btn:hover {
          background-color: var(--color-surface-hover);
          color: var(--color-text);
        }

        .ef-sidebar--collapsed .ef-sidebar__brand {
          justify-content: center;
          padding: 0;
        }

        .ef-sidebar--collapsed .ef-sidebar__collapse-btn {
          position: absolute;
          right: -12px;
          top: 20px;
          background-color: var(--color-surface-elevated);
          border: 1px solid var(--color-border-strong);
          border-radius: 50%;
          box-shadow: var(--shadow-sm);
        }

        /* Workspace selector */
        .ef-sidebar__workspace-wrapper {
          position: relative;
          padding: var(--space-3) var(--space-3);
          border-bottom: 1px solid var(--color-border-subtle);
        }

        .ef-workspace-btn {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 10px;
          border-radius: var(--radius-md);
          background-color: var(--color-surface-subtle);
          border: 1px solid var(--color-border);
          transition: all var(--transition-fast);
          text-align: left;
        }

        .ef-workspace-btn:hover,
        .ef-workspace-btn--open {
          border-color: var(--color-border-strong);
          background-color: var(--color-surface-hover);
        }

        .ef-workspace-avatar {
          width: 28px;
          height: 28px;
          border-radius: var(--radius-sm);
          background-color: var(--color-surface-elevated);
          color: var(--color-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: var(--font-weight-bold);
          border: 1px solid var(--color-border);
          flex-shrink: 0;
        }

        .ef-workspace-info {
          display: flex;
          flex-direction: column;
          overflow: hidden;
          flex: 1;
        }

        .ef-workspace-name {
          font-size: var(--text-xs);
          font-weight: var(--font-weight-semibold);
          color: var(--color-text);
        }

        .ef-workspace-tier {
          font-size: 10px;
          color: var(--color-text-muted);
          text-transform: capitalize;
        }

        .ef-workspace-chevron {
          color: var(--color-text-muted);
          flex-shrink: 0;
        }

        .ef-workspace-menu {
          position: absolute;
          top: calc(100% + 4px);
          left: 12px;
          right: 12px;
          background-color: var(--color-surface-elevated);
          border: 1px solid var(--color-border-strong);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-lg);
          padding: 6px;
          z-index: var(--z-dropdown);
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .ef-workspace-menu__header {
          padding: 6px 8px;
          font-size: 10px;
          font-weight: var(--font-weight-semibold);
          text-transform: uppercase;
          color: var(--color-text-muted);
          letter-spacing: var(--tracking-wider);
        }

        .ef-workspace-menu__item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 6px 8px;
          border-radius: var(--radius-sm);
          background: transparent;
          text-align: left;
          transition: background-color var(--transition-fast);
        }

        .ef-workspace-menu__item:hover {
          background-color: var(--color-surface-hover);
        }

        .ef-workspace-menu__item--active {
          background-color: var(--color-primary-subtle);
        }

        .ef-workspace-menu__avatar {
          width: 24px;
          height: 24px;
          border-radius: var(--radius-xs);
          background-color: var(--color-surface);
          color: var(--color-text);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          font-weight: var(--font-weight-bold);
        }

        .ef-workspace-menu__details {
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .ef-workspace-menu__name {
          font-size: var(--text-xs);
          color: var(--color-text);
        }

        .ef-workspace-menu__events {
          font-size: 10px;
          color: var(--color-text-muted);
        }

        /* Nav lists */
        .ef-sidebar__nav {
          flex: 1;
          overflow-y: auto;
          padding: var(--space-3) var(--space-3);
        }

        .ef-nav-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .ef-nav-item {
          width: 100%;
        }

        .ef-nav-link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 12px;
          border-radius: var(--radius-md);
          color: var(--color-text-secondary);
          font-size: var(--text-sm);
          font-weight: var(--font-weight-medium);
          transition: all var(--transition-fast);
          text-decoration: none;
          position: relative;
        }

        .ef-nav-link:hover {
          color: var(--color-text);
          background-color: var(--color-surface-hover);
        }

        .ef-nav-link--active {
          color: var(--color-primary-contrast);
          background-color: var(--color-primary); /* Electric Violet */
          box-shadow: 0 2px 10px rgba(131, 77, 251, 0.35);
        }

        .ef-nav-link--active:hover {
          background-color: var(--color-primary-hover);
          color: var(--color-primary-contrast);
        }

        .ef-nav-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .ef-nav-label {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .ef-nav-badge {
          margin-left: auto;
          font-size: 10px;
          font-weight: var(--font-weight-bold);
          padding: 2px 6px;
          border-radius: var(--radius-full);
          background-color: var(--color-surface-elevated);
          color: var(--color-text-secondary);
        }

        .ef-nav-link--active .ef-nav-badge {
          background-color: rgba(255, 255, 255, 0.2);
          color: #ffffff;
        }

        .ef-sidebar--collapsed .ef-nav-link {
          justify-content: center;
          padding: 10px;
        }

        .ef-sidebar__footer {
          padding: var(--space-3) var(--space-3);
          border-top: 1px solid var(--color-border);
        }
      `}</style>
    </aside>
  );
};
