import { useState, useEffect, useCallback } from 'react';
import * as authStore from '../store/authStore';

export function useAuth() {
  const [, setTick] = useState(0);

  const forceUpdate = useCallback(() => {
    setTick((tick) => tick + 1);
  }, []);

  useEffect(() => {
    const unsubscribe = authStore.subscribe(forceUpdate);
    return unsubscribe;
  }, [forceUpdate]);

  return {
    token: authStore.getAuthToken(),
    user: authStore.getAuthUser(),
    isLoading: authStore.getAuthLoading(),
    error: authStore.getAuthError(),
    login: authStore.login,
    signUp: authStore.signUp,
    logout: authStore.logout,
    clearError: authStore.clearError,
  };
}