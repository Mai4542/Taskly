interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export default function ErrorState({
  title = 'Something went wrong',
  message = 'An error occurred. Please try again.',
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
      <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 9V13M12 17H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
            stroke="#DC2626"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <h3 className="headline-sm text-neutral-high mb-2">{title}</h3>
      <p className="body-md text-neutral-medium mb-6">{message}</p>

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="btn-primary inline-flex items-center gap-2"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M16.6667 10C16.6667 13.6819 13.6819 16.6667 10 16.6667C6.3181 16.6667 3.33333 13.6819 3.33333 10C3.33333 6.3181 6.3181 3.33333 10 3.33333C12.5152 3.33333 14.6999 4.73127 15.8333 6.66667"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M15.8333 3.33333V6.66667H12.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Try Again
        </button>
      )}
    </div>
  );
}
