import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getProjectsAPI,
  UnauthorizedError,
} from '../services/projects.service';
import type { Project } from '../services/projects.service';
import { APP_ROUTES } from '../constants/router';

type Status = 'loading' | 'success' | 'error';

export function useProjects() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [status, setStatus] = useState<Status>('loading');

  const loadProjects = useCallback(async () => {
    try {
      const data = await getProjectsAPI();
      setProjects(data);
      setStatus('success');
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        navigate(APP_ROUTES.auth.login, { replace: true });
        return;
      }
      setStatus('error');
    }
  }, [navigate]);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const retry = useCallback(() => {
    setStatus('loading');
    loadProjects();
  }, [loadProjects]);

  return { projects, status, retry };
}
