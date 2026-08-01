import { authorizedFetch } from '../utils/apiClient';

const AUTH_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;
const REST_BASE_URL = AUTH_BASE_URL.replace('/auth/v1', '/rest/v1');

export type MemberRole = 'owner' | 'admin' | 'member' | 'viewer';

export interface ProjectMember {
  id: string;
  name: string;
  email: string;
  role: MemberRole;
  avatar_url?: string | null;
}

interface RawProjectMember {
  member_id: string;
  user_id: string;
  project_id: string;
  email: string;
  role: MemberRole;
  metadata?: {
    name?: string;
    job_title?: string;
    email?: string;
    [key: string]: unknown;
  };
}

export class UnauthorizedError extends Error {}

export async function getProjectMembersAPI(
  projectId: string,
): Promise<ProjectMember[]> {
  const response = await authorizedFetch(
    `${REST_BASE_URL}/get_project_members?project_id=eq.${projectId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  if (response.status === 401) {
    throw new UnauthorizedError('Unauthorized');
  }

  if (!response.ok) {
    throw new Error('Failed to load project members');
  }

  const text = await response.text();
  const raw: RawProjectMember[] = text ? JSON.parse(text) : [];

  return raw.map((m) => ({
    id: m.user_id,
    name: m.metadata?.name || m.email,
    email: m.email,
    role: m.role,
    avatar_url: null,
  }));
}
