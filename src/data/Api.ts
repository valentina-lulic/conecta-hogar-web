// Configuración central de la API.
// Cambia esta URL cuando despliegues el backend en un servidor real.
export const API_URL = "http://localhost:8080/api";

export type Role = "Cliente" | "Profesional" | "Administrador";

interface AuthResponse {
  token: string;
  role: Role;
  name?: string;
}

/**
 * Errores de red o de credenciales lanzan un Error con un mensaje
 * ya listo para mostrarle al usuario.
 */
async function parseErrorMessage(response: Response, fallback: string): Promise<string> {
  try {
    const data = await response.json();
    return data?.message || data?.error || fallback;
  } catch {
    return fallback;
  }
}

export async function loginRequest(email: string, password: string): Promise<AuthResponse> {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const message =
      response.status === 401
        ? "Correo o contraseña incorrectos."
        : await parseErrorMessage(response, "No se pudo iniciar sesión. Intenta nuevamente.");
    throw new Error(message);
  }

  return response.json();
}

export interface RegisterPayload {
  nombre: string;
  rut: string;
  correo: string;
  password: string;
  direccion: string;
  tipoUsuario: "cliente" | "profesional";
  especialidades: string[];
}

export async function registerRequest(payload: RegisterPayload): Promise<AuthResponse> {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const message =
      response.status === 409
        ? "Ya existe una cuenta registrada con ese correo o RUT."
        : await parseErrorMessage(response, "No se pudo completar el registro. Intenta nuevamente.");
    throw new Error(message);
  }

  return response.json();
}

// ---- Helpers de sesión (localStorage) ----

export function saveSession({ token, role, name }: AuthResponse) {
  localStorage.setItem("token", token);
  localStorage.setItem("role", role);
  if (name) localStorage.setItem("name", name);
}

export function clearSession() {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("name");
}

export function getToken(): string | null {
  return localStorage.getItem("token");
}

export function getRole(): Role | null {
  return localStorage.getItem("role") as Role | null;
}

export function isAuthenticated(): boolean {
  return Boolean(getToken());
}