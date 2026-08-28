import { useState, useEffect, useCallback } from 'react';
import {
  getProjectTasksByStatus,
  searchProjectTasks,
} from '../services/tasks.service';
import type { TaskListItem } from '../services/tasks.service';

type Status = 'loading' | 'error' | 'success';

export function useTasksByStatus(
  projectId: string | undefined,
  taskStatus: string,
  searchTerm: string = '',
) {
  const [tasks, setTasks] = useState<TaskListItem[]>([]);
  const [status, setStatus] = useState<Status>('loading');

  const fetchTasks = useCallback(async () => {
    if (!projectId) return;
    setStatus('loading');
    try {
      let data: TaskListItem[];

      if (searchTerm?.trim()) {
        const result = await searchProjectTasks(projectId, {
          page: 1,
          limit: 100,
          searchTerm: searchTerm.trim(),
        });

        data = result.data.filter((task) => task.status === taskStatus);
      } else {
        data = await getProjectTasksByStatus(projectId, taskStatus);
      }
      setTasks(data);
      setStatus('success');
    } catch (err) {
      console.error(`Error fetching tasks for status ${taskStatus}:`, err);
      setStatus('error');
    }
  }, [projectId, taskStatus, searchTerm]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const removeTaskLocally = useCallback(
    (taskId: string): TaskListItem | undefined => {
      const removed = tasks.find((t) => t.id === taskId);
      if (!removed) return undefined;

      setTasks((prev) => prev.filter((t) => t.id !== taskId));
      return removed;
    },
    [tasks],
  );

  const addTaskLocally = useCallback((task: TaskListItem) => {
    setTasks((prev) => [task, ...prev]);
  }, []);

  return {
    tasks,
    status,
    retry: fetchTasks,
    addTaskLocally,
    removeTaskLocally,
  };
}
