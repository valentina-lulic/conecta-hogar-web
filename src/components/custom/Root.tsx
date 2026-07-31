import { useState } from "react";
import { Outlet, Link, useLocation, ScrollRestoration } from "react-router-dom";
import { motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { ImageWithFallback } from "../ui/ImageWithFallback";
import logoImg from "../../assets/icons/logoCH-removebg-preview.png";
import bgImg from "../../assets/images/FONDOAPPFINAL.png";
import phoneBgImg from "../../assets/images/PHONEBACK.png";
import { InteractiveLogo } from "./InteractiveLogo";

const PINK = "#e83360";

const navLinks = [
  { href: "/nosotros", label: "Nosotros", route: true },
  { href: "/profesionales", label: "Profesionales", route: true },
  { href: "/contacto", label: "Contacto", route: true },
  { href: "/garantia", label: "Garantía", route: true },
];

// ── Root layout ────────────────────────────────────────────────
export function Root() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <div
      className="min-h-screen flex flex-col relative w-full bg-[#52c3b6]"
      style={{
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {/* CAPA DE FONDO EXCLUSIVA PARA MÓVILES (PHONEBACK) */}
      <div
        className="fixed inset-0 z-0 pointer-events-none md:hidden bg-no-repeat bg-center bg-cover"
        style={{
          backgroundImage: `url(${phoneBgImg as unknown as string})`,
        }}
      />

      {/* CAPA DE FONDO EXCLUSIVA PARA DESKTOP (FONDOAPPFINAL) */}
      <div
        className="hidden md:block absolute inset-0 z-0 pointer-events-none bg-no-repeat bg-top bg-cover"
        style={{
          backgroundImage: `url(${bgImg as unknown as string})`,
        }}
      />

      {/* CONTENIDO PRINCIPAL DE LA APLICACIÓN */}
      <div className="relative z-10 flex-1 flex flex-col w-full">
        {/* ScrollRestoration */}
        <ScrollRestoration />

        {/* Navbar Superior */}
        <div className="sticky top-5 z-50 px-4 md:px-12 max-w-7xl mx-auto w-full">
          <nav
            className="flex items-center justify-between pl-4 md:pl-6 pr-2 py-2 rounded-full border border-white/40 bg-[#fffbf7] shadow-lg"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            {/* Logo alineado forzadamente a la izquierda */}
            <div className="flex items-center justify-start gap-4">
              <Link to="/" onClick={() => setMenuOpen(false)} className="flex items-center justify-start text-left">
                <InteractiveLogo className="h-9 md:h-10 w-auto" />
              </Link>
              <div className="hidden sm:block w-0.5 h-8 bg-[#e83360]" />
            </div>

            {/* Enlaces versión Desktop */}
            <div className="hidden md:flex items-center gap-8 text-sm font-bold tracking-wide text-[#1f2937]">
              {navLinks.map(({ href, label, route }) => {
                const active = route && pathname === href;
                return route ? (
                  <Link
                    key={label}
                    to={href}
                    className="transition-colors hover:text-[#e83360]"
                    style={{ color: active ? PINK : "#1f2937" }}
                  >
                    {label}
                  </Link>
                ) : (
                  <a key={label} href={href} className="transition-colors hover:text-[#e83360]">
                    {label}
                  </a>
                );
              })}
            </div>

            {/* Botones versión Desktop */}
            <div className="hidden md:flex items-center gap-3">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/login"
                  className="px-5 py-3 text-sm font-bold rounded-full bg-[#55bcd9] text-white hover:opacity-90 transition-opacity text-center tracking-wide"
                >
                  Ingresar
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/registro"
                  className="px-6 py-3 text-sm font-medium rounded-full text-white shadow-md block transition-transform text-center tracking-wide"
                  style={{ background: PINK }}
                >
                  Registrarse
                </Link>
              </motion.div>
            </div>

            {/* Botón menú hamburguesa / cerrar en móvil */}
            <button
              className="md:hidden mr-2 p-1.5 text-gray-700 hover:text-gray-900 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Abrir menú"
            >
              {menuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </nav>
        </div>

        {/* Menú desplegable Móvil */}
        {menuOpen && (
          <div
            className="fixed inset-0 z-40 flex flex-col pt-28 px-8 justify-between pb-12 transition-all duration-300"
            style={{
              background:
                "linear-gradient(135deg, rgba(82, 195, 182, 0.88) 0%, rgba(100, 205, 150, 0.88) 35%, rgba(220, 210, 80, 0.88) 70%, rgba(232, 90, 70, 0.88) 100%)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            {/* Lista de páginas: Texto en Blanco, Responsivo y con Sombra Suave */}
            <div className="flex flex-col gap-6">
              {navLinks.map(({ href, label, route }) =>
                route ? (
                  <Link
                    key={label}
                    to={href}
                    className="text-xl sm:text-2xl md:text-3xl font-bold tracking-wide text-white drop-shadow-md hover:opacity-80 transition-opacity"
                    onClick={() => setMenuOpen(false)}
                  >
                    {label}
                  </Link>
                ) : (
                  <a
                    key={label}
                    href={href}
                    className="text-xl sm:text-2xl md:text-3xl font-bold tracking-wide text-white drop-shadow-md hover:opacity-80 transition-opacity"
                    onClick={() => setMenuOpen(false)}
                  >
                    {label}
                  </a>
                )
              )}
            </div>

            {/* Botones de acción móvil */}
            <div className="flex flex-col gap-3.5 pt-6 border-t border-white/30">
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="py-3.5 font-bold rounded-full bg-[#55bcd9] text-white text-center text-base shadow-md hover:opacity-90 transition-opacity"
              >
                Ingresar
              </Link>
              <Link
                to="/registro"
                onClick={() => setMenuOpen(false)}
                className="py-3.5 font-bold rounded-full text-center text-white text-base shadow-md hover:opacity-90 transition-opacity"
                style={{ background: PINK }}
              >
                Registrarse
              </Link>
            </div>
          </div>
        )}

        {/* Contenido Dinámico */}
        <main className="flex-1">
          <Outlet />
        </main>

        {/* Footer Minimalista */}
        <footer
          className="relative z-10 w-full px-4 md:px-10 pt-20 pb-10 backdrop-blur-lg transition-all text-slate-600 font-medium border-t border-slate-100"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.8) 20%, rgba(255, 255, 255, 1) 40%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 15%)",
            maskImage: "linear-gradient(to bottom, transparent 0%, black 15%)",
          }}
        >
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left text-xs md:text-sm font-semibold">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <ImageWithFallback
                src={logoImg}
                alt="Conecta Hogar"
                className="h-10 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
              />
              <div className="hidden md:block h-6 w-px[1] bg-slate-200" />
              <p>© {new Date().getFullYear()} Conecta Hogar. Todos los derechos reservados.</p>
            </div>

            <p className="flex items-center gap-1.5 bg-slate-50 px-4 py-1.5 rounded-full border border-slate-100 shadow-inner">
              Hecho con <span className="text-red-500 animate-pulse">❤️</span> en Chile
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Root;