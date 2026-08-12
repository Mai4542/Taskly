import { useState, useEffect, useCallback } from 'react';
import { getEpicTasks } from '../services/tasks.service';
import { useProjectMembers } from './useProjectMembers';
import type { TaskListItem } from '../services/tasks.service';

type Status = 'loading' | 'error' | 'success';

export function useEpicTasks(epicId: string | undefined, projectId: string) {
  const [tasks, setTasks] = useState<TaskListItem[]>([]);
  const [status, setStatus] = useState<Status>('loading');
  const { members } = useProjectMembers(projectId);

  const fetchTasks = useCallback(async () => {
    setStatus('loading');
    try {
      const data = await getEpicTasks(epicId as string, members);
      setTasks(data);
      setStatus('success');
    } catch (err) {
      console.error('Error fetching epic tasks:', err);
      setStatus('error');
    }
  }, [epicId, members]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return { tasks, status, retry: fetchTasks };
}
