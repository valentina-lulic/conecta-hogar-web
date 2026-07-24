import { motion } from "motion/react";
import { Link } from "react-router";
import { ShieldCheck, ThumbsUp, Clock, Star, BadgeCheck, Headphones, RefreshCw, ArrowRight } from "lucide-react";

const PINK = "#e83360";
const YELLOW = "#f5d318";
const SKY = "#55bcd9";
const DARK = "#0a6880";
const GRAD_HERO = `linear-gradient(135deg, ${PINK}ee 0%, ${YELLOW}dd 48%, ${SKY}ee 100%)`;
const GRAD_SOFT = `linear-gradient(135deg, ${PINK}18 0%, ${YELLOW}18 50%, ${SKY}18 100%)`;

const guarantees = [
  {
    icon: ShieldCheck,
    color: PINK,
    title: "Profesionales verificados",
    desc: "Cada profesional en nuestra plataforma pasa por un riguroso proceso de validación: verificación de identidad, antecedentes penales, y comprobación de experiencia y certificaciones. Solo el 30% de los postulantes logra ingresar.",
    detail: "Más de 2.400 profesionales certificados",
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

const stats = [
  { n: "98%", l: "Clientes satisfechos" },
  { n: "+18.000", l: "Servicios completados" },
  { n: "4.8★", l: "Puntuación promedio" },
  { n: "< 1 hr", l: "Tiempo de respuesta" },
];

const steps = [
  { n: "1", t: "Solicitas el servicio", d: "Describes el problema y recibe presupuestos de profesionales verificados en tu zona." },
  { n: "2", t: "El profesional trabaja", d: "El trabajo se realiza según lo acordado. Tienes visibilidad total del proceso." },
  { n: "3", t: "Confirmas satisfacción", d: "Solo pagas cuando confirmas que el trabajo quedó como acordado. Tú tienes el control." },
  { n: "4", t: "Dejas tu reseña", d: "Tu opinión ayuda a mantener la calidad de la red y beneficia a otros usuarios." },
];

export function Garantia() {
  return (
    <div style={{ background: GRAD_HERO }}>

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="px-4 md:px-10 pt-16 pb-20 text-center">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl mb-6"
              style={{ background: "rgba(255,255,255,0.25)", backdropFilter: "blur(8px)" }}>
              <ShieldCheck size={40} className="text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-5"
              style={{ fontFamily: "'Nunito', sans-serif", textShadow: "0 2px 20px rgba(0,0,0,0.15)" }}>
              Nuestra garantía
            </h1>
            <p className="text-lg text-white/85 leading-relaxed max-w-xl mx-auto mb-8">
              En Conecta Hogar nos comprometemos con tu tranquilidad. Cada servicio está respaldado por nuestra garantía integral de calidad y satisfacción.
            </p>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="inline-block">
              <Link to="/contacto"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-black text-sm shadow-xl"
                style={{ background: "white", color: PINK }}>
                Solicitar servicio garantizado <ArrowRight size={16} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────────────── */}
      <section className="px-4 md:px-10 pb-16">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map(({ n, l }, i) => (
            <motion.div key={l}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="rounded-2xl py-6 px-4 text-center backdrop-blur-sm"
              style={{ background: "rgba(255,255,255,0.2)", border: "1.5px solid rgba(255,255,255,0.3)" }}>
              <p className="text-3xl font-black text-white" style={{ fontFamily: "'Nunito', sans-serif" }}>{n}</p>
              <p className="text-xs font-bold text-white/75 mt-1">{l}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Garantías detalladas ──────────────────────────── */}
      <section className="py-16 px-4 md:px-10" style={{ background: "rgba(255,255,255,0.95)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-black tracking-widest uppercase mb-2" style={{ color: PINK }}>Sin letra pequeña</p>
            <h2 className="text-3xl md:text-4xl font-black" style={{ fontFamily: "'Nunito', sans-serif", color: DARK }}>
              6 compromisos contigo
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {guarantees.map(({ icon: Icon, color, title, desc, detail }, i) => (
              <motion.div key={title}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-7 border-2 hover:shadow-lg transition-shadow"
                style={{ borderColor: `${color}30` }}>
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                    style={{ background: `${color}18` }}>
                    <Icon size={26} style={{ color }} />
                  </div>
                  <div>
                    <h3 className="font-black text-lg mb-2" style={{ fontFamily: "'Nunito', sans-serif", color: DARK }}>{title}</h3>
                    <p className="text-sm leading-relaxed mb-3" style={{ color: "#6b7280" }}>{desc}</p>
                    <span className="inline-block text-xs font-black px-3 py-1 rounded-full" style={{ background: `${color}18`, color }}>
                      ✓ {detail}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Cómo funciona la garantía ─────────────────────── */}
      <section className="py-16 px-4 md:px-10" style={{ background: GRAD_SOFT, backgroundColor: "white" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-black tracking-widest uppercase mb-2" style={{ color: SKY }}>El proceso</p>
            <h2 className="text-3xl md:text-4xl font-black" style={{ fontFamily: "'Nunito', sans-serif", color: DARK }}>
              Así protegemos cada servicio
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {steps.map((s, i) => (
              <motion.div key={s.n}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}
                className="bg-white rounded-2xl p-6 border-2 flex gap-4 items-start"
                style={{ borderColor: [PINK, SKY, YELLOW, PINK][i] + "30" }}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl shrink-0 text-white"
                  style={{ background: [PINK, SKY, YELLOW, PINK][i], fontFamily: "'Nunito', sans-serif" }}>
                  {s.n}
                </div>
                <div>
                  <h4 className="font-black text-base mb-1" style={{ color: DARK }}>{s.t}</h4>
                  <p className="text-sm leading-relaxed" style={{ color: "#6b7280" }}>{s.d}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="py-16 px-4 md:px-10 text-center" style={{ background: "rgba(255,255,255,0.95)" }}>
        <div className="max-w-2xl mx-auto">
          <Star size={40} className="mx-auto mb-4" style={{ color: YELLOW }} fill={YELLOW} />
          <h2 className="text-3xl md:text-4xl font-black mb-4" style={{ fontFamily: "'Nunito', sans-serif", color: DARK }}>
            ¿Listo para empezar con tranquilidad?
          </h2>
          <p className="text-base mb-8 leading-relaxed" style={{ color: "#6b7280" }}>
            Solicita tu servicio hoy y experimenta la diferencia de trabajar con profesionales respaldados por nuestra garantía integral.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Link to="/contacto"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-black text-sm text-white shadow-lg"
                style={{ background: PINK }}>
                Solicitar servicio <ArrowRight size={16} />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Link to="/"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-black text-sm border-2"
                style={{ borderColor: SKY, color: SKY }}>
                Ver profesionales
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
