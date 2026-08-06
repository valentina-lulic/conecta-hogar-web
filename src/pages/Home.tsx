import { useState, useRef, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion, useInView } from "motion/react";
import {
  Search,
  ChevronRight,
  Wrench,
  Zap,
  ShieldCheck,
  Clock,
  ThumbsUp,
  MapPin,
  CheckCircle2,
  HardHat,
} from "lucide-react";
import { ImageWithFallback } from "../components/ui/ImageWithFallback";
import { InteractiveLogo } from "../components/custom/InteractiveLogo";
import gasfiteriaImg from "../assets/images/gasfiter.png";
import electricidadImg from "../assets/images/electricista.png";
import albanileriaImg from "../assets/images/albanil.png";
import soldaduraImg from "../assets/images/soldador.png";
import {
  obtenerTopProfesionales,
  obtenerFotoProfesional,
  obtenerEtiquetaProfesional,
  type Profesional,
} from "../data/profesionales";

function CountUp({ value, duration = 2 }: { value: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (!isInView) return;

    const match = value.match(/^([^\d]*)([\d.,]+)([^\d]*)$/);
    if (!match) {
      setDisplayValue(value);
      return;
    }

    const [, prefix, numStr, suffix] = match;
    const cleanNumber = parseFloat(numStr.replace(/\./g, "").replace(",", "."));
    const isDecimal = numStr.includes(",");

    let startTime: number | null = null;
    let animationFrameId: number;

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

      const easeOutQuad = 1 - Math.pow(1 - progress, 3);
      const currentNumber = Math.floor(easeOutQuad * cleanNumber);

      const formattedNumber = isDecimal
        ? currentNumber.toString()
        : currentNumber.toLocaleString("es-CL");

      setDisplayValue(`${prefix}${formattedNumber}${suffix}`);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCount);
      } else {
        setDisplayValue(value);
      }
    };

    animationFrameId = requestAnimationFrame(updateCount);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, value, duration]);

  return <span ref={ref}>{displayValue}</span>;
}

const PINK = "#e83360";
const YELLOW = "#f5d318";
const SKY = "#55bcd9";
const DARK = "#0a6880";

const categories = [
  { icon: Wrench, label: "Gasfitería", color: SKY, bg: `${SKY}20` },
  { icon: Zap, label: "Electricidad", color: YELLOW, bg: `${YELLOW}30` },
  { icon: HardHat, label: "Albañilería", color: PINK, bg: `${PINK}18` },
  { icon: Wrench, label: "Soldaduría", color: "#f97316", bg: "#f9731620" },
];

const trades = [
  { img: gasfiteriaImg, label: "Gasfitería", color: SKY },
  { img: electricidadImg, label: "Electricidad", color: YELLOW },
  { img: albanileriaImg, label: "Albañilería", color: PINK },
  { img: soldaduraImg, label: "Soldaduría", color: "#ec561b" },
];

const steps = [
  {
    num: "01",
    color: SKY,
    title: "Busca un profesional acorde a tu necesidad",
    desc: "Explora nuestra red de profesionales verificados por especialidad y zona. Encuentra al indicado en segundos.",
  },
  {
    num: "02",
    color: YELLOW,
    title: "Contáctalo",
    desc: "Escríbele directamente, pide un presupuesto y coordina el trabajo a tu horario. Sin intermediarios.",
  },
  {
    num: "03",
    color: PINK,
    title: "¡Listo! Tu hogar está conectado",
    desc: "El profesional llega y resuelve el problema. Pagas solo cuando estés 100% satisfecho.",
  },
];

const testimonials = [
  {
    name: "Valentina Torres",
    location: "Santiago",
    rating: 5,
    text: "¡Increíble servicio! En menos de 2 horas tenía a Carlos arreglando mi cañería. Super recomendado.",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&auto=format",
    color: PINK,
  },
  {
    name: "Diego Fuentes",
    location: "Providencia",
    rating: 5,
    text: "La electricista Ana fue puntual, profesional y dejó todo perfecto. Conecta Hogar es lo mejor.",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&auto=format",
    color: SKY,
  },
  {
    name: "Camila Herrera",
    location: "Las Condes",
    rating: 5,
    text: "Repararon mi calefacción justo antes del invierno. El proceso fue súper fácil desde la app.",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&auto=format",
    color: YELLOW,
  },
];

