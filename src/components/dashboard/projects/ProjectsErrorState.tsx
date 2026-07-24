import offline from '../../../assets/imgs/offline.svg';

export default function ProjectsErrorState({
  onRetry,
}: {
  onRetry: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-40 px-4">
      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#FFDAD6] mb-4">
        <img src={offline} alt="offline" />
      </div>
      <h2 className="title-md text-neutral-high">Something went wrong</h2>
      <p className="body-md text-neutral-medium mt-2 max-w-xs text-[13px]">
        We're having trouble retrieving your projects right now. Please try
        again in a moment.
      </p>
      <button type="button" onClick={onRetry} className="btn-primary mt-5 w-45">
        Retry Connection
      </button>
    </div>
  );
}
