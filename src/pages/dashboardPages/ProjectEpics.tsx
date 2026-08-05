import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Breadcrumb from '../../components/common/Breadcrumb';
import ErrorState from '../../components/common/ErrorState';
import EpicCard from '../../components/dashboard/epics/EpicCard';
import EpicsSkeleton from '../../components/dashboard/epics/EpicsSkeleton';
import EpicsEmptyState from '../../components/dashboard/epics/EpicsEmptyState';
import EpicsPagination from '../../components/dashboard/epics/EpicsPagination';
import { useProjects } from '../../hooks/useProjects';
import { APP_ROUTES } from '../../constants/router';
import type { Epic } from '../../types/epic.type';

import { getProjectEpicsPaginated } from '../../services/epics.service';
import type { PaginatedResponse } from '../../types/epic.type';

export default function ProjectEpicsPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { projects } = useProjects();
  const project = projects.find((p) => p.id === projectId);

  const [epics, setEpics] = useState<Epic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const PAGE_SIZE = isMobile && totalCount > 0 ? totalCount : 6;

  const fetchEpics = useCallback(async () => {
    if (!projectId) return;

    setLoading(true);
    setError(null);

    try {
      const response: PaginatedResponse<Epic> = await getProjectEpicsPaginated(
        projectId,
        {
          page: currentPage,
          limit: PAGE_SIZE,
        },
      );
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
  }, [projectId, currentPage, PAGE_SIZE]);

  useEffect(() => {
    fetchEpics();
  }, [fetchEpics]);

  useEffect(() => {
    if (isMobile && totalCount > 0) {
      setCurrentPage(1);
    }
  }, [isMobile, totalCount]);

  const filteredEpics = epics.filter(
    (epic) =>
      epic.title.toLowerCase().includes(search.toLowerCase()) ||
      epic.epic_id.toLowerCase().includes(search.toLowerCase()),
  );

  const isEmpty = !loading && !error && totalCount === 0;
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background px-8 py-6 ">
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

      {!isEmpty && (
        <div className=" mb-6 flex flex-wrap items-center justify-between gap-4">
          <h1 className="headline-lg text-neutral-high">Project Epics</h1>

          <div className="flex items-center gap-3">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search epics..."
              className="input-default !w-64"
            />
            <button
              type="button"
              onClick={() => navigate('new')}
              className="btn-primary !w-auto whitespace-nowrap px-5"
            >
              + New Epic
            </button>
          </div>
        </div>
      )}

      {loading && <EpicsSkeleton />}

      {!loading && error && <ErrorState message={error} onRetry={fetchEpics} />}

      {isEmpty && <EpicsEmptyState />}

      {!loading && !error && epics.length > 0 && (
        <>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mb-15">
            {filteredEpics.map((epic) => (
              <EpicCard key={epic.id} epic={epic} />
            ))}
          </div>

          {!isMobile && (
            <EpicsPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
}
