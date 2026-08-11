import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { getProjectAPI, UnauthorizedError } from '../services/projects.service';
import { APP_ROUTES } from '../constants/router';

export function useProject(projectId: string | undefined) {
  const navigate = useNavigate();

  const query = useQuery({
    queryKey: ['project', projectId],
    queryFn: async () => {
      try {
        return await getProjectAPI(projectId as string);
      } catch (error) {
        if (error instanceof UnauthorizedError) {
          navigate(APP_ROUTES.auth.login, { replace: true });
        }
        throw error;
      }
    },
    enabled: !!projectId,
  });

  return {
    project: query.data,
    status: query.isLoading ? 'loading' : query.isError ? 'error' : 'success',
    retry: query.refetch,
  };
}
