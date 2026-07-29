import { useState } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, ShieldCheck, Clock, Users, } from "lucide-react";
import { Button } from "@/components/ui/button";

// Importación de imágenes
import imgEquipo from "../assets/images/equipo.Nosotros.png";
import imgPersonas from "../assets/images/personas.Nosotros.png";
import imgProfesionales from "../assets/images/profesionales.Nosotros.png";

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

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % TARJETAS_NOSOTROS.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + TARJETAS_NOSOTROS.length) % TARJETAS_NOSOTROS.length);
  };

  const slideActual = TARJETAS_NOSOTROS[currentSlide];

  return (
    <div
      className="w-full space-y-20 pb-20 min-h-screen bg-cover bg-no-repeat"
      style={{
        backgroundImage: "url('/FONDOAPPFINAL.png')",
        backgroundPosition: "25% 45%",
      }}
    >

      {/* ── 1. HERO CuBRIENDO LA PARTE SUPERIOR DEL NAVBAR ── */}
      <section
        className="w-full -mt-20 md:-mt-24 pt-32 md:pt-36 pb-20 px-4 md:px-10 relative overflow-hidden backdrop-blur-sm shadow-sm"
        style={{
          // Gradiente que ahora subirá y cubrirá la parte superior del mapa
          background: "linear-gradient(90deg, rgba(14, 165, 233, 0.55) 0%, rgba(34, 197, 94, 0.45) 50%, rgba(234, 179, 8, 0.55) 100%)",

          // Máscara de difuminado solo en la parte inferior
          WebkitMaskImage: "linear-gradient(to bottom, black 75%, transparent 100%)",
          maskImage: "linear-gradient(to bottom, black 75%, transparent 100%)",
        }}
      >
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center space-y-5">

          {/* Icono Central Superior */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-lg mb-1"
          >
            <Users className="w-8 h-8 md:w-10 md:h-10 text-white" />
          </motion.div>

          {/* Título Principal */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl font-black text-white tracking-tight drop-shadow-md"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            Sobre nosotros
          </motion.h1>

          {/* Texto Descriptivo */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-sm md:text-base font-medium text-center text-white/95 max-w-xl leading-relaxed drop-shadow-sm"
            style={{ fontFamily: "'Comfortaa', 'Quicksand', sans-serif" }}
          >
            Conecta Hogar nace de la necesidad de ofrecer un servicio confiable y seguro para encontrar profesionales calificados en tu área. Nuestra misión es facilitar la conexión entre usuarios y expertos, asegurando calidad, confianza y eficiencia en cada interacción.
          </motion.p>

        </div>
      </section>


      {/* ── 2. CARRUSEL CON ENCUADRE DE IMÁGENES CORREGIDO ── */}
      <div className="max-w-4xl mx-auto px-4 md:px-10 pt-4">
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-10"
        >
          {/* Encabezado con buen espacio vertical */}
          <div className="text-center space-y-2">
            <h2 className="text-3xl md:text-5xl font-black text-white drop-shadow-md">
              Nuestros <span className="text-yellow-300">Pilares</span>
            </h2>
            <p className="text-white/90 font-bold text-sm md:text-base drop-shadow-sm">
              Lo que nos mueve cada día para entregarte la mejor experiencia
            </p>
          </div>

          {/* Tarjeta Glassmorphism del Carrusel */}
          <div className="relative bg-white/20 backdrop-blur-md border border-white/30 rounded-3xl p-6 md:p-10 max-w-2xl mx-auto text-center space-y-6 shadow-2xl">

            <div className="flex flex-col items-center gap-6">

              {/* Marco con aspecto 16:9 fija (aspect-video) para que todas encajen igual */}
              {slideActual.imagen && (
                <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-lg border border-white/40 bg-black/10 relative">
                  <img
                    src={slideActual.imagen}
                    alt={slideActual.titulo}
                    className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                  />
                </div>
              )}

              {/* Título y descripción */}
              <div className="space-y-2 max-w-lg">
                <h3 className="text-2xl md:text-3xl font-black text-white drop-shadow-sm">
                  {slideActual.titulo}
                </h3>
                <p className="text-white/95 text-sm md:text-base font-medium leading-relaxed">
                  {slideActual.descripcion}
                </p>
              </div>
            </div>

            {/* Navegación del carrusel */}
            <div className="flex justify-between items-center pt-6 border-t border-white/20">
              <Button
                variant="outline"
                size="icon"
                onClick={prevSlide}
                className="rounded-full border-white/40 bg-white/10 hover:bg-white/30 text-white transition-all shadow-sm"
              >
                <ChevronLeft size={22} />
              </Button>

              <div className="flex gap-2">
                {TARJETAS_NOSOTROS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-3 rounded-full transition-all ${currentSlide === idx ? "w-8 bg-[#e83360]" : "w-3 bg-white/40"
                      }`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={nextSlide}
                className="rounded-full border-white/40 bg-white/10 hover:bg-white/30 text-white transition-all shadow-sm"
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