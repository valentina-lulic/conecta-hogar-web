import { useState, useRef } from "react";
import { motion, useInView } from "motion/react";
import { Search, Star, ChevronRight, Wrench, Zap, ThumbsUp, MapPin, Phone, CheckCircle2, HardHat } from "lucide-react";
import { Link } from "react-router-dom";
import { ImageWithFallback } from "../components/ui-helpers/ImageWithFallback";
import { InteractiveLogo } from "../components/custom/InteractiveLogo";
import gasfiteriaImg from "../../assets/images/gasfiter.png";
import electricidadImg from "../../assets/images/electricista.png";
import albanileriaImg from "../../assets/images/albanil.png";
import soldaduraImg from "../../assets/images/soldador.png";

const PINK   = "#e83360";
const YELLOW = "#f5d318";
const SKY    = "#55bcd9";
const DARK   = "#0a6880";

const categories = [
  { icon: Wrench,  label: "Gasfitería",   color: SKY,    bg: `${SKY}20`    },
  { icon: Zap,     label: "Electricidad", color: YELLOW, bg: `${YELLOW}30` },
  { icon: HardHat, label: "Albañilería",  color: PINK,   bg: `${PINK}18`   },
  { icon: Wrench,  label: "Soldaduría",   color: "#f97316", bg: "#f9731620" },
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
  { name: "Carlos Muñoz",   specialty: "Gasfitero certificado", likes: 127, location: "Santiago Centro", available: true,  img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&auto=format", badge: "Top Profesional", badgeColor: PINK   },
  { name: "Ana Rodríguez",  specialty: "Electricista",          likes: 89,  location: "Providencia",     available: true,  img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&auto=format", badge: "Verificada",     badgeColor: SKY    },
  { name: "Pedro Saavedra", specialty: "Pintor profesional",    likes: 64,  location: "Las Condes",      available: false, img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&auto=format", badge: "Destacado",      badgeColor: YELLOW },
];

const steps = [
  { num: "01", color: SKY,    title: "Busca un profesional acorde a tu necesidad", desc: "Explora nuestra red de profesionales verificados por especialidad y zona. Encuentra al indicado en segundos." },
  { num: "02", color: YELLOW, title: "Contáctalo",                                 desc: "Escríbele directamente, pide un presupuesto y coordina el trabajo a tu horario. Sin intermediarios." },
  { num: "03", color: PINK,   title: "¡Listo! Tu hogar está conectado",            desc: "El profesional llega y resuelve el problema. Pagas solo cuando estés 100% satisfecho." },
];

const testimonials = [
  { name: "Valentina Torres", location: "Santiago",    rating: 5, text: "¡Increíble servicio! En menos de 2 horas tenía a Carlos arreglando mi cañería. Super recomendado.", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&auto=format", color: PINK   },
  { name: "Diego Fuentes",    location: "Providencia", rating: 5, text: "La electricista Ana fue puntual, profesional y dejó todo perfecto. Conecta Hogar es lo mejor.",    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&auto=format", color: SKY    },
  { name: "Camila Herrera",   location: "Las Condes",  rating: 5, text: "Repararon mi calefacción justo antes del invierno. El proceso fue súper fácil desde la app.",      img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&auto=format", color: YELLOW },
];

function TradeCard({ img, label, sub, color, index }: { img: string; label: string; sub: string; color: string; index: number }) {
  const ref    = useRef<HTMLDivElement>(null);
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
      <motion.div className="absolute top-3 left-3" initial={{ opacity: 0, x: -8 }} whileHover={{ opacity: 1, x: 0 }} transition={{ duration: 0.2 }}>
        <span className="px-3 py-1 rounded-full text-xs font-black text-white backdrop-blur-sm" style={{ backgroundColor: `${color}cc` }}>
          Ver profesionales →
        </span>
      </motion.div>
    </motion.div>
  );
}

export function Home() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery,    setSearchQuery]    = useState("");
  const [searchFocused,  setSearchFocused]  = useState(false);
  const [activeTab,      setActiveTab]      = useState<"particulares" | "profesionales">("particulares");

  return (
    <div>

      {/* ── Hero — el fondo viene del Root ────────────────── */}
      <section className="relative min-h-[92vh] flex flex-col justify-center overflow-hidden">
        {/* Overlay muy sutil — la zona blanca/turquesa del fondo resalta el logo */}
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
                  : "Únete a nuestra red de +1.500 profesionales y recibe solicitudes de trabajo en tu zona hoy mismo."}
              </p>
            </div>

            {/* Search */}
            <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto mb-5">
              <div className="flex-1 flex items-center gap-3 px-5 rounded-2xl"
                style={{ background: "rgba(255,255,255,0.95)", border: searchFocused ? `2.5px solid ${PINK}` : "2.5px solid rgba(255,255,255,0.8)", boxShadow: searchFocused ? `0 0 0 4px ${PINK}25` : "0 4px 20px rgba(0,0,0,0.1)" }}>
                <Search size={18} style={{ color: PINK }} className="flex-shrink-0" />
                <input type="text"
                  placeholder={activeTab === "particulares" ? "¿Qué servicio necesitas?" : "Tu especialidad..."}
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

            {/* Chips */}
            <div className="flex flex-wrap justify-center gap-2">
              {["Gasfitería", "Electricidad", "Albañilería", "Control de Plagas"].map(chip => (
                <button key={chip}
                  className="px-4 py-1.5 rounded-full text-xs font-bold border-2 backdrop-blur-sm transition-colors hover:bg-white/60"
                  style={{ borderColor: DARK + "55", color: DARK, background: "rgba(255,255,255,0.5)" }}>
                  {chip}
                </button>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="max-w-3xl mx-auto mt-14 grid grid-cols-3 gap-4 text-center">
            {[{ n: "+1.000", l: "Profesionales", c: PINK }, { n: "+4.500", l: "Servicios completados", c: SKY }, { n: "98%", l: "Clientes satisfechos", c: YELLOW }].map(({ n, l, c }) => (
              <div key={l} className="rounded-2xl py-5 px-4 backdrop-blur-md" style={{ background: "rgba(255,255,255,0.65)", border: `2px solid ${c}55` }}>
                <p className="text-3xl font-black" style={{ fontFamily: "'Nunito', sans-serif", color: c }}>{n}</p>
                <p className="text-xs font-bold mt-1" style={{ color: DARK }}>{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Nuestros ficios — justo debajo del hero ───────────────── */}
      {/* Zona turquesa del fondo — texto oscuro */}
      <section className="py-16 px-4 md:px-10 backdrop-blur-sm" style={{ background: "rgba(255,255,255,0.78)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-black tracking-widest uppercase mb-2" style={{ color: SKY }}>En acción</p>
            <h2 className="text-3xl md:text-4xl font-black" style={{ fontFamily: "'Nunito', sans-serif", color: DARK }}>Nuestros oficios</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            {trades.map((t, i) => <TradeCard sub={""} key={t.label} {...t} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── Profesionales ─────────────────────────────────── */}
      {/* Zona naranja del fondo — overlay más opaco para legibilidad */}
      <section id="profesionales" className="py-16 px-4 md:px-10 backdrop-blur-sm" style={{ background: "rgba(255,255,255,0.80)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs font-black tracking-widest uppercase mb-2" style={{ color: SKY }}>Nuestros expertos</p>
              <h2 className="text-3xl md:text-4xl font-black" style={{ fontFamily: "'Nunito', sans-serif", color: DARK }}>Profesionales destacados</h2>
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
                  <div className="relative flex-shrink-0">
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
      {/* Zona naranja/rosa — overlay glassmorphism, texto blanco */}
      <section className="py-16 px-4 md:px-10 backdrop-blur-sm" style={{ background: "rgba(232,51,96,0.15)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-black tracking-widest uppercase mb-2" style={{ color: PINK }}>Testimonios</p>
            <h2 className="text-3xl md:text-4xl font-black" style={{ fontFamily: "'Nunito', sans-serif", color: "#fff" }}>Lo que dicen nuestros usuarios</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <motion.div key={t.name}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}
                className="rounded-2xl p-6 backdrop-blur-sm"
                style={{ background: "rgba(255,255,255,0.2)", border: "1.5px solid rgba(255,255,255,0.35)" }}>
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => <Star key={j} size={14} fill="white" stroke="none" />)}
                </div>
                <p className="text-sm leading-relaxed mb-5 text-white/90">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.img} alt={t.name} className="w-10 h-10 rounded-full object-cover border-2 border-white/50" />
                  <div>
                    <p className="font-bold text-sm text-white">{t.name}</p>
                    <p className="text-xs font-semibold text-white/60">{t.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA profesionales ─────────────────────────────── */}
      {/* Zona pink/magenta — texto oscuro sobre overlay blanco */}
      <section className="py-16 px-4 md:px-10 text-center backdrop-blur-sm" style={{ background: "rgba(255,255,255,0.80)" }}>
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
              <Link to="/contacto" className="px-8 py-4 rounded-xl font-black text-sm text-white inline-block shadow-lg" style={{ background: PINK }}>
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
