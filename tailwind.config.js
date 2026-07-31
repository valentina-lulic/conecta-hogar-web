/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* Colores Principales de Marca */
        coral: {
          DEFAULT: "#E83360", // Coral / Rosa principal (Botones CTA, highlights)
          dark: "#C42750",    // Hover de botones coral
        },
        turquoise: {
          DEFAULT: "#38BDF8", // Celeste / Turquesa vibrante (Badges, botones secundarios)
          dark: "#0284C7",    // Turquesa oscuro / Avatares
        },
        teal: {
          DEFAULT: "#0A6880", // Verde azulado / Turquesa profundo (Títulos, acentos oscuros)
        },
        navy: {
          DEFAULT: "#0B1224", // Azul noche (Textos principales, footers)
          soft: "#4A5568",    // Texto secundario
        },
        yellow: {
          DEFAULT: "#F8DD1A", // Amarillo marca (Badges destacados)
          amber: "#F2A93B",
        },
        surface: {
          bg: "#F7F6F2",      // Fondo beige/gris cálido del sitio original
          card: "#FFFFFF",    // Fondo de tarjetas
          border: "#E2E8F0",  // Bordes sutiles
        },
      },
      fontFamily: {
        sans: ["Work Sans", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};