/**
 * EventFlow Feature: UpcomingEventsList Component
 * Displays realistic sample events with Name, Date, Location, Status, and Registration count
 */

import React from 'react';
import { ArrowUpRight, Calendar, MapPin, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge, type BadgeVariant } from '@/components/ui/Badge.tsx';
import { formatDate } from '@/lib/utils/index.ts';
import type { Event, EventStatus } from '@/types/event.ts';

export interface UpcomingEventsListProps {
  events: Event[];
  onViewAll?: () => void;
}

const STATUS_CONFIG: Record<EventStatus, { label: string; variant: BadgeVariant }> = {
  published: { label: 'Published', variant: 'primary' },
  in_progress: { label: 'In Progress', variant: 'accent' },
  draft: { label: 'Draft', variant: 'neutral' },
  completed: { label: 'Completed', variant: 'success' },
  cancelled: { label: 'Cancelled', variant: 'error' },
};

export const UpcomingEventsList: React.FC<UpcomingEventsListProps> = ({ events }) => {
  return (
    <div className="ef-events-card">
      <div className="ef-events-card__header">
        <div>
          <h2 className="ef-events-card__title">Upcoming Events</h2>
          <p className="ef-events-card__subtitle">
            Scheduled events, current capacities, and registration velocity
          </p>
        </div>
        <Link to="/events" className="ef-events-card__view-all">
          <span>View all events</span>
          <ArrowUpRight size={15} />
        </Link>
      </div>

      <div className="ef-events-card__list">
        {events.map((event) => {
          const status = STATUS_CONFIG[event.status] ?? {
            label: event.status,
            variant: 'neutral' as BadgeVariant,
          };
          const percentFilled = Math.min(
            100,
            Math.round((event.metrics.registeredCount / event.metrics.totalCapacity) * 100)
          );

          return (
            <div key={event.id} className="ef-event-row">
              <div className="ef-event-row__date-col">
                <span className="ef-event-date-month">
                  {formatDate(event.startDate, { month: 'short' })}
                </span>
                <span className="ef-event-date-day">
                  {formatDate(event.startDate, { day: '2-digit' })}
                </span>
              </div>

              <div className="ef-event-row__info-col">
                <div className="ef-event-row__top">
                  <h3 className="ef-event-row__title">{event.title}</h3>
                  <Badge variant={status.variant} size="sm">
                    {status.label}
                  </Badge>
                </div>

                <div className="ef-event-row__meta">
                  <span className="ef-event-meta-item">
                    <Calendar size={13} />
                    <span>{formatDate(event.startDate)}</span>
                  </span>
                  <span className="ef-event-meta-item">
                    <MapPin size={13} />
                    <span className="truncate">{event.venue.name}</span>
                  </span>
                  <span className="ef-event-meta-item">
                    <Users size={13} />
                    <span>
                      {event.metrics.registeredCount} / {event.metrics.totalCapacity}
                    </span>
                  </span>
                </div>

                {/* Registration Progress Bar */}
                <div className="ef-event-progress-wrap">
                  <div className="ef-event-progress-bar">
                    <div
                      className="ef-event-progress-fill"
                      style={{ width: `${percentFilled}%` }}
                    />
                  </div>
                  <span className="ef-event-progress-text tabular-nums">
                    {percentFilled}% capacity
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        .ef-events-card {
          background-color: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          padding: var(--space-6);
          display: flex;
          flex-direction: column;
          gap: var(--space-5);
        }

        .ef-events-card__header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          border-bottom: 1px solid var(--color-border);
          padding-bottom: var(--space-4);
          gap: var(--space-4);
        }

        .ef-events-card__title {
          font-size: var(--text-lg);
          font-weight: var(--font-weight-semibold);
          color: var(--color-text);
          letter-spacing: var(--tracking-tight);
        }

        .ef-events-card__subtitle {
          font-size: var(--text-xs);
          color: var(--color-text-muted);
          margin-top: 2px;
        }

        .ef-events-card__view-all {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: var(--text-xs);
          font-weight: var(--font-weight-medium);
          color: var(--color-primary);
        }
        .ef-events-card__view-all:hover {
          color: var(--color-primary-hover);
        }

        .ef-events-card__list {
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
        }

        .ef-event-row {
          display: flex;
          align-items: flex-start;
          gap: var(--space-4);
          padding: var(--space-4);
          background-color: var(--color-surface-subtle);
          border: 1px solid var(--color-border-subtle);
          border-radius: var(--radius-md);
          transition: border-color var(--transition-fast), background-color var(--transition-fast);
        }

        .ef-event-row:hover {
          border-color: var(--color-border-strong);
          background-color: var(--color-surface-hover);
        }

        .ef-event-row__date-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 52px;
          height: 52px;
          background-color: var(--color-surface-elevated);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          flex-shrink: 0;
        }

        .ef-event-date-month {
          font-size: 10px;
          font-weight: var(--font-weight-bold);
          color: var(--color-primary);
          text-transform: uppercase;
          line-height: 1;
        }

        .ef-event-date-day {
          font-size: var(--text-base);
          font-weight: var(--font-weight-bold);
          color: var(--color-text);
          line-height: 1.2;
        }

        .ef-event-row__info-col {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 6px;
          overflow: hidden;
        }

        .ef-event-row__top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--space-3);
        }

        .ef-event-row__title {
          font-size: var(--text-sm);
          font-weight: var(--font-weight-semibold);
          color: var(--color-text);
          margin: 0;
        }

        .ef-event-row__meta {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: var(--space-4);
          font-size: var(--text-xs);
          color: var(--color-text-muted);
        }

        .ef-event-meta-item {
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }

        .ef-event-progress-wrap {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          margin-top: 4px;
        }

        .ef-event-progress-bar {
          flex: 1;
          height: 4px;
          background-color: var(--color-surface-elevated);
          border-radius: var(--radius-full);
          overflow: hidden;
        }

        .ef-event-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--color-primary), var(--color-primary-hover));
          border-radius: var(--radius-full);
        }

        .ef-event-progress-text {
          font-size: 11px;
          color: var(--color-text-muted);
          flex-shrink: 0;
        }
      `}</style>
    </div>
  );
};
