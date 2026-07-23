import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { resetPasswordAPI } from '../services/auth.service';
import { APP_ROUTES } from '../constants/router';

const REDIRECT_DELAY_MS = 3000;

export function useResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const accessToken = searchParams.get('access_token');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const hasValidToken = !!accessToken;

  async function updatePassword(password: string) {
    if (!accessToken) return;

    setApiError(null);
    setIsSubmitting(true);

    try {
      await resetPasswordAPI(accessToken, password);
      setSuccess(true);

      setTimeout(() => {
        navigate(APP_ROUTES.auth.login, { replace: true });
      }, REDIRECT_DELAY_MS);

    } catch (error) {
      if (error instanceof TypeError) {
        setApiError('Network error. Please check your connection and try again.');
      } else {
        const message = error instanceof Error ? error.message : '';
        if (message.toLowerCase().includes('expired') || message.toLowerCase().includes('invalid')) {
          setApiError('This reset link has expired. Please request a new one.');
        } else {
          setApiError('Something went wrong. Please try again.');
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    hasValidToken,
    isSubmitting,
    apiError,
    success,
    updatePassword,
  };
}