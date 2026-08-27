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
  task_id: string;
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

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface TaskDetails extends Task {
  task_id: string;
  epic?: {
    id: string;
    title: string;
    epic_id: string;
  } | null;
  created_by?: {
    id: string;
    name: string;
    email: string;
    department: string | null;
  } | null;
  assignee?: {
    id: string;
    name: string;
    email: string;
    department: string | null;
    avatar_url?: string | null;
  } | null;
}

export interface PaginatedResponse<T> {
  data: T[];
  totalCount: number;
  currentRange: {
    start: number;
    end: number;
  };
  hasMore: boolean;
}

export interface SearchTasksParams extends PaginationParams {
  searchTerm?: string;
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

export const getProjectTasksByStatus = async (
  projectId: string,
  status: string,
): Promise<TaskListItem[]> => {
  const url = `${REST_BASE_URL}/project_tasks?project_id=eq.${projectId}&status=eq.${status}`;

  const response = await authorizedFetch(url, { method: 'GET' });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || `Failed to fetch tasks (Status: ${response.status})`,
    );
  }

  const data = await response.json();
  return (data ?? []) as TaskListItem[];
};

export const getProjectTasks = async (
  projectId: string,
): Promise<TaskListItem[]> => {
  const url = `${REST_BASE_URL}/project_tasks?project_id=eq.${projectId}`;

  const response = await authorizedFetch(url, { method: 'GET' });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || `Failed to fetch tasks (Status: ${response.status})`,
    );
  }

  const data = await response.json();
  return (data ?? []) as TaskListItem[];
};

export const getTaskDetails = async (
  projectId: string,
  taskId: string,
): Promise<TaskDetails | null> => {
  const url = `${REST_BASE_URL}/project_tasks?project_id=eq.${projectId}&id=eq.${taskId}`;

  const response = await authorizedFetch(url, { method: 'GET' });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message ||
        `Failed to fetch task details (Status: ${response.status})`,
    );
  }

  const data = await response.json();
  const list = (data ?? []) as TaskDetails[];
  return list.length > 0 ? list[0] : null;
};

export const getProjectTasksPaginated = async (
  projectId: string,
  { page = 1, limit = 10 }: PaginationParams = {},
): Promise<PaginatedResponse<TaskListItem>> => {
  const offset = (page - 1) * limit;
  const url = `${REST_BASE_URL}/project_tasks?project_id=eq.${projectId}&limit=${limit}&offset=${offset}`;
  const response = await authorizedFetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Prefer: 'count=exact',
    },
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || `Failed to fetch epics (Status: ${response.status})`,
    );
  }
  const contentRange = response.headers.get('Content-Range');
  let totalCount = 0;
  let currentRange = { start: 0, end: 0 };

  if (contentRange) {
    const matches = contentRange.match(/(\d+)-(\d+)\/(\d+|\*)/);
    if (matches) {
      currentRange = {
        start: parseInt(matches[1]),
        end: parseInt(matches[2]),
      };
      totalCount = matches[3] !== '*' ? parseInt(matches[3]) : 0;
    }
  }
  const data: TaskListItem[] = await response.json();
  return {
    data: data ?? [],
    totalCount,
    currentRange,
    hasMore: offset + limit < totalCount,
  };
};

export const searchProjectTasks = async (
  projectId: string,
  { page = 1, limit = 10, searchTerm = '' }: SearchTasksParams = {},
): Promise<PaginatedResponse<TaskListItem>> => {
  const offset = (page - 1) * limit;

  let url = `${REST_BASE_URL}/project_tasks?project_id=eq.${projectId}`;

  if (searchTerm.trim()) {
    const encodedSearchTerm = encodeURIComponent(searchTerm.trim());
    url += `&title=ilike.%25${encodedSearchTerm}%25`;
  }

  url += `&order=created_at.desc&limit=${limit}&offset=${offset}`;

  const response = await authorizedFetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Prefer: 'count=exact',
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message ||
        `Failed to search epics (Status: ${response.status})`,
    );
  }

  const contentRange = response.headers.get('Content-Range');
  let totalCount = 0;
  let currentRange = { start: 0, end: 0 };

  if (contentRange) {
    const matches = contentRange.match(/(\d+)-(\d+)\/(\d+|\*)/);
    if (matches) {
      currentRange = {
        start: parseInt(matches[1]),
        end: parseInt(matches[2]),
      };
      totalCount = matches[3] !== '*' ? parseInt(matches[3]) : 0;
    }
  }

  const data: TaskListItem[] = await response.json();

  return {
    data: data ?? [],
    totalCount,
    currentRange,
    hasMore: offset + limit < totalCount,
  };
};
