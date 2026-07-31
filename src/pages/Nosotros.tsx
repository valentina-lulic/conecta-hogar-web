import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Clock,
  Users,
  Wrench,
  Search,
  UserCheck,
  ThumbsUp,
  CheckCircle2,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";

// ── 1. IMPORTACIÓN DE TUS IMÁGENES DE "CÓMO FUNCIONA" ──
import imgPaso1 from "../assets/images/paso1.png";
import imgPaso2 from "../assets/images/paso2.png";
import imgPaso3 from "../assets/images/paso3.png";
import imgPaso4 from "../assets/images/paso4.png";

// Importación de imágenes de los Pilares
import imgEquipo from "../assets/images/equipo.Nosotros.png";
import imgPersonas from "../assets/images/personas.Nosotros.png";
import imgProfesionales from "../assets/images/profesionales.Nosotros.png";

// Paleta de colores de marca
const PINK = "#e83360";
const YELLOW = "#f5d318";
const ORANGE = "#f97316";
const SKY = "#55bcd9";
const WHITE = "#ffffff";

// Color de letra extraído de la imagen ("Encuentra al profesional")
const TEAL_DARK = "#0e4a5e";

const PASOS_COMO_FUNCIONA = [
  {
    numero: "01",
    titulo: "Surgimiento del problema",
    subtitulo: "1. ¿Algo se rompió en casa?",
    descripcion: "Fuga de agua, fallo eléctrico o remodelación. Identificas la urgencia o necesidad en tu hogar.",
    icono: Wrench,
    color: ORANGE,
    badge: "Problema en el hogar",
    imagen: imgPaso1,
    detalles: ["Sin complicaciones", "Diagnóstico rápido"]
  },
  {
    numero: "02",
    titulo: "Búsqueda inteligente",
    subtitulo: "2. Acudes a Conecta Hogar",
    descripcion: "Abres la app, filtras por tu comuna y encuentras al instante especialistas calificados disponibles.",
    icono: Search,
    color: SKY,
    badge: "Búsqueda en la App",
    imagen: imgPaso2,
    detalles: ["Especialistas verificados", "Filtros por comuna"]
  },
  {
    numero: "03",
    titulo: "Solución a domicilio",
    subtitulo: "3. Tu profesional va a tu casa",
    descripcion: "El experto llega puntual a tu domicilio, realiza la reparación con garantía y resuelve tu problema.",
    icono: UserCheck,
    color: PINK,
    badge: "Servicio a domicilio",
    imagen: imgPaso3,
    detalles: ["Puntualidad garantizada", "Trabajo seguro"]
  },
  {
    numero: "04",
    titulo: "Calificación y Reseña",
    subtitulo: "4. Dejas tu reseña y me gusta",
    descripcion: "Evalúas la atención recibida, dejas tu 'Like' y ayudas a toda la comunidad a encontrar a los mejores.",
    icono: ThumbsUp,
    color: YELLOW,
    badge: "Comunidad activa",
    imagen: imgPaso4,
    detalles: ["Opinión transparente", "Premia el buen servicio"]
  }
];

const TARJETAS_NOSOTROS = [
  {
    id: 1,
    titulo: "Seguridad y Confianza",
    descripcion: "Validamos la identidad y antecedentes de cada profesional registrado para brindarte total tranquilidad en tu hogar.",
    icono: ShieldCheck,
    imagen: imgEquipo,
  },
  {
    id: 2,
    titulo: "Respuestas Rápidas",
    descripcion: "Conectamos tus requerimientos urgentes con técnicos disponibles en tu zona en cuestión de minutos.",
    icono: Clock,
    imagen: imgPersonas,
  },
  {
    id: 3,
    titulo: "Comunidad Local",
    descripcion: "Fomentamos el trabajo justo y local, impulsando a especialistas y emprendedores de tu propia comuna.",
    icono: Users,
    imagen: imgProfesionales,
  },
];

