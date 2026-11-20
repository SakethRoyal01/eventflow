/**
 * EventFlow UI: EmptyState Component
 * Editorial empty state graphic & guidance
 */

import React from 'react';
import { FolderSearch } from 'lucide-react';
import { Button } from './Button.tsx';
import { cn } from '@/lib/utils/index.ts';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  className,
}) => {
  return (
    <div className={cn('ef-empty-state', className)}>
      <div className="ef-empty-state__icon">
        {icon ?? <FolderSearch size={32} />}
      </div>
      <h3 className="ef-empty-state__title">{title}</h3>
      {description && <p className="ef-empty-state__desc">{description}</p>}
      {actionLabel && onAction && (
        <Button
          variant="outline"
          size="sm"
          onClick={onAction}
          className="ef-empty-state__action"
        >
          {actionLabel}
        </Button>
      )}

      <style>{`
        .ef-empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: var(--space-10) var(--space-6);
          background-color: var(--color-surface-subtle);
          border: 1px dashed var(--color-border-strong);
          border-radius: var(--radius-lg);
        }

        .ef-empty-state__icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 56px;
          height: 56px;
          border-radius: var(--radius-lg);
          background-color: var(--color-primary-subtle);
          color: var(--color-primary);
          margin-bottom: var(--space-4);
          border: 1px solid var(--color-primary-border);
        }

        .ef-empty-state__title {
          font-size: var(--text-base);
          font-weight: var(--font-weight-semibold);
          color: var(--color-text);
          margin-bottom: 4px;
        }

        .ef-empty-state__desc {
          font-size: var(--text-sm);
          color: var(--color-text-muted);
          max-width: 420px;
          margin-bottom: var(--space-4);
        }

        .ef-empty-state__action {
          margin-top: 4px;
        }
      `}</style>
    </div>
  );
};
