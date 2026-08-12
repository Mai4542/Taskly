import { authorizedFetch } from '../utils/apiClient';

export type TaskStatus =
  | 'TO_DO'
  | 'IN_PROGRESS'
  | 'BLOCKED'
  | 'IN_REVIEW'
  | 'READY_FOR_QA'
  | 'REOPENED'
  | 'READY_FOR_PRODUCTION'
  | 'DONE';

export interface Task {
  id: string;
  project_id: string;
  epic_id: string | null;
  title: string;
  description: string | null;
  assignee_id: string | null;
  due_date: string | null;
  status: TaskStatus;
  created_at: string;
}

export interface CreateTaskPayload {
  project_id: string;
  title: string;
  epic_id?: string | null;
  description?: string;
  assignee_id?: string | null;
  due_date?: string | null;
  status?: TaskStatus;
}
export interface TaskListItem {
  id: string;
  title: string;
  due_date: string | null;
  status?: string;
  assignee?: {
    id: string;
    name: string;
    email: string;
    department: string | null;
    avatar_url?: string | null;
  } | null;
}

const AUTH_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;
const REST_BASE_URL = AUTH_BASE_URL.replace('/auth/v1', '/rest/v1');

export const createTask = async (payload: CreateTaskPayload): Promise<Task> => {
  const url = `${REST_BASE_URL}/tasks`;

  const body: any = {
    title: payload.title,
    project_id: payload.project_id,
    status: payload.status ?? 'TO_DO',
  };

  if (payload.epic_id) body.epic_id = payload.epic_id;
  if (payload.description) body.description = payload.description;
  if (payload.assignee_id) body.assignee_id = payload.assignee_id;
  if (payload.due_date) body.due_date = payload.due_date;

  const response = await authorizedFetch(url, {
    method: 'POST',
    headers: { Prefer: 'return=representation' },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || `Failed to create task (Status: ${response.status})`,
    );
  }

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;
  return Array.isArray(data) ? data[0] : data;
};

export const getEpicTasks = async (epicId: string): Promise<TaskListItem[]> => {
  const url = `${REST_BASE_URL}/project_tasks?epic_id=eq.${epicId}`;

  const response = await authorizedFetch(url, {
    method: 'GET',
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || `Failed to fetch tasks (Status: ${response.status})`,
    );
  }

  const data = await response.json();
  return (data ?? []) as TaskListItem[];
};
