export interface RegistroData {
  nombre: string;
  apellido: string;
  rut: string;
  telefono: string;
  direccion: string;
  correo: string;
  password: string;
  tipoUsuario: "cliente" | "profesional";
  especialidad?: string;
}

export interface RegistroResponse {
  token?: string;
  mensaje?: string;
  message?: string;
  rol?: string;
  nombre?: string;
  apellido?: string;
  correo?: string;
  success?: boolean;
  data?: any;
}

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/auth";

export async function registrarUsuario(data: RegistroData): Promise<RegistroResponse> {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.mensaje || result.message || "Ocurrió un error al intentar registrarte.");
    }

    return result;
  } catch (error: any) {
    console.error("Error en registroApi.ts:", error);
    throw new Error(error.message || "Error al conectar con el servidor.");
  }
}