import { useState } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, ShieldCheck, Clock, Users, HeartHandshake } from "lucide-react";
import { Button } from "@/components/ui/button";

// Paleta de colores oficiales
const PINK = "#e83360";
const YELLOW = "#f5d318";
const BLUE = "#0a6880";
const DARK_BLUE = "#064556";
const WHITE_TRANSPARENT = "rgba(255, 255, 255, 0.15)";

const TARJETAS_NOSOTROS = [
  {
    id: 1,
    titulo: "Seguridad y Confianza",
    descripcion: "Validamos la identidad y antecedentes de cada profesional registrado para brindarte total tranquilidad en tu hogar.",
    icono: ShieldCheck,
  },
  {
    id: 2,
    titulo: "Respuestas Rápidas",
    descripcion: "Conectamos tus requerimientos urgentes con técnicos disponibles en tu zona en cuestión de minutos.",
    icono: Clock,
  },
  {
    id: 3,
    titulo: "Comunidad Local",
    descripcion: "Fomentamos el trabajo justo y local, impulsando a especialistas y emprendedores de tu propia comuna.",
    icono: Users,
  },
  {
    id: 4,
    titulo: "Garantía de Servicio",
    descripcion: "Acompañamos cada trabajo desde la cotización hasta el término para asegurar tu completa satisfacción.",
    icono: HeartHandshake,
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

  return (
    <div className="w-full py-12 px-4 md:px-10 max-w-4xl mx-auto space-y-16">

      {/* 1. Header Centrado (Sin contenedor blanco rígido) */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-6 py-4"
      >
        {/* Título Principal Centrado con sombra de texto para máxima legibilidad */}
        <h1
          className="text-4xl md:text-6xl font-black tracking-tight text-white drop-shadow-md"
          style={{ fontFamily: "'Nunito', sans-serif" }}
        >
          Sobre <span style={{ color: PINK }}>nosotros</span>
        </h1>

        {/* Subtítulo limpio sin caja detrás */}
        <p className="text-xl md:text-2xl font-extrabold leading-relaxed max-w-3xl mx-auto text-white drop-shadow-sm">
          En <span style={{ color: PINK }}>Conecta Hogar</span> nos apasiona hacer tu vida más fácil. Somos la plataforma que une a familias con los mejores profesionales de su zona.
        </p>
      </motion.section>

      {/* 2. Sección de Nuestros Pilares (Carrusel Integrado al Fondo) */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="space-y-8"
      >
        {/* Encabezado del Carrusel Flotante */}
        <div className="text-center space-y-3">
          <h2 className="text-3xl md:text-4xl font-black text-white drop-shadow-md">
            Nuestros <span style={{ color: YELLOW }}>Pilares</span>
          </h2>
          <p className="text-white/90 font-bold text-base md:text-lg drop-shadow-sm">
            Lo que nos mueve cada día para entregarte la mejor experiencia
          </p>
        </div>

        {/* Tarjeta del Carrusel con Vidrio Tenue (Glassmorphism sutil) */}
        <div className="relative bg-white/15 backdrop-blur-md border border-white/20 rounded-3xl p-8 md:p-12 max-w-2xl mx-auto text-center space-y-6 shadow-lg">
          {(() => {
            const IconoComponente = TARJETAS_NOSOTROS[currentSlide].icono;
            return (
              <div className="flex flex-col items-center gap-4">
                <div
                  className="p-5 rounded-2xl bg-white/20 text-white backdrop-blur-sm shadow-inner"
                >
                  <IconoComponente size={48} />
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-white drop-shadow-sm">
                  {TARJETAS_NOSOTROS[currentSlide].titulo}
                </h3>
                <p className="text-white/90 text-base md:text-lg font-medium leading-relaxed max-w-lg">
                  {TARJETAS_NOSOTROS[currentSlide].descripcion}
                </p>
              </div>
            );
          })()}

          {/* Controles del Carrusel */}
          <div className="flex justify-between items-center pt-6 border-t border-white/20">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="rounded-full border-white/40 bg-white/10 hover:bg-white/30 text-white transition-all"
            >
              <ChevronLeft size={22} />
            </Button>

            {/* Indicadores de Páginas */}
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
              className="rounded-full border-white/40 bg-white/10 hover:bg-white/30 text-white transition-all"
            >
              <ChevronRight size={22} />
            </Button>
          </div>
        </div>
      </motion.section>

      {/* 3. CTA Final en la parte inferior (Elegante y Limpio) */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="rounded-3xl p-8 md:p-12 text-center text-white space-y-4 bg-white/10 backdrop-blur-md border border-white/20 shadow-xl"
      >
        <h2 className="text-2xl md:text-4xl font-black drop-shadow-md">
          ¿Quieres formar parte de <span style={{ color: BLUE }}>Conecta Hogar</span>?
        </h2>
        <p className="text-white/90 max-w-xl mx-auto text-base md:text-lg font-medium leading-relaxed">
          Tanto si buscas un especialista para solucionar un problema en casa, como si eres un profesional que quiere ofrecer sus servicios.
        </p>
      </motion.section>

    </div>
  );
}