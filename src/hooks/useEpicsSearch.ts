import { useState, useEffect, useCallback, useRef } from 'react';
import { searchProjectEpics, type Epic } from '../services/epics.service';

interface UseEpicsSearchProps {
  projectId: string | undefined;
}

interface UseEpicsSearchReturn {
  epics: Epic[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  page: number;
  setPage: (page: number) => void;
  totalCount: number;
  totalPages: number;
  pageSize: number;
  hasMore: boolean;
  retry: () => void;
}

export const useEpicsSearch = ({
  projectId,
}: UseEpicsSearchProps): UseEpicsSearchReturn => {
  const [epics, setEpics] = useState<Epic[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const requestIdRef = useRef(0);

  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setPage(1);
    }, 400);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [searchTerm]);

  const fetchEpics = useCallback(async () => {
    if (!projectId) {
      setEpics([]);
      setTotalCount(0);
      setTotalPages(0);
      setHasMore(false);
      return;
    }

    const currentRequestId = ++requestIdRef.current;
    setLoading(true);
    setError(null);

    try {
      const response = await searchProjectEpics(projectId, {
        page,
        limit: pageSize,
        searchTerm: debouncedSearchTerm,
      });

      if (currentRequestId !== requestIdRef.current) {
        return;
      }

      setEpics(response.data);
      setTotalCount(response.totalCount);
      setTotalPages(Math.ceil(response.totalCount / pageSize));
      setHasMore(response.hasMore);
    } catch (err) {
      if (currentRequestId !== requestIdRef.current) {
        return;
      }
      setError('Failed to search epics');
      setEpics([]);
      setTotalCount(0);
      setTotalPages(0);
      setHasMore(false);
    } finally {
      if (currentRequestId === requestIdRef.current) {
        setLoading(false);
      }
    }
  }, [projectId, debouncedSearchTerm, page, pageSize]);

  useEffect(() => {
    fetchEpics();
  }, [fetchEpics]);

  useEffect(() => {
    return () => {
      requestIdRef.current++;
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  const retry = useCallback(() => {
    fetchEpics();
  }, [fetchEpics]);

  return {
    epics,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    page,
    setPage,
    totalCount,
    totalPages,
    pageSize,
    hasMore,
    retry,
  };
};
