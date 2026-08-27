import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '../../hooks/useIsMobile';
import { paginationProjectsAPI } from '../../services/projects.service';
import type { Project } from '../../services/projects.service';
import ProjectCard from '../../components/dashboard/projects/ProjectCard';
import ProjectsSkeleton from '../../components/dashboard/projects/ProjectsSkeleton';
import ProjectsEmptyState from '../../components/dashboard/projects/ProjectsEmptyState';
import ErrorState from '../../components/common/ErrorState';
import Pagination from '../../components/common/Pagination';
import { APP_ROUTES } from '../../constants/router';
import { Add2 } from '../../components/icons/Add2';
import { Add } from '../../components/icons/Add';

const LIMIT = 10;

export default function Projects() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const [projects, setProjects] = useState<Project[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isFetchingRef = useRef(false);
  const hasLoadedOnce = useRef(false);

  const totalPages = Math.ceil(totalCount / LIMIT);
  const hasNextPage = currentPage < totalPages;
  const hasPreviousPage = currentPage > 1;
  const hasMore = projects.length < totalCount;

  const fetchProjects = useCallback(async (page: number, append: boolean) => {
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;

    if (append) {
      setLoadingMore(true);
    } else {
      setLoading(true);
    }
    setError(null);

    try {
      const result = await paginationProjectsAPI({ page, limit: LIMIT });

      setProjects((prev) => (append ? [...prev, ...result.data] : result.data));
      setTotalCount(result.totalCount);
      setCurrentPage(page);
    } catch (err) {
      setError('Failed to load projects');
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
      isFetchingRef.current = false;
      hasLoadedOnce.current = true;
    }
  }, []);

  useEffect(() => {
    fetchProjects(1, false);
  }, [isMobile]);

  const setPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    fetchProjects(page, false);
  };

  const nextPage = () => {
    if (hasNextPage) fetchProjects(currentPage + 1, false);
  };

  const prevPage = () => {
    if (hasPreviousPage) fetchProjects(currentPage - 1, false);
  };

  const loadMore = () => {
    if (!isFetchingRef.current && hasMore) {
      fetchProjects(currentPage + 1, true);
    }
  };

  const refetch = () => {
    fetchProjects(isMobile ? 1 : currentPage, false);
  };

  const status: 'loading' | 'error' | 'empty' | 'success' = loading
    ? 'loading'
    : error
      ? 'error'
      : projects.length === 0
        ? 'empty'
        : 'success';

  return (
    <div className="p-6">
      {status !== 'error' && status !== 'empty' && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="headline-lg text-neutral-high">Projects</h1>
            <p className="body-md text-neutral-medium">
              Manage and curate your projects
            </p>
          </div>

          {status === 'success' && (
            <button
              type="button"
              onClick={() => navigate(APP_ROUTES.dashboard.projects.add)}
              className="btn-primary inline-flex items-center gap-2 shrink-0 w-53.5"
            >
              <Add size={20} color="#fff" />
              Create New Project
            </button>
          )}
        </div>
      )}

      {status === 'loading' && <ProjectsSkeleton />}

      {status === 'error' && (
        <ErrorState
          message="We're having trouble retrieving your projects right now. Please try again in a moment."
          onRetry={refetch}
        />
      )}

      {status === 'empty' && <ProjectsEmptyState />}

      {status === 'success' && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}

            <button
              type="button"
              onClick={() => navigate(APP_ROUTES.dashboard.projects.add)}
              className="cursor-pointer rounded-xl border-2 border-dashed border-[#C3C6D633]/80 flex flex-col items-center justify-center gap-2 py-8 transition-all duration-300 bg-white hover:bg-[#F8F9FC] hover:border-[#0052CC]/40 hover:shadow-lg hover:shadow-[#0052CC]/10 hover:-translate-y-1 active:translate-y-0.5 active:shadow-sm max-w-78.5 h-55"
            >
              <span className="flex h-12 w-12 rounded-lg items-center justify-center bg-[#F1F3FF] transition-colors duration-300">
                <Add2 size={20} color="#041B3C" />
              </span>
              <span className="text-[#434654] text-[14px] font-semibold transition-colors duration-300">
                ADD PROJECT
              </span>
            </button>
          </div>

          <div className="relative bottom-2">
            <Pagination
              isMobile={isMobile}
              currentPage={currentPage}
              totalPages={totalPages}
              totalCount={totalCount}
              itemsShown={projects.length}
              onPageChange={setPage}
              onNext={nextPage}
              onPrev={prevPage}
              hasNextPage={hasNextPage}
              hasPreviousPage={hasPreviousPage}
              hasMore={hasMore}
              loadingMore={loadingMore}
              onLoadMore={loadMore}
              itemsLabel="active projects"
            />
          </div>
        </>
      )}
    </div>
  );
}
