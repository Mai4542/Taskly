import { useCallback, useRef, useState } from 'react';
import {
  inviteService,
  UnauthorizedError,
  ApiError,
} from '../services/invite.service';

type Status = 'idle' | 'loading' | 'success' | 'error';

export const useInviteMember = () => {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const isSubmittingRef = useRef(false);

  const inviteMember = useCallback(async (email: string, projectId: string) => {
    if (isSubmittingRef.current) return null;

    isSubmittingRef.current = true;
    setStatus('loading');
    setErrorMessage(null);

    try {
      const response = await inviteService.inviteMember(email, projectId);
      setStatus('success');
      return response;
    } catch (err) {
      let message = 'Something went wrong. Please try again.';

      if (err instanceof UnauthorizedError) {
        message = 'You are not authorized. Please log in again.';
      } else if (err instanceof ApiError) {
        if (err.status === 403) {
          message =
            "You don't have permission to invite members to this project.";
        } else if (err.status === 400) {
          message = err.message || 'Invalid email or project.';
        } else if (err.status === 409) {
          message = 'This user is already a member of this project.';
        } else {
          message = err.message || message;
        }
      } else if (err instanceof TypeError) {
        message = 'Network error. Please check your connection.';
      }

      setStatus('error');
      setErrorMessage(message);
    } finally {
      isSubmittingRef.current = false;
    }
  }, []);

  const reset = useCallback(() => {
    setStatus('idle');
    setErrorMessage(null);
  }, []);

  return {
    inviteMember,
    isLoading: status === 'loading',
    isSuccess: status === 'success',
    isError: status === 'error',
    errorMessage,
    reset,
  };
};
