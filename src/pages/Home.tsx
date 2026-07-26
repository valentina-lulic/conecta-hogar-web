import { useState, useRef, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion, useInView } from "motion/react";
import { Search, Star, ChevronRight, Wrench, Zap, ShieldCheck, Clock, ThumbsUp, MapPin, MessageSquare, Phone, CheckCircle2, HardHat } from "lucide-react";
import { ImageWithFallback } from "../components/ui/ImageWithFallback";
import { InteractiveLogo } from "../components/custom/InteractiveLogo";
import gasfiteriaImg from "../assets/images/gasfiter.png";
import electricidadImg from "../assets/images/electricista.png";
import albanileriaImg from "../assets/images/albanil.png";
import soldaduraImg from "../assets/images/soldador.png";

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
  {
    img: gasfiteriaImg,
    label: "Gasfitería",
    color: SKY,
  },
  {
    img: electricidadImg,
    label: "Electricidad",
    color: YELLOW,
  },
  {
    img: albanileriaImg,
    label: "Albañilería",
    color: PINK,
  },
  {
    img: soldaduraImg,
    label: "Soldaduría",
    color: "#ec561b",
  },
];

const professionals = [
  { name: "Carlos Muñoz", specialty: "Gasfitero certificado", likes: 127, location: "Santiago Centro", available: true, img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&auto=format", badge: "Top Profesional", badgeColor: PINK },
  { name: "Ana Rodríguez", specialty: "Electricista", likes: 89, location: "Providencia", available: true, img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&auto=format", badge: "Verificada", badgeColor: SKY },
  { name: "Pedro Saavedra", specialty: "Pintor profesional", likes: 64, location: "Las Condes", available: false, img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&auto=format", badge: "Destacado", badgeColor: YELLOW },
];

const steps = [
  { num: "01", color: SKY, title: "Busca un profesional acorde a tu necesidad", desc: "Explora nuestra red de profesionales verificados por especialidad y zona. Encuentra al indicado en segundos." },
  { num: "02", color: YELLOW, title: "Contáctalo", desc: "Escríbele directamente, pide un presupuesto y coordina el trabajo a tu horario. Sin intermediarios." },
  { num: "03", color: PINK, title: "¡Listo! Tu hogar está conectado", desc: "El profesional llega y resuelve el problema. Pagas solo cuando estés 100% satisfecho." },
];

const testimonials = [
  { name: "Valentina Torres", location: "Santiago", rating: 5, text: "¡Increíble servicio! En menos de 2 horas tenía a Carlos arreglando mi cañería. Super recomendado.", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&auto=format", color: PINK },
  { name: "Diego Fuentes", location: "Providencia", rating: 5, text: "La electricista Ana fue puntual, profesional y dejó todo perfecto. Conecta Hogar es lo mejor.", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&auto=format", color: SKY },
  { name: "Camila Herrera", location: "Las Condes", rating: 5, text: "Repararon mi calefacción justo antes del invierno. El proceso fue súper fácil desde la app.", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&auto=format", color: YELLOW },
];

function TradeCard({ img, label, sub, color, index }: { img: string; label: string; sub: string; color: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 60, scale: 0.92 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.55, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -10, scale: 1.03 }}
      className="group relative rounded-3xl overflow-hidden cursor-pointer shadow-lg"
      style={{ aspectRatio: "3/4" }}>
      <motion.div className="w-full h-full" whileHover={{ scale: 1.08 }} transition={{ duration: 0.5 }}>
        <ImageWithFallback src={img} alt={label} className="w-full h-full object-cover" />
      </motion.div>
      <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${color}dd 0%, ${color}55 40%, transparent 70%)` }} />
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <p className="font-black text-white text-xl" style={{ fontFamily: "'Nunito', sans-serif" }}>{label}</p>
        <p className="text-white/80 text-xs font-semibold">{sub}</p>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [activeTab, setActiveTab] = useState<"particulares" | "profesionales">("particulares");
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
              <div className="inline-flex rounded-full p-1 backdrop-blur-md" style={{ background: "rgba(255,255,255,0.55)" }}>
                {(["particulares", "profesionales"] as const).map(tab => (
                  <motion.button key={tab} onClick={() => setActiveTab(tab)} whileTap={{ scale: 0.96 }}
                    className="px-6 py-2.5 rounded-full text-sm font-black transition-all"
                    style={activeTab === tab ? { background: PINK, color: "white", boxShadow: `0 4px 16px ${PINK}55` } : { color: DARK }}>
                    {tab === "particulares" ? "Soy cliente" : "Soy profesional"}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Headline */}
            <div className="text-center max-w-3xl mx-auto mb-10">
              <h1 className="text-4xl md:text-6xl leading-tight mb-4 font-black"
                style={{ fontFamily: "'Nunito', sans-serif", color: DARK, textShadow: "0 2px 12px rgba(255,255,255,0.8)" }}>
                {activeTab === "particulares"
                  ? <>Encuentra al profesional perfecto<br /><span style={{ color: PINK }}>para tu hogar</span></>
                  : <>Consigue más clientes y<br /><span style={{ color: PINK }}>haz crecer tu negocio</span></>}
              </h1>
              <p className="text-lg font-semibold leading-relaxed" style={{ color: DARK }}>
                {activeTab === "particulares"
                  ? "Gasfiteros, electricistas, albañiles y más. Profesionales verificados, precios transparentes y garantía de satisfacción."
                  : "Únete a nuestra red de +1.000 profesionales y recibe solicitudes de trabajo en tu zona hoy mismo."}
              </p>
            </div>

            {/* Search */}
            <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto mb-5">
              <div className="flex-1 flex items-center gap-3 px-5 rounded-2xl"
                style={{ background: "rgba(255,255,255,0.95)", border: searchFocused ? `2.5px solid ${PINK}` : "2.5px solid rgba(255,255,255,0.8)", boxShadow: searchFocused ? `0 0 0 4px ${PINK}25` : "0 4px 20px rgba(0,0,0,0.1)" }}>
                <Search size={18} style={{ color: PINK }} className="shrink-0" />
                <input type="text"
                  placeholder={activeTab === "particulares" ? (activeCategory ? `Buscar en ${activeCategory}...` : "¿Qué servicio necesitas?") : "Tu especialidad..."}
                  value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)} onBlur={() => setSearchFocused(false)}
                  className="flex-1 py-4 text-sm font-semibold placeholder:text-gray-400 outline-none bg-transparent"
                  style={{ color: DARK }} />
              </div>
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                className="px-8 py-4 rounded-2xl text-sm font-black text-white whitespace-nowrap shadow-xl"
                style={{ background: PINK, boxShadow: `0 8px 24px ${PINK}55` }}>
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
                className="rounded-2xl py-3 sm:py-4 md:py-5 px-2 sm:px-3 md:px-4 backdrop-blur-md flex flex-col justify-center items-center min-h-[120px]"
                style={{
                  background: "rgba(255,255,255,0.65)",
                  border: `2px solid ${c}55`,
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

                <p
                  className="text-xs sm:text-sm font-bold mt-2"
                  style={{ color: DARK }}
                >
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
            <p className="text-xs font-black tracking-widest uppercase mb-2" style={{ color: PINK }}>
              Especialidades
            </p>
            <h2 className="text-3xl md:text-4xl font-black" style={{ fontFamily: "'Nunito', sans-serif", color: DARK }}>
              Nuestros Oficios
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            {trades
              .filter(t => !activeCategory || t.label === activeCategory)
              .map((t, i) => <TradeCard sub={""} key={t.label} {...t} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── ¿Cómo funciona? ───────────────────────────────── */}
      <section className="py-16 px-4 md:px-10 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Encabezado Sofisticado en Blanco */}
          <div className="text-center mb-12">
            <p className="text-xs md:text-sm font-black tracking-widest uppercase mb-2 text-white/90 drop-shadow">
              Paso a paso
            </p>
            <h2
              className="text-3xl md:text-5xl font-black text-white drop-shadow-md"
              style={{ fontFamily: "'Nunito', sans-serif" }}
            >
              ¿Cómo funciona?
            </h2>
          </div>

          {/* Tarjetas 01, 02, 03 con Glassmorphism idéntico a la referencia */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="p-8 rounded-3xl backdrop-blur-xl border border-white/50 shadow-2xl flex flex-col items-start relative overflow-hidden transition-all duration-300"
                style={{
                  background: "rgba(255, 255, 255, 0.22)", // Mismo cristal traslúcido de la foto
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.12)",
                }}
              >
                {/* Badge/Píldora para el número estilo cristal */}
                <div className="w-14 h-14 rounded-2xl bg-white/30 backdrop-blur-md border border-white/50 flex items-center justify-center mb-6 shadow-sm">
                  <span className="text-2xl font-black text-white drop-shadow-sm">
                    {step.num}
                  </span>
                </div>

                <h3 className="text-xl font-extrabold text-white mb-3 drop-shadow-sm leading-snug">
                  {step.title}
                </h3>

                <p className="text-sm font-medium text-white/90 leading-relaxed drop-shadow-sm">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Cajas Inferiores alineadas al mismo diseño de cristal */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: ShieldCheck, label: "Profesionales verificados" },
              { icon: Clock, label: "Respuesta en menos de 1 hora" },
              { icon: ThumbsUp, label: "Garantía de satisfacción" },
            ].map(({ icon: Icon, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1 }}
                whileHover={{ scale: 1.03, backgroundColor: "rgba(255, 255, 255, 0.35)" }}
                className="flex items-center gap-4 rounded-2xl p-4 border border-white/50 backdrop-blur-xl shadow-xl transition-all"
                style={{
                  background: "rgba(255, 255, 255, 0.22)",
                }}
              >
                <div className="w-11 h-11 rounded-xl bg-white/30 backdrop-blur-md border border-white/50 flex items-center justify-center shrink-0 shadow-sm">
                  <Icon size={22} className="text-white drop-shadow" />
                </div>
                <p className="text-sm font-bold text-white tracking-wide drop-shadow-sm">
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
              <p className="text-xs font-black tracking-widest uppercase mb-2 text-yellow-300 drop-shadow-sm">
                Nuestros expertos
              </p>
              <h2 className="text-3xl md:text-4xl font-black text-white" style={{ fontFamily: "'Nunito', sans-serif" }}>
                Profesionales destacados :
              </h2>
            </div>
            <a href="#" className="hidden md:inline-flex items-center gap-1 text-sm font-black hover:opacity-60 transition-opacity" style={{ color: PINK }}>
              Ver todos <ChevronRight size={16} />
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {professionals.map((pro, i) => (
              <motion.div key={pro.name}
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.13 }}
                whileHover={{ y: -8, boxShadow: "0 20px 48px rgba(0,0,0,0.14)" }}
                className="bg-white rounded-2xl overflow-hidden border-2 cursor-pointer"
                style={{ borderColor: `${pro.badgeColor}30` }}>
                <div className="p-5 flex items-start gap-4">
                  <div className="relative shrink-0">
                    <img src={pro.img} alt={pro.name} className="w-16 h-16 rounded-2xl object-cover" />
                    {pro.available && <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white bg-green-500" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-0.5">
                      <h3 className="font-black text-base" style={{ color: DARK }}>{pro.name}</h3>
                      <span className="text-xs font-black px-2 py-0.5 rounded-full text-white" style={{ background: pro.badgeColor }}>{pro.badge}</span>
                    </div>
                    <p className="text-sm font-semibold" style={{ color: "#6b7280" }}>{pro.specialty}</p>
                    <div className="flex items-center gap-1 mt-1.5">
                      <ThumbsUp size={13} fill={SKY} stroke={SKY} />
                      <span className="text-xs font-black" style={{ color: DARK }}>{pro.likes}</span>
                      <span className="text-xs" style={{ color: "#9ca3af" }}>Me gusta</span>
                    </div>
                  </div>
                </div>
                <div className="border-t px-5 py-3 flex items-center justify-between" style={{ borderColor: "#f3f4f6" }}>
                  <div className="flex items-center gap-1 text-xs font-semibold" style={{ color: "#9ca3af" }}>
                    <MapPin size={12} />{pro.location}
                  </div>
                </div>
                <div className="px-5 pb-5 pt-3 flex gap-2">
                  <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    className="flex-1 py-2.5 rounded-xl text-sm font-black text-white" style={{ background: PINK }}>
                    Contactar
                  </motion.button>
                  <button className="px-4 py-2.5 rounded-xl border-2 hover:opacity-70" style={{ borderColor: SKY, color: SKY }}>
                    <Phone size={15} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonios ───────────────────────────────────── */}
      <section className="py-16 px-4 md:px-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-black tracking-widest uppercase mb-2 text-yellow-300 drop-shadow-sm">
              Testimonios
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-white" style={{ fontFamily: "'Nunito', sans-serif" }}>
              Lo que dicen nuestros usuarios :
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <motion.div key={t.name}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}
                className="rounded-2xl p-6 bg-white/60 backdrop-blur-md shadow-sm border border-gray-100 flex flex-col justify-between">

                <div>
                  {/* Badge de recomendación / Like (Reemplaza a las estrellas) */}
                  <div className="flex items-center gap-1.5 mb-4 text-xs font-extrabold px-3 py-1 bg-green-50 text-blue-700 rounded-full w-fit border border-blue-200">
                    <ThumbsUp size={13} className="fill-blue-600 stroke-blue-600" />
                    <span>Recomendado</span>
                  </div>

                  <p className="text-sm leading-relaxed mb-5 text-gray-700 font-medium">"{t.text}"</p>
                </div>

                <div className="flex items-center gap-3">
                  <img src={t.img} alt={t.name} className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm" />
                  <div>
                    <p className="font-bold text-sm" style={{ color: DARK }}>{t.name}</p>
                    <p className="text-xs font-semibold text-gray-400">{t.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA profesionales ─────────────────────────────── */}
      <section className="py-16 px-4 md:px-10 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-black tracking-widest uppercase mb-3" style={{ color: PINK }}>¿Eres profesional?</p>
          <h2 className="text-3xl md:text-4xl font-black mb-4" style={{ fontFamily: "'Nunito', sans-serif", color: DARK }}>
            Haz crecer tu negocio con Conecta Hogar
          </h2>
          <p className="text-base mb-8 leading-relaxed" style={{ color: "#6b7280" }}>
            Únete a nuestra plataforma y comienza a recibir solicitudes de trabajo verificadas en tu zona. Sin costo de suscripción mensual.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Link to="/registro" className="px-8 py-4 rounded-xl font-black text-sm text-white inline-block shadow-lg" style={{ background: PINK }}>
                Registrarme gratis
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Link to="/garantia" className="px-8 py-4 rounded-xl font-black text-sm inline-block border-2" style={{ borderColor: SKY, color: SKY }}>
                Ver nuestra garantía
              </Link>
            </motion.div>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm font-semibold" style={{ color: "#9ca3af" }}>
            {["Sin costo de suscripción", "Pago por resultado", "Soporte 24/7"].map(item => (
              <div key={item} className="flex items-center gap-2">
                <CheckCircle2 size={15} style={{ color: SKY }} />{item}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}