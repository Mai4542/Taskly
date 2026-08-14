import { useState, useEffect, useCallback } from 'react';
import { getProjectTasksByStatus } from '../services/tasks.service';
import type { TaskListItem } from '../services/tasks.service';

type Status = 'loading' | 'error' | 'success';

export function useTasksByStatus(
  projectId: string | undefined,
  taskStatus: string,
) {
  const [tasks, setTasks] = useState<TaskListItem[]>([]);
  const [status, setStatus] = useState<Status>('loading');

  const fetchTasks = useCallback(async () => {
    if (!projectId) return;
    setStatus('loading');
    try {
      const data = await getProjectTasksByStatus(projectId, taskStatus);
      setTasks(data);
      setStatus('success');
    } catch (err) {
      console.error(`Error fetching tasks for status ${taskStatus}:`, err);
      setStatus('error');
    }
  }, [projectId, taskStatus]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return { tasks, status, retry: fetchTasks };
}
