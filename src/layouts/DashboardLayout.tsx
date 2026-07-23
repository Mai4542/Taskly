import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom'; 
import { useAuth } from '../hooks/useAuth';
import Sidebar from '../components/dashboard/Sidebar';
import DashboardNavbar from '../components/dashboard/Navbar';

const COLLAPSE_STORAGE_KEY = 'taskly:sidebar-collapsed';

export default function DashboardLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate(); 
  const [collapsed, setCollapsed] = useState(
    () => localStorage.getItem(COLLAPSE_STORAGE_KEY) === 'true',
  );
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(COLLAPSE_STORAGE_KEY, String(collapsed));
  }, [collapsed]);

  async function handleLogout() {
    try {
      await logout();
      navigate('/login', { replace: true }); 
    } catch (error) {
      navigate('/login', { replace: true });
      console.error('Logout API failed:', error);
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

        <main className="flex-1 overflow-y-auto p-4 pb-20 sm:p-6 lg:pb-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}