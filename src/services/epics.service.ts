import { authorizedFetch } from '../utils/apiClient';

export interface CreateEpicPayload {
  title: string;
  description?: string;
  assignee_id?: string | null;
  project_id: string;
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
