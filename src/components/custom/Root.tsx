import { useState, useEffect } from "react";
import { Outlet, Link, useLocation, useNavigate, ScrollRestoration } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, User, LogOut, ShieldCheck, Sparkles, Briefcase, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "../ui/ImageWithFallback";
import logoImg from "../../assets/icons/logoCH-removebg-preview.png";
import { MapBackground } from "./MapBackground";
import { InteractiveLogo } from "./InteractiveLogo";

import { getSession, clearSession } from "@/data/Api";

const PINK = "#e83360";

const publicNavLinks = [
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
  { href: "/garantia", label: "Garantía" },
];

export function Root() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname, state } = useLocation();
  const navigate = useNavigate();

  const [session, setSession] = useState<any>(getSession());
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const currentSession = getSession();
    setSession(currentSession);

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

  const isProfesional =
    session?.role?.toLowerCase().includes("profesional") ||
    session?.role?.toLowerCase().includes("maestro") ||
    session?.tipo?.toLowerCase().includes("profesional") ||
    session?.tipoUsuario?.toLowerCase().includes("profesional") ||
    session?.user?.tipo?.toLowerCase().includes("profesional");

  const isAdmin =
    session?.role?.toLowerCase().includes("admin") ||
    session?.role?.toLowerCase().includes("administrador");

  const nombreUsuario =
    session?.nombre ||
    session?.name ||
    session?.user?.nombre ||
    (session?.email ? session.email.split("@")[0] : null) ||
    (session?.correo ? session.correo.split("@")[0] : null) ||
    "USUARIO";

  const rutaPerfil = isProfesional ? "/perfil-profesional" : "/perfil-cliente";

  return (
    <div
      className="min-h-screen flex flex-col relative w-full bg-[#52c3b6]"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <MapBackground />

      <div className="relative z-10 flex-1 flex flex-col w-full">
        <ScrollRestoration />

        {/* POPUP FLOTANTE DE BIENVENIDA (4 SEGUNDOS) */}
        <AnimatePresence>
          {showWelcome && session && (
            <motion.div
              initial={{ opacity: 0, y: -50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="fixed top-24 left-1/2 -translate-x-1/2 z-50 px-6 py-3.5 rounded-full bg-white/95 backdrop-blur-md border border-white/80 shadow-2xl flex items-center gap-3 text-navy font-poppins"
            >
              <div className="p-2 rounded-full bg-pink-100 text-[#e83360]">
                <Sparkles size={20} className="animate-spin-slow" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">
                  {state?.isNewUser ? "¡Cuenta creada con éxito!" : "¡Inicio de sesión exitoso!"}
                </p>
                <p className="text-sm font-black text-[#0a6880]">
                  {state?.isNewUser ? (
                    <>
                      ¡Bienvenido(a) a Conecta Hogar, <span className="text-[#e83360] uppercase">{nombreUsuario}</span>! 🎉
                    </>
                  ) : (
                    <>
                      Bienvenido(a) de nuevo, <span className="text-[#e83360] uppercase">{nombreUsuario}</span> 👋
                    </>
                  )}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navbar Superior */}
        <div className="sticky top-5 z-50 px-4 md:px-12 max-w-7xl mx-auto w-full">
          <nav className="flex items-center justify-between pl-4 md:pl-6 pr-2 py-2 rounded-full border border-white/40 bg-[#fffbf7] shadow-lg">
            
            <div className="flex items-center justify-start gap-4">
              <Link to="/" onClick={() => setMenuOpen(false)} className="flex items-center justify-start text-left">
                <InteractiveLogo className="h-9 md:h-10 w-auto" />
              </Link>
              <div className="hidden sm:block w-0.5 h-8 bg-[#e83360]" />
            </div>

            <div className="hidden md:flex items-center gap-8 text-sm font-bold tracking-wide text-[#1f2937]">
              {publicNavLinks.map(({ href, label }) => {
                const active = pathname === href;
                return (
                  <Link
                    key={label}
                    to={href}
                    className="transition-colors hover:text-[#e83360]"
                    style={{ color: active ? PINK : "#1f2937" }}
                  >
                    {label}
                  </Link>
                );
              })}

              {session && (
                <Link
                  to="/profesionales"
                  className="transition-colors hover:text-[#e83360]"
                  style={{ color: pathname === "/profesionales" ? PINK : "#1f2937" }}
                >
                  Profesionales
                </Link>
              )}
            </div>

            <div className="hidden md:flex items-center gap-2 sm:gap-3">
              {session ? (
                <>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      className="flex items-center gap-1.5 text-xs font-black bg-amber-100 text-amber-900 px-3.5 py-2 rounded-full shadow-xs hover:bg-amber-200 transition-colors"
                    >
                      <ShieldCheck size={16} /> Admin
                    </Link>
                  )}

                  <Link
                    to={rutaPerfil}
                    className="flex items-center gap-1.5 px-4 py-2 text-xs font-black rounded-full bg-pink-100 text-[#e83360] hover:bg-pink-200 transition-colors shadow-2xs cursor-pointer"
                  >
                    <Briefcase size={15} /> {isProfesional ? "Mi Perfil" : "Mi Panel"}
                  </Link>

                  <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-200 shadow-2xs">
                    <User size={16} style={{ color: PINK }} />
                    <span className="text-xs md:text-sm font-black text-slate-800">
                      Hola, <span className="uppercase">{nombreUsuario}</span>
                    </span>
                  </div>

                  <button
                    onClick={handleLogout}
                    title="Cerrar sesión"
                    className="p-2.5 rounded-full bg-white text-gray-700 hover:text-red-600 hover:bg-rose-50 transition-all shadow-2xs border border-gray-200 cursor-pointer"
                  >
                    <ArrowRight size={16} />
                  </button>
                </>
              ) : (
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

            <button
              className="md:hidden mr-2 p-1.5 text-gray-700 hover:text-gray-900 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Abrir menú"
            >
              {menuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </nav>
        </div>

        {/* Menú Móvil */}
        {menuOpen && (
          <div
            className="fixed inset-0 z-40 flex flex-col pt-28 px-8 justify-between pb-12 transition-all duration-300"
            style={{
              background:
                "linear-gradient(135deg, rgba(82, 195, 182, 0.95) 0%, rgba(100, 205, 150, 0.95) 35%, rgba(220, 210, 80, 0.95) 70%, rgba(232, 90, 70, 0.95) 100%)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
          >
            <div className="flex flex-col gap-6">
              {publicNavLinks.map(({ href, label }) => (
                <Link
                  key={label}
                  to={href}
                  className="text-xl sm:text-2xl font-bold tracking-wide text-white drop-shadow-md"
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </Link>
              ))}

              {session && (
                <Link
                  to="/profesionales"
                  className="text-xl sm:text-2xl font-bold tracking-wide text-white drop-shadow-md"
                  onClick={() => setMenuOpen(false)}
                >
                  Profesionales
                </Link>
              )}
            </div>

            <div className="flex flex-col gap-3.5 pt-6 border-t border-white/30">
              {session ? (
                <>
                  <div className="flex items-center justify-center gap-2 bg-white/90 py-3 rounded-full text-[#0a6880] font-black">
                    <User size={20} style={{ color: PINK }} />
                    <span className="uppercase">Hola, {nombreUsuario}</span>
                  </div>

                  <Link
                    to={rutaPerfil}
                    onClick={() => setMenuOpen(false)}
                    className="py-3 font-black rounded-full bg-pink-100 text-pink-700 text-center text-sm shadow-md flex items-center justify-center gap-2"
                  >
                    <Briefcase size={18} /> {isProfesional ? "Mi Perfil" : "Mi Panel"}
                  </Link>

                  {isAdmin && (
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
                    className="py-3.5 font-bold rounded-full bg-[#55bcd9] text-white text-center text-base shadow-md"
                  >
                    Ingresar
                  </Link>
                  <Link
                    to="/registro"
                    onClick={() => setMenuOpen(false)}
                    className="py-3.5 font-bold rounded-full text-center text-white text-base shadow-md"
                    style={{ background: PINK }}
                  >
                    Registrarse
                  </Link>
                </>
              )}
            </div>
          </div>
        )}

        <main className="flex-1">
          <Outlet />
        </main>

        <footer
          className="relative z-10 w-full px-4 md:px-10 pt-20 pb-10 backdrop-blur-lg transition-all text-slate-600 font-medium border-t border-slate-100"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.8) 20%, rgba(255, 255, 255, 1) 40%)",
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