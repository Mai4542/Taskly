import { useState, useEffect, useCallback } from 'react';
import { getEpicTasks } from '../services/tasks.service';
import type { TaskListItem } from '../services/tasks.service';

type Status = 'loading' | 'error' | 'success';

export function useEpicTasks(epicId: string | undefined) {
  const [tasks, setTasks] = useState<TaskListItem[]>([]);
  const [status, setStatus] = useState<Status>('loading');

  const fetchTasks = useCallback(async () => {
    setStatus('loading');
    try {
      const data = await getEpicTasks(epicId as string);
      setTasks(data);
      setStatus('success');
    } catch (err) {
      console.error('Error fetching epic tasks:', err);
      setStatus('error');
    }
  }, [epicId]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return { tasks, status, retry: fetchTasks };
}
