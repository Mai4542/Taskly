import { useEffect, useRef } from 'react';
import { Left } from '../../components/icons/Left';
import { Right } from '../../components/icons/Right';
import { usePaginationRange } from '../../hooks/usePaginationRange';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalCount?: number;
  itemsShown?: number;
  itemsLabel?: string;
  isMobile?: boolean;
  hasMore?: boolean;
  loadingMore?: boolean;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  onPageChange: (page: number) => void;
  onNext?: () => void;
  onPrev?: () => void;
  onLoadMore?: () => void;
  infiniteScroll?: boolean;
  scrollContainerRef?: React.RefObject<HTMLElement>;
  variant?: 'default' | 'compact' | 'simple';
}

export default function Pagination({
  currentPage,
  totalPages,
  totalCount,
  itemsShown,
  itemsLabel = 'items',
  isMobile = false,
  hasMore = false,
  loadingMore = false,
  hasNextPage = currentPage < totalPages,
  hasPreviousPage = currentPage > 1,
  onPageChange,
  onNext,
  onPrev,
  onLoadMore,
  infiniteScroll = false,
  scrollContainerRef,
  variant = 'default',
}: PaginationProps) {
  const pages = usePaginationRange(currentPage, totalPages);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!infiniteScroll || !onLoadMore) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore) {
          onLoadMore();
        }
      },
      {
        root: scrollContainerRef?.current || null,
        rootMargin: '200px',
      },
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => observer.disconnect();
  }, [infiniteScroll, hasMore, loadingMore, onLoadMore, scrollContainerRef]);

  if (infiniteScroll || (isMobile && infiniteScroll)) {
    return (
      <>
        <div ref={sentinelRef} className="h-1" />
        {loadingMore && (
          <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          </div>
        )}
        {!hasMore && totalCount && (
          <p className="text-center text-neutral-medium text-[13px] py-4">
            Showing all {totalCount} {itemsLabel}
          </p>
        )}
      </>
    );
  }

  if (isMobile) {
    return (
      <>
        {loadingMore && (
          <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          </div>
        )}
        {!hasMore && totalCount && (
          <p className="text-center text-neutral-medium text-[13px] py-4">
            Showing all {totalCount} {itemsLabel}
          </p>
        )}
      </>
    );
  }

  if (variant === 'simple') {
    return (
      <div className="flex items-center justify-end gap-3 px-4 py-3">
        <button
          type="button"
          onClick={onPrev || (() => onPageChange(currentPage - 1))}
          disabled={!hasPreviousPage}
          aria-label="Previous page"
          className="cursor-pointer flex h-6 w-6 items-center justify-center rounded text-neutral-medium disabled:cursor-not-allowed disabled:opacity-40 hover:bg-surface-low"
        >
          <Left size={6} color="#434654" />
        </button>

        <span className="text-[13px] text-neutral-medium">
          Page {currentPage} of {totalPages}
        </span>

        <button
          type="button"
          onClick={onNext || (() => onPageChange(currentPage + 1))}
          disabled={!hasNextPage}
          aria-label="Next page"
          className="cursor-pointer flex h-6 w-6 items-center justify-center rounded text-neutral-medium disabled:cursor-not-allowed disabled:opacity-40 hover:bg-surface-low"
        >
          <Right size={6} color="#434654" />
        </button>
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col sm:flex-row items-center justify-between gap-3 ${variant === 'compact' ? 'mt-4' : 'mt-6'}`}
    >
      <span className="text-sm text-neutral-medium">
        Showing {itemsShown || currentPage * 10} of {totalCount} {itemsLabel}
      </span>

      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={onPrev || (() => onPageChange(currentPage - 1))}
          disabled={!hasPreviousPage}
          aria-label="Previous page"
          className="flex h-8 w-8 items-center justify-center rounded-md text-neutral-medium disabled:cursor-not-allowed disabled:opacity-50 hover:bg-surface-low"
        >
          <Left size={5} color="#434654" />
        </button>

        {pages.map((page, index) =>
          page === '...' ? (
            <span
              key={`ellipsis-${index}`}
              className="flex h-8 w-8 items-center justify-center text-neutral-medium text-[13px]"
            >
              ...
            </span>
          ) : (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page as number)}
              className={`flex h-8 w-8 items-center justify-center rounded-md text-[13px] ${
                currentPage === page
                  ? 'bg-primary text-white'
                  : 'text-neutral-medium hover:bg-surface-low'
              }`}
            >
              {page}
            </button>
          ),
        )}

        <button
          type="button"
          onClick={onNext || (() => onPageChange(currentPage + 1))}
          disabled={!hasNextPage}
          aria-label="Next page"
          className="flex h-8 w-8 items-center justify-center rounded-md text-neutral-medium disabled:cursor-not-allowed disabled:opacity-50 hover:bg-surface-low"
        >
          <Right size={5} color="#434654" />
        </button>
      </div>
    </div>
  );
}
