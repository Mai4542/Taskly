import { useState, useEffect, useCallback } from 'react';
import { getProjectTasks } from '../services/tasks.service';
import type { TaskListItem } from '../services/tasks.service';

type Status = 'loading' | 'error' | 'success';

export function useProjectTasks(projectId: string | undefined) {
  const [tasks, setTasks] = useState<TaskListItem[]>([]);
  const [status, setStatus] = useState<Status>('loading');

  const fetchTasks = useCallback(async () => {
    if (!projectId) return;
    setStatus('loading');
    try {
      const data = await getProjectTasks(projectId);
      setTasks(data);
      setStatus('success');
    } catch (err) {
      console.error('Error fetching project tasks:', err);
      setStatus('error');
    }
  }, [projectId]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return { tasks, status, retry: fetchTasks };
}
