/**
 * EventFlow Shared: StatCard Component
 * Metric card strictly adhering to the design tokens
 */

import React from 'react';
import { TrendingDown, TrendingUp } from 'lucide-react';
import { formatNumber } from '@/lib/utils/index.ts';

export interface StatCardProps {
  label: string;
  value: number | string;
  changePercent?: number;
  changeLabel?: string;
  trend?: 'up' | 'down' | 'neutral';
  subtext?: string;
  icon?: React.ReactNode;
  format?: 'number' | 'raw';
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  changePercent,
  changeLabel,
  trend = 'up',
  subtext,
  icon,
  format = 'number',
}) => {
  const displayValue =
    typeof value === 'number' && format === 'number'
      ? formatNumber(value)
      : value;

  return (
    <div className="ef-stat-card">
      <div className="ef-stat-card__header">
        <span className="ef-stat-card__label">{label}</span>
        {icon && <span className="ef-stat-card__icon">{icon}</span>}
      </div>

      <div className="ef-stat-card__body">
        <span className="ef-stat-card__value tabular-nums">{displayValue}</span>
      </div>

      {(changePercent !== undefined || subtext) && (
        <div className="ef-stat-card__footer">
          {changePercent !== undefined && (
            <span
              className={`ef-stat-card__trend ef-stat-card__trend--${trend}`}
            >
              {trend === 'up' && <TrendingUp size={13} />}
              {trend === 'down' && <TrendingDown size={13} />}
              <span>{changePercent > 0 ? `+${changePercent}%` : `${changePercent}%`}</span>
            </span>
          )}
          {changeLabel && (
            <span className="ef-stat-card__change-label">{changeLabel}</span>
          )}
          {subtext && !changeLabel && (
            <span className="ef-stat-card__subtext">{subtext}</span>
          )}
        </div>
      )}

      <style>{`
        .ef-stat-card {
          background-color: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          padding: var(--space-5) var(--space-6);
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
          transition: border-color var(--transition-fast), transform var(--transition-fast);
          position: relative;
          overflow: hidden;
        }

        .ef-stat-card:hover {
          border-color: var(--color-primary-border);
        }

        .ef-stat-card__header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: var(--color-text-muted);
        }

        .ef-stat-card__label {
          font-size: var(--text-xs);
          font-weight: var(--font-weight-medium);
          letter-spacing: var(--tracking-wider);
          text-transform: uppercase;
        }

        .ef-stat-card__icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: var(--radius-md);
          background-color: var(--color-surface-subtle);
          color: var(--color-primary);
          border: 1px solid var(--color-border-subtle);
        }

        .ef-stat-card__body {
          margin: 4px 0 2px;
        }

        .ef-stat-card__value {
          font-size: var(--text-3xl);
          font-weight: var(--font-weight-bold);
          color: var(--color-text);
          letter-spacing: var(--tracking-tight);
          line-height: 1.1;
        }

        .ef-stat-card__footer {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: var(--text-xs);
          margin-top: 4px;
        }

        .ef-stat-card__trend {
          display: inline-flex;
          align-items: center;
          gap: 3px;
          font-weight: var(--font-weight-medium);
        }

        .ef-stat-card__trend--up {
          color: var(--color-success-text);
        }
        .ef-stat-card__trend--down {
          color: var(--color-error-text);
        }
        .ef-stat-card__trend--neutral {
          color: var(--color-text-muted);
        }

        .ef-stat-card__change-label,
        .ef-stat-card__subtext {
          color: var(--color-text-muted);
        }
      `}</style>
    </div>
  );
};
