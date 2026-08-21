import { useState, useEffect, useCallback } from 'react';
import { getTaskDetails } from '../services/tasks.service';
import type { TaskDetails } from '../services/tasks.service';

type Status = 'idle' | 'loading' | 'error' | 'success' | 'empty';

export function useTaskDetails(
  projectId: string | undefined,
  taskId: string | null,
) {
  const [task, setTask] = useState<TaskDetails | null>(null);
  const [status, setStatus] = useState<Status>('idle');

  const fetchTask = useCallback(async () => {
    // Do NOT fetch if no task selected
    if (!projectId || !taskId) {
      setStatus('idle');
      setTask(null);
      return;
    }
    setStatus('loading');
    try {
      const data = await getTaskDetails(projectId, taskId);
      if (!data) {
        setTask(null);
        setStatus('empty');
      } else {
        setTask(data);
        setStatus('success');
      }
    } catch (err) {
      console.error('Error fetching task details:', err);
      setStatus('error');
    }
  }, [projectId, taskId]);

  useEffect(() => {
    fetchTask();
  }, [fetchTask]);

  return { task, status, retry: fetchTask };
}
