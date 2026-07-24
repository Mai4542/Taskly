import { getAuthToken, refreshSession } from '../store/authStore';

const API_KEY = import.meta.env.VITE_API_KEY as string;

export async function authorizedFetch(url: string, options: RequestInit = {}): Promise<Response> {
  const token = getAuthToken();

  const doFetch = (accessToken: string | null) =>
    fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        apikey: API_KEY,
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        ...options.headers,
      },
    });

  let response = await doFetch(token);

  if (response.status === 401) {
    const newToken = await refreshSession();
    if (newToken) {
      response = await doFetch(newToken);
    }
  }

  return response;
}