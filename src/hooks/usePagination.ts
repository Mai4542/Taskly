import { useState, useEffect, useCallback, useRef } from 'react';
import { paginationProjectsAPI } from '../services/projects.service';
import type { Project, PaginatedResponse } from '../services/projects.service';
import { getPaginationInfo, isValidPage } from '../utils/pagination.utils';

interface UsePaginationOptions {
  limit?: number;
  initialPage?: number;
  mode?: 'pagination' | 'infinite';
}

interface UsePaginationReturn {
  projects: Project[];
  currentPage: number;
  totalCount: number;
  totalPages: number;
  loading: boolean;
  loadingMore: boolean;
  error: string | null;
  setPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  loadMore: () => void;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  hasMore: boolean;
  refetch: () => void;
}

export function usePagination({
  limit = 10,
  initialPage = 1,
  mode = 'pagination',
}: UsePaginationOptions = {}): UsePaginationReturn {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isFetchingRef = useRef(false);

  const { totalPages, hasNextPage, hasPreviousPage } = getPaginationInfo(
    totalCount,
    limit,
  );

  const fetchProjects = useCallback(
    async (page: number, append: boolean) => {
      if (isFetchingRef.current) return;
      isFetchingRef.current = true;

      append ? setLoadingMore(true) : setLoading(true);
      setError(null);

      try {
        const result: PaginatedResponse<Project> = await paginationProjectsAPI({
          page,
          limit,
        });

        setProjects((prev) =>
          append ? [...prev, ...result.data] : result.data,
        );
        setTotalCount(result.totalCount);
        setCurrentPage(page);
      } catch (err) {
        setError('Failed to load projects');
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
        setLoadingMore(false);
        isFetchingRef.current = false;
      }
    },
    [limit],
  );

  useEffect(() => {
    fetchProjects(1, false);
  }, [limit, mode]);

  const setPage = useCallback(
    (page: number) => {
      if (isValidPage(page, totalPages)) {
        fetchProjects(page, false);
      }
    },
    [totalPages, fetchProjects],
  );

  const nextPage = useCallback(() => {
    if (hasNextPage(currentPage)) {
      fetchProjects(currentPage + 1, false);
    }
  }, [hasNextPage, currentPage, fetchProjects]);

  const prevPage = useCallback(() => {
    if (hasPreviousPage(currentPage)) {
      fetchProjects(currentPage - 1, false);
    }
  }, [hasPreviousPage, currentPage, fetchProjects]);

  const loadMore = useCallback(() => {
    if (!isFetchingRef.current && projects.length < totalCount) {
      fetchProjects(currentPage + 1, true);
    }
  }, [projects.length, totalCount, currentPage, fetchProjects]);

  const refetch = useCallback(() => {
    fetchProjects(mode === 'infinite' ? 1 : currentPage, false);
  }, [currentPage, fetchProjects, mode]);

  return {
    projects,
    currentPage,
    totalCount,
    totalPages,
    loading,
    loadingMore,
    error,
    setPage,
    nextPage,
    prevPage,
    loadMore,
    hasNextPage: hasNextPage(currentPage),
    hasPreviousPage: hasPreviousPage(currentPage),
    hasMore: projects.length < totalCount,
    refetch,
  };
}
