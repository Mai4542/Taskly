import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

interface UseDebouncedSearchParamOptions {
  paramKey?: string;
  pageKey?: string;
  delay?: number;
}

export function useDebouncedSearchParam({
  paramKey = 'q',
  pageKey = 'page',
  delay = 400,
}: UseDebouncedSearchParamOptions = {}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlSearchTerm = searchParams.get(paramKey) || '';
  const [searchInput, setSearchInput] = useState(urlSearchTerm);

  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const committedSearchRef = useRef(urlSearchTerm);

  useEffect(() => {
    committedSearchRef.current = urlSearchTerm;
  }, [urlSearchTerm]);

  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      const trimmed = searchInput.trim();

      if (trimmed === committedSearchRef.current) return;

      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          if (trimmed) next.set(paramKey, trimmed);
          else next.delete(paramKey);
          next.set(pageKey, '1');
          return next;
        },
        { replace: true },
      );
    }, delay);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [searchInput]);

  const clearSearch = () => setSearchInput('');

  return {
    searchInput,
    setSearchInput,
    urlSearchTerm,
    isSearching: urlSearchTerm.trim().length > 0,
    clearSearch,
  };
}