export function Nosotros() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [pasoActivo, setPasoActivo] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      setPasoActivo((prev) => (prev + 1) % PASOS_COMO_FUNCIONA.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [autoPlay]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % TARJETAS_NOSOTROS.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + TARJETAS_NOSOTROS.length) % TARJETAS_NOSOTROS.length);
  };

  const slideActual = TARJETAS_NOSOTROS[currentSlide];
  const pasoInfo = PASOS_COMO_FUNCIONA[pasoActivo];

  return (
    <div
      className="w-full space-y-16 pb-20 min-h-screen bg-cover bg-no-repeat"
      style={{
        backgroundImage: "url('/FONDOAPPFINAL.png')",
        backgroundPosition: "25% 45%",
      }}
    >

      {/* ── 1. HERO CUBRIENDO LA PARTE SUPERIOR DEL NAVBAR ── */}
      <section
        className="w-full -mt-20 md:-mt-24 pt-32 md:pt-36 pb-28 md:pb-36 px-4 md:px-10 relative overflow-hidden backdrop-blur-sm shadow-sm"
        style={{
          background: "linear-gradient(90deg, rgba(14, 165, 233, 0.55) 0%, rgba(34, 197, 94, 0.45) 50%, rgba(234, 179, 8, 0.55) 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 85%, transparent 100%)",
          maskImage: "linear-gradient(to bottom, black 85%, transparent 100%)",
        }}
      >
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center space-y-5">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-lg mb-1"
          >
            <Users className="w-8 h-8 md:w-10 md:h-10 text-white" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl font-extrabold text-white tracking-tight drop-shadow-xl"
            style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800 }}
          >
            <span className="drop-shadow-2xl">Sobre</span> nosotros
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-sm md:text-base text-center text-white/95 max-w-xl leading-relaxed drop-shadow-md"
            style={{ fontFamily: "'Poppins', bold", fontWeight: 300 }}
          >
            Conecta Hogar fue creada para resolver la necesidad de conectar clientes, y ofrecer un servicio confiable y seguro para encontrar profesionales calificados en tu área. Nuestra misión es facilitar la conexión entre usuarios y expertos, asegurando calidad, confianza y eficiencia en cada interacción.
          </motion.p>
        </div>
      </section>

      {/* ── 2. SECCIÓN INTERACTIVA: CÓMO FUNCIONA LA APP (Se aplicó margen negativo para subirla y sombras a los textos) ── */}
      <section className="max-w-5xl mx-auto px-4 md:px-10 relative z-10 -mt-12 md:-mt-20">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* Encabezado con color de la imagen ("Encuentra al profesional") */}
          <div className="text-center space-y-2">
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-white/60 text-xs font-bold shadow-sm mb-1"
              style={{ color: TEAL_DARK }}
            >
              <Sparkles size={14} className="text-amber-500" />
              <span style={{ fontFamily: "'Poppins', sans-serif" }}>Experiencia interactiva</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-black drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]" style={{ fontFamily: "'Poppins', sans-serif" }}>
              <span style={{ color: WHITE }}>¿Cómo funciona </span>
              <span className="text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">Conecta Hogar?</span>
            </h2>

            <p
              className="font-semibold text-sm md:text-base max-w-lg mx-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
              style={{ color: WHITE, fontFamily: "'Poppins', sans-serif" }}
            >
              Haz clic en cada paso para ver cómo resolvemos los problemas de tu hogar en minutos.
            </p>
          </div>

          {/* CAJA CONTENEDORA DE CÓMO FUNCIONA */}
          <div className="bg-linear-to-r from-sky-200/40 via-emerald-200/40 to-yellow-200/40 backdrop-blur-md border border-white/60 p-5 md:p-8 rounded-3xl shadow-2xl space-y-6">

            {/* Barra de Pasos / Selectores con el mismo tono turquesa oscuro */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {PASOS_COMO_FUNCIONA.map((paso, idx) => {
                const IconoPasoBtn = paso.icono;
                const estaActivo = pasoActivo === idx;

                return (
                  <button
                    key={paso.numero}
                    onClick={() => {
                      setPasoActivo(idx);
                      setAutoPlay(false);
                    }}
                    className={`p-4 rounded-2xl transition-all duration-300 text-left border relative overflow-hidden flex flex-col justify-between ${estaActivo
                      ? "bg-white shadow-xl border-white scale-[1.02]"
                      : "bg-white/40 backdrop-blur-md border-white/50 hover:bg-white/60"
                      }`}
                  >
                    <div className="flex items-center justify-between mb-3 w-full">
                      <span
                        className="text-xs font-bold px-2 py-0.5 rounded-md bg-slate-100"
                        style={{ color: TEAL_DARK, fontFamily: "'Poppins', sans-serif" }}
                      >
                        {paso.numero}
                      </span>
                      <IconoPasoBtn
                        size={20}
                        style={{ color: estaActivo ? paso.color : TEAL_DARK }}
                      />
                    </div>

                    <p
                      className="text-xs md:text-sm font-bold line-clamp-2 leading-snug"
                      style={{ color: TEAL_DARK, fontFamily: "'Poppins', sans-serif" }}
                    >
                      {paso.subtitulo}
                    </p>

                    {estaActivo && (
                      <motion.div
                        layoutId="pasoActivoBorder"
                        className="absolute bottom-0 left-0 right-0 h-1.5"
                        style={{ background: paso.color }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Tarjeta de Detalle del Paso Animada */}
            <div className="bg-white/30 backdrop-blur-md border border-white/60 rounded-3xl p-6 md:p-10 shadow-xl relative overflow-hidden min-h-70">
              <AnimatePresence mode="wait">
                <motion.div
                  key={pasoActivo}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.35 }}
                  className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
                >
                  {/* Imagen del Paso */}
                  <div className="md:col-span-5 flex flex-col items-center justify-center">
                    <motion.div
                      initial={{ scale: 0.8, rotate: -3 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                      className="w-full aspect-video md:aspect-square max-w-70 rounded-2xl overflow-hidden shadow-xl relative border-2 border-white bg-black/10"
                    >
                      <img
                        src={pasoInfo.imagen}
                        alt={pasoInfo.subtitulo}
                        className="w-full h-full object-cover object-center"
                      />
                      <span
                        className="absolute top-2 right-2 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md"
                        style={{ background: pasoInfo.color, fontFamily: "'Poppins', sans-serif" }}
                      >
                        Paso {pasoInfo.numero}
                      </span>
                    </motion.div>
                  </div>

                  {/* Texto y detalles del paso */}
                  <div className="md:col-span-7 space-y-4 text-center md:text-left">
                    <div
                      className="inline-block px-3.5 py-1 rounded-full bg-white/80 text-xs font-bold shadow-sm backdrop-blur-sm border border-white"
                      style={{ color: TEAL_DARK }}
                    >
                      {pasoInfo.badge}
                    </div>

                    <h3
                      className="text-2xl md:text-3xl font-extrabold leading-tight"
                      style={{ color: TEAL_DARK, fontFamily: "'Poppins', sans-serif", fontWeight: 800 }}
                    >
                      {pasoInfo.subtitulo}
                    </h3>

                    <p
                      className="text-sm md:text-base font-semibold leading-relaxed"
                      style={{ color: TEAL_DARK, fontFamily: "'Poppins', sans-serif" }}
                    >
                      {pasoInfo.descripcion}
                    </p>

                    {/* Píldoras de detalles */}
                    <div className="flex flex-wrap justify-center md:justify-start gap-3 pt-2">
                      {pasoInfo.detalles.map((detalle) => (
                        <div
                          key={detalle}
                          className="flex items-center gap-2 bg-white/90 border border-white px-3.5 py-1.5 rounded-xl text-xs font-semibold shadow-sm"
                          style={{ color: TEAL_DARK, fontFamily: "'Poppins', sans-serif" }}
                        >
                          <CheckCircle2 size={16} className="text-emerald-600" />
                          {detalle}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </motion.div>
      </section>

      {/* ── 3. CARRUSEL DE PILARES ── */}
      <div className="max-w-4xl mx-auto px-4 md:px-10 pt-4">
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-10"
        >
          {/* TÍTULO: Ambas palabras en Blanco Puro con Sombras */}
          <div className="text-center space-y-2">
            <h2 className="text-3xl md:text-5xl font-black text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.35)]" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Nuestros Pilares
            </h2>
            <p className="text-white/95 font-medium text-sm md:text-base drop-shadow-md" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Lo que nos mueve cada día para entregarte la mejor experiencia
            </p>
          </div>

          {/* TARJETA ROSADA CON TEXTO BLANCO PURO Y ROSA CLARO */}
          <div className="relative bg-white/20 backdrop-blur-md border border-white/40 rounded-3xl p-6 md:p-10 max-w-2xl mx-auto text-center space-y-6 shadow-2xl">
            <div className="flex flex-col items-center gap-6">
              {slideActual.imagen && (
                <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-lg border border-white/50 bg-black/10 relative">
                  <img
                    src={slideActual.imagen}
                    alt={slideActual.titulo}
                    className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                  />
                </div>
              )}

              <div className="space-y-2 max-w-lg">
                <h3
                  className="text-2xl md:text-3xl font-extrabold text-white drop-shadow-md"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  {slideActual.titulo}
                </h3>
                <p
                  className="font-medium text-sm md:text-base leading-relaxed text-[#FFF1F2] drop-shadow-sm"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  {slideActual.descripcion}
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center pt-6 border-t border-white/30">
              <Button
                variant="outline"
                size="icon"
                onClick={prevSlide}
                className="rounded-full border-white/50 bg-white/20 hover:bg-white/40 text-white transition-all shadow-sm"
              >
                <ChevronLeft size={22} />
              </Button>

              <div className="flex gap-2">
                {TARJETAS_NOSOTROS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-3 rounded-full transition-all ${currentSlide === idx ? "w-8 bg-white" : "w-3 bg-white/40"
                      }`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={nextSlide}
                className="rounded-full border-white/50 bg-white/20 hover:bg-white/40 text-white transition-all shadow-sm"
              >
                <ChevronRight size={22} />
              </Button>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}