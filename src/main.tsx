import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './routes/index';
import AuthHashRedirect from './components/AuthHashRedirect';
import { Toaster } from 'sonner';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Toaster position="bottom-right" richColors />
    <AuthHashRedirect />
    <RouterProvider router={router} />
  </StrictMode>,
);