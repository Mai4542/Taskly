import left from '../../../assets/imgs/left.svg';
import right from '../../../assets/imgs/right.svg';

interface ProjectsPaginationProps {
  shown: number;
  total: number;
}

export default function ProjectsPagination({
  shown,
  total,
}: ProjectsPaginationProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-6">
      <span className="body-md text-neutral-medium text-[13px]">
        Showing {shown} of {total} active projects
      </span>

      <div className="flex items-center gap-1">
        <button
          type="button"
          disabled
          aria-label="Previous page"
          className="flex h-8 w-8 items-center justify-center rounded-md text-neutral-low disabled:cursor-not-allowed"
        >
          <img src={left} alt="left" />
        </button>
        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center rounded-md bg-primary-container text-white body-md text-[13px]"
        >
          1
        </button>
        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center rounded-md text-neutral-medium body-md text-[13px] hover:bg-surface-low"
        >
          2
        </button>
        <button
          type="button"
          aria-label="Next page"
          className="flex h-8 w-8 items-center justify-center rounded-md text-neutral-medium hover:bg-surface-low"
        >
          <img src={right} alt="right" />
        </button>
      </div>
    </div>
  );
}
