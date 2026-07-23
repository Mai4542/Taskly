import { useEffect } from 'react';
import { parseHashParams } from '../utils/parseHashParams';
import { APP_ROUTES } from '../constants/router';

export default function AuthHashRedirect() {
  useEffect(() => {
    if (!window.location.hash.includes('access_token')) return;

    const params = parseHashParams(window.location.hash);

    if (params.type === 'recovery' && params.access_token) {
      window.location.replace(
        `${APP_ROUTES.auth.reset_password}?access_token=${encodeURIComponent(params.access_token)}`
      );
    }
  }, []);

  return null;
}