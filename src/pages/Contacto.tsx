import { useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";

const PINK = "#e83360";
const YELLOW = "#f5d318";
const ORANGE = "#f97316";
const SKY = "#55bcd9";
const DARK = "#0a6880";

const GRAD_SOFT = `linear-gradient(135deg, ${PINK}18 0%, ${YELLOW}18 50%, ${SKY}18 100%)`;

const contactInfo = [
  { icon: Phone, label: "TELÉFONO", value: "+56 2 2345 6789" },
  { icon: Mail, label: "EMAIL", value: "hola@conectahogar.cl" },
  { icon: MapPin, label: "OFICINA", value: "Av. Providencia 1234, Santiago" },
  { icon: Clock, label: "ATENCIÓN", value: "Lun–Vie 9:00–18:00 hrs" },
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
    border: `2px solid ${focused === name ? ORANGE : "#e2e8f0"}`,
    outline: "none",
    background: "#ffffff",
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
    <div className="relative w-full min-h-screen bg-transparent">
      {/* ── 1. HERO (Estructura extraída de Garantia.tsx) ── */}
      <section
        className="w-full -mt-20 md:-mt-24 pt-32 md:pt-36 pb-28 px-4 md:px-10 relative overflow-hidden text-center"
        style={{
          background:
            "linear-gradient(90deg, rgba(245, 211, 24, 0.85) 0%, rgba(249, 115, 22, 0.80) 50%, rgba(232, 51, 96, 0.85) 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 75%, transparent 100%)",
          maskImage: "linear-gradient(to bottom, black 75%, transparent 100%)",
        }}
      >
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Ícono contenedor estilo Garantia */}
            <div
              className="inline-flex items-center justify-center w-20 h-20 rounded-3xl mb-6 shadow-lg"
              style={{
                background: "rgba(255,255,255,0.25)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.4)",
              }}
            >
              <Mail size={40} className="text-white" />
            </div>

            {/* Título */}
            <h1
              className="text-4xl md:text-6xl font-extrabold text-white mb-5"
              style={{ textShadow: "0 4px 20px rgba(0,0,0,0.3)" }}
            >
              Contáctanos
            </h1>

            {/* Subtítulo */}
            <p
              className="text-base md:text-lg text-white/95 leading-relaxed max-w-xl mx-auto mb-10 font-extralight"
              style={{ textShadow: "0 2px 10px rgba(0,0,0,0.3)" }}
            >
              Estamos aquí para ayudarte. Cuéntanos qué necesitas y te respondemos en menos de 2 horas hábiles.
            </p>
          </motion.div>

          {/* Tarjetas de contacto (Intactas dentro de la estructura visual del Hero) */}
          <div className="w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
            {contactInfo.map(({ icon: Icon, label, value }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="bg-white rounded-2xl p-5 text-center shadow-xl border border-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl flex flex-col items-center justify-center"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-2.5 shadow-sm"
                  style={{ background: `${ORANGE}15` }}
                >
                  <Icon size={20} style={{ color: ORANGE }} />
                </div>

                <p
                  className="text-[11px] md:text-xs font-black uppercase tracking-wider mb-1"
                  style={{ color: DARK }}
                >
                  {label}
                </p>

                <p className="text-xs md:text-sm font-bold leading-snug" style={{ color: DARK }}>
                  {value}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. SECCIÓN DEL FORMULARIO ── */}
      <section className="relative z-20 px-4 md:px-10 -mt-10 md:-mt-12">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">

          {/* Caja Formulario Principal */}
          <div className="md:col-span-3 p-6 md:p-8 rounded-3xl bg-white shadow-xl border border-gray-100">
            <p className="text-xs font-black tracking-widest uppercase mb-2" style={{ color: ORANGE }}>
              Escríbenos
            </p>
            <h2
              className="text-2xl md:text-3xl font-black mb-6"
              style={{ fontFamily: "'Poppins', 'Nunito', sans-serif", color: DARK }}
            >
              Envíanos un mensaje
            </h2>

            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-2xl p-10 text-center border-2 bg-white"
                style={{ borderColor: `${SKY}40` }}
              >
                <CheckCircle2 size={56} className="mx-auto mb-4" style={{ color: SKY }} />
                <h3 className="font-black text-xl mb-2" style={{ fontFamily: "'Poppins', sans-serif", color: DARK }}>
                  ¡Mensaje enviado!
                </h3>
                <p className="text-sm text-gray-600">
                  Te responderemos en menos de 2 horas hábiles a <strong>{form.email}</strong>
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-6 px-8 py-3.5 rounded-full font-black text-sm text-white transition-all shadow-md hover:opacity-90"
                  style={{ background: ORANGE }}
                >
                  Enviar otro mensaje
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black mb-1.5" style={{ color: DARK }}>
                      Nombre completo *
                    </label>
                    <input
                      name="nombre"
                      required
                      value={form.nombre}
                      onChange={handleChange}
                      onFocus={() => setFocused("nombre")}
                      onBlur={() => setFocused(null)}
                      placeholder="Tu nombre"
                      style={inputStyle("nombre")}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black mb-1.5" style={{ color: DARK }}>
                      Email *
                    </label>
                    <input
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      onFocus={() => setFocused("email")}
                      onBlur={() => setFocused(null)}
                      placeholder="tu@email.com"
                      style={inputStyle("email")}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black mb-1.5" style={{ color: DARK }}>
                      Teléfono
                    </label>
                    <input
                      name="telefono"
                      value={form.telefono}
                      onChange={handleChange}
                      onFocus={() => setFocused("telefono")}
                      onBlur={() => setFocused(null)}
                      placeholder="+56 9 1234 5678"
                      style={inputStyle("telefono")}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black mb-1.5" style={{ color: DARK }}>
                      Motivo *
                    </label>
                    <select
                      name="razon"
                      required
                      value={form.razon}
                      onChange={handleChange}
                      onFocus={() => setFocused("razon")}
                      onBlur={() => setFocused(null)}
                      style={{ ...inputStyle("razon"), appearance: "auto" }}
                    >
                      <option value="">Selecciona un motivo</option>
                      {reasons.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black mb-1.5" style={{ color: DARK }}>
                    Mensaje *
                  </label>
                  <textarea
                    name="mensaje"
                    required
                    rows={4}
                    value={form.mensaje}
                    onChange={handleChange}
                    onFocus={() => setFocused("mensaje")}
                    onBlur={() => setFocused(null)}
                    placeholder="Cuéntanos en qué podemos ayudarte..."
                    style={{ ...inputStyle("mensaje"), resize: "vertical" }}
                  />
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

          {/* Lateral Informativo */}
          <div className="md:col-span-2 space-y-5">
            <div className="rounded-3xl p-6 bg-white shadow-lg border border-gray-100">
              <h3 className="font-black text-lg mb-2" style={{ fontFamily: "'Poppins', sans-serif", color: DARK }}>
                ¿Eres profesional?
              </h3>
              <p className="text-xs md:text-sm font-medium leading-relaxed mb-4 text-gray-600">
                ¿Quieres ofrecer tus servicios en nuestra plataforma? Regístrate gratis y comienza a recibir clientes hoy.
              </p>
              <Link
                to="/registro"
                className="inline-flex items-center gap-1 text-sm font-black hover:opacity-80 transition-opacity"
                style={{ color: ORANGE }}
              >
                Registrarme →
              </Link>
            </div>

            <div className="rounded-3xl p-6 bg-white shadow-lg border border-gray-100">
              <h3 className="font-black text-lg mb-3" style={{ fontFamily: "'Poppins', sans-serif", color: DARK }}>
                Respuesta rápida
              </h3>
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

            <div className="rounded-3xl overflow-hidden bg-white shadow-lg border border-gray-100">
              <div className="h-32 relative" style={{ background: GRAD_SOFT }}>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                  <MapPin size={28} style={{ color: ORANGE }} className="mb-1 drop-shadow-sm" />
                  <p className="font-black text-sm" style={{ color: DARK }}>
                    Santiago, Chile
                  </p>
                  <p className="text-xs font-medium text-gray-600">Av. Providencia 1234</p>
                </div>
              </div>
              <div className="p-3 bg-amber-50">
                <p className="text-xs font-black text-center" style={{ color: DARK }}>
                  Lun–Vie · 9:00–18:00 hrs
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}

export default Contacto;