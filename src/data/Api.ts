export const API_URL = "http://localhost:8080";

export interface AuthResponse {
  token: string;
  mensaje: string;
}

async function parseErrorMessage(
  response: Response,
  fallback: string
): Promise<string> {
  try {
    const data = await response.json();

    return data?.message || data?.mensaje || data?.error || fallback;
  } catch {
    return fallback;
  }
}

export async function loginRequest(
  email: string,
  password: string
): Promise<AuthResponse> {

  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      correo: email,
      contrasena: password,
    }),
  });

  if (!response.ok) {
    const message =
      response.status === 401
        ? "Correo o contraseña incorrectos."
        : await parseErrorMessage(
            response,
            "No se pudo iniciar sesión."
          );

    throw new Error(message);
  }

  return response.json();
}

export function saveSession(session: AuthResponse): void {
  localStorage.setItem("token", session.token);
}

export function getToken(): string | null {
  return localStorage.getItem("token");
}

export function isAuthenticated(): boolean {
  return Boolean(getToken());
}

export function clearSession(): void {
  localStorage.removeItem("token");
}