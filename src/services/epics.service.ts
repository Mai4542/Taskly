import { authorizedFetch } from '../utils/apiClient';

export interface CreateEpicPayload {
  title: string;
  description?: string;
  assignee_id?: string | null;
  project_id: string;
  deadline?: string | null;
}

export interface EpicUser {
  sub: string;
  name: string;
  email: string;
  department: string;
}

export interface Epic {
  id: string;
  epic_id: string;
  title: string;
  description?: string | null;
  deadline?: string | null;
  created_at: string;
  created_by: EpicUser;
  assignee: EpicUser;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
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

export interface UpdateEpicPayload {
  title?: string;
  description?: string | null;
  assignee_id?: string | null;
  deadline?: string | null;
}

const AUTH_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;
const REST_BASE_URL = AUTH_BASE_URL.replace('/auth/v1', '/rest/v1');

export const createEpic = async (payload: CreateEpicPayload) => {
  const url = `${REST_BASE_URL}/epics`;

  const body: any = {
    title: payload.title,
    project_id: payload.project_id,
  };

  if (payload.description) body.description = payload.description;
  if (payload.assignee_id) body.assignee_id = payload.assignee_id;
  if (payload.deadline) body.deadline = payload.deadline;

  const response = await authorizedFetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || `Failed to create epic (Status: ${response.status})`,
    );
  }

  const text = await response.text();
  if (text) {
    return JSON.parse(text);
  }

  return null;
};

export const getProjectEpics = async (projectId: string): Promise<Epic[]> => {
  const url = `${REST_BASE_URL}/project_epics?project_id=eq.${projectId}`;

  const response = await authorizedFetch(url, {
    method: 'GET',
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || `Failed to fetch epics (Status: ${response.status})`,
    );
  }

  const data = await response.json();
  return (data ?? []) as Epic[];
};

export const getProjectEpicsPaginated = async (
  projectId: string,
  { page = 1, limit = 10 }: PaginationParams = {},
): Promise<PaginatedResponse<Epic>> => {
  const offset = (page - 1) * limit;
  const url = `${REST_BASE_URL}/project_epics?project_id=eq.${projectId}&limit=${limit}&offset=${offset}`;
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
  const data: Epic[] = await response.json();

  return {
    data: data ?? [],
    totalCount,
    currentRange,
    hasMore: offset + limit < totalCount,
  };
};

export const getEpicDetails = async (
  projectId: string,
  epicId: string,
): Promise<Epic> => {
  const url = `${REST_BASE_URL}/project_epics?project_id=eq.${projectId}&id=eq.${epicId}`;

  const response = await authorizedFetch(url, {
    method: 'GET',
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message ||
        `Failed to fetch epic details (Status: ${response.status})`,
    );
  }

  const data = await response.json();
  return (data?.[0] ?? null) as Epic;
};

export const updateEpic = async (
  epicId: string,
  payload: UpdateEpicPayload,
): Promise<Partial<Epic>> => {
  const url = `${REST_BASE_URL}/epics?id=eq.${epicId}`;

  const response = await authorizedFetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || `Failed to update epic (Status: ${response.status})`,
    );
  }

  const text = await response.text();
  if (!text) return {};

  const data = JSON.parse(text);
  return Array.isArray(data) ? data[0] : data;
};
