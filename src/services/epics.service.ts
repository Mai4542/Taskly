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
