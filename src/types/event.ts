/**
 * EventFlow Event Types
 */

import type { BaseEntity, ID, ISODateString } from './common.ts';

export type EventStatus =
  | 'draft'
  | 'published'
  | 'in_progress'
  | 'completed'
  | 'cancelled';

export type EventVisibility = 'public' | 'private' | 'unlisted';

export interface EventVenue {
  name: string;
  address?: string;
  city?: string;
  roomOrHall?: string;
  mapUrl?: string;
}

export interface EventMetrics {
  totalCapacity: number;
  registeredCount: number;
  checkedInCount: number;
  revenue: number;
  currency: string;
}

export interface Event extends BaseEntity {
  workspaceId: ID;
  title: string;
  slug: string;
  description: string;
  coverImageUrl?: string;
  status: EventStatus;
  visibility: EventVisibility;
  startDate: ISODateString;
  endDate: ISODateString;
  venue: EventVenue;
  metrics: EventMetrics;
  organizerName: string;
  category: string;
  tags: string[];
}

export interface CreateEventInput {
  workspaceId: ID;
  title: string;
  description: string;
  startDate: ISODateString;
  endDate: ISODateString;
  venue: EventVenue;
  capacity: number;
  category: string;
}
