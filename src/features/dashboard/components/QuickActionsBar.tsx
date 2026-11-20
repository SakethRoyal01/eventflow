/**
 * EventFlow Feature: QuickActionsBar Component
 * Primary workspace actions: Create event, Invite team member, Import registrations, View attendance
 */

import React from 'react';
import {
  CalendarPlus,
  FileSpreadsheet,
  ShieldCheck,
  UserPlus,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export interface QuickActionsBarProps {
  onCreateEvent: () => void;
  onInviteMember: () => void;
}

export const QuickActionsBar: React.FC<QuickActionsBarProps> = ({
  onCreateEvent,
  onInviteMember,
}) => {
  const navigate = useNavigate();

  const actions = [
    {
      id: 'create-event',
      label: 'Create Event',
      desc: 'Publish or schedule a new event',
      icon: <CalendarPlus size={20} />,
      onClick: onCreateEvent,
      highlight: true,
    },
    {
      id: 'invite-member',
      label: 'Invite Team Member',
      desc: 'Add organizers, coordinators or gate staff',
      icon: <UserPlus size={20} />,
      onClick: onInviteMember,
    },
    {
      id: 'import-registrations',
      label: 'Import Registrations',
      desc: 'Upload participants from Excel / CSV',
      icon: <FileSpreadsheet size={20} />,
      onClick: () => navigate('/registrations'),
    },
    {
      id: 'view-attendance',
      label: 'View Attendance',
      desc: 'Live gate check-ins and pass scans',
      icon: <ShieldCheck size={20} />,
      onClick: () => navigate('/attendance'),
    },
  ];

  return (
    <div className="ef-quick-actions">
      <div className="ef-quick-actions__header">
        <h2 className="ef-quick-actions__title">Quick Actions</h2>
        <span className="ef-quick-actions__desc">Essential workspace shortcuts</span>
      </div>

      <div className="ef-quick-actions__grid">
        {actions.map((act) => (
          <button
            key={act.id}
            type="button"
            onClick={act.onClick}
            className={`ef-quick-card ${act.highlight ? 'ef-quick-card--highlight' : ''}`}
          >
            <div className="ef-quick-card__icon">{act.icon}</div>
            <div className="ef-quick-card__details">
              <span className="ef-quick-card__label">{act.label}</span>
              <span className="ef-quick-card__desc">{act.desc}</span>
            </div>
          </button>
        ))}
      </div>

      <style>{`
        .ef-quick-actions {
          margin-bottom: var(--space-8);
        }

        .ef-quick-actions__header {
          display: flex;
          align-items: baseline;
          gap: var(--space-3);
          margin-bottom: var(--space-3);
        }

        .ef-quick-actions__title {
          font-size: var(--text-base);
          font-weight: var(--font-weight-semibold);
          color: var(--color-text);
          letter-spacing: var(--tracking-tight);
        }

        .ef-quick-actions__desc {
          font-size: var(--text-xs);
          color: var(--color-text-muted);
        }

        .ef-quick-actions__grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--space-4);
        }

        @media (max-width: 1200px) {
          .ef-quick-actions__grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .ef-quick-actions__grid {
            grid-template-columns: 1fr;
          }
        }

        .ef-quick-card {
          display: flex;
          align-items: flex-start;
          gap: var(--space-3);
          padding: var(--space-4);
          background-color: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          text-align: left;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .ef-quick-card:hover {
          border-color: var(--color-primary-border);
          background-color: var(--color-surface-hover);
          transform: translateY(-1px);
        }

        .ef-quick-card--highlight .ef-quick-card__icon {
          background-color: var(--color-primary);
          color: var(--color-primary-contrast);
        }

        .ef-quick-card__icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border-radius: var(--radius-md);
          background-color: var(--color-surface-subtle);
          color: var(--color-primary);
          border: 1px solid var(--color-border);
          flex-shrink: 0;
          transition: all var(--transition-fast);
        }

        .ef-quick-card:hover .ef-quick-card__icon {
          border-color: var(--color-primary-border);
        }

        .ef-quick-card__details {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .ef-quick-card__label {
          font-size: var(--text-sm);
          font-weight: var(--font-weight-semibold);
          color: var(--color-text);
        }

        .ef-quick-card__desc {
          font-size: var(--text-xs);
          color: var(--color-text-muted);
          line-height: 1.3;
        }
      `}</style>
    </div>
  );
};
