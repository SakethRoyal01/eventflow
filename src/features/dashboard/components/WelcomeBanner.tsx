/**
 * EventFlow Feature: WelcomeBanner Component
 * Workspace greeting banner with Create Event primary CTA
 */

import React from 'react';
import { CalendarPlus, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button.tsx';
import type { Workspace } from '@/types/workspace.ts';

export interface WelcomeBannerProps {
  workspace: Workspace | null;
  userName?: string;
  onCreateEvent: () => void;
  className?: string;
}

export const WelcomeBanner: React.FC<WelcomeBannerProps> = ({
  workspace,
  userName = 'Arthur',
  onCreateEvent,
}) => {
  // Editorial contextual greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="ef-welcome-banner">
      <div className="ef-welcome-banner__content">
        <div className="ef-welcome-banner__tag">
          <Sparkles size={13} className="ef-welcome-banner__sparkle" />
          <span>Multi-Event Control Plane</span>
        </div>
        <h1 className="ef-welcome-banner__title">
          {getGreeting()}, {userName}
        </h1>
        <p className="ef-welcome-banner__desc">
          Managing <strong className="ef-welcome-banner__ws">{workspace?.name ?? 'Workspace'}</strong>.
          Review your event operations, attendee flow, registrations, and payment workflows in this frontend preview.
        </p>
      </div>

      <div className="ef-welcome-banner__actions">
        <Button
          variant="primary"
          size="md"
          leftIcon={<CalendarPlus size={16} />}
          onClick={onCreateEvent}
        >
          Create Event
        </Button>
      </div>

      <style>{`
        .ef-welcome-banner {
          background-color: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          padding: var(--space-8);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: var(--space-6);
          margin-bottom: var(--space-8);
          position: relative;
          overflow: hidden;
        }

        .ef-welcome-banner::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 4px;
          height: 100%;
          background: linear-gradient(
            to bottom,
            var(--color-primary),
            var(--color-accent)
          );
        }

        .ef-welcome-banner__content {
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
          max-width: 680px;
        }

        .ef-welcome-banner__tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: var(--font-weight-medium);
          text-transform: uppercase;
          letter-spacing: var(--tracking-wider);
          color: var(--color-primary);
          background-color: var(--color-primary-subtle);
          border: 1px solid var(--color-primary-border);
          padding: 2px 10px;
          border-radius: var(--radius-full);
          width: fit-content;
        }

        .ef-welcome-banner__sparkle {
          color: var(--color-accent); /* Turbo sparkle */
        }

        .ef-welcome-banner__title {
          font-size: var(--text-3xl);
          font-weight: var(--font-weight-bold);
          color: var(--color-text);
          letter-spacing: var(--tracking-tight);
        }

        .ef-welcome-banner__desc {
          font-size: var(--text-sm);
          color: var(--color-text-secondary);
          line-height: 1.5;
        }

        .ef-welcome-banner__ws {
          color: var(--color-text);
        }

        .ef-welcome-banner__actions {
          display: flex;
          align-items: center;
        }
      `}</style>
    </div>
  );
};
