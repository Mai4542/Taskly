import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getProjectAPI,
  UnauthorizedError,
  type Project,
} from '../services/projects.service';
import { APP_ROUTES } from '../constants/router';

export function useProject(projectId: string | undefined) {
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | undefined>();
  const [status, setStatus] = useState<'loading' | 'error' | 'success'>(
    'loading',
  );

  useEffect(() => {
    if (!projectId) return;

    let cancelled = false;
    setStatus('loading');

    getProjectAPI(projectId)
      .then((data) => {
        if (cancelled) return;
        setProject(data);
        setStatus('success');
      })
      .catch((error) => {
        if (cancelled) return;
        if (error instanceof UnauthorizedError) {
          navigate(APP_ROUTES.auth.login, { replace: true });
        }
        setStatus('error');
      });

    return () => {
      cancelled = true;
    };
  }, [projectId]);

  return { project, status };
}
