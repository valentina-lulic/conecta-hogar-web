import { useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";

// Importación directa de la imagen desde src/assets/images
import fondoContacto from "../assets/images/FONDOCONTACTO.png";

// Paleta de colores exacta de la primera foto
const PINK = "#e83360";
const YELLOW = "#f5d318";
const ORANGE = "#f97316";
const SKY = "#55bcd9";
const DARK = "#0a6880";

// Gradiente cálido exacto (Amarillo -> Naranjo -> Rosa Coral)
const GRADIENTE_FOTO_CONTACTO =
  "linear-gradient(110deg, rgba(245, 211, 24, 0.88) 0%, rgba(249, 115, 22, 0.85) 50%, rgba(232, 51, 96, 0.80) 100%)";

const GRAD_SOFT = `linear-gradient(135deg, ${PINK}18 0%, ${YELLOW}18 50%, ${SKY}18 100%)`;

const contactInfo = [
  { icon: Phone, color: PINK, label: "Teléfono", value: "+56 2 2345 6789" },
  { icon: Mail, color: SKY, label: "Email", value: "hola@conectahogar.cl" },
  { icon: MapPin, color: YELLOW, label: "Oficina", value: "Av. Providencia 1234, Santiago" },
  { icon: Clock, color: PINK, label: "Atención", value: "Lun–Vie 9:00–18:00 hrs" },
];

const reasons = [
  "Solicitar un servicio",
  "Ser profesional de la plataforma",
  "Soporte técnico",
  "Consulta comercial",
  "Otro",
];

export function Contacto() {
  const [form, setForm] = useState({ nombre: "", email: "", telefono: "", razon: "", mensaje: "" });
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  const inputStyle = (name: string) => ({
    border: `2px solid ${focused === name ? ORANGE : "rgba(203, 213, 225, 0.8)"}`,
    outline: "none",
    background: "rgba(255, 255, 255, 0.85)",
    backdropFilter: "blur(8px)",
    borderRadius: "1rem",
    padding: "0.875rem 1rem",
    width: "100%",
    fontSize: "0.875rem",
    fontWeight: 600,
    color: DARK,
    fontFamily: "'Nunito Sans', sans-serif",
    boxShadow: focused === name ? `0 0 0 4px ${ORANGE}20` : "none",
    transition: "all 0.2s",
  });

  return (
    <div
      className="w-full space-y-12 pb-20 min-h-screen bg-cover bg-fixed bg-no-repeat"
      style={{
        backgroundImage: `url(${fondoContacto})`,
        backgroundPosition: "top center",
      }}
    >
      {/* ── 1. HERO CON EL GRADIENTE EXACTO DE LA FOTO ── */}
      <section
        className="w-full -mt-20 md:-mt-24 pt-32 md:pt-36 pb-20 px-4 md:px-10 relative overflow-hidden backdrop-blur-[2px] shadow-sm"
        style={{
          background: GRADIENTE_FOTO_CONTACTO,
          WebkitMaskImage: "linear-gradient(to bottom, black 80%, transparent 100%)",
          maskImage: "linear-gradient(to bottom, black 80%, transparent 100%)",
        }}
      >
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center space-y-5 relative z-10">

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center shadow-lg mb-1"
          >
            <Mail className="w-8 h-8 md:w-10 md:h-10 text-white drop-shadow-sm" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl font-black text-white tracking-tight drop-shadow-md"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            Contáctanos
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-sm md:text-base font-medium text-center text-white/95 max-w-xl leading-relaxed drop-shadow-sm"
            style={{ fontFamily: "'Comfortaa', 'Quicksand', sans-serif" }}
          >
            Estamos aquí para ayudarte. Cuéntanos qué necesitas y te respondemos en menos de 2 horas hábiles.
          </motion.p>

          <div className="w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
            {contactInfo.map(({ icon: Icon, label, value }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="rounded-2xl p-4 text-center backdrop-blur-md shadow-sm transition-transform hover:-translate-y-1"
                style={{ background: "rgba(255, 255, 255, 0.30)", border: "1.5px solid rgba(255, 255, 255, 0.5)" }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2 shadow-inner"
                  style={{ background: "rgba(255, 255, 255, 0.4)" }}
                >
                  <Icon size={18} className="text-white drop-shadow-sm" />
                </div>
                <p className="text-[10px] md:text-xs font-black uppercase tracking-wider mb-0.5 text-white/90">{label}</p>
                <p className="text-xs md:text-sm font-black leading-snug text-white">{value}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 2. SECCIÓN DEL FORMULARIO ── */}
      <section className="relative z-20 px-4 md:px-10">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">

          <div
            className="md:col-span-3 p-6 md:p-8 rounded-3xl backdrop-blur-md shadow-xl"
            style={{
              background: "rgba(255, 255, 255, 0.85)",
              border: "1.5px solid rgba(255, 255, 255, 0.9)"
            }}
          >
            <p className="text-xs font-black tracking-widest uppercase mb-2" style={{ color: ORANGE }}>Escríbenos</p>
            <h2 className="text-2xl md:text-3xl font-black mb-6" style={{ fontFamily: "'Nunito', sans-serif", color: DARK }}>
              Envíanos un mensaje
            </h2>

            {sent ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                className="rounded-2xl p-10 text-center border-2" style={{ borderColor: `${SKY}40`, background: "rgba(255, 255, 255, 0.9)" }}>
                <CheckCircle2 size={56} className="mx-auto mb-4" style={{ color: SKY }} />
                <h3 className="font-black text-xl mb-2" style={{ fontFamily: "'Nunito', sans-serif", color: DARK }}>¡Mensaje enviado!</h3>
                <p className="text-sm" style={{ color: "#4b5563" }}>Te responderemos en menos de 2 horas hábiles a <strong>{form.email}</strong></p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-6 px-8 py-3.5 rounded-full font-black text-sm text-white transition-all shadow-md hover:opacity-90"
                  style={{ background: ORANGE }}>
                  Enviar otro mensaje
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black mb-1.5" style={{ color: DARK }}>Nombre completo *</label>
                    <input name="nombre" required value={form.nombre} onChange={handleChange}
                      onFocus={() => setFocused("nombre")} onBlur={() => setFocused(null)}
                      placeholder="Tu nombre" style={inputStyle("nombre")} />
                  </div>
                  <div>
                    <label className="block text-xs font-black mb-1.5" style={{ color: DARK }}>Email *</label>
                    <input name="email" type="email" required value={form.email} onChange={handleChange}
                      onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
                      placeholder="tu@email.com" style={inputStyle("email")} />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black mb-1.5" style={{ color: DARK }}>Teléfono</label>
                    <input name="telefono" value={form.telefono} onChange={handleChange}
                      onFocus={() => setFocused("telefono")} onBlur={() => setFocused(null)}
                      placeholder="+56 9 1234 5678" style={inputStyle("telefono")} />
                  </div>
                  <div>
                    <label className="block text-xs font-black mb-1.5" style={{ color: DARK }}>Motivo *</label>
                    <select name="razon" required value={form.razon} onChange={handleChange}
                      onFocus={() => setFocused("razon")} onBlur={() => setFocused(null)}
                      style={{ ...inputStyle("razon"), appearance: "auto" }}>
                      <option value="">Selecciona un motivo</option>
                      {reasons.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black mb-1.5" style={{ color: DARK }}>Mensaje *</label>
                  <textarea name="mensaje" required rows={4} value={form.mensaje} onChange={handleChange}
                    onFocus={() => setFocused("mensaje")} onBlur={() => setFocused(null)}
                    placeholder="Cuéntanos en qué podemos ayudarte..."
                    style={{ ...inputStyle("mensaje"), resize: "vertical" }} />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 rounded-full font-black text-sm text-white inline-flex items-center justify-center gap-2 shadow-lg transition-all mt-3"
                  style={{ background: ORANGE, boxShadow: `0 8px 20px ${ORANGE}45` }}
                >
                  <Send size={16} /> Enviar mensaje
                </motion.button>
              </form>
            )}
          </div>

          <div className="md:col-span-2 space-y-5">
            <div
              className="rounded-3xl p-6 backdrop-blur-md shadow-lg"
              style={{ background: "rgba(255, 255, 255, 0.85)", border: "1.5px solid rgba(255, 255, 255, 0.9)" }}
            >
              <h3 className="font-black text-lg mb-2" style={{ fontFamily: "'Nunito', sans-serif", color: DARK }}>¿Eres profesional?</h3>
              <p className="text-xs md:text-sm font-semibold leading-relaxed mb-4" style={{ color: "#4b5563" }}>
                ¿Quieres ofrecer tus servicios en nuestra plataforma? Regístrate gratis y comienza a recibir clientes hoy.
              </p>
              <Link to="/garantia"
                className="inline-flex items-center gap-1 text-sm font-black hover:opacity-80 transition-opacity"
                style={{ color: ORANGE }}>
                Registrarme →
              </Link>
            </div>

            <div
              className="rounded-3xl p-6 backdrop-blur-md shadow-lg"
              style={{ background: "rgba(255, 255, 255, 0.85)", border: "1.5px solid rgba(255, 255, 255, 0.9)" }}
            >
              <h3 className="font-black text-lg mb-3" style={{ fontFamily: "'Nunito', sans-serif", color: DARK }}>Respuesta rápida</h3>
              <div className="space-y-3">
                {[
                  { icon: Clock, text: "Respuesta en menos de 2 hrs hábiles" },
                  { icon: CheckCircle2, text: "Atención personalizada, no bots" },
                  { icon: Phone, text: "También puedes llamarnos directamente" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2.5 text-xs md:text-sm font-bold" style={{ color: DARK }}>
                    <Icon size={16} style={{ color: SKY, flexShrink: 0 }} />
                    {text}
                  </div>
                ))}
              </div>
            </div>

            <div
              className="rounded-3xl overflow-hidden backdrop-blur-md shadow-lg"
              style={{ background: "rgba(255, 255, 255, 0.85)", border: "1.5px solid rgba(255, 255, 255, 0.9)" }}
            >
              <div className="h-32 relative" style={{ background: GRAD_SOFT }}>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                  <MapPin size={28} style={{ color: ORANGE }} className="mb-1 drop-shadow-sm" />
                  <p className="font-black text-sm" style={{ color: DARK }}>Santiago, Chile</p>
                  <p className="text-xs font-semibold" style={{ color: "#4b5563" }}>Av. Providencia 1234</p>
                </div>
              </div>
              <div className="p-3" style={{ background: "rgba(245, 211, 24, 0.25)" }}>
                <p className="text-xs font-black text-center" style={{ color: DARK }}>Lun–Vie · 9:00–18:00 hrs</p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}