/**
 * EventFlow Router Configuration
 * React Router v7 configuration mapping application routes.
 */
import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout.tsx';
import { DashboardPage } from '@/features/dashboard/pages/DashboardPage.tsx';
import { RegistrationsPage } from '@/features/registrations/pages/RegistrationsPage.tsx';
import { ModulePlaceholder } from '@/components/shared/ModulePlaceholder.tsx';
import { ROUTE_CONFIGS } from './route-config.ts';

function createPlaceholderElement(key: string): React.ReactElement {
  const config = ROUTE_CONFIGS[key];
  if (!config) return <Navigate to="/dashboard" replace />;
  return (
    <ModulePlaceholder
      moduleId={config.id}
      title={config.title}
      description={config.description}
      category={config.category}
      plannedFeatures={config.plannedFeatures}
      schemaTable={config.schemaTable}
      edgeFunction={config.edgeFunction}
    />
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'events', element: createPlaceholderElement('events') },
      { path: 'team', element: createPlaceholderElement('team') },
      { path: 'registrations', element: <RegistrationsPage /> },
      { path: 'participants', element: createPlaceholderElement('participants') },
      { path: 'payments', element: createPlaceholderElement('payments') },
      { path: 'gates', element: createPlaceholderElement('gates') },
      { path: 'attendance', element: createPlaceholderElement('attendance') },
      { path: 'activities', element: createPlaceholderElement('activities') },
      { path: 'analytics', element: createPlaceholderElement('analytics') },
      { path: 'settings', element: createPlaceholderElement('settings') },
      { path: '*', element: <Navigate to="/dashboard" replace /> },
    ],
  },
]);
