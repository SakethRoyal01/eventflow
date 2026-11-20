/**
 * EventFlow UI: Badge Component
 * Controlled status indicator tags
 */

import React from 'react';
import { cn } from '@/lib/utils/index.ts';

export type BadgeVariant =
  | 'primary'
  | 'accent'
  | 'success'
  | 'warning'
  | 'error'
  | 'neutral';

export type BadgeSize = 'sm' | 'md';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className,
  variant = 'neutral',
  size = 'md',
  dot = false,
  ...props
}) => {
  return (
    <span
      className={cn(
        'ef-badge',
        `ef-badge--${variant}`,
        `ef-badge--${size}`,
        className
      )}
      {...props}
    >
      {dot && <span className="ef-badge__dot" aria-hidden="true" />}
      <span>{children}</span>
      <style>{`
        .ef-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          border-radius: var(--radius-full);
          font-weight: var(--font-weight-medium);
          letter-spacing: var(--tracking-wide);
          border: 1px solid transparent;
          white-space: nowrap;
          line-height: 1;
        }

        .ef-badge--sm {
          font-size: 11px;
          padding: 3px 8px;
        }

        .ef-badge--md {
          font-size: 12px;
          padding: 4px 10px;
        }

        .ef-badge__dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: currentColor;
        }

        .ef-badge--primary {
          background-color: var(--color-primary-subtle);
          color: var(--color-text);
          border-color: var(--color-primary-border);
        }

        .ef-badge--accent {
          background-color: var(--color-accent-subtle);
          color: var(--color-accent);
          border-color: var(--color-accent-border);
        }

        .ef-badge--success {
          background-color: var(--color-success-subtle);
          color: var(--color-success-text);
          border-color: var(--color-success-border);
        }

        .ef-badge--warning {
          background-color: var(--color-warning-subtle);
          color: var(--color-warning-text);
          border-color: var(--color-warning-border);
        }

        .ef-badge--error {
          background-color: var(--color-error-subtle);
          color: var(--color-error-text);
          border-color: var(--color-error-border);
        }

        .ef-badge--neutral {
          background-color: var(--color-surface-elevated);
          color: var(--color-text-secondary);
          border-color: var(--color-border);
        }
      `}</style>
    </span>
  );
};
