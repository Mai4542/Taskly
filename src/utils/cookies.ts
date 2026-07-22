const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const USER_KEY = 'user';

function setCookie(name: string, value: string, days?: number): void {
  let cookieString = `${name}=${encodeURIComponent(value)};path=/;SameSite=Lax`;

  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    cookieString += `;expires=${date.toUTCString()}`;
  }

  document.cookie = cookieString;
}

function getCookie(name: string): string | null {
  const nameEQ = name + '=';
  const cookiesArray = document.cookie.split(';');

  for (let cookie of cookiesArray) {
    cookie = cookie.trim();
    if (cookie.indexOf(nameEQ) === 0) {
      return decodeURIComponent(cookie.substring(nameEQ.length));
    }
  }

  return null;
}

function deleteCookie(name: string): void {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`;
}

export function storeToken(accessToken: string, refreshToken: string, rememberMe: boolean): void {
  const days = rememberMe ? 30 : undefined;
  setCookie(ACCESS_TOKEN_KEY, accessToken, days);
  setCookie(REFRESH_TOKEN_KEY, refreshToken, days);
}

export function getToken(): string | null {
  return getCookie(ACCESS_TOKEN_KEY);
}

export function getRefreshToken(): string | null {
  return getCookie(REFRESH_TOKEN_KEY);
}

export function storeUser(user: { name: string; jobTitle: string }): void {
  setCookie(USER_KEY, JSON.stringify(user));
}

export function getUser(): { name: string; jobTitle: string } | null {
  const saved = getCookie(USER_KEY);
  if (!saved) return null;

  try {
    return JSON.parse(saved);
  } catch {
    return null;
  }
}

export function clearAuth(): void {
  deleteCookie(ACCESS_TOKEN_KEY);
  deleteCookie(REFRESH_TOKEN_KEY);
  deleteCookie(USER_KEY);

}