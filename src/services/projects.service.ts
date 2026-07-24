import { authorizedFetch } from '../utils/apiClient';

const AUTH_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;
const REST_BASE_URL = AUTH_BASE_URL.replace('/auth/v1', '/rest/v1');

export interface Project {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
}

export interface CreateProjectData {
  name: string;
  description?: string;
}

export class UnauthorizedError extends Error {}

async function handleRestResponse(response: Response) {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const rawMessage =
      errorData.message ||
      errorData.error_description ||
      errorData.msg ||
      errorData.hint ||
      'Unexpected error';
    throw new Error(rawMessage);
  }

  const text = await response.text();
  if (!text) return undefined;
  return JSON.parse(text);
}

export async function getProjectsAPI(): Promise<Project[]> {
  const response = await authorizedFetch(`${REST_BASE_URL}/rpc/get_projects`, {
    method: 'GET',
  });

  if (response.status === 401) {
    throw new UnauthorizedError('Unauthorized');
  }

  const result = await handleRestResponse(response);
  return Array.isArray(result) ? result : [];
}

export async function createProjectAPI(
  data: CreateProjectData,
): Promise<Project> {
  const response = await authorizedFetch(`${REST_BASE_URL}/projects`, {
    method: 'POST',
    headers: { Prefer: 'return=representation' },
    body: JSON.stringify(data),
  });

  const result = await handleRestResponse(response);
  return Array.isArray(result) ? result[0] : result;
}
// أضف هذه الدالة
export async function getProjectByIdAPI(projectId: string): Promise<Project> {
  const response = await authorizedFetch(
    `${REST_BASE_URL}/projects?id=eq.${projectId}&limit=1`,
    {
      method: 'GET',
    },
  );

  if (response.status === 401) {
    throw new UnauthorizedError('Unauthorized');
  }

  const result = await handleRestResponse(response);
  
  // بنرجع أول عنصر في الـ array (المشروع المطلوب)
  if (Array.isArray(result) && result.length > 0) {
    return result[0];
  }
  
  throw new Error('Project not found');
}

// ودالة التحديث
export async function updateProjectAPI(
  projectId: string,
  data: CreateProjectData,
): Promise<Project> {
  const response = await authorizedFetch(
    `${REST_BASE_URL}/projects?id=eq.${projectId}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Prefer': 'return=representation',
      },
      body: JSON.stringify(data),
    },
  );

  const result = await handleRestResponse(response);
  return Array.isArray(result) ? result[0] : result;
}