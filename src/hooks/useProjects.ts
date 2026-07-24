import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getProjectsAPI,
  UnauthorizedError,
} from '../services/projects.service';
import { useAppDispatch } from '../store/hooks';
import { setProjects } from '../store/slices/projectsSlice';
import { APP_ROUTES } from '../constants/router';

type Status = 'loading' | 'success' | 'error';

export function useProjects() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState<Status>('loading');

  const loadProjects = useCallback(async () => {
    try {
      const data = await getProjectsAPI();
      dispatch(setProjects(data));
      setStatus('success');
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        navigate(APP_ROUTES.auth.login, { replace: true });
        return;
      }
      setStatus('error');
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const retry = useCallback(() => {
    setStatus('loading');
    loadProjects();
  }, [loadProjects]);

  return { status, retry };
}
