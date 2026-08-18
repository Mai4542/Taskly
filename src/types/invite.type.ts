export interface InviteMemberPayload {
  p_email: string;
  p_project_id: string;
  p_app_url: string;
  p_base_url: string;
}

export interface AcceptInvitationPayload {
  p_token: string;
}

export interface InviteMemberResponse {
  success: boolean;
  message?: string;
}

export interface AcceptInvitationResponse {
  success: boolean;
  project_id?: string;
  message?: string;
}

export interface ApiErrorResponse {
  message?: string;
  code?: string;
}
