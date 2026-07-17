export interface SignUpRequest {
  email: string;
  password: string;
  data: {
    name: string;
    job_title?: string;
  };
}

export interface SignResponse {
  access_token: string;
  refresh_token: string;
  user: {
    id: string;
    email: string;
  };
}

export interface LoginRequest {
  email: string;
  password: string;
}

const BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

const getHeaders = () => ({
  'Content-Type': 'application/json',
  apikey: import.meta.env.VITE_API_KEY as string,
});

const getAuthHeaders = (accessToken: string) => ({
  'Content-Type': 'application/json',
  apikey: import.meta.env.VITE_API_KEY as string,
  Authorization: `Bearer ${accessToken}`,
});

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(
      error.error_description || error.message || 'Invalid email or password',
    );
  }
  return response.json();
};

export async function signUp(userData: SignUpRequest): Promise<SignResponse> {
  const response = await fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(userData),
  });

  return handleResponse(response);
}

export async function login(userData: LoginRequest): Promise<SignResponse> {
  const response = await fetch(`${BASE_URL}/token?grant_type=password`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(userData),
  });
  return handleResponse(response);
}

export async function logoutUser(accessToken: string): Promise<void> {
  const response = await fetch(`${BASE_URL}/logout`, {
    method: 'POST',
    headers: getAuthHeaders(accessToken),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(
      error.error_description ||
        error.message ||
        'Logout failed, please try again.',
    );
  }
}
