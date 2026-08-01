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

import { getProjectEpics } from '../../services/epics.service';
import type { Epic } from '../../types/epic.type';

export default function ProjectEpicsPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { projects } = useProjects();
  const project = projects.find((p) => p.id === projectId);

  const [epics, setEpics] = useState<Epic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const fetchEpics = useCallback(async () => {
    if (!projectId) return;

    setLoading(true);
    setError(null);

    try {
      const data = await getProjectEpics(projectId);
      setEpics(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to load epics. Please check your connection and try again.',
      );
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    fetchEpics();
  }, [fetchEpics]);

  const filteredEpics = epics.filter(
    (epic) =>
      epic.title.toLowerCase().includes(search.toLowerCase()) ||
      epic.epic_id.toLowerCase().includes(search.toLowerCase()),
  );

  const isEmpty = !loading && !error && epics.length === 0;

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
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 ">
            {filteredEpics.map((epic) => (
              <EpicCard key={epic.id} epic={epic} />
            ))}
          </div>

          <EpicsPagination shown={filteredEpics.length} total={epics.length} />
        </>
      )}
    </div>
  );
}