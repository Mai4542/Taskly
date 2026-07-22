import * as authApi from '../services/auth.service';
import * as cookies from '../utils/cookies';

interface User {
  name: string;
  jobTitle: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

const state: AuthState = {
  token: cookies.getToken(),
  user: cookies.getUser(),
  isLoading: false,
  error: null,
};

const listeners = new Set<() => void>();

function notifyListeners() {
  listeners.forEach((listener) => listener());
}

export const getAuthToken = () => state.token;
export const getAuthUser = () => state.user;
export const getAuthLoading = () => state.isLoading;
export const getAuthError = () => state.error;

export function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function updateState(newState: Partial<AuthState>) {
  Object.assign(state, newState);
  notifyListeners();
}

function extractUserFromResponse(response: authApi.AuthResponse): User {
  return {
    name: response.user.user_metadata.name || 'User',
    jobTitle: response.user.user_metadata.job_title || '',
  };
}

export async function login(credentials: authApi.LoginCredentials, rememberMe: boolean) {
  updateState({ isLoading: true, error: null });

  try {
    const response = await authApi.loginAPI(credentials);

    cookies.storeToken(response.access_token, response.refresh_token, rememberMe);

    const user = extractUserFromResponse(response);

    cookies.storeUser(user);

    updateState({
      token: response.access_token,
      user,
      isLoading: false
    });

  } catch (error) {
    const message = error instanceof Error ? error.message : "Error";
    updateState({ isLoading: false, error: message });
    throw error;
  }
}

export async function signUp(data: authApi.SignUpData) {
  updateState({ isLoading: true, error: null });

  try {
    const response = await authApi.signUpAPI(data);

    cookies.storeToken(response.access_token, response.refresh_token, false);

    const user = extractUserFromResponse(response);

    cookies.storeUser(user);

    updateState({
      token: response.access_token,
      user,
      isLoading: false
    });

  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error';
    updateState({ isLoading: false, error: message });
    throw error;
  }
}

export async function refreshSession(): Promise<string | null> {
  const refreshToken = cookies.getRefreshToken();

  if (!refreshToken) {
    cookies.clearAuth();
    updateState({ token: null, user: null });
    return null;
  }

  try {
    const response = await authApi.refreshTokenAPI(refreshToken);

    cookies.storeToken(response.access_token, response.refresh_token, true);

    updateState({ token: response.access_token });
    return response.access_token;

  } catch (error) {
    // الـ refresh_token نفسه باطل أو منتهي -> الجلسة خلصت فعليًا
    cookies.clearAuth();
    updateState({ token: null, user: null });
    return null;
  }
}

export async function logout() {
  const token = state.token;
  if (token) {
    try {
      await authApi.logoutAPI(token);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Logout failed, please try again.';
      updateState({ error: message });
      throw error;
    }
  }

  cookies.clearAuth();
  updateState({ token: null, user: null, error: null });
}

export function clearError() {
  updateState({ error: null });
}