import { authorizedFetch } from '../utils/apiClient';
import { getOffset } from '../utils/pagination.utils';

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

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  totalCount: number;
  page: number;
  limit: number;
}

export class UnauthorizedError extends Error {}

async function handleRestResponse(
  response: Response,
  includeHeaders: boolean = false,
) {
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

  let totalCount: number | undefined;
  const contentRange = response.headers.get('Content-Range');
  if (contentRange) {
    const match = contentRange.match(/\/(\d+)$/);
    if (match) {
      totalCount = parseInt(match[1], 10);
    }
  }

  const text = await response.text();
  const data = text ? JSON.parse(text) : undefined;

  if (includeHeaders) {
    return {
      data: Array.isArray(data) ? data : [],
      totalCount: totalCount || 0,
    };
  }

  return data;
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
        Prefer: 'return=representation',
      },
      body: JSON.stringify(data),
    },
  );

  const result = await handleRestResponse(response);
  return Array.isArray(result) ? result[0] : result;
}

export async function paginationProjectsAPI({
  page,
  limit,
}: PaginationParams): Promise<PaginatedResponse<Project>> {
  const offset = getOffset(page, limit);

  const response = await authorizedFetch(
    `${REST_BASE_URL}/rpc/get_projects?limit=${limit}&offset=${offset}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Prefer: 'count=exact',
      },
    },
  );

  if (response.status === 401) {
    throw new UnauthorizedError('Unauthorized');
  }

  const result = await handleRestResponse(response, true);

  return {
    data: result.data || [],
    totalCount: result.totalCount || 0,
    page,
    limit,
  };
}
