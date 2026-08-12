import { useState, useEffect, useCallback } from 'react';
import { getProjectEpics } from '../services/epics.service';
import type { Epic } from '../services/epics.service';

type Status = 'loading' | 'error' | 'success';

interface UseEpicsReturn {
  epics: Epic[];
  status: Status;
  retry: () => void;
}

export function useEpics(projectId: string | undefined): UseEpicsReturn {
  const [epics, setEpics] = useState<Epic[]>([]);
  const [status, setStatus] = useState<Status>('loading');

  const fetchEpics = useCallback(async () => {
    if (!projectId) return;

    setStatus('loading');
    try {
      const data = await getProjectEpics(projectId);
      setEpics(data);
      setStatus('success');
    } catch (err) {
      console.error('Error fetching project epics:', err);
      setStatus('error');
    }
  }, [projectId]);

  useEffect(() => {
    fetchEpics();
  }, [fetchEpics]);

  return { epics, status, retry: fetchEpics };
}
