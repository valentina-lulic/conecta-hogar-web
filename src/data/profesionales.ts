export const especialidades = [
  {
    key: "gasfiteria",
    nombre: "Gasfitería",
    color: "var(--turquoise)",
  },
  {
    key: "electricidad",
    nombre: "Electricidad",
    color: "var(--yellow)",
  },
  {
    key: "albanileria",
    nombre: "Albañilería",
    color: "var(--coral)",
  },
  {
    key: "carpinteria",
    nombre: "Carpintería",
    color: "var(--amber)",
  },
  {
    key: "techado",
    nombre: "Techado",
    color: "var(--teal)",
  },
  {
    key: "pintura",
    nombre: "Pintura",
    color: "var(--rose)",
  },
];

const NOMBRES_HOMBRES = [

  "Juan",
  "Pedro",
  "Luis",
  "Manuel",
  "Tomás",
  "Diego",
  "Rodrigo",
  "Esteban",
  "Francisco",
  "Ignacio",
  "Sebastian",
  "Matías",
  "Nicolás",
  "Benjamín",
  "Marcelo",
  "Eduardo",
  "Alejandro",
  "Cristian",
  "Omar",
  "Claudio",
  "Patricio",
  "Emilio",
  "José",
  "Gabriel",
  "Andrés",
  "Felipe",
  "Daniel",
  "Cristóbal",
  "Álvaro",
  "Vicente",
  "Joaquín",
  "Jorge",
  "Maximiliano",
];
  
const NOMBRES_MUJERES = [
  "Laura",
  "María",
  "Camila",
  "Andrea",
  "Sofía",
  "Javiera",
  "Carolina",
  "Ana",
  "Silvia",
  "Claudia",
  "Patricia",
  "Macarena",
  "Paula",
  "Constanza",
  "Raquel",
];

const APELLIDOS = [
  "Pérez",
  "González",
  "Silva",
  "Rojas",
  "Fuentes",
  "Herrera",
  "Bravo",
  "Muñoz",
  "Vargas",
  "Castillo",
  "Lopez",
  "Soto",
  "Martínez",
  "Ramírez",
  "Torres",
  "Cruz",
  "Morales",
  "Ortíz",
  "Rodríguez",
  "Hernández",
  "Gutiérrez",
  "Alarcón",
  "Navarro",
  "Padilla",
  "Vega",
  "Campos",
  "Riquelme",
  "Gaete",
  "Carrasco",
  "Marín",
  "Valderrama",
  "Pinto",
  "Gatica",
  "Betancourt",
  "Aravena",
  "Cárdenas",
  "Concha",
  "Miranda",
  "Godoy",
  "Díaz",
  "Cortés",
  "Parra",
  "Guerrero",
  "Castro",
];

// Direcciones de ejemplo para que aparezcan en las tarjetas
const COMUNAS = [
  "Santiago Centro",
  "Providencia",
  "Estación Central",
  "Ñuñoa",
  "La Florida",
  "Maipú",
  "Vitacura",
  "Peñalolén",
  "Puente Alto",
  "San Joaquín",
  "La Cisterna",
  "Independencia",
  "La Granja",
  "Quilicura",
  "Lo Prado",
  "San Bernardo",
  "Renca",
  "Huechuraba",
  "Conchalí",
  "San Miguel",
  "El Bosque",
  "San Ramón",
  "Pudahuel",
  "Lo Espejo",
  "Cerrillos",
  "Pirque",
  "San José de Maipo",
  "Recoleta",
  "Buin",
  "Macul",
  "Pedro Aguirre Cerda",
  "Cajón del Maipo",
];

// FOTOS

const FOTOS_HOMBRES = Array.from(
  { length: 100 },
  (_, i) => `https://randomuser.me/api/portraits/men/${i}.jpg`
);

const FOTOS_MUJERES = Array.from(
  { length: 100 },
  (_, i) => `https://randomuser.me/api/portraits/women/${i}.jpg`
);

// FUNCIÓN PARA OBTENER FOTO
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

const CERTIFICACIONES: any = {
  gasfiteria: [
    "Certificado SENCE - Gasfitería",
    "Técnico en Instalaciones Sanitarias",
    "Certificado SEC Gas",
    "Técnico en Gas y Calefacción SEC",
    "Técnico en Redes de Agua Potable",
    "Certificado en Reparación de Fugas",
  ],
  electricidad: [
    "SEC Clase B",
    "Instalador Eléctrico Autorizado",
    "SEC Clase A - Instalaciones Industriales",
    "Técnico Electricista DUOC",
    "Certificado en Automatización del Hogar",
  ],
  albanileria: [
    "Técnico en Construcción",
    "Maestro Albañil Certificado",
    "Técnico en Obras Civiles INACAP",
    "Certificado en Estructuras de Hormigón",
    "Técnico en Terminaciones de Obra",
  ],
  carpinteria: [
    "Maestro Carpintero Certificado",
    "Técnico en Muebles y Terminaciones",
    "Técnico en Diseño y Fabricación de Muebles",
    "Certificado en Carpintería en Obra",
  ],
  techado: [
    "Instalador de Cubiertas Certificado",
    "Técnico en Cubiertas y Aislación",
    "Certificado en Impermeabilización",
    "Técnico en Estructuras de Techumbre",
  ],
  pintura: [
    "Técnico en Pintura y Terminaciones",
    "Maestro Pintor Certificado",
    "Certificado en Pintura Decorativa",
    "Técnico en Revestimientos y Pintura Industrial",
  ],
};

function quitarTildes(texto: string) {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export function generarProfesionales(
  cantidadPorCategoria = 250
): Profesional[] {
  const lista: Profesional[] = [];
  let id = 1;
  especialidades.forEach((esp, catIdx) => {
    const certs = CERTIFICACIONES[esp.key];
    for (let i = 0; i < cantidadPorCategoria; i++) {
      
// 70% hombres - 30% mujeres
const esMujer = id % 10 < 3;

// Nombre según el género
const nombre = esMujer
  ? NOMBRES_MUJERES[(i + catIdx * 7) % NOMBRES_MUJERES.length]
  : NOMBRES_HOMBRES[(i + catIdx * 7) % NOMBRES_HOMBRES.length];

// Apellido
const apellido =
  APELLIDOS[(i + catIdx * 11) % APELLIDOS.length];

// Teléfono
const numero = `569${String(10000000 + id).slice(-8)}`;

// Comuna
const direccion =
  COMUNAS[(i + catIdx) % COMUNAS.length];

// Foto (1 de cada 7 sin foto)
const foto =
  id % 5 === 0
    ? undefined
    : fotoParaPersona(esMujer, id);

      lista.push({
        id,
        nombre: `${nombre} ${apellido}`,
        especialidad: esp.key,
        certificacion: certs[i % certs.length],
        likes: 20 + ((i * 13 + catIdx * 29) % 200),
        dislikes: (i * 3 + catIdx) % 14,
        whatsapp: numero,
        telefono: `+56 9 ${numero.slice(3, 7)} ${numero.slice(5)}`,
        email: `${quitarTildes(nombre.toLowerCase())}.${quitarTildes(apellido.toLowerCase())}@correo.cl`,
        foto,
        direccion,
      });
      id++;
    }
  });

  return lista;
}

export const profesionales = generarProfesionales(250);