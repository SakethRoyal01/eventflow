/**
 * EventFlow Layout: MainContent Component
 * Main viewport container with responsive bounds and smooth transitions
 */

import React from 'react';
import { cn } from '@/lib/utils/index.ts';

export interface MainContentProps {
  children: React.ReactNode;
  className?: string;
}

export const MainContent: React.FC<MainContentProps> = ({
  children,
  className,
}) => {
  return (
    <main className={cn('ef-main-content', className)}>
      <div className="ef-content-container">{children}</div>

      <style>{`
        .ef-main-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          background-color: var(--color-background);
          min-height: calc(100vh - var(--header-height));
          padding: var(--space-8) var(--space-8);
          overflow-x: hidden;
        }

        .ef-content-container {
          width: 100%;
          max-width: var(--content-max-width);
          margin: 0 auto;
        }

        @media (max-width: 1024px) {
          .ef-main-content {
            padding: var(--space-6) var(--space-5);
          }
        }

        @media (max-width: 768px) {
          .ef-main-content {
            padding: var(--space-5) var(--space-4) calc(var(--mobile-nav-height) + var(--space-5));
          }
        }
      `}</style>
    </main>
  );
};
