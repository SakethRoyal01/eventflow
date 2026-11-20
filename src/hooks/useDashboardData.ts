/**
 * EventFlow Hook: useDashboardData
 * Fetches metrics, upcoming events, and recent activities for the active workspace
 */

import { useCallback, useEffect, useState } from 'react';
import { mockDashboardService } from '@/services/mock/dashboard-service.ts';
import type { ActivityItem, DashboardMetric } from '@/services/mock/mock-data.ts';
import type { Event } from '@/types/event.ts';

export interface UseDashboardDataReturn {
  metrics: DashboardMetric[];
  upcomingEvents: Event[];
  recentActivities: ActivityItem[];
  isLoading: boolean;
  refresh: () => Promise<void>;
}

export function useDashboardData(workspaceId?: string): UseDashboardDataReturn {
  const [metrics, setMetrics] = useState<DashboardMetric[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [recentActivities, setRecentActivities] = useState<ActivityItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(async () => {
    if (!workspaceId) return;
    setIsLoading(true);
    try {
      const [m, e, a] = await Promise.all([
        mockDashboardService.getMetrics(workspaceId),
        mockDashboardService.getUpcomingEvents(workspaceId, 5),
        mockDashboardService.getRecentActivities(workspaceId, 5),
      ]);
      setMetrics(m);
      setUpcomingEvents(e);
      setRecentActivities(a);
    } finally {
      setIsLoading(false);
    }
  }, [workspaceId]);

  useEffect(() => {
    let isMounted = true;
    if (!workspaceId) return;

    Promise.all([
      mockDashboardService.getMetrics(workspaceId),
      mockDashboardService.getUpcomingEvents(workspaceId, 5),
      mockDashboardService.getRecentActivities(workspaceId, 5),
    ]).then(([m, e, a]) => {
      if (isMounted) {
        setMetrics(m);
        setUpcomingEvents(e);
        setRecentActivities(a);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [workspaceId]);

  return {
    metrics,
    upcomingEvents,
    recentActivities,
    isLoading,
    refresh: fetchData,
  };
}
