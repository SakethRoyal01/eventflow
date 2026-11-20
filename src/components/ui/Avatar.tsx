/**
 * EventFlow UI: Avatar Component
 * Displays user profile avatar or generated initials
 */

import React from 'react';
import { cn, getInitials } from '@/lib/utils/index.ts';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  src?: string;
  size?: AvatarSize;
  status?: 'online' | 'busy' | 'offline';
}

export const Avatar: React.FC<AvatarProps> = ({
  name,
  src,
  size = 'md',
  status,
  className,
  ...props
}) => {
  const [hasError, setHasError] = React.useState(false);
  const initials = getInitials(name);

  return (
    <div
      className={cn('ef-avatar', `ef-avatar--${size}`, className)}
      title={name}
      {...props}
    >
      {src && !hasError ? (
        <img
          src={src}
          alt={name}
          className="ef-avatar__image"
          onError={() => setHasError(true)}
        />
      ) : (
        <span className="ef-avatar__initials">{initials}</span>
      )}
      {status && (
        <span
          className={cn('ef-avatar__status', `ef-avatar__status--${status}`)}
          aria-hidden="true"
        />
      )}
      <style>{`
        .ef-avatar {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-full);
          background-color: var(--color-surface-elevated);
          color: var(--color-text);
          border: 1px solid var(--color-border);
          font-weight: var(--font-weight-medium);
          user-select: none;
          flex-shrink: 0;
        }

        .ef-avatar--xs {
          width: 24px;
          height: 24px;
          font-size: 10px;
        }
        .ef-avatar--sm {
          width: 32px;
          height: 32px;
          font-size: 12px;
        }
        .ef-avatar--md {
          width: 40px;
          height: 40px;
          font-size: 14px;
        }
        .ef-avatar--lg {
          width: 48px;
          height: 48px;
          font-size: 16px;
        }
        .ef-avatar--xl {
          width: 64px;
          height: 64px;
          font-size: 20px;
        }

        .ef-avatar__image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: inherit;
        }

        .ef-avatar__initials {
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--color-primary-contrast);
        }

        .ef-avatar__status {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 25%;
          height: 25%;
          min-width: 8px;
          min-height: 8px;
          border-radius: 50%;
          border: 2px solid var(--color-surface);
        }
        .ef-avatar__status--online {
          background-color: var(--color-success);
        }
        .ef-avatar__status--busy {
          background-color: var(--color-warning);
        }
        .ef-avatar__status--offline {
          background-color: var(--color-text-subtle);
        }
      `}</style>
    </div>
  );
};
