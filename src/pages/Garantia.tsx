import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  ThumbsUp,
  Clock,
  BadgeCheck,
  Headphones,
  RefreshCw,
  ArrowRight,
  Heart,
  LucideIcon,
} from "lucide-react";

import fondoGarantia from "../assets/images/FONDOCONTACTO.png";

const PINK = "#e83360";
const YELLOW = "#f5d318";
const SKY = "#02a2c7";
const ORANGE = "#f97316";

interface Guarantee {
  icon: LucideIcon;
  color: string;
  title: string;
  desc: string;
  detail: string;
}

interface StatItem {
  target: number;
  prefix: string;
  suffix: string;
  label: string;
  color: string;
}

interface StatCounterProps {
  target: number;
  prefix: string;
  suffix: string;
}

interface Step {
  n: string;
  t: string;
  d: string;
}

interface Particle {
  id: number;
  x: number;
  y: number;
}

const guarantees: Guarantee[] = [
  {
    icon: ShieldCheck,
    color: PINK,
    title: "Profesionales verificados",
    desc: "Cada profesional en nuestra plataforma pasa por un riguroso proceso de validación: verificación de identidad, antecedentes penales, y comprobación de experiencia y certificaciones. Solo el 30% de los postulantes logra ingresar.",
    detail: "Más de 1.000 profesionales certificados",
  },
  {
    icon: ThumbsUp,
    color: SKY,
    title: "Satisfacción garantizada",
    desc: "Si no quedas 100% conforme con el trabajo realizado, te ayudamos a resolverlo sin costo adicional. El profesional debe regresar a corregir o te reembolsamos el valor del servicio. Sin preguntas, sin burocracia.",
    detail: "Política de devolución en 72 horas",
  },
  {
    icon: Clock,
    color: YELLOW,
    title: "Respuesta en menos de 1 hora",
    desc: "Recibirás presupuestos de profesionales disponibles en tu zona en menos de 60 minutos. Para urgencias como fugas de agua o cortes eléctricos, contamos con profesionales disponibles las 24 horas, los 7 días.",
    detail: "Disponible 24/7 para urgencias",
  },
  {
    icon: BadgeCheck,
    color: PINK,
    title: "Precios transparentes",
    desc: "Los presupuestos son detallados y no tienen letra pequeña. El precio acordado es el precio final. No aceptamos cobros adicionales no informados al cliente. Todo queda registrado en la plataforma.",
    detail: "Sin costos ocultos ni sorpresas",
  },
  {
    icon: Headphones,
    color: SKY,
    title: "Soporte humano real",
    desc: "Nuestro equipo de soporte está compuesto por personas reales, no bots. Ante cualquier problema con un servicio, un ejecutivo de cuenta estará disponible para mediar y resolver la situación de forma justa.",
    detail: "Respuesta en menos de 2 horas hábiles",
  },
  {
    icon: RefreshCw,
    color: YELLOW,
    title: "Seguimiento del trabajo",
    desc: "Desde que contratas hasta que el trabajo queda listo, puedes hacer seguimiento en tiempo real del estado del servicio. Recibirás notificaciones en cada etapa y podrás comunicarte directo con el profesional.",
    detail: "App y web disponibles",
  },
];

const stats: StatItem[] = [
  { target: 98, prefix: "", suffix: "%", label: "Clientes satisfechos", color: PINK },
  { target: 4500, prefix: "+", suffix: "", label: "Servicios completados", color: SKY },
  { target: 99, prefix: "", suffix: "% Likes", label: "Recomendación positiva", color: ORANGE },
  { target: 1, prefix: "< ", suffix: " hr", label: "Tiempo de respuesta", color: PINK },
];

const steps: Step[] = [
  { n: "1", t: "Solicitas el servicio", d: "Describes el problema y recibes presupuestos de profesionales verificados en tu zona." },
  { n: "2", t: "El profesional trabaja", d: "El trabajo se realiza según lo acordado. Tienes visibilidad total del proceso." },
  { n: "3", t: "Confirmas satisfacción", d: "Solo pagas cuando confirmas que el trabajo quedó como acordado. Tú tienes el control." },
  { n: "4", t: "Dejas tu reseña", d: "Tu opinión ayuda a mantener la calidad de la red y beneficia a otros usuarios." },
];

