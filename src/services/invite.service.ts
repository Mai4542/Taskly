import { authorizedFetch } from '../utils/apiClient';
import type {
  InviteMemberPayload,
  InviteMemberResponse,
  AcceptInvitationPayload,
  AcceptInvitationResponse,
} from '../types/invite.type';

const AUTH_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;
const BASE_URL = AUTH_BASE_URL.replace('/auth/v1', '');
const REST_BASE_URL = `${BASE_URL}/rest/v1`;
const APP_URL =
  (import.meta.env.VITE_APP_URL as string) || 'http://localhost:5173';

export class UnauthorizedError extends Error {}

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function parseBody(response: Response) {
  const text = await response.text();
  return text ? JSON.parse(text) : {};
}

export const inviteService = {
  inviteMember: async (
    email: string,
    projectId: string,
  ): Promise<InviteMemberResponse> => {
    const payload: InviteMemberPayload = {
      p_base_url: BASE_URL,
      p_email: email,
      p_project_id: projectId,
      p_app_url: APP_URL,
    };

    console.log('Payload:', payload);
    console.log('REST URL:', `${REST_BASE_URL}/rpc/invite_member`);

    const response = await authorizedFetch(
      `${REST_BASE_URL}/rpc/invite_member`,
      {
        method: 'POST',
        body: JSON.stringify(payload),
      },
    );

    if (response.status === 401) {
      throw new UnauthorizedError('Unauthorized');
    }

    const data = await parseBody(response);

    if (!response.ok) {
      throw new ApiError(
        data?.message || 'Failed to send invitation',
        response.status,
      );
    }

    return data;
  },

  acceptInvitation: async (
    token: string,
  ): Promise<AcceptInvitationResponse> => {
    const payload: AcceptInvitationPayload = { p_token: token };

    const response = await authorizedFetch(
      `${REST_BASE_URL}/rpc/accept_invitation`,
      {
        method: 'POST',
        body: JSON.stringify(payload),
      },
    );

    if (response.status === 401) {
      throw new UnauthorizedError('Unauthorized');
    }

    const data = await parseBody(response);

    if (!response.ok) {
      throw new ApiError(
        data?.message || 'Failed to accept invitation',
        response.status,
      );
    }

    return data;
  },
};
