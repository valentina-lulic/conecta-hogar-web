import { useState, useEffect } from "react";
import { Outlet, Link, useLocation, useNavigate, ScrollRestoration } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, User, LogOut, ShieldCheck, Sparkles } from "lucide-react";
import { ImageWithFallback } from "../ui/ImageWithFallback";
import logoImg from "../../assets/icons/logoCH-removebg-preview.png";
import { MapBackground } from "./MapBackground";
import { InteractiveLogo } from "./InteractiveLogo";

import { getSession, clearSession } from "@/data/Api";

const PINK = "#e83360";
const DARK = "#0a6880";

const navLinks = [
  { href: "/nosotros", label: "Nosotros", route: true },
  { href: "/profesionales", label: "Profesionales", route: true },
  { href: "/contacto", label: "Contacto", route: true },
  { href: "/garantia", label: "Garantía", route: true },
];

// ── Root layout ────────────────────────────────────────────────
export function Root() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname, state } = useLocation();
  const navigate = useNavigate();

  const [session, setSession] = useState(getSession());
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const currentSession = getSession();
    setSession(currentSession);

    // Funciona perfectamente tanto en navegador como en Node.js
    let timer: ReturnType<typeof setTimeout> | undefined;

    if (state?.welcome && currentSession) {
      setShowWelcome(true);

      window.history.replaceState({}, document.title);

      timer = setTimeout(() => {
        setShowWelcome(false);
      }, 4000);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [pathname, state]);

  const handleLogout = () => {
    clearSession();
    setSession(null);
    setMenuOpen(false);
    navigate("/login");
  };

  return (
    <div
      className="min-h-screen flex flex-col relative w-full bg-[#52c3b6]"
      style={{
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {/* CAPA DE FONDO UNIFICADA Y RESPONSIVA */}
      <MapBackground />

      {/* CONTENIDO PRINCIPAL DE LA APLICACIÓN */}
      <div className="relative z-10 flex-1 flex flex-col w-full">
        {/* ScrollRestoration */}
        <ScrollRestoration />

        {/* 🌟 BANNER / POPUP FLOTANTE DE BIENVENIDA 🌟 */}
        <AnimatePresence>
          {showWelcome && session && (
            <motion.div
              initial={{ opacity: 0, y: -50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="fixed top-24 left-1/2 -translate-x-1/2 z-50 px-6 py-3.5 rounded-full bg-white/95 backdrop-blur-md border border-white/80 shadow-2xl flex items-center gap-3 text-navy font-poppins"
            >
              <div className="p-2 rounded-full bg-coral/10 text-coral">
                <Sparkles size={20} className="animate-spin-slow" />
              </div>
              <div>
                <p className="text-xs text-navy-soft font-normal">¡Sesión iniciada con éxito!</p>
                <p className="text-sm font-black text-teal">
                  Bienvenido(a) de nuevo, <span className="text-coral">{session.name || session.role}</span> 👋
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navbar Superior */}
        <div className="sticky top-5 z-50 px-4 md:px-12 max-w-7xl mx-auto w-full">
          <nav
            className="flex items-center justify-between pl-4 md:pl-6 pr-2 py-2 rounded-full border border-white/40 bg-[#fffbf7] shadow-lg"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            {/* Logo alineado a la izquierda */}
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

            {/* Botones / Estado de Usuario Versión Desktop */}
            <div className="hidden md:flex items-center gap-3">
              {session ? (
                /* 🟢 SI EL USUARIO YA INICIÓ SESIÓN */
                <div className="flex items-center gap-3">
                  {session.role === "Administrador" && (
                    <Link
                      to="/admin"
                      className="flex items-center gap-1.5 text-xs font-black bg-amber-100 text-amber-900 px-3.5 py-2 rounded-full shadow-sm hover:bg-amber-200 transition-colors"
                    >
                      <ShieldCheck size={16} /> Admin
                    </Link>
                  )}

                  {/* Saludo con el nombre / rol */}
                  <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm">
                    <User size={18} style={{ color: PINK }} />
                    <span className="text-xs md:text-sm font-black" style={{ color: DARK }}>
                      Hola, {session.name || session.role}
                    </span>
                  </div>

                  {/* Botón Salir */}
                  <button
                    onClick={handleLogout}
                    title="Cerrar sesión"
                    className="p-2.5 rounded-full bg-gray-100 text-gray-600 hover:text-red-600 hover:bg-red-50 transition-all shadow-sm border border-gray-200 cursor-pointer"
                  >
                    <LogOut size={18} />
                  </button>
                </div>
              ) : (
                /* 🔴 SI ES VISITANTE ANÓNIMO */
                <>
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Link
                      to="/login"
                      className="px-5 py-3 text-sm font-bold rounded-full bg-[#55bcd9] text-white hover:opacity-90 transition-opacity text-center tracking-wide block"
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
                </>
              )}
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
            {/* Lista de páginas */}
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

            {/* Botones de acción móvil (Adaptados con sesión) */}
            <div className="flex flex-col gap-3.5 pt-6 border-t border-white/30">
              {session ? (
                <>
                  <div className="flex items-center justify-center gap-2 bg-white/90 py-3 rounded-full text-[#0a6880] font-black">
                    <User size={20} style={{ color: PINK }} />
                    <span>Hola, {session.name || session.role}</span>
                  </div>

                  {session.role === "Administrador" && (
                    <Link
                      to="/admin"
                      onClick={() => setMenuOpen(false)}
                      className="py-3 font-black rounded-full bg-amber-100 text-amber-900 text-center text-sm shadow-md flex items-center justify-center gap-2"
                    >
                      <ShieldCheck size={18} /> Panel Admin
                    </Link>
                  )}

                  <button
                    onClick={handleLogout}
                    className="py-3 font-black rounded-full bg-red-500 text-white text-center text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <LogOut size={18} /> Cerrar Sesión
                  </button>
                </>
              ) : (
                <>
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
                </>
              )}
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
              <div className="hidden md:block h-6 w-px bg-slate-200" />
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