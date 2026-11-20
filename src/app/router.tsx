import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout.tsx';
import { DashboardPage } from '@/features/dashboard/pages/DashboardPage.tsx';
import { RegistrationsPage } from '@/features/registrations/pages/RegistrationsPage.tsx';
import { LoginPage } from '@/features/auth/pages/LoginPage.tsx';
import { OperationsPage } from '@/features/operations/pages/OperationsPage.tsx';

export const router = createBrowserRouter([
 {path:'/login',element:<LoginPage/>},
 {path:'/',element:<AppLayout/>,children:[
  {index:true,element:<Navigate to="/dashboard" replace/>},
  {path:'dashboard',element:<DashboardPage/>},
  {path:'events',element:<OperationsPage/>},
  {path:'team',element:<OperationsPage/>},
  {path:'registrations',element:<RegistrationsPage/>},
  {path:'participants',element:<OperationsPage/>},
  {path:'payments',element:<OperationsPage/>},
  {path:'gates',element:<OperationsPage/>},
  {path:'attendance',element:<OperationsPage/>},
  {path:'activities',element:<OperationsPage/>},
  {path:'analytics',element:<OperationsPage/>},
  {path:'settings',element:<OperationsPage/>},
  {path:'*',element:<Navigate to="/dashboard" replace/>}
 ]}
]);