import { useEffect, useRef } from 'react';
import { Left } from '../../../components/icons/Left';
import { Right } from '../../../components/icons/Right';
import LoadingSpinner from '../../common/LoadingSpinner';

interface ProjectsPaginationProps {
  isMobile: boolean;
  currentPage: number;
  totalPages: number;
  totalCount: number;
  itemsShown: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  onNext: () => void;
  onPrev: () => void;
  onSetPage: (page: number) => void;
  hasMore: boolean;
  loadingMore: boolean;
  onLoadMore: () => void;
}

export default function ProjectsPagination({
  isMobile,
  currentPage,
  totalPages,
  totalCount,
  itemsShown,
  hasNextPage,
  hasPreviousPage,
  onNext,
  onPrev,
  onSetPage,
  hasMore,
  loadingMore,
  onLoadMore,
}: ProjectsPaginationProps) {
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isMobile || !sentinelRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore) {
          onLoadMore();
        }
      },
      { rootMargin: '200px' },
    );

    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [isMobile, hasMore, loadingMore, onLoadMore]);

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);

      if (currentPage < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  };

  if (isMobile) {
    return (
      <>
        <div ref={sentinelRef} className="h-1" />
        {loadingMore && (
          <div className="flex justify-center py-4">
            <LoadingSpinner />
          </div>
        )}
        {!hasMore && (
          <p className="text-center text-neutral-medium text-[13px] py-4">
            Showing all {totalCount} projects
          </p>
        )}
      </>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-6">
      <span className="body-md text-neutral-medium text-[13px]">
        Showing {itemsShown} of {totalCount} active projects
      </span>

      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={onPrev}
          disabled={!hasPreviousPage}
          aria-label="Previous page"
          className="flex h-8 w-8 items-center justify-center rounded-md text-neutral-low disabled:cursor-not-allowed disabled:opacity-50 hover:bg-surface-low"
        >
          <Left size={5} color="#434654" />
        </button>

        {getPageNumbers().map((page, index) =>
          page === '...' ? (
            <span
              key={`ellipsis-${index}`}
              className="flex h-8 w-8 items-center justify-center text-neutral-medium body-md text-[13px]"
            >
              ...
            </span>
          ) : (
            <button
              key={page}
              type="button"
              onClick={() => onSetPage(page as number)}
              className={`flex h-8 w-8 items-center justify-center rounded-md body-md text-[13px] ${
                currentPage === page
                  ? 'bg-primary-container text-white'
                  : 'text-neutral-medium hover:bg-surface-low'
              }`}
            >
              {page}
            </button>
          ),
        )}

        <button
          type="button"
          onClick={onNext}
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
