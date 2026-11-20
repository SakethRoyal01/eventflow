/**
 * EventFlow Service Layer Gateway
 * Currently delegates to Mock services. When Supabase is configured,
 * swap implementations here without altering UI components.
 */

export * from './mock/dashboard-service.ts';
export * from './mock/workspace-service.ts';
export * from './mock/mock-data.ts';
