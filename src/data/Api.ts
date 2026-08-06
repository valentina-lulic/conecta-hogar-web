export const BACKEND_URL = "http://localhost:8080";
export const API_URL = BACKEND_URL;

export type Role = "CLIENTE" | "MAESTRO" | "ADMIN";

export interface AuthResponse {
  token: string;
  mensaje: string;
  rol: Role;
  nombre?: string;
  apellido?: string;
  correo?: string;
}

export interface SessionData {
  token: string;
  role: string;
  name?: string;
  nombre?: string;
  apellido?: string;
  correo?: string;
  rol?: string;
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

export function saveSession(session: AuthResponse) {
  localStorage.setItem("token", session.token);
  localStorage.setItem("role", session.rol);
  if (session.nombre) {
    localStorage.setItem("name", session.nombre);
  }
  // Guarda el objeto completo de la sesión para que React lo lea sin perder ningún campo
  localStorage.setItem("session", JSON.stringify(session));
}

export function getToken(): string | null {
  return localStorage.getItem("token");
}

export function getRole(): string | null {
  return localStorage.getItem("role");
}

export function getSession(): any {
  const sessionStr = localStorage.getItem("session");
  if (sessionStr) {
    try {
      return JSON.parse(sessionStr);
    } catch {
      // Si falla la lectura, pasa al respaldo
    }
  }

  const token = getToken();
  if (!token) return null;

  return {
    token,
    role: getRole() || "CLIENTE",
    rol: getRole() || "CLIENTE",
    nombre: localStorage.getItem("name") || "",
    name: localStorage.getItem("name") || "",
  };
}

export function isAuthenticated(): boolean {
  return Boolean(getToken());
}

export function clearSession(): void {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("name");
  localStorage.removeItem("session");
}

// ==============================
// MAESTROS
// ==============================

export interface Maestro {
  id: number;
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
  especialidad: string;
  descripcion: string;
  experienciaAnos: number;
  comuna: string;
  disponible: boolean;
  foto?: string;
  meGusta?: number;
  noMeGusta?: number;
}

export async function getMaestros(): Promise<Maestro[]> {
  const response = await fetch(`${API_URL}/maestros`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("No se pudieron cargar los profesionales.");
  }

  return response.json();
}