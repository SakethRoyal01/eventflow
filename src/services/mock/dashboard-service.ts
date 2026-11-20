/**
 * EventFlow Dashboard Service (Mock Implementation)
 * Prepared for seamless switch to Supabase RPC / Query functions
 */

import {
  MOCK_DASHBOARD_METRICS,
  MOCK_RECENT_ACTIVITIES,
  MOCK_UPCOMING_EVENTS,
  type ActivityItem,
  type DashboardMetric,
} from './mock-data.ts';
import type { Event } from '@/types/event.ts';

export interface DashboardService {
  getMetrics: (workspaceId: string) => Promise<DashboardMetric[]>;
  getUpcomingEvents: (workspaceId: string, limit?: number) => Promise<Event[]>;
  getRecentActivities: (workspaceId: string, limit?: number) => Promise<ActivityItem[]>;
}

export const mockDashboardService: DashboardService = {
  async getMetrics(workspaceId: string): Promise<DashboardMetric[]> {
    void workspaceId;
    return Promise.resolve(MOCK_DASHBOARD_METRICS);
  },

  async getUpcomingEvents(workspaceId: string, limit = 5): Promise<Event[]> {
    void workspaceId;
    return Promise.resolve(MOCK_UPCOMING_EVENTS.slice(0, limit));
  },

  async getRecentActivities(workspaceId: string, limit = 5): Promise<ActivityItem[]> {
    void workspaceId;
    return Promise.resolve(MOCK_RECENT_ACTIVITIES.slice(0, limit));
  },
};
