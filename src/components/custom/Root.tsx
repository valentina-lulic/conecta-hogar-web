import { useState } from "react";
import { Outlet, Link, useLocation, ScrollRestoration } from "react-router-dom";
import { motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { ImageWithFallback } from "../ui/ImageWithFallback";
import logoImg from "../../assets/icons/logoCH-removebg-preview.png";
import bgImg from "../../assets/images/FONDOAPPFINAL.png";
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
      className="min-h-screen flex flex-col relative w-full"
      style={{
        fontFamily: "'Poppins', sans-serif",
        backgroundImage: `url(${bgImg as unknown as string})`,
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover", // Se estira en ancho y alto para cubrir siempre todo el contenido dinámico
        backgroundColor: "#52c3b6", // Color respaldo integrado por si tarda en cargar la imagen
      }}
    >
      {/* ScrollRestoration */}
      <ScrollRestoration />

      {/* Navbar Superior */}
      <div className="sticky top-5 z-50 px-4 md:px-12 max-w-7xl mx-auto w-full">
        <nav
          className="flex items-center justify-between pl-6 pr-2 py-2 rounded-full border border-white/40 bg-[#fffbf7] shadow-lg"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          <div className="flex items-center gap-4">
            <Link to="/" onClick={() => setMenuOpen(false)} className="flex items-center">
              <InteractiveLogo className="h-10 w-auto" />
            </Link>
            <div className="hidden sm:block w-0.5 h-8 bg-[#e83360]" />
          </div>

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

          <button className="md:hidden mr-4" style={{ color: "#374151" }} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </div>

      {/* Menú Móvil */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col pt-28 px-8 gap-6"
          style={{
            background: "rgba(174,230,242,0.97)",
            backdropFilter: "blur(8px)",
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          {navLinks.map(({ href, label, route }) =>
            route ? (
              <Link
                key={label}
                to={href}
                className="text-2xl font-black hover:opacity-60 transition-opacity"
                style={{ color: "#374151" }}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            ) : (
              <a
                key={label}
                href={href}
                className="text-2xl font-black hover:opacity-60 transition-opacity"
                style={{ color: "#374151" }}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </a>
            )
          )}

          <div className="border-t border-gray-300 pt-6 flex flex-col gap-4">
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="py-3 font-black rounded-full border-2 text-gray-700 border-gray-400 text-center"
            >
              Ingresar
            </Link>
            <Link
              to="/registro"
              onClick={() => setMenuOpen(false)}
              className="py-3 font-black rounded-full text-center block text-white"
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

      {/* ── Footer Minimalista y Elegante ───────────────────────────────── */}
      <footer
        className="relative z-10 w-full px-4 md:px-10 pt-20 pb-10 backdrop-blur-lg transition-all text-slate-600 font-medium border-t border-slate-100"
        style={{
          /* Gradiente suave de transparente a blanco sólido */
          background: "linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.8) 20%, rgba(255, 255, 255, 1) 40%)",
          /* Máscara para un desvanecimiento suave en el borde superior */
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 15%)",
          maskImage: "linear-gradient(to bottom, transparent 0%, black 15%)",
        }}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left text-xs md:text-sm font-semibold">

          {/* Parte Izquierda: Logo y Copyright */}
          <div className="flex flex-col md:flex-row items-center gap-4">
            <ImageWithFallback
              src={logoImg}
              alt="Conecta Hogar"
              className="h-10 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
            />
            <div className="hidden md:block h-6 w-[1px] bg-slate-200" /> {/* Separador vertical solo en desktop */}
            <p>
              © {new Date().getFullYear()} Conecta Hogar. Todos los derechos reservados.
            </p>
          </div>

          {/* Parte Derecha: Hecho con amor */}
          <p className="flex items-center gap-1.5 bg-slate-50 px-4 py-1.5 rounded-full border border-slate-100 shadow-inner">
            Hecho con <span className="text-red-500 animate-pulse">❤️</span> en Chile
          </p>

        </div>
      </footer>
    </div>
  );
}

export default Root;