import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAcceptInvitation } from '../hooks/useAcceptInvitation';
import { APP_ROUTES } from '../constants/router';

type PageStatus = 'idle' | 'loading' | 'success' | 'error';

export const AcceptInvitation = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');

  const { acceptInvitation, isLoading, isError, errorMessage } =
    useAcceptInvitation();
  const [pageStatus, setPageStatus] = useState<PageStatus>('idle');

  useEffect(() => {
    if (!token) {
      setPageStatus('error');
    }
  }, [token]);

  useEffect(() => {
    if (pageStatus === 'success') {
      const timer = setTimeout(
        () => navigate(APP_ROUTES.dashboard.projects.root),
        1500,
      );
      return () => clearTimeout(timer);
    }
  }, [pageStatus, navigate]);

  const handleAccept = async () => {
    if (!token || isLoading) return;
    try {
      await acceptInvitation(token);
      setPageStatus('success');
    } catch {
      setPageStatus('error');
    }
  };

  return (
    <div className="bg-background flex min-h-screen items-center justify-center">
      <div className="border-primary w-[456px] rounded-lg border-t-4 bg-white p-8 text-center shadow-lg">
        <span className="label-sm bg-surface-low text-primary mb-4 inline-block rounded-full px-3 py-1">
          NEW PROJECT INVITATION
        </span>

        {!token && (
          <>
            <h1 className="headline-lg text-error mb-2">
              Invalid invitation link
            </h1>
            <p className="body-md text-neutral-medium">
              This invite link is missing or malformed. Ask the project admin to
              resend it.
            </p>
          </>
        )}

        {token && pageStatus !== 'success' && !isError && (
          <>
            <h1 className="headline-lg text-neutral-high mb-6">
              You've been invited to join new project
            </h1>
            <button
              type="button"
              onClick={handleAccept}
              disabled={isLoading}
              className="btn-primary w-full"
            >
              {isLoading ? 'Accepting...' : 'Accept Invitation'}
            </button>
          </>
        )}

        {isError && token && (
          <>
            <h1 className="headline-lg text-error mb-2">
              We couldn't accept this invitation
            </h1>
            <p className="body-md text-neutral-medium mb-6">
              {errorMessage ??
                'This invitation link is invalid or has expired.'}
            </p>
            <button
              type="button"
              onClick={handleAccept}
              disabled={isLoading}
              className="btn-primary w-full"
            >
              Try Again
            </button>
          </>
        )}

        {pageStatus === 'success' && (
          <>
            <h1 className="headline-lg text-neutral-high mb-2">
              Welcome to the team!
            </h1>
            <p className="body-md text-neutral-medium">
              Redirecting you to the project...
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default AcceptInvitation;
