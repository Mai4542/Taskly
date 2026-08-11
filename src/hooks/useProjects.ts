import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import {
  getProjectsAPI,
  UnauthorizedError,
} from '../services/projects.service';
import { APP_ROUTES } from '../constants/router';

export function useProjects() {
  const navigate = useNavigate();

  const query = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      try {
        return await getProjectsAPI();
      } catch (error) {
        if (error instanceof UnauthorizedError) {
          navigate(APP_ROUTES.auth.login, { replace: true });
        }
        throw error;
      }
    },
  });

  return {
    projects: query.data ?? [],
    status: query.isLoading ? 'loading' : query.isError ? 'error' : 'success',
    retry: query.refetch,
  };
}
