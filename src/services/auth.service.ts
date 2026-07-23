const BASE_URL = import.meta.env.VITE_API_BASE_URL as string;
const API_KEY = import.meta.env.VITE_API_KEY as string;

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignUpData {
  email: string;
  password: string;
  name: string;
  jobTitle?: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  user: {
    user_metadata: {
      name: string;
      job_title?: string;
    };
  };
}

function getHeaders() {
  return {
    'Content-Type': 'application/json',
    apikey: API_KEY,
  };
}

function getAuthHeaders(token: string) {
  return {
    'Content-Type': 'application/json',
    apikey: API_KEY,
    Authorization: `Bearer ${token}`,
  };
}

async function handleResponse(response: Response) {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const rawMessage =
      errorData.msg ||
      errorData.error_description ||
      errorData.message ||
      errorData.error ||
      'Unexpected error';
    throw new Error(rawMessage);
  }
  const text = await response.text();
  if (!text) {
    return undefined;
  }

  return JSON.parse(text);
}

export async function loginAPI(credentials: LoginCredentials): Promise<AuthResponse> {
  const response = await fetch(`${BASE_URL}/token?grant_type=password`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(credentials),
  });
  return handleResponse(response);
}

export async function signUpAPI(data: SignUpData): Promise<AuthResponse> {
  const requestBody = {
    email: data.email,
    password: data.password,
    data: {
      name: data.name,
      ...(data.jobTitle ? { job_title: data.jobTitle } : {}),
    },
  };

  const response = await fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(requestBody),
  });
  return handleResponse(response);
}

export async function refreshTokenAPI(refreshToken: string): Promise<AuthResponse> {
  const response = await fetch(`${BASE_URL}/token?grant_type=refresh_token`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ refresh_token: refreshToken }),
  });
  return handleResponse(response);
}

export async function logoutAPI(token: string): Promise<void> {
  const response = await fetch(`${BASE_URL}/logout`, {
    method: 'POST',
    headers: getAuthHeaders(token),
  });
  await handleResponse(response);
}

export async function recoverPasswordAPI(email: string): Promise<void> {
  const response = await fetch(`${BASE_URL}/recover`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ email }),
  });
  await handleResponse(response);
}