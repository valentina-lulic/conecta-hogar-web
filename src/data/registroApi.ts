// Interfaz actualizada con 'password' y 'especialidad' única
export interface RegistroData {
    nombre: string;
    rut: string;
    correo: string;
    password: string;
    tipoUsuario: "cliente" | "profesional";
    especialidad?: string;
}

export interface RegistroResponse {
    success: boolean;
    message: string;
    data?: any;
}

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

/**
 * Función para registrar un usuario (Cliente o Profesional) en el backend.
 */
export async function registrarUsuario(data: RegistroData): Promise<RegistroResponse> {
    try {
        const response = await fetch(`${API_URL}/registro`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Ocurrió un error al intentar registrarte.");
        }

        return result;
    } catch (error: any) {
        console.error("Error en registroApi.ts:", error);
        throw new Error(error.message || "Error al conectar con el servidor.");
    }
}