function StatCounter({ target, prefix, suffix }: StatCounterProps) {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    let animationFrameId: number;
    let startTime: number | null = null;
    const duration = 1800; // 1.8s

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing curve (easeOutQuad)
      const easeOut = 1 - Math.pow(1 - progress, 2);
      setCount(Math.floor(easeOut * target));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [target]);

  return (
    <span>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export function Garantia() {
  const [particles, setParticles] = useState<Particle[]>([]);

  // Prevent duplicate font loading
  useEffect(() => {
    const fontId = "google-font-poppins";
    if (!document.getElementById(fontId)) {
      const link = document.createElement("link");
      link.id = fontId;
      link.href = "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;700;800;900&display=swap";
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }
  }, []);

  const triggerHeartBurst = () => {
    const newParticles: Particle[] = Array.from({ length: 8 }).map((_, i) => ({
      id: Date.now() + i + Math.random(),
      x: (Math.random() - 0.5) * 120,
      y: (Math.random() - 0.5) * 120 - 30,
    }));

    setParticles((prev) => [...prev, ...newParticles]);

    const idsToRemove = new Set(newParticles.map((p) => p.id));
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !idsToRemove.has(p.id)));
    }, 1000);
  };

  return (
    <div className="relative w-full min-h-screen font-['Poppins',sans-serif]">
      {/* ── Capa de Fondo Fijo ── */}
      <div
        className="fixed inset-0 pointer-events-none -z-10 bg-cover bg-top bg-no-repeat"
        style={{ backgroundImage: `url(${fondoGarantia})` }}
      />

      {/* ── 1. HERO ── */}
      <section
        className="w-full -mt-20 md:-mt-24 pt-32 md:pt-36 pb-20 px-4 md:px-10 relative overflow-hidden text-center"
        style={{
          background:
            "linear-gradient(90deg, rgba(245, 211, 24, 0.85) 0%, rgba(249, 115, 22, 0.80) 50%, rgba(232, 51, 96, 0.85) 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 75%, transparent 100%)",
          maskImage: "linear-gradient(to bottom, black 75%, transparent 100%)",
        }}
      >
        <div className="max-w-3xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div
              className="inline-flex items-center justify-center w-20 h-20 rounded-3xl mb-6 shadow-lg"
              style={{
                background: "rgba(255,255,255,0.25)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.4)",
              }}
            >
              <ShieldCheck size={40} className="text-white" />
            </div>

            <h1
              className="text-4xl md:text-6xl font-extrabold text-white mb-5"
              style={{ textShadow: "0 4px 20px rgba(0,0,0,0.3)" }}
            >
              Nuestra garantía
            </h1>

            <p
              className="text-lg text-white/95 leading-relaxed max-w-xl mx-auto mb-6 font-light"
              style={{ textShadow: "0 2px 10px rgba(0,0,0,0.3)" }}
            >
              En Conecta Hogar nos comprometemos con tu tranquilidad. Cada servicio está respaldado por nuestra garantía integral de calidad y satisfacción.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Stats Interactivas ── */}
      <section className="px-4 sm:px-6 md:px-10 pb-16 -mt-10 relative z-10">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map(({ target, prefix, suffix, label, color }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.04, translateY: -4 }}
              className="rounded-3xl py-7 px-5 text-center cursor-default shadow-md backdrop-blur-md transition-all border border-white/60 bg-[#fffde8]/70 hover:bg-[#fffde8]/85"
            >
              <p className="text-3xl sm:text-4xl font-extrabold tracking-tight" style={{ color }}>
                <StatCounter target={target} prefix={prefix} suffix={suffix} />
              </p>
              <p className="text-xs sm:text-sm font-light mt-1 text-slate-800">
                {label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Garantías detalladas ── */}
      <section className="py-12 px-4 md:px-10 bg-transparent relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p
              className="text-sm md:text-base font-bold tracking-widest uppercase mb-2 text-white"
              style={{ textShadow: "0 2px 10px rgba(0,0,0,0.6)" }}
            >
              Sin letra pequeña
            </p>
            <h2
              className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-lg"
              style={{ textShadow: "0 4px 16px rgba(0,0,0,0.4)" }}
            >
              6 compromisos contigo
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {guarantees.map(({ icon: Icon, color, title, desc, detail }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white/90 backdrop-blur-sm rounded-2xl p-7 border-2 shadow-sm hover:shadow-xl transition-all"
                style={{ borderColor: `${color}40` }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                    style={{ background: `${color}18` }}
                  >
                    <Icon size={26} style={{ color }} />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-lg mb-2 text-slate-900">
                      {title}
                    </h3>
                    <p className="text-sm leading-relaxed mb-3 text-slate-700 font-light">
                      {desc}
                    </p>
                    <span
                      className="inline-block text-xs font-normal px-3 py-1 rounded-full"
                      style={{
                        background: `${color}18`,
                        color,
                      }}
                    >
                      ✓ {detail}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Cómo funciona la garantía ── */}
      <section className="py-16 px-4 md:px-10 bg-transparent relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p
              className="text-sm md:text-base font-bold tracking-widest uppercase mb-2 text-white"
              style={{ textShadow: "0 2px 10px rgba(0,0,0,0.6)" }}
            >
              El proceso
            </p>
            <h2
              className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-lg"
              style={{ textShadow: "0 4px 16px rgba(0,0,0,0.4)" }}
            >
              Así protegemos cada servicio
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white/90 backdrop-blur-md rounded-2xl p-6 border-2 flex gap-4 items-start shadow-sm hover:shadow-md transition-all"
                style={{ borderColor: [PINK, SKY, YELLOW, PINK][i] + "40" }}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center font-extrabold text-xl shrink-0 text-white shadow-md"
                  style={{ background: [PINK, SKY, YELLOW, PINK][i] }}
                >
                  {s.n}
                </div>
                <div>
                  <h4 className="font-extrabold text-base mb-1 text-slate-900">
                    {s.t}
                  </h4>
                  <p className="text-sm leading-relaxed text-slate-700 font-light">
                    {s.d}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Final ── */}
      <section className="py-16 px-4 md:px-10 text-center bg-transparent relative z-10">
        <div className="max-w-2xl mx-auto">
          <div className="relative inline-block mb-6">
            <motion.div
              role="button"
              tabIndex={0}
              aria-label="Animación de corazón interactivo"
              onClick={triggerHeartBurst}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") triggerHeartBurst();
              }}
              whileHover={{ scale: 1.2, rotate: 8 }}
              whileTap={{ scale: 0.85 }}
              animate={{
                scale: [1, 1.12, 1, 1.12, 1],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-full cursor-pointer shadow-2xl transition-all bg-white outline-none focus:ring-2 focus:ring-pink-500"
            >
              <Heart size={36} style={{ color: PINK }} fill={PINK} />
            </motion.div>

            <AnimatePresence>
              {particles.map((p) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 1, scale: 0.5, x: 0, y: 0 }}
                  animate={{ opacity: 0, scale: 1.2, x: p.x, y: p.y }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="absolute top-1/2 left-1/2 pointer-events-none -mt-3 -ml-3"
                >
                  <Heart size={20} style={{ color: PINK }} fill={PINK} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <h2
            className="text-3xl md:text-5xl font-extrabold mb-4 text-white drop-shadow-lg"
            style={{ textShadow: "0 4px 18px rgba(0,0,0,0.5)" }}
          >
            ¿Listo para empezar con tranquilidad?
          </h2>

          <p
            className="text-base md:text-lg font-light mb-8 leading-relaxed text-white max-w-xl mx-auto"
            style={{ textShadow: "0 3px 12px rgba(0,0,0,0.6)" }}
          >
            Solicita tu servicio hoy y experimenta la diferencia de trabajar con profesionales respaldados por nuestra garantía integral.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/registro"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm text-white shadow-lg transition-shadow hover:shadow-pink-500/25"
                style={{ background: PINK }}
              >
                Solicitar servicio <ArrowRight size={16} />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/profesionales"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm text-white shadow-lg hover:bg-sky-600 transition-colors"
                style={{ background: SKY }}
              >
                Ver profesionales
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}