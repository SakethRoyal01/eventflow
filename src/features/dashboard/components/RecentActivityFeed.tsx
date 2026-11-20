/**
 * EventFlow Feature: RecentActivityFeed Component
 * Displays realistic sample activities: New registration, Payment verified, Event created, Team member invited
 */

import React from 'react';
import {
  CalendarPlus,
  CreditCard,
  QrCode,
  UserCheck,
  UserPlus,
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge.tsx';
import { formatRelativeTime } from '@/lib/utils/index.ts';
import type { ActivityItem, ActivityType } from '@/services/mock/mock-data.ts';

const ACTIVITY_ICONS: Record<ActivityType, React.ReactNode> = {
  registration: <UserCheck size={14} />,
  payment: <CreditCard size={14} />,
  event_created: <CalendarPlus size={14} />,
  member_invited: <UserPlus size={14} />,
  gate_checkin: <QrCode size={14} />,
};

export interface RecentActivityFeedProps {
  activities: ActivityItem[];
}

export const RecentActivityFeed: React.FC<RecentActivityFeedProps> = ({
  activities,
}) => {
  return (
    <div className="ef-activity-card">
      <div className="ef-activity-card__header">
        <div>
          <h2 className="ef-activity-card__title">Recent Activity</h2>
          <p className="ef-activity-card__subtitle">
            Real-time audit stream across registrations, gate passes, and team actions
          </p>
        </div>
      </div>

      <div className="ef-activity-card__list">
        {activities.map((act) => (
          <div key={act.id} className="ef-activity-item">
            <div className={`ef-activity-icon-badge ef-activity-icon-badge--${act.type}`}>
              {ACTIVITY_ICONS[act.type] ?? <UserCheck size={14} />}
            </div>

            <div className="ef-activity-content">
              <div className="ef-activity-top">
                <span className="ef-activity-title">{act.title}</span>
                {act.statusBadge && (
                  <Badge variant={act.statusBadge.variant} size="sm">
                    {act.statusBadge.label}
                  </Badge>
                )}
              </div>
              <p className="ef-activity-desc">{act.description}</p>
              <div className="ef-activity-footer">
                <span className="ef-activity-actor">{act.actor.name}</span>
                <span className="ef-activity-dot">•</span>
                <span className="ef-activity-time">{formatRelativeTime(act.timestamp)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .ef-activity-card {
          background-color: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          padding: var(--space-6);
          display: flex;
          flex-direction: column;
          gap: var(--space-5);
        }

        .ef-activity-card__header {
          border-bottom: 1px solid var(--color-border);
          padding-bottom: var(--space-4);
        }

        .ef-activity-card__title {
          font-size: var(--text-lg);
          font-weight: var(--font-weight-semibold);
          color: var(--color-text);
          letter-spacing: var(--tracking-tight);
        }

        .ef-activity-card__subtitle {
          font-size: var(--text-xs);
          color: var(--color-text-muted);
          margin-top: 2px;
        }

        .ef-activity-card__list {
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
        }

        .ef-activity-item {
          display: flex;
          align-items: flex-start;
          gap: var(--space-3);
          padding-bottom: var(--space-3);
          border-bottom: 1px solid var(--color-border-subtle);
        }

        .ef-activity-item:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .ef-activity-icon-badge {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: var(--radius-sm);
          flex-shrink: 0;
          margin-top: 2px;
        }

        .ef-activity-icon-badge--registration {
          background-color: var(--color-success-subtle);
          color: var(--color-success-text);
        }

        .ef-activity-icon-badge--payment {
          background-color: var(--color-accent-subtle);
          color: var(--color-accent); /* Turbo */
        }

        .ef-activity-icon-badge--event_created {
          background-color: var(--color-primary-subtle);
          color: var(--color-primary);
        }

        .ef-activity-icon-badge--member_invited {
          background-color: var(--color-surface-elevated);
          color: var(--color-text-secondary);
        }

        .ef-activity-icon-badge--gate_checkin {
          background-color: var(--color-primary-subtle);
          color: var(--color-primary-contrast);
        }

        .ef-activity-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .ef-activity-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--space-2);
        }

        .ef-activity-title {
          font-size: var(--text-xs);
          font-weight: var(--font-weight-semibold);
          color: var(--color-text);
        }

        .ef-activity-desc {
          font-size: var(--text-xs);
          color: var(--color-text-secondary);
          line-height: 1.4;
        }

        .ef-activity-footer {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          color: var(--color-text-muted);
          margin-top: 2px;
        }

        .ef-activity-actor {
          color: var(--color-text-secondary);
          font-weight: var(--font-weight-medium);
        }

        .ef-activity-dot {
          color: var(--color-text-subtle);
        }

        .ef-activity-time {
          color: var(--color-text-muted);
        }
      `}</style>
    </div>
  );
};
