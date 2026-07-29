export const especialidades = [
  { key: "gasfiteria", nombre: "Gasfitería", color: "var(--turquoise)" },
  { key: "electricidad", nombre: "Electricidad", color: "var(--yellow)" },
  { key: "albanileria", nombre: "Albañilería", color: "var(--coral)" },
  { key: "carpinteria", nombre: "Carpintería", color: "var(--amber)" },
  { key: "techado", nombre: "Techado", color: "var(--teal)" },
  { key: "pintura", nombre: "Pintura", color: "var(--rose)" },
];

const NOMBRES_HOMBRES = [
  "Juan", "Pedro", "Luis", "Manuel", "Tomás", "Diego", "Rodrigo", "Esteban",
  "Francisco", "Ignacio", "Sebastian", "Matías", "Nicolás", "Benjamín", "Marcelo",
  "Eduardo", "Alejandro", "Cristian", "Omar", "Claudio", "Patricio", "Emilio",
  "José", "Gabriel", "Andrés", "Felipe", "Daniel", "Cristóbal", "Álvaro", "Vicente",
  "Joaquín", "Jorge", "Maximiliano",
];

const NOMBRES_MUJERES = [
  "Laura", "Stephanie", "Camila", "Andrea", "Sofía", "Javiera", "Carolina", "Ana",
  "Silvia", "Claudia", "Patricia", "Macarena", "Paula", "Constanza", "Raquel", "María",
];

const APELLIDOS = [
  "Pérez", "González", "Silva", "Rojas", "Fuentes", "Herrera", "Bravo", "Muñoz",
  "Vargas", "Castillo", "Lopez", "Soto", "Martínez", "Ramírez", "Torres", "Cruz",
  "Morales", "Ortíz", "Rodríguez", "Hernández", "Gutiérrez", "Alarcón", "Navarro",
  "Padilla", "Vega", "Campos", "Riquelme", "Gaete", "Carrasco", "Marín", "Valderrama",
  "Pinto", "Gatica", "Betancourt", "Aravena", "Cárdenas", "Concha", "Miranda",
  "Godoy", "Díaz", "Cortés", "Parra", "Guerrero", "Castro",
];

const COMUNAS = [
  "Santiago Centro", "Providencia", "Estación Central", "Ñuñoa", "La Florida",
  "Maipú", "Vitacura", "Peñalolén", "Puente Alto", "San Joaquín", "La Cisterna",
  "Independencia", "La Granja", "Quilicura", "Lo Prado", "San Bernardo", "Renca",
  "Huechuraba", "Conchalí", "San Miguel", "El Bosque", "San Ramón", "Pudahuel",
  "Lo Espejo", "Cerrillos", "Pirque", "San José de Maipo", "Recoleta", "Buin",
  "Macul", "Pedro Aguirre Cerda", "Cajón del Maipo",
];

const FOTOS_HOMBRES = Array.from(
  { length: 100 },
  (_, i) => `https://randomuser.me/api/portraits/men/${i}.jpg`
);

const FOTOS_MUJERES = Array.from(
  { length: 100 },
  (_, i) => `https://randomuser.me/api/portraits/women/${i}.jpg`
);

function fotoParaPersona(esMujer: boolean, id: number): string {
  const pool = esMujer ? FOTOS_MUJERES : FOTOS_HOMBRES;
  return pool[id % pool.length];
}

export interface Profesional {
  id: number;
  nombre: string;
  especialidad: string;
  certificacion: string;
  likes: number;
  dislikes: number;
  whatsapp: string;
  telefono: string;
  email: string;
  foto?: string;
  direccion?: string;
}

/**
 * Función de Clasificación Dinámica (Badges)
 */
export function obtenerEtiquetaProfesional(p: Profesional): { label: string; claseCSS: string } | null {
  if (p.likes >= 100 && p.dislikes <= 2) {
    return { label: "Top Profesional", claseCSS: "top" };
  }

  if (p.certificacion && p.certificacion.trim().length > 0) {
    return { label: "Verificada", claseCSS: "verificada" };
  }

  if (p.likes >= 30) {
    return { label: "Destacado", claseCSS: "destacado" };
  }

  return null;
}

const CERTIFICACIONES: Record<string, string[]> = {
  gasfiteria: [
    "Gasfítero certificado",
    "Técnico en Instalaciones Sanitarias",
    "Certificado SEC Gas",
    "Técnico en Gas y Calefacción SEC",
    "Técnico en Redes de Agua Potable",
    "Certificado en Reparación de Fugas",
  ],
  electricidad: [
    "Electricista",
    "Instalador Eléctrico Autorizado",
    "SEC Clase A - Instalaciones Industriales",
    "Técnico Electricista DUOC",
    "Certificado en Automatización del Hogar",
  ],
  albanileria: [
    "Albañil profesional",
    "Maestro Albañil Certificado",
    "Técnico en Obras Civiles INACAP",
    "Certificado en Estructuras de Hormigón",
  ],
  carpinteria: [
    "Carpintero profesional",
    "Técnico en Muebles y Terminaciones",
    "Certificado en Carpintería en Obra",
  ],
  techado: [
    "Techador profesional",
    "Técnico en Cubiertas y Aislación",
    "Certificado en Impermeabilización",
  ],
  pintura: [
    "Pintor profesional",
    "Maestro Pintor Certificado",
    "Certificado en Pintura Decorativa",
  ],
};

function quitarTildes(texto: string) {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export function generarProfesionales(
  cantidadPorCategoria = 6
): Profesional[] {
  const lista: Profesional[] = [];
  let id = 1;
  especialidades.forEach((esp, catIdx) => {
    const certs = CERTIFICACIONES[esp.key];
    for (let i = 0; i < cantidadPorCategoria; i++) {
      const esMujer = id % 10 < 3;

      const nombre = esMujer
        ? NOMBRES_MUJERES[(i + catIdx * 7) % NOMBRES_MUJERES.length]
        : NOMBRES_HOMBRES[(i + catIdx * 7) % NOMBRES_HOMBRES.length];

      const apellido = APELLIDOS[(i + catIdx * 11) % APELLIDOS.length];
      const numero = `569${String(10000000 + id).slice(-8)}`;
      const direccion = COMUNAS[(i + catIdx) % COMUNAS.length];
      const foto = fotoParaPersona(esMujer, id);

      lista.push({
        id,
        nombre: `${nombre} ${apellido}`,
        especialidad: esp.key,
        certificacion: certs[i % certs.length],
        likes: 30 + ((i * 15 + catIdx * 29) % 200),
        dislikes: (i * 3 + catIdx) % 14,
        whatsapp: numero,
        telefono: `+56 9 ${numero.slice(3, 7)} ${numero.slice(5)}`,
        email: `${quitarTildes(nombre.toLowerCase())}.${quitarTildes(
          apellido.toLowerCase()
        )}@correo.cl`,
        foto,
        direccion,
      });
      id++;
    }
  });

  return lista.sort((a, b) => {
    const etiquetaA = obtenerEtiquetaProfesional(a)?.claseCSS;
    const etiquetaB = obtenerEtiquetaProfesional(b)?.claseCSS;

    const peso = (clase?: string) => {
      if (clase === "top") return 3;
      if (clase === "verificada") return 2;
      if (clase === "destacado") return 1;
      return 0;
    };

    const pesoA = peso(etiquetaA);
    const pesoB = peso(etiquetaB);

    if (pesoA !== pesoB) {
      return pesoB - pesoA;
    }

    return b.likes - a.likes;
  });
}

export const profesionales = generarProfesionales(6);