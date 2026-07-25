import { useState } from "react";
// 1. Importa ScrollRestoration aquí 👇
import { Outlet, Link, useLocation, ScrollRestoration } from "react-router-dom";
import { motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { ImageWithFallback } from "../ui/ImageWithFallback";
import logoImg from "../../assets/icons/logoCH-removebg-preview.png";
import bgImg from "../../assets/images/FONDO.png";
import { InteractiveLogo } from "./InteractiveLogo";

const PINK = "#e83360";

const navLinks = [
  { href: "/nosotros",      label: "Nosotros", route: true },
  { href: "/profesionales", label: "Profesionales", route: true },
  { href: "/contacto",      label: "Contacto", route: true },
  { href: "/garantia",      label: "Garantía", route: true },
];

// ── Root layout ────────────────────────────────────────────────
export function Root() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <div
      className="min-h-screen flex flex-col relative bg-top bg-no-repeat w-full"
      style={{
        fontFamily: "'Poppins', sans-serif",
        backgroundImage: `url(${bgImg as unknown as string})`,
        backgroundSize: "100% auto",
        backgroundColor: "#c81e51",
      }}
    >
      {/* ScrollRestoration */}
      <ScrollRestoration />

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

          <div className="hidden md:flex items-center">
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
              to="/contacto"
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

      <main className="flex-1">
        <Outlet />
      </main>

      <footer
        className="px-4 md:px-10 py-12"
        style={{ background: "rgba(242, 97, 60, 0.85)", backdropFilter: "blur(4px)" }}
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
                        <Link to={href} className="text-white/65 text-sm hover:text-white transition-colors">
                          {label}
                        </Link>
                      ) : (
                        <a href={href} className="text-white/65 text-sm hover:text-white transition-colors">
                          {label}
                        </a>
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

export default Root;