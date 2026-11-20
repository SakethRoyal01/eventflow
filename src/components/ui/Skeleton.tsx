/**
 * EventFlow UI: Skeleton Loading Component
 * Subtle shimmer effect for loading states
 */

import React from 'react';
import { cn } from '@/lib/utils/index.ts';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string | number;
  height?: string | number;
  variant?: 'rectangular' | 'circular' | 'rounded';
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width,
  height,
  variant = 'rounded',
  className,
  style,
  ...props
}) => {
  return (
    <div
      className={cn('ef-skeleton', `ef-skeleton--${variant}`, className)}
      style={{
        width,
        height,
        ...style,
      }}
      aria-hidden="true"
      {...props}
    >
      <style>{`
        .ef-skeleton {
          background-color: var(--color-surface-subtle);
          position: relative;
          overflow: hidden;
        }

        .ef-skeleton::after {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          transform: translateX(-100%);
          background-image: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0,
            rgba(255, 255, 255, 0.04) 20%,
            rgba(255, 255, 255, 0.07) 60%,
            rgba(255, 255, 255, 0)
          );
          animation: ef-shimmer 1.8s infinite;
          content: '';
        }

        .ef-skeleton--rounded {
          border-radius: var(--radius-md);
        }

        .ef-skeleton--circular {
          border-radius: 50%;
        }

        .ef-skeleton--rectangular {
          border-radius: 0;
        }

        @keyframes ef-shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
};
