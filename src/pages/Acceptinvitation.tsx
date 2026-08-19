import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAcceptInvitation } from '../hooks/useAcceptInvitation';
import { APP_ROUTES } from '../constants/router';
import folder from '../assets/imgs/folder.svg';
import logo from '../assets/imgs/Logo.svg';
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
    <div
      className="flex min-h-screen items-center justify-center"
      style={{
        background:
          'radial-gradient(circle at 20% 20%, #dbe6fb 0%, #f4f7fd 45%, #ffffff 100%)',
      }}
    >
      <div className="w-full max-w-[456px] px-4">
        <div className="mb-6 flex items-center justify-center gap-2">
          <img src={logo} alt="logo" className="text-primary h-6 w-6" />
          <span className="text-neutral-high text-lg font-bold tracking-wide">
            TASKLY
          </span>
        </div>

        <div className="border-primary rounded-lg border-t-4 bg-white p-8 text-center shadow-lg">
          <span className="label-sm bg-surface-low text-[#434654] mb-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1">
            <img src={folder} className="h-3.5 w-3.5" alt="folder" />
            NEW PROJECT INVITATION
          </span>

          {!token && (
            <>
              <h1 className="headline-lg text-error mb-2">
                Invalid invitation link
              </h1>
              <p className="body-md text-neutral-medium">
                This invite link is missing or malformed. Ask the project admin
                to resend it.
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
    </div>
  );
};

export default AcceptInvitation;
