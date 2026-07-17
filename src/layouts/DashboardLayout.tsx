import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from '../components/Sidebar';
import DashboardNavbar from '../components/Dashboard-Navbar';
import { APP_ROUTES } from '../constants/router';
import { logout } from '../store/slices/authSlice';
import { logoutUser } from '../services/auth.service';
import type { RootState } from '../store';

const COLLAPSE_STORAGE_KEY = 'taskly:sidebar-collapsed';

export default function DashboardLayout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.token);
  const [collapsed, setCollapsed] = useState(
    () => localStorage.getItem(COLLAPSE_STORAGE_KEY) === 'true',
  );
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logoutError, setLogoutError] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem(COLLAPSE_STORAGE_KEY, String(collapsed));
  }, [collapsed]);

  async function handleLogout() {
    try {
      setLogoutError(null);

      const accessToken =
        token ||
        localStorage.getItem('token') ||
        sessionStorage.getItem('token');

      if (accessToken) {
        await logoutUser(accessToken);
      }
    } catch (error) {
      console.error('Logout error:', error);
      setLogoutError(
        error instanceof Error
          ? error.message
          : 'Logout failed, please try again.',
      );
    } finally {
      dispatch(logout());
      localStorage.removeItem('token');
      localStorage.removeItem('refresh_token');
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('refresh_token');

      navigate(APP_ROUTES.auth.login, { replace: true });
    }
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-white">
      <Sidebar
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((c) => !c)}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
        onLogout={handleLogout}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <DashboardNavbar
          onMenuClick={() => setMobileOpen(true)}
          onLogout={handleLogout}
        />

        {logoutError && (
          <div className="bg-error/10 border border-error text-error px-4 py-2 text-sm">
            {logoutError}
          </div>
        )}

        <main className="flex-1 overflow-y-auto p-4 pb-20 sm:p-6 lg:pb-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
