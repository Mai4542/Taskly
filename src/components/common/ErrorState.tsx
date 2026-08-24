import { Offline } from '../../components/icons/Offline';

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry: () => void;
  retryLabel?: string;
}

export default function ErrorState({
  title = 'Something went wrong',
  message,
  onRetry,
  retryLabel = 'Retry Connection',
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-40 px-4">
      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#FFDAD6] mb-4">
        <Offline size={28} color="#BA1A1A" />
      </div>
      <h2 className="title-md text-neutral-high">{title}</h2>
      <p className="body-md text-neutral-medium mt-2 max-w-xs text-[13px]">
        {message}
      </p>
      <button type="button" onClick={onRetry} className="btn-primary mt-5 w-45">
        {retryLabel}
      </button>
    </div>
  );
}
