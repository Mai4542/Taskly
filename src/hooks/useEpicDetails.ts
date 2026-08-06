import { useState, useCallback } from 'react';
import { getEpicDetails, type Epic } from '../services/epics.service';

interface UseEpicDetailsState {
  epic: Epic | null;
  loading: boolean;
  error: string | null;
}

export const useEpicDetails = () => {
  const [state, setState] = useState<UseEpicDetailsState>({
    epic: null,
    loading: false,
    error: null,
  });

  const fetchEpicDetails = useCallback(
    async (projectId: string, epicId: string) => {
      setState({ epic: null, loading: true, error: null });
      try {
        const epic = await getEpicDetails(projectId, epicId);
        setState({ epic, loading: false, error: null });
      } catch (err: unknown) {
        setState({
          epic: null,
          loading: false,
          error:
            (err as Error).message ||
            'An error occurred while fetching epic details.',
        });
      }
    },
    [],
  );

  const resetEpicDetails = useCallback(() => {
    setState({ epic: null, loading: false, error: null });
  }, []);

  return {
    epic: state.epic,
    loading: state.loading,
    error: state.error,
    fetchEpicDetails,
    resetEpicDetails,
  };
};
