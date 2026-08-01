interface EpicsPaginationProps {
  shown: number;
  total: number;
  currentPage?: number;
  totalPages?: number;
}

export default function EpicsPagination({
  shown,
  total,
  currentPage = 1,
  totalPages = 2,
}: EpicsPaginationProps) {
  return (
    <div className="mt-6 mb-15 flex items-center justify-between text-[12px] text-neutral-medium">
      <span>
        Showing {shown} of {total} epics
      </span>

      <div className="flex items-center gap-1">
        <button
          type="button"
          className="flex h-7 w-7 items-center justify-center rounded text-neutral-medium hover:bg-surface-low disabled:opacity-40"
          disabled={currentPage <= 1}
        >
          ‹
        </button>

        {Array.from({ length: totalPages }).map((_, i) => {
          const page = i + 1;
          const isActive = page === currentPage;
          return (
            <button
              key={page}
              type="button"
              className={`flex h-7 w-7 items-center justify-center rounded font-semibold ${
                isActive
                  ? 'bg-primary-container text-white'
                  : 'text-neutral-medium hover:bg-surface-low'
              }`}
            >
              {page}
            </button>
          );
        })}

        <button
          type="button"
          className="flex h-7 w-7 items-center justify-center rounded text-neutral-medium hover:bg-surface-low disabled:opacity-40"
          disabled={currentPage >= totalPages}
        >
          ›
        </button>
      </div>
    </div>
  );
}
