import { useCallback, useState } from 'react';
import {
  inviteService,
  UnauthorizedError,
  ApiError,
} from '../services/invite.service';

type Status = 'idle' | 'loading' | 'success' | 'error';

export const useAcceptInvitation = () => {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const acceptInvitation = useCallback(async (token: string) => {
    setStatus('loading');
    setErrorMessage(null);

    try {
      const response = await inviteService.acceptInvitation(token);
      setStatus('success');
      return response;
    } catch (err) {
      let message = 'Something went wrong. Please try again.';
      const lowerMsg = err instanceof Error ? err.message.toLowerCase() : '';

      if (err instanceof UnauthorizedError) {
        message = 'Your session has expired. Please log in again.';
      } else if (err instanceof ApiError) {
        if (err.status === 403) {
          message = 'You are not authorized to accept this invitation.';
        } else if (err.status === 400) {
          if (lowerMsg.includes('expired')) {
            message = 'This invitation has expired.';
          } else if (
            lowerMsg.includes('invalid') ||
            lowerMsg.includes('token')
          ) {
            message = 'This invitation link is invalid.';
          } else {
            message = err.message || 'Unable to accept invitation.';
          }
        } else {
          message = err.message || message;
        }
      } else if (err instanceof TypeError) {
        message = 'Network error. Please check your connection.';
      }

      setStatus('error');
      setErrorMessage(message);
    }
  }, []);

  return {
    acceptInvitation,
    isLoading: status === 'loading',
    isSuccess: status === 'success',
    isError: status === 'error',
    errorMessage,
  };
};
