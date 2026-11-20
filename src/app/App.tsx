/**
 * EventFlow Root Application Component
 * Mounts Global Providers and React Router
 */

import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router.tsx';
import { Providers } from './providers.tsx';

export const App: React.FC = () => {
  return (
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  );
};

export default App;
