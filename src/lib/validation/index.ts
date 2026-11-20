/**
 * EventFlow Validation Schemas
 * Uses Zod for strict type-safe runtime validations
 */

import { z } from 'zod';

export const workspaceSchema = z.object({
  name: z.string().min(2, 'Workspace name must be at least 2 characters').max(64),
  slug: z.string().min(2).max(64).regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),
  description: z.string().max(256).optional(),
});

export const createEventSchema = z.object({
  title: z.string().min(3, 'Event title must be at least 3 characters').max(120),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  category: z.string().min(1, 'Category is required'),
  startDate: z.string().datetime({ message: 'Invalid start date format' }),
  endDate: z.string().datetime({ message: 'Invalid end date format' }),
  venueName: z.string().min(2, 'Venue name is required'),
  capacity: z.number().int().positive('Capacity must be greater than zero'),
});

export const inviteMemberSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  role: z.enum(['owner', 'organizer', 'coordinator', 'gate_staff', 'analyst']),
  title: z.string().max(64).optional(),
});

export type WorkspaceFormData = z.infer<typeof workspaceSchema>;
export type CreateEventFormData = z.infer<typeof createEventSchema>;
export type InviteMemberFormData = z.infer<typeof inviteMemberSchema>;
