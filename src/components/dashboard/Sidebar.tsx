import { NavLink } from 'react-router-dom';
import left from '../../assets/imgs/left.svg';
import right from '../../assets/imgs/right.svg';
import logoutIcon from '../../assets/imgs/Logout.svg';
import logo from '../../assets/imgs/Logo.svg';
import { getNavItems } from '../../constants/navigation';

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
  onLogout: () => void;
  selectedProjectId?: string | null;
}

function Logo({ collapsed }: { collapsed?: boolean }) {
  return (
    <div
      className={`flex items-center gap-2 px-4 py-5 ${collapsed ? 'justify-center px-0' : ''}`}
    >
      <img src={logo} alt="Logo" className="h-[20px] w-[18px] shrink-0" />
      {!collapsed && (
        <span className="text-neutral-high! text-xl! font-bold font-main">
          TASKLY
        </span>
      )}
    </div>
  );
}

function NavLinks({
  collapsed,
  selectedProjectId,
}: {
  collapsed?: boolean;
  selectedProjectId?: string | null;
}) {
  const navItems = getNavItems(selectedProjectId);

  return (
    <nav className="flex flex-1 flex-col gap-1 px-3">
      {navItems.map(({ label, path, icon, end }) => (
        <NavLink
          key={path}
          to={path}
          end={end}
          className={({ isActive }) =>
            [
              'flex items-center gap-3 rounded-md py-2.5 transition-colors',
              collapsed ? 'justify-center px-0' : 'px-3',
              isActive
                ? 'bg-white text-primary-container'
                : 'text-neutral-high hover:bg-white',
            ].join(' ')
          }
        >
          <img src={icon} alt={label} className="h-[18px] w-[21px] shrink-0" />
          {!collapsed && (
            <span className="body-md text-primary text-semibold!">{label}</span>
          )}
        </NavLink>
      ))}
    </nav>
  );
}

function BottomActions({
  collapsed,
  onToggleCollapse,
  onLogout,
  showCollapseToggle = true,
}: {
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  onLogout: () => void;
  showCollapseToggle?: boolean;
}) {
  return (
    <div className="mt-auto px-3 py-4 bg-background">
      {showCollapseToggle && onToggleCollapse && (
        <button
          type="button"
          onClick={onToggleCollapse}
          className={`flex w-full items-center gap-3 rounded-md py-2.5 text-neutral-medium hover:bg-white ${
            collapsed ? 'justify-center px-0' : 'px-3'
          }`}
        >
          {collapsed ? (
            <img src={right} alt="Expand" className="h-[17px] w-[12px]" />
          ) : (
            <img src={left} alt="Collapse" className="h-[17px] w-[12px]" />
          )}
          {!collapsed && (
            <span className="text-[14px] text-primary text-bold!">
              Collapse
            </span>
          )}
        </button>
      )}
      <button
        type="button"
        onClick={onLogout}
        className={`flex w-full items-center gap-3 rounded-md py-2.5 text-error hover:bg-white ${
          collapsed ? 'justify-center px-0' : 'px-3'
        }`}
      >
        <img src={logoutIcon} alt="Logout" className="h-[18px] w-[18px]" />
        {!collapsed && <span className="body-md">Logout</span>}
      </button>
    </div>
  );
}

export default function Sidebar({
  collapsed,
  onToggleCollapse,
  mobileOpen,
  onCloseMobile,
  onLogout,
  selectedProjectId,
}: SidebarProps) {
  const navItems = getNavItems(selectedProjectId);

  return (
    <>
      <aside
        className={`hidden shrink-0 flex-col border-r border-surface-highest bg-surface-low! transition-[width] duration-200 lg:flex ${
          collapsed ? 'w-20' : 'w-56'
        }`}
      >
        <Logo collapsed={collapsed} />
        <NavLinks collapsed={collapsed} selectedProjectId={selectedProjectId} />
        <BottomActions
          collapsed={collapsed}
          onToggleCollapse={onToggleCollapse}
          onLogout={onLogout}
        />
      </aside>

      <div
        className={`fixed inset-0 z-40 lg:hidden ${mobileOpen ? '' : 'pointer-events-none'}`}
        aria-hidden={!mobileOpen}
      >
        <div
          className={`absolute inset-0 bg-neutral-high/40 transition-opacity duration-200 ${
            mobileOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={onCloseMobile}
        />
        <aside
          className={`absolute inset-y-0 left-0 flex w-64 flex-col bg-background shadow-xl transition-transform duration-200 ${
            mobileOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between px-4 py-5">
            <div className="flex items-center gap-2">
              <img src={logo} alt="Logo" className="h-6 w-6" />
              <span className="title-md tracking-wide text-primary-container">
                TASKLY
              </span>
            </div>
          </div>
          <NavLinks selectedProjectId={selectedProjectId} />
          <BottomActions onLogout={onLogout} showCollapseToggle={false} />
        </aside>
      </div>

      {!mobileOpen && (
        <nav className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-around border-t border-surface-highest bg-white py-2 lg:hidden">
          {navItems.map(({ shortLabel, path, icon }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                [
                  'flex flex-col items-center gap-1 px-2 py-1',
                  isActive ? 'text-primary-container' : 'text-neutral-medium',
                ].join(' ')
              }
            >
              <img src={icon} alt={shortLabel || 'icon'} className="h-5 w-5" />
              <span className="label-sm">{shortLabel}</span>
            </NavLink>
          ))}
        </nav>
      )}
    </>
  );
}
