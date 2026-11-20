/**
 * EventFlow Shared: PageHeader Component
 * Consistent top banner for all feature pages
 */

import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils/index.ts';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: React.ReactNode;
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  breadcrumbs,
  actions,
  className,
}) => {
  return (
    <div className={cn('ef-page-header', className)}>
      <div className="ef-page-header__left">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="ef-page-header__breadcrumbs" aria-label="Breadcrumb">
            <ol className="ef-breadcrumb-list">
              {breadcrumbs.map((crumb, idx) => {
                const isLast = idx === breadcrumbs.length - 1;
                return (
                  <li key={crumb.label} className="ef-breadcrumb-item">
                    {crumb.href && !isLast ? (
                      <Link to={crumb.href} className="ef-breadcrumb-link">
                        {crumb.label}
                      </Link>
                    ) : (
                      <span className="ef-breadcrumb-current">{crumb.label}</span>
                    )}
                    {!isLast && (
                      <ChevronRight size={14} className="ef-breadcrumb-sep" />
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
        )}
        <h1 className="ef-page-header__title">{title}</h1>
        {subtitle && <p className="ef-page-header__subtitle">{subtitle}</p>}
      </div>

      {actions && <div className="ef-page-header__actions">{actions}</div>}

      <style>{`
        .ef-page-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: var(--space-4);
          margin-bottom: var(--space-8);
        }

        .ef-page-header__left {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .ef-page-header__breadcrumbs {
          margin-bottom: 4px;
        }

        .ef-breadcrumb-list {
          display: flex;
          align-items: center;
          gap: 6px;
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .ef-breadcrumb-item {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: var(--text-xs);
        }

        .ef-breadcrumb-link {
          color: var(--color-text-muted);
          transition: color var(--transition-fast);
        }
        .ef-breadcrumb-link:hover {
          color: var(--color-text);
        }

        .ef-breadcrumb-current {
          color: var(--color-text-secondary);
        }

        .ef-breadcrumb-sep {
          color: var(--color-text-subtle);
        }

        .ef-page-header__title {
          font-size: var(--text-2xl);
          font-weight: var(--font-weight-bold);
          color: var(--color-text);
          letter-spacing: var(--tracking-tight);
        }

        .ef-page-header__subtitle {
          font-size: var(--text-sm);
          color: var(--color-text-muted);
          max-width: 620px;
        }

        .ef-page-header__actions {
          display: flex;
          align-items: center;
          gap: var(--space-3);
        }
      `}</style>
    </div>
  );
};
