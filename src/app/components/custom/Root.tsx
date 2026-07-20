import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router";
import { motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { ImageWithFallback } from "../ui-helpers/ImageWithFallback";
import logoImg from "@/imports/logoCH-removebg-preview.png";
import bgImg from "@/imports/FONDOAPP__2_-3.png";
import { InteractiveLogo } from "./InteractiveLogo";

const PINK = "#e83360";

const navLinks = [
  { href: "/#nosotros",      label: "Nosotros" },
  { href: "/#profesionales", label: "Profesionales" },
  { href: "/contacto",       label: "Contacto", route: true },
  { href: "/garantia",       label: "Garantía", route: true },
];

// ── Root layout ────────────────────────────────────────────────
export function Root() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <div
      className="min-h-screen flex flex-col relative"
      style={{
        fontFamily: "'Nunito Sans', sans-serif",
        backgroundImage: `linear-gradient(180deg, rgba(245,211,24,0.62) 0%, rgba(245,166,35,0.54) 38%, rgba(232,51,96,0.58) 100%), url(${bgImg as unknown as string})`,
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top center",
        backgroundAttachment: "scroll",
      }}
    >
      {/* ── Navbar flotante estilo Cápsula ─────────────────────────────────── */}
      <div className="sticky top-5 z-50 px-4 md:px-12 max-w-7xl mx-auto w-full">
        <nav 
          className="flex items-center justify-between pl-6 pr-2 py-2 rounded-full border border-white/40 bg-[#fffbf7]"
          style={{
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)"
          }}
        >
          {/* Lado Izquierdo: Logo + Línea Divisoria */}
          <div className="flex items-center gap-4">
            <Link to="/" onClick={() => setMenuOpen(false)} className="flex items-center">
              <InteractiveLogo className="h-10 w-auto" />
            </Link>
            {/* Línea vertical roja decorativa */}
            <div className="hidden sm:block w-[2px] h-8 bg-[#e83360]" />
          </div>

          {/* Centro/Derecha: Links del Menú (Escritorio) */}
          <div className="hidden md:flex items-center gap-8 text-sm font-extrabold text-[#1f2937]">
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

          {/* Extremo Derecho: Botón de Acción Principal */}
          <div className="hidden md:flex items-center">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link 
                to="/contacto"
                className="px-6 py-3 text-sm font-black rounded-full text-white shadow-md block transition-transform text-center"
                style={{ background: PINK }}
              >
                Solicitar Servicio
              </Link>
            </motion.div>
          </div>

          {/* Botón de Menú Móvil (Hamburguesa) */}
          <button className="md:hidden mr-4" style={{ color: "#374151" }} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div 
          className="fixed inset-0 z-40 flex flex-col pt-28 px-8 gap-6"
          style={{ background: "rgba(174,230,242,0.97)", backdropFilter: "blur(8px)" }}
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
              to="/contacto" 
              onClick={() => setMenuOpen(false)}
              className="py-3 font-black rounded-full border-2 text-gray-700 border-gray-400 text-center"
            >
              Ingresar
            </Link>
            <Link 
              to="/contacto" 
              onClick={() => setMenuOpen(false)}
              className="py-3 font-black rounded-full text-center block text-white"
              style={{ background: PINK }}
            >
              Solicitar servicio
            </Link>
          </div>
        </div>
      )}

      {/* ── Contenido ─────────────────────────────────────────── */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* ── Footer ────────────────────────────────────────────── */}
      <footer 
        className="px-4 md:px-10 py-12"
        style={{ background: "rgba(232,51,96,0.85)", backdropFilter: "blur(4px)" }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
            <div className="md:col-span-1">
              <div className="inline-block mb-3">
                <ImageWithFallback src={logoImg} alt="Conecta Hogar" className="h-16 w-auto object-contain drop-shadow-md" />
              </div>
              <p className="text-white/80 text-sm leading-relaxed">
                Conectamos hogares con los mejores profesionales de Chile.
              </p>
            </div>
            {[
              { title: "Servicios", links: [["#", "Gasfitería"], ["#", "Electricidad"], ["#", "Albañilería"], ["#", "Soldaduría"]] },
              { title: "Empresa", links: [["#", "Sobre nosotros"], ["/garantia", "Garantía"], ["#", "Prensa"], ["/contacto", "Trabaja con nosotros"]] },
              { title: "Soporte", links: [["/contacto", "Ayuda"], ["/contacto", "Contacto"], ["#", "Términos"], ["#", "Privacidad"]] },
            ].map(({ title, links }) => (
              <div key={title}>
                <p className="font-black text-white text-sm mb-4">{title}</p>
                <ul className="space-y-2">
                  {links.map(([href, label]) => (
                    <li key={label}>
                      {href.startsWith("/") ? (
                        <Link to={href} className="text-white/65 text-sm hover:text-white transition-colors">{label}</Link>
                      ) : (
                        <a href={href} className="text-white/65 text-sm hover:text-white transition-colors">{label}</a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-white/20 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-white/50 text-xs font-semibold">
            <p>© 2026 Conecta Hogar. Todos los derechos reservados.</p>
            <p>Hecho con ❤️ en Chile</p>
          </div>
        </div>
      </footer>
    </div>
  );
}