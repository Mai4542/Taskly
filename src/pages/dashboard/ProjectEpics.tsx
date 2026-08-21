import { useEffect, useState, useCallback, useRef } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';

import Breadcrumb from '../../components/common/Breadcrumb';
import ErrorState from '../../components/common/ErrorState';
import EpicCard from '../../components/dashboard/epics/EpicCard';
import EpicsSkeleton from '../../components/dashboard/epics/EpicsSkeleton';
import EpicsEmptyState from '../../components/dashboard/epics/EpicsEmptyState';
import EpicsPagination from '../../components/dashboard/epics/EpicsPagination';
import { useProjects } from '../../hooks/useProjects';
import { APP_ROUTES } from '../../constants/router';
import type { Epic } from '../../types/epic.type';

import {
  getProjectEpicsPaginated,
  searchProjectEpics,
} from '../../services/epics.service';
import type { PaginatedResponse } from '../../types/epic.type';
import EpicDetailsPopup from '../../components/dashboard/epics/EpicDetailsPopup';
import searchIcon from '../../assets/imgs/search.svg';

export default function ProjectEpicsPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { projects } = useProjects();
  const project = projects.find((p) => p.id === projectId);

  const [epics, setEpics] = useState<Epic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  const currentPage = parseInt(searchParams.get('page') || '1');
  const [totalCount, setTotalCount] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);
  const [selectedEpic, setSelectedEpic] = useState<Epic | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (searchParams.has('page')) {
      window.history.replaceState(null, '', window.location.href);
    }
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handlePageChange = useCallback(
    (page: number) => {
      setSearchParams({ page: page.toString() }, { replace: true });
      topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    },
    [setSearchParams],
  );

  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      if (currentPage !== 1) {
        handlePageChange(1);
      }
    }, 400);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [searchTerm, currentPage, handlePageChange]);

  const PAGE_SIZE = isMobile && totalCount > 0 ? totalCount : 6;

  const fetchEpics = useCallback(async () => {
    if (!projectId) return;

    setLoading(true);
    setError(null);

    try {
      let response: PaginatedResponse<Epic>;

      if (debouncedSearchTerm.trim()) {
        response = await searchProjectEpics(projectId, {
          page: currentPage,
          limit: PAGE_SIZE,
          searchTerm: debouncedSearchTerm,
        });
      } else {
        response = await getProjectEpicsPaginated(projectId, {
          page: currentPage,
          limit: PAGE_SIZE,
        });
      }

      setEpics(response.data);
      setTotalCount(response.totalCount);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to load epics. Please check your connection and try again.',
      );
    } finally {
      setLoading(false);
    }
  }, [projectId, currentPage, PAGE_SIZE, debouncedSearchTerm]);

  useEffect(() => {
    fetchEpics();
  }, [fetchEpics]);

  useEffect(() => {
    if (isMobile && totalCount > 0 && currentPage !== 1) {
      handlePageChange(1);
    }
  }, [isMobile, totalCount, currentPage, handlePageChange]);

  const handleEpicClick = (epic: Epic) => {
    setSelectedEpic(epic);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedEpic(null);
  };

  const handleEpicUpdated = (updated: Epic) => {
    setEpics((prev) =>
      prev.map((e) => (e.id === updated.id ? { ...e, ...updated } : e)),
    );
    setSelectedEpic((prev) =>
      prev && prev.id === updated.id ? { ...prev, ...updated } : prev,
    );
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  const isSearching = debouncedSearchTerm.trim().length > 0;
  const isEmpty = !loading && !error && totalCount === 0;
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  if (loading) {
    return (
      <div ref={topRef} className="min-h-screen bg-background px-8 py-6">
        <EpicsSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div ref={topRef} className="min-h-screen bg-background px-8 py-6">
        <ErrorState message={error} onRetry={fetchEpics} />
      </div>
    );
  }

  if (isEmpty && !isSearching) {
    return <EpicsEmptyState />;
  }

  return (
    <div ref={topRef} className="min-h-screen bg-background px-8 py-6">
      {!isEmpty && (
        <Breadcrumb
          items={[
            { label: 'Projects', to: APP_ROUTES.dashboard.projects.root },
            {
              label: project?.name ?? 'Project',
              to: projectId ? `/project/${projectId}` : undefined,
            },
            { label: 'Epics' },
          ]}
        />
      )}

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="headline-lg text-neutral-high">Project Epics</h1>

        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search epics..."
              className="input-default !w-68 pl-10"
              style={{ transition: 'none' }}
            />
            <img
              src={searchIcon}
              alt="search"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-neutral-low hover:text-neutral-medium"
                style={{ transition: 'none' }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 4L4 12M4 4L12 12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={() => navigate('new')}
            className="btn-primary !w-auto whitespace-nowrap px-5"
          >
            + New Epic
          </button>
        </div>
      </div>

      {isEmpty && isSearching && (
        <div className="flex flex-col items-center gap-3 py-12">
          <p className="body-md text-neutral-medium text-center">
            No epics found matching your search
          </p>
        </div>
      )}

      {!loading && !error && epics.length > 0 && (
        <>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mb-15">
            {epics.map((epic) => (
              <EpicCard key={epic.id} epic={epic} onClick={handleEpicClick} />
            ))}
          </div>

          {!isMobile && totalPages > 1 && (
            <EpicsPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}

      {isPopupOpen && selectedEpic && projectId && (
        <EpicDetailsPopup
          projectId={projectId}
          epicId={selectedEpic.id}
          onClose={handleClosePopup}
          onUpdated={handleEpicUpdated}
        />
      )}
    </div>
  );
}
