import { useState } from 'react';
import { recoverPasswordAPI } from '../services/auth.service';
import { useCountdown } from './useCountdown';

const RESEND_SECONDS = 5 * 60;
const MAX_ATTEMPTS = 3;

export function useForgotPassword() {
  const [submitted, setSubmitted] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [attemptsLeft, setAttemptsLeft] = useState(MAX_ATTEMPTS);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const countdown = useCountdown();

  const noAttemptsLeft = attemptsLeft <= 0;

  async function sendResetEmail(email: string) {
    setApiError(null);
    setIsSubmitting(true);

    try {
      await recoverPasswordAPI(email);

      setSubmitted(true);
      setAttemptsLeft((n) => n - 1);
      countdown.start(RESEND_SECONDS);

    } catch (error) {
      if (error instanceof TypeError) {
        setApiError('Network error. Please check your connection and try again.');
        return;
      }

      const message = error instanceof Error ? error.message : '';

      if (message.toLowerCase().includes('invalid') || message.toLowerCase().includes('format')) {
        setApiError('Please enter a valid email address.');
        return;
      }

      setApiError('Something went wrong. Please try again in a moment.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    submitted,
    apiError,
    attemptsLeft,
    noAttemptsLeft,
    isSubmitting,
    countdown,
    sendResetEmail,
  };
}