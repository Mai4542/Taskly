import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { getInitials } from '../../utils/avatar';
import menu from '../../assets/imgs/burger.svg';

interface DashboardNavbarProps {
  onMenuClick: () => void;
  onLogout: () => void;
}

export default function DashboardNavbar({
  onMenuClick,
  onLogout,
}: DashboardNavbarProps) {
  const { user, isLoading } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-background! flex h-16 w-full shrink-0 items-center justify-between border-b border-surface-highest bg-white px-4 sm:px-6">
      <div className="flex items-center gap-3 lg:hidden">
        <button type="button" onClick={onMenuClick} aria-label="Open menu">
          <img src={menu} alt="Menu" className="h-[15px] w-[18px]" />
        </button>
        <div className="flex items-center gap-2">
          <span className="text-neutral-high! text-[20px] font-bold font-main">
            TASKLY
          </span>
        </div>
      </div>

      <div className="hidden lg:block" />

      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          {isLoading ? (
            <div className="hidden sm:flex sm:flex-col sm:items-end sm:gap-1.5">
              <div className="h-3.5 w-24 animate-pulse rounded bg-surface-low" />
              <div className="h-3 w-20 animate-pulse rounded bg-surface-low" />
            </div>
          ) : (
            <div className="hidden sm:flex sm:flex-col sm:items-end">
              <span className="label-sm text-neutral-high!">{user?.name}</span>
              {user?.jobTitle && (
                <span className="label-sm! uppercase tracking-wide text-primary-container">
                  {user.jobTitle}
                </span>
              )}
            </div>
          )}
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary-container hover:bg-primary-container/90 transition-colors cursor-pointer">
            <span className="text-[16px] text-white">
              {isLoading ? '' : getInitials(user?.name)}
            </span>
          </div>
          <svg
            className={`hidden sm:block h-4 w-4 text-neutral-medium transition-transform ${
              isDropdownOpen ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-56 rounded-md bg-white shadow-lg border border-surface-highest z-50 py-1">
            <div className="px-4 py-3 border-b border-surface-highest">
              <p className="text-sm font-semibold text-neutral-high">
                {user?.name}
              </p>
              {user?.jobTitle && (
                <p className="text-xs text-neutral-medium mt-0.5">
                  {user.jobTitle}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={() => {
                setIsDropdownOpen(false);
                onLogout();
              }}
              className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-error hover:bg-surface-low transition-colors"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}