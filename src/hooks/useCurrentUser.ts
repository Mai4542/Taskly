import { useEffect, useState } from 'react';

export interface CurrentUser {
  name: string;
  jobTitle: string;
}

const BASE_URL = import.meta.env.VITE_API_BASE_URL as string;
const API_KEY = import.meta.env.VITE_API_KEY as string;

export function useCurrentUser() {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    async function fetchUser() {
      setIsLoading(true);
      setError(null);

      const accessToken =
        localStorage.getItem('token') || sessionStorage.getItem('token');

      if (!accessToken) {
        if (!ignore) {
          setUser(null);
          setError(null);
          setIsLoading(false);
        }
        return;
      }

      try {
        const res = await fetch(`${BASE_URL}/user`, {
          headers: {
            apikey: API_KEY,
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!res.ok) {
          if (res.status === 401) {
            localStorage.removeItem('token');
            sessionStorage.removeItem('token');
            if (!ignore) {
              setUser(null);
              setIsLoading(false);
            }
            return;
          }
          throw new Error(`Failed to load user (${res.status})`);
        }

        const data = await res.json();

        if (!ignore) {
          setUser({
            name:
              data?.user_metadata?.full_name ??
              data?.user_metadata?.name ??
              data?.email ??
              'User',
            jobTitle:
              data?.user_metadata?.job_title ?? data?.user_metadata?.role ?? '',
          });
        }
      } catch (err) {
        if (!ignore) {
          const message =
            err instanceof Error ? err.message : 'Something went wrong';
          setError(message);
        }
      } finally {
        if (!ignore) setIsLoading(false);
      }
    }

    fetchUser();
    return () => {
      ignore = true;
    };
  }, []);

  return { user, isLoading, error };
}
