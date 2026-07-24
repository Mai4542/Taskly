import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './routes/index';
import AuthHashRedirect from './components/AuthHashRedirect';
import { Toaster } from 'sonner';
import { Provider } from 'react-redux';
import { store } from './store/store';


createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <Toaster position="bottom-right" richColors />
    <AuthHashRedirect />
    <RouterProvider router={router} />
  </Provider>,
);
