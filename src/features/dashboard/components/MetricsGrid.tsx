/**
 * EventFlow Feature: MetricsGrid Component
 * Displays 4 key statistics: Total events, Active events, Total registrations, Total attendance
 */

import React from 'react';
import {
  Calendar,
  Layers,
  ShieldCheck,
  Users,
} from 'lucide-react';
import { StatCard } from '@/components/shared/StatCard.tsx';
import type { DashboardMetric } from '@/services/mock/mock-data.ts';

const METRIC_ICONS: Record<string, React.ReactNode> = {
  'total-events': <Calendar size={18} />,
  'active-events': <Layers size={18} />,
  'total-registrations': <Users size={18} />,
  'total-attendance': <ShieldCheck size={18} />,
};

export interface MetricsGridProps {
  metrics: DashboardMetric[];
  isLoading?: boolean;
}

export const MetricsGrid: React.FC<MetricsGridProps> = ({ metrics }) => {
  return (
    <div className="ef-metrics-grid">
      {metrics.map((metric) => (
        <StatCard
          key={metric.id}
          label={metric.label}
          value={metric.value}
          changePercent={metric.changePercent}
          changeLabel={metric.changeLabel}
          trend={metric.trend}
          subtext={metric.subtext}
          icon={METRIC_ICONS[metric.id] ?? <Calendar size={18} />}
        />
      ))}

      <style>{`
        .ef-metrics-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--space-4);
          margin-bottom: var(--space-8);
        }

        @media (max-width: 1200px) {
          .ef-metrics-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .ef-metrics-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};
