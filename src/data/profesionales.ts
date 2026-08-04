import { API_URL, BACKEND_URL } from "./Api";
export const especialidades = [
  { key: "electricidad", nombre: "Electricidad", color: "var(--yellow)" },
  { key: "gasfiteria", nombre: "Gasfitería", color: "var(--turquoise)" },
  { key: "albanileria", nombre: "Albañilería", color: "var(--coral)" },
  { key: "soldaduria", nombre: "Soldaduria", color: "var(--coral)" },
  { key: "carpinteria", nombre: "Carpintería", color: "var(--amber)" },
  { key: "techado", nombre: "Techado", color: "var(--teal)" },
  { key: "pintura", nombre: "Pintura", color: "var(--rose)" },
];

export interface Profesional {
  id: number;

  nombre: string;
  apellido: string;

  correo: string;
  telefono: string;

  especialidad: string;
  descripcion: string;


  comuna: string;

  disponible: boolean;

  foto?: string;

  likes: number;
  dislikes: number;
}


/* ===========================
   FUNCIONES AUXILIARES
=========================== */

export function quitarTildes(texto: string) {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}


export function normalizarEspecialidad(texto: string) {
  return quitarTildes(texto.toLowerCase())
    .replace(/\s+/g, "")
    .trim();
}


export function obtenerEtiquetaProfesional(
  p: Profesional
): {
  label: string;
  claseCSS: string;
} | null {

  if (p.likes >= 100 && p.dislikes <= 2) {
    return {
      label: "Top Profesional",
      claseCSS: "top",
    };
  }



  if (p.likes >= 30) {
    return {
      label: "Destacado",
      claseCSS: "destacado",
    };
  }

  return null;
}


/* ===========================
   FOTO
=========================== */

export function obtenerFotoProfesional(
  profesional: Profesional
): string | null {

  if (!profesional.foto) {
    return null;
  }

  // Si ya viene una URL completa
  if (profesional.foto.startsWith("http")) {
    return profesional.foto;
  }

  // Caso de tu BD:
  // /uploads/83197990-8567...
  if (profesional.foto.startsWith("/uploads/")) {
    return `${BACKEND_URL}${profesional.foto}`;
  }

  // Por si solamente viene el nombre del archivo
  return `${BACKEND_URL}/uploads/${profesional.foto}`;
}


/* ===========================
   GET MAESTROS
=========================== */

export async function obtenerProfesionales(): Promise<Profesional[]> {
  const response = await fetch(`${API_URL}/maestros`);

  if (!response.ok) {
    throw new Error("No se pudieron cargar los profesionales.");
  }

  const data: unknown = await response.json();

  if (!Array.isArray(data)) {
    throw new Error("La respuesta de maestros no tiene el formato esperado.");
  }

  return data.map((maestro: any) => {
    const usuario = maestro.usuario ?? {};

    return {
      id:
        maestro.id ??
        maestro.idUsuario ??
        maestro.id_usuario ??
        usuario.id ??
        usuario.idUsuario ??
        usuario.id_usuario ??
        0,

      nombre:
        maestro.nombre ??
        usuario.nombre ??
        "",

      apellido:
        maestro.apellido ??
        usuario.apellido ??
        "",

      correo:
        maestro.correo ??
        usuario.correo ??
        "",

      telefono:
        maestro.telefono ??
        usuario.telefono ??
        "",

      especialidad:
        maestro.especialidad ??
        "",

      descripcion:
        maestro.descripcion ??
        "",


      comuna:
        maestro.comuna ??
        "",

      disponible:
        maestro.disponible ??
        maestro.activo ??
        false,

      foto:
        maestro.fotoPerfil ??
        maestro.foto_perfil ??
        maestro.foto ??
        maestro.fotoUrl ??
        maestro.imagenUrl ??
        null,

      likes:
        maestro.meGusta ??
        maestro.me_gusta ??
        maestro.likes ??
        0,

      dislikes:
        maestro.noMeGusta ??
        maestro.no_me_gusta ??
        maestro.dislikes ??
        0,
    };
  });
}

export async function obtenerTopProfesionales(): Promise<Profesional[]> {

  const response = await fetch(`${API_URL}/maestros/top`);

  if (!response.ok) {
    throw new Error("No se pudieron cargar los mejores profesionales.");
  }

  const data = await response.json();

  return data.map((maestro: any) => ({
    id: maestro.id,

    nombre: maestro.nombre ?? "",
    apellido: maestro.apellido ?? "",

    correo: maestro.correo ?? "",
    telefono: maestro.telefono ?? "",

    especialidad: maestro.especialidad ?? "",
    descripcion: maestro.descripcion ?? "",

    experienciaAnos: maestro.experienciaAnos ?? 0,

    comuna: maestro.comuna ?? "",

    disponible: maestro.disponible ?? false,

    foto:
      maestro.fotoPerfil ??
      maestro.foto_perfil ??
      maestro.foto ??
      null,

    likes:
      maestro.meGusta ??
      0,

    dislikes:
      maestro.noMeGusta ??
      0,
  }));
}