function TradeCard({
  img,
  label,
  sub,
  color,
  index,
}: {
  img: string;
  label: string;
  sub: string;
  color: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, scale: 0.92 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.55,
        delay: index * 0.12,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{ y: -10, scale: 1.03 }}
      className="group relative rounded-3xl overflow-hidden cursor-pointer shadow-lg"
      style={{ aspectRatio: "3/4" }}
    >
      <motion.div
        className="w-full h-full"
        whileHover={{ scale: 1.08 }}
        transition={{ duration: 0.5 }}
      >
        <ImageWithFallback src={img} alt={label} className="w-full h-full object-cover" />
      </motion.div>
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to top, ${color}dd 0%, ${color}55 40%, transparent 70%)`,
        }}
      />
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <p
          className="font-black text-white text-xl"
          style={{ fontFamily: "'Nunito', sans-serif" }}
        >
          {label}
        </p>
        <p className="text-white/80 text-xs font-semibold">{sub}</p>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [activeTab, setActiveTab] =
    useState<"particulares" | "profesionales">("particulares");

  const [professionals, setProfessionals] = useState<Profesional[]>([]);
  const [loadingProfessionals, setLoadingProfessionals] = useState(true);
  const [professionalsError, setProfessionalsError] =
    useState<string | null>(null);

  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const targetId = hash.replace("#", "");
      const element = document.getElementById(targetId);

      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [hash]);

  useEffect(() => {
    const cargarTop = async () => {
      try {
        setLoadingProfessionals(true);
        setProfessionalsError(null);

        const data = await obtenerTopProfesionales();
        setProfessionals(data.slice(0, 3));
      } catch (error) {
        console.error("Error cargando profesionales destacados:", error);

        setProfessionalsError(
          error instanceof Error
            ? error.message
            : "No se pudieron cargar los profesionales destacados."
        );
      } finally {
        setLoadingProfessionals(false);
      }
    };

    cargarTop();
  }, []);

  return (
    <div>
      {/* ── Hero ────────────────── */}
      <section className="relative min-h-[92vh] flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0" style={{ background: "rgba(255,255,255,0.08)" }} />

        <div className="relative z-10 px-4 md:px-10 py-16">
          <div className="max-w-5xl mx-auto">
            {/* Logo grande */}
            <div className="flex justify-center mb-6">
              <InteractiveLogo className="h-48 w-64 md:h-64 md:w-88" />
            </div>

            {/* Tab switcher */}
            <div className="flex justify-center mb-8">
              <div
                className="inline-flex rounded-full p-1 backdrop-blur-md"
                style={{ background: "rgba(255,255,255,0.55)" }}
              >
                {(["particulares", "profesionales"] as const).map((tab) => (
                  <motion.button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    whileTap={{ scale: 0.96 }}
                    className="px-6 py-2.5 rounded-full text-sm font-black transition-all"
                    style={
                      activeTab === tab
                        ? { background: PINK, color: "white", boxShadow: `0 4px 16px ${PINK}55` }
                        : { color: DARK }
                    }
                  >
                    {tab === "particulares" ? "Soy cliente" : "Soy profesional"}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Headline */}
            <div className="text-center max-w-3xl mx-auto mb-10">
              <h1
                className="text-4xl md:text-6xl leading-tight mb-4 font-black"
                style={{
                  fontFamily: "'Nunito', sans-serif",
                  color: DARK,
                  textShadow: "0 2px 12px rgba(255,255,255,0.8)",
                }}
              >
                {activeTab === "particulares" ? (
                  <>
                    Encuentra al profesional perfecto
                    <br />
                    <span style={{ color: PINK }}>para tu hogar</span>
                  </>
                ) : (
                  <>
                    Consigue más clientes y<br />
                    <span style={{ color: PINK }}>haz crecer tu negocio</span>
                  </>
                )}
              </h1>
              {/* CAMBIO 1: Brillo blanco claro alrededor de las letras rojas para máximo contraste */}
              <p
                className="text-lg font-bold leading-relaxed"
                style={{
                  color: DARK,
                  textShadow:
                    "0 0 10px rgba(255, 255, 255, 1), 0 0 20px rgba(255, 255, 255, 0.9), 0 2px 6px rgba(255, 255, 255, 0.8)",
                }}
              >
                {activeTab === "particulares"
                  ? "Gasfiteros, electricistas, albañiles y más. Profesionales verificados, precios transparentes y garantía de satisfacción."
                  : "Únete a nuestra red de +1.000 profesionales y recibe solicitudes de trabajo en tu zona hoy mismo."}
              </p>
            </div>

            {/* Search */}
            <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto mb-5">
              <div
                className="flex-1 flex items-center gap-3 px-6 rounded-full transition-all duration-300 backdrop-blur-xl"
                style={{
                  background: "rgba(255,255,255,0.85)",
                  border: searchFocused
                    ? "2px solid rgba(255,255,255,0.95)"
                    : "2px solid rgba(255,255,255,0.5)",
                  boxShadow: searchFocused
                    ? "0 0 20px rgba(255,255,255,0.4), 0 8px 32px rgba(0,0,0,0.12)"
                    : "0 8px 24px rgba(0,0,0,0.08)",
                }}
              >
                <Search size={18} style={{ color: DARK }} className="shrink-0 opacity-70" />
                <input
                  type="text"
                  placeholder={
                    activeTab === "particulares"
                      ? activeCategory
                        ? `Buscar en ${activeCategory}...`
                        : "¿Qué servicio necesitas?"
                      : "Tu especialidad..."
                  }
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  className="flex-1 py-4 text-sm font-semibold placeholder:text-gray-500 outline-none bg-transparent"
                  style={{ color: DARK }}
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-4 rounded-full text-sm font-bold text-white whitespace-nowrap transition-all duration-300"
                style={{ background: PINK, boxShadow: `0 6px 20px ${PINK}40` }}
              >
                {activeTab === "particulares" ? "Buscar" : "Registrarme"}
              </motion.button>
            </div>

            {/* Chips de categorías */}
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map(({ icon: Icon, label, color }) => {
                const isActive = activeCategory === label;
                return (
                  <button
                    key={label}
                    onClick={() => setActiveCategory(isActive ? null : label)}
                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold border-2 backdrop-blur-sm transition-colors hover:bg-white/60"
                    style={
                      isActive
                        ? { borderColor: color, color: "white", background: color }
                        : { borderColor: DARK + "55", color: DARK, background: "rgba(255,255,255,0.5)" }
                    }
                  >
                    <Icon size={13} />
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Stats */}
          <div className="max-w-5xl mx-auto mt-14 grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 text-center">
            {[
              { n: "+1.000", l: "Profesionales", c: PINK },
              { n: "+4.500", l: "Servicios completados", c: SKY },
              { n: "98%", l: "Clientes satisfechos", c: YELLOW },
            ].map(({ n, l, c }) => (
              <div
                key={l}
                className="rounded-3xl py-4 sm:py-5 md:py-6 px-3 sm:px-4 md:px-5 backdrop-blur-xl flex flex-col justify-center items-center min-h-30 transition-all duration-300"
                style={{
                  background: "rgba(255, 255, 255, 0.75)",
                  border: `1.5px solid ${c}66`,
                  boxShadow: `0 12px 30px -10px ${c}25`,
                }}
              >
                <p
                  className="text-2xl sm:text-3xl lg:text-4xl font-black whitespace-nowrap"
                  style={{
                    fontFamily: "'Nunito', sans-serif",
                    color: c,
                  }}
                >
                  <CountUp value={n} />
                </p>
                <p className="text-xs sm:text-sm font-extrabold mt-1.5" style={{ color: DARK }}>
                  {l}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Nuestros oficios ───────────────────────────────── */}
      <section id="nosotros" className="py-16 px-4 md:px-10 scroll-mt-24">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-block px-5 py-2 rounded-full bg-white/80 backdrop-blur-md border border-[#0a6880]/20 shadow-md mb-3">
              <p
                className="text-xs md:text-sm font-extrabold tracking-widest uppercase"
                style={{ color: DARK }}
              >
                Especialidades
              </p>
            </div>
            <h2
              className="text-4xl md:text-6xl font-black transition-all duration-300"
              style={{
                fontFamily: "'Nunito', sans-serif",
                color: DARK,
                textShadow:
                  "0 0 20px rgba(255, 255, 255, 1), 0 0 10px rgba(255, 255, 255, 0.8), 0 2px 4px rgba(0,0,0,0.15)",
              }}
            >
              Nuestros Oficios
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            {trades
              .filter((t) => !activeCategory || t.label === activeCategory)
              .map((t, i) => (
                <TradeCard sub={""} key={t.label} {...t} index={i} />
              ))}
          </div>
        </div>
      </section>

      {/* ── ¿Cómo funciona? ───────────────────────────────── */}
      <section className="py-16 px-4 md:px-10 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block px-5 py-2 rounded-full bg-white/80 backdrop-blur-md border border-[#0a6880]/20 shadow-md mb-3">
              <p
                className="text-xs md:text-sm font-extrabold tracking-widest uppercase"
                style={{ color: DARK }}
              >
                Paso a paso
              </p>
            </div>
            <h2
              className="text-4xl md:text-6xl font-black text-white drop-shadow-md"
              style={{ fontFamily: "'Nunito', sans-serif" }}
            >
              ¿Cómo funciona?
            </h2>
          </div>

          {/* Tarjetas 01, 02, 03 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="p-8 rounded-3xl bg-white flex flex-col items-start relative overflow-hidden transition-all duration-300 shadow-xl border-t-8"
                style={{ borderColor: step.color }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-sm"
                  style={{
                    backgroundColor: `${step.color}25`,
                    border: `2px solid ${step.color}`,
                  }}
                >
                  <span
                    className="text-2xl font-black"
                    style={{ color: step.color === YELLOW ? DARK : step.color }}
                  >
                    {step.num}
                  </span>
                </div>

                <h3 className="text-xl font-extrabold mb-3 leading-snug" style={{ color: DARK }}>
                  {step.title}
                </h3>

                <p className="text-sm font-semibold text-gray-600 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Cajas Inferiores */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: ShieldCheck, label: "Profesionales verificados", color: SKY },
              { icon: Clock, label: "Respuesta en menos de 1 hora", color: YELLOW },
              { icon: ThumbsUp, label: "Garantía de satisfacción", color: PINK },
            ].map(({ icon: Icon, label, color }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1 }}
                whileHover={{ scale: 1.03 }}
                className="flex items-center gap-4 rounded-2xl p-4 bg-white shadow-lg transition-all border-l-4"
                style={{ borderLeftColor: color }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-sm"
                  style={{ backgroundColor: `${color}20` }}
                >
                  <Icon size={22} style={{ color: color === YELLOW ? DARK : color }} />
                </div>
                <p className="text-sm font-extrabold tracking-wide" style={{ color: DARK }}>
                  {label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Profesionales ─────────────────────────────────── */}
      <section id="profesionales" className="py-16 px-4 md:px-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              {/* CAMBIO 2A: Panel glassmorphic para 'Nuestros expertos' */}
              <div className="inline-block px-5 py-2 rounded-full bg-white/80 backdrop-blur-md border border-[#0a6880]/20 shadow-md mb-3">
                <p
                  className="text-xs md:text-sm font-extrabold tracking-widest uppercase"
                  style={{ color: DARK }}
                >
                  Nuestros expertos
                </p>
              </div>

              {/* CAMBIO 2B: 'Profesionales destacados :' más grande */}
              <h2
                className="text-4xl md:text-5xl font-black text-white drop-shadow-md"
                style={{ fontFamily: "'Nunito', sans-serif" }}
              >
                Profesionales destacados :
              </h2>
            </div>

            <Link
              to="/profesionales"
              className="hidden md:inline-flex items-center gap-1 text-sm font-semibold text-yellow-300 hover:opacity-80 transition-opacity"
            >
              Ver todos <ChevronRight size={16} />
            </Link>
          </div>

          {loadingProfessionals && (
            <div className="bg-white/90 rounded-2xl p-8 text-center shadow-lg">
              <div className="w-9 h-9 mx-auto mb-3 border-4 border-gray-200 border-t-[#e83360] rounded-full animate-spin" />

              <p className="font-bold" style={{ color: DARK }}>
                Cargando profesionales destacados...
              </p>
            </div>
          )}

          {professionalsError && !loadingProfessionals && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl p-5 text-center font-semibold">
              {professionalsError}
            </div>
          )}

          {!loadingProfessionals && !professionalsError && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {professionals.map((pro, i) => {
                const nombreCompleto =
                  `${pro.nombre} ${pro.apellido}`.trim();

                const foto = obtenerFotoProfesional(pro);
                const badge = obtenerEtiquetaProfesional(pro);

                const badgeColor =
                  badge?.claseCSS === "top"
                    ? PINK
                    : badge?.claseCSS === "verificada"
                      ? SKY
                      : YELLOW;

                const iniciales =
                  `${pro.nombre?.charAt(0) ?? ""}${pro.apellido?.charAt(0) ?? ""
                    }`.toUpperCase();

                return (
                  <motion.div
                    key={pro.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.13 }}
                    whileHover={{
                      y: -8,
                      boxShadow: "0 20px 48px rgba(0,0,0,0.14)",
                    }}
                    className="bg-white rounded-2xl overflow-hidden border-2"
                    style={{ borderColor: `${badgeColor}30` }}
                  >
                    <div className="p-5 flex items-start gap-4">
                      <div className="relative shrink-0">
                        {foto ? (
                          <img
                            src={foto}
                            alt={nombreCompleto}
                            className="w-16 h-16 rounded-2xl object-cover"
                          />
                        ) : (
                          <div
                            className="w-16 h-16 rounded-2xl flex items-center justify-center font-black text-lg"
                            style={{
                              background: `${SKY}20`,
                              color: DARK,
                            }}
                          >
                            {iniciales}
                          </div>
                        )}

                        <span
                          title={
                            pro.disponible ? "Disponible" : "No disponible"
                          }
                          className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${pro.disponible
                            ? "bg-green-500"
                            : "bg-gray-400"
                            }`}
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-0.5">
                          <h3
                            className="font-black text-base"
                            style={{ color: DARK }}
                          >
                            {nombreCompleto}
                          </h3>

                          {badge && (
                            <span
                              className="text-xs font-black px-2 py-0.5 rounded-full"
                              style={{
                                background: badgeColor,
                                color:
                                  badge.claseCSS === "destacado"
                                    ? DARK
                                    : "white",
                              }}
                            >
                              {badge.label}
                            </span>
                          )}
                        </div>

                        <p
                          className="text-sm font-semibold line-clamp-2"
                          style={{ color: "#6b7280" }}
                        >
                          {pro.descripcion || pro.especialidad}
                        </p>

                        <div className="flex items-center gap-1 mt-1.5">
                          <ThumbsUp size={13} fill={SKY} stroke={SKY} />

                          <span
                            className="text-xs font-black"
                            style={{ color: DARK }}
                          >
                            {pro.likes}
                          </span>

                          <span
                            className="text-xs"
                            style={{ color: "#9ca3af" }}
                          >
                            Me gusta
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          {!loadingProfessionals &&
            !professionalsError &&
            professionals.length === 0 && (
              <div className="bg-white/90 rounded-2xl p-8 text-center shadow-lg">
                <p className="font-bold" style={{ color: DARK }}>
                  No hay profesionales destacados disponibles.
                </p>
              </div>
            )}
        </div>
      </section>

      {/* ── Testimonios ───────────────────────────────────── */}
      <section className="py-16 px-4 md:px-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            {/* CAMBIO 2A: Panel glassmorphic para 'Testimonios' */}
            <div className="inline-block px-5 py-2 rounded-full bg-white/80 backdrop-blur-md border border-[#0a6880]/20 shadow-md mb-3">
              <p
                className="text-xs md:text-sm font-extrabold tracking-widest uppercase"
                style={{ color: DARK }}
              >
                Testimonios
              </p>
            </div>

            {/* CAMBIO 2C: 'Lo que dicen nuestros usuarios :' más grande */}
            <h2
              className="text-4xl md:text-5xl font-black text-white drop-shadow-md"
              style={{ fontFamily: "'Nunito', sans-serif" }}
            >
              Lo que dicen nuestros usuarios :
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                whileHover={{ y: -6 }}
                className="relative bg-white rounded-2xl p-7 shadow-lg border border-gray-100 flex flex-col justify-between transition-all duration-300"
              >
                <span
                  className="absolute top-4 right-6 text-6xl font-serif select-none pointer-events-none opacity-15"
                  style={{ color: PINK }}
                >
                  “
                </span>

                <div>
                  <div
                    className="flex items-center gap-1.5 mb-5 text-xs font-black px-3 py-1 rounded-full w-fit shadow-sm"
                    style={{ backgroundColor: `${SKY}15`, color: SKY }}
                  >
                    <ThumbsUp size={13} fill={SKY} stroke={SKY} />
                    <span>Cliente Satisfecho</span>
                  </div>

                  <p className="text-sm leading-relaxed mb-6 font-semibold italic" style={{ color: "#4b5563" }}>
                    "{t.text}"
                  </p>
                </div>

                <div className="flex items-center gap-3.5 pt-4 border-t border-gray-100">
                  <img
                    src={t.img}
                    alt={t.name}
                    className="w-11 h-11 rounded-full object-cover border-2 shadow-sm"
                    style={{ borderColor: SKY }}
                  />
                  <div>
                    <p className="font-black text-sm" style={{ color: DARK }}>
                      {t.name}
                    </p>
                    <div className="flex items-center gap-1 text-xs font-bold text-gray-400 mt-0.5">
                      <MapPin size={11} className="shrink-0" />
                      <span>{t.location}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA profesionales ─────────────────────────────── */}
      <section className="py-20 px-4 md:px-10 text-center">
        <div className="max-w-4xl mx-auto">
          {/* CAMBIO 3A: '¿Eres profesional?' sin nada de brillo */}
          <p className="inline-block px-5 py-2 rounded-full bg-white/20 backdrop-blur-md text-white font-extrabold text-sm uppercase tracking-widest mb-4 border border-white/40 shadow-md">
            ¿Eres profesional?
          </p>

          <h2
            className="text-4xl md:text-6xl font-black mb-4 text-white drop-shadow-md"
            style={{
              fontFamily: "'Nunito', sans-serif",
              textShadow: "0 0 16px rgba(255, 255, 255, 0.8), 0 2px 8px rgba(0,0,0,0.2)"
            }}
          >
            Haz crecer tu negocio con Conecta Hogar
          </h2>

          {/* CAMBIO 3B: Mismo color brillante e iluminación que el título principal */}
          <p
            className="text-lg md:text-xl font-bold mb-10 max-w-2xl mx-auto text-white drop-shadow-md"
            style={{
              textShadow: "0 0 16px rgba(255, 255, 255, 0.8), 0 2px 8px rgba(0,0,0,0.2)"
            }}
          >
            Únete a nuestra red de +1.000 profesionales y comienza a recibir solicitudes de clientes en tu zona hoy mismo.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Link
              to="/registro-profesional"
              className="px-8 py-4 rounded-full text-sm md:text-base font-bold text-white shadow-xl transition-all duration-300 hover:scale-105"
              style={{ background: PINK, boxShadow: `0 8px 25px ${PINK}60` }}
            >
              Registrarme gratis
            </Link>
            {/* CAMBIO 3C: Botón 'Ver nuestra garantía' en color CYAN */}
            <Link
              to="/garantia"
              className="px-8 py-4 rounded-full text-sm md:text-base font-bold text-white shadow-md backdrop-blur-md transition-all duration-300 hover:scale-105"
              style={{ background: SKY, boxShadow: `0 8px 25px ${SKY}60` }}
            >
              Ver nuestra garantía
            </Link>
          </div>

          {/* CAMBIO 3D: Se eliminó la caja contenedora exterior dejando únicamente los paneles directos */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            <div className="flex items-center gap-2.5 px-5 py-2.5 rounded-2xl bg-white/95 shadow-md">
              <CheckCircle2 size={20} className="shrink-0" style={{ color: PINK }} />
              <span className="text-sm font-extrabold" style={{ color: DARK }}>
                Sin costo de suscripción
              </span>
            </div>
            <div className="flex items-center gap-2.5 px-5 py-2.5 rounded-2xl bg-white/95 shadow-md">
              <CheckCircle2 size={20} className="shrink-0" style={{ color: SKY }} />
              <span className="text-sm font-extrabold" style={{ color: DARK }}>
                Soporte 24/7
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}