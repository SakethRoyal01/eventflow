/**
 * EventFlow Shared: SectionHeading Component
 * Section divider with optional action
 */

import React from 'react';
import { cn } from '@/lib/utils/index.ts';

export interface SectionHeadingProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  description,
  action,
  className,
}) => {
  return (
    <div className={cn('ef-section-heading', className)}>
      <div className="ef-section-heading__text">
        <h2 className="ef-section-heading__title">{title}</h2>
        {description && (
          <p className="ef-section-heading__desc">{description}</p>
        )}
      </div>
      {action && <div className="ef-section-heading__action">{action}</div>}

      <style>{`
        .ef-section-heading {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: var(--space-4);
          gap: var(--space-4);
        }

        .ef-section-heading__title {
          font-size: var(--text-lg);
          font-weight: var(--font-weight-semibold);
          color: var(--color-text);
          letter-spacing: var(--tracking-tight);
        }

        .ef-section-heading__desc {
          font-size: var(--text-xs);
          color: var(--color-text-muted);
          margin-top: 2px;
        }

        .ef-section-heading__action {
          flex-shrink: 0;
        }
      `}</style>
    </div>
  );
};
