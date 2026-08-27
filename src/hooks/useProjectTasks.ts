import { useState, useEffect, useCallback, useRef } from 'react';
import { getProjectTasksPaginated } from '../services/tasks.service';
import type { TaskListItem } from '../services/tasks.service';

type Status = 'loading' | 'error' | 'success';

const DEFAULT_LIMIT = 10;

export function useProjectTasks(projectId: string | undefined) {
  const [tasks, setTasks] = useState<TaskListItem[]>([]); // ✅ TaskListItem[]
  const [status, setStatus] = useState<Status>('loading');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const isFetchingRef = useRef(false);

  const fetchTasks = useCallback(
    async (page: number = 1, append: boolean = false) => {
      if (!projectId || isFetchingRef.current) return;

      isFetchingRef.current = true;

      if (append) {
        setLoadingMore(true);
      } else {
        setStatus('loading');
      }

      try {
        const response = await getProjectTasksPaginated(projectId, {
          page,
          limit: DEFAULT_LIMIT,
        });

        // ✅ البيانات من الـ API هي TaskListItem[] بالفعل
        const taskListItems: TaskListItem[] = Array.isArray(response.data)
          ? response.data
          : [];

        setTasks((prev) =>
          append ? [...prev, ...taskListItems] : taskListItems,
        );
        setTotalCount(response.totalCount);
        setTotalPages(Math.ceil(response.totalCount / DEFAULT_LIMIT));
        setCurrentPage(page);
        setHasMore(response.hasMore);
        setStatus('success');
      } catch (err) {
        console.error('Error fetching project tasks:', err);
        if (!append) {
          setStatus('error');
        }
      } finally {
        setLoadingMore(false);
        isFetchingRef.current = false;
      }
    },
    [projectId],
  );

  useEffect(() => {
    fetchTasks(1, false);
  }, [fetchTasks]);

  const setPage = useCallback(
    (page: number) => {
      if (page < 1 || page > totalPages) return;
      fetchTasks(page, false);
    },
    [fetchTasks, totalPages],
  );

  const nextPage = useCallback(() => {
    if (currentPage < totalPages) {
      fetchTasks(currentPage + 1, false);
    }
  }, [fetchTasks, currentPage, totalPages]);

  const prevPage = useCallback(() => {
    if (currentPage > 1) {
      fetchTasks(currentPage - 1, false);
    }
  }, [fetchTasks, currentPage]);

  const loadMore = useCallback(() => {
    if (hasMore && !isFetchingRef.current) {
      fetchTasks(currentPage + 1, true);
    }
  }, [fetchTasks, currentPage, hasMore]);

  const retry = useCallback(() => {
    fetchTasks(currentPage, false);
  }, [fetchTasks, currentPage]);

  return {
    tasks,
    status,
    retry,
    currentPage,
    totalPages,
    totalCount,
    setPage,
    nextPage,
    prevPage,
    loadMore,
    loadingMore,
    hasMore,
    hasNextPage: currentPage < totalPages,
    hasPreviousPage: currentPage > 1,
  };
}
