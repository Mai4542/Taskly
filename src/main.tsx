import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './routes/index';
import AuthHashRedirect from './components/AuthHashRedirect';
import { Toaster } from 'sonner';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <Toaster position="bottom-right" richColors />
    <AuthHashRedirect />
    <RouterProvider router={router} />
  </QueryClientProvider>,
);
