import { useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";

const PINK = "#e83360";
const YELLOW = "#f5d318";
const SKY = "#55bcd9";
const DARK = "#0a6880";
const GRAD_HERO = `linear-gradient(135deg, ${PINK}ee 0%, ${YELLOW}dd 48%, ${SKY}ee 100%)`;
const GRAD_SOFT = `linear-gradient(135deg, ${PINK}18 0%, ${YELLOW}18 50%, ${SKY}18 100%)`;

const contactInfo = [
  { icon: Phone, color: PINK, label: "Teléfono", value: "+56 2 2345 6789" },
  { icon: Mail, color: SKY, label: "Email", value: "hola@conectahogar.cl" },
  { icon: MapPin, color: YELLOW, label: "Oficina", value: "Av. Providencia 1234, Santiago" },
  { icon: Clock, color: PINK, label: "Atención", value: "Lun–Vie 9:00–18:00 hrs" },
];

const reasons = ["Solicitar un servicio", "Ser profesional de la plataforma", "Soporte técnico", "Consulta comercial", "Otro"];

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
    border: `2px solid ${focused === name ? PINK : "#e5e7eb"}`,
    outline: "none",
    background: "white",
    borderRadius: "0.75rem",
    padding: "0.875rem 1rem",
    width: "100%",
    fontSize: "0.875rem",
    fontWeight: 600,
    color: DARK,
    fontFamily: "'Nunito Sans', sans-serif",
    boxShadow: focused === name ? `0 0 0 4px ${PINK}18` : "none",
    transition: "all 0.2s",
  });

  return (
    <div style={{ background: GRAD_HERO }}>

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="px-4 md:px-10 pt-16 pb-20 text-center">
        <div className="max-w-2xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl mb-6"
              style={{ background: "rgba(255,255,255,0.25)", backdropFilter: "blur(8px)" }}>
              <Mail size={40} className="text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-5"
              style={{ fontFamily: "'Nunito', sans-serif", textShadow: "0 2px 20px rgba(0,0,0,0.15)" }}>
              Contáctanos
            </h1>
            <p className="text-lg text-white/85 leading-relaxed">
              Estamos aquí para ayudarte. Cuéntanos qué necesitas y te respondemos en menos de 2 horas hábiles.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Contact info cards ────────────────────────────── */}
      <section className="px-4 md:px-10 pb-16">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {contactInfo.map(({ icon: Icon, color, label, value }, i) => (
            <motion.div key={label}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="rounded-2xl p-4 text-center backdrop-blur-sm"
              style={{ background: "rgba(255,255,255,0.2)", border: "1.5px solid rgba(255,255,255,0.3)" }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2" style={{ background: "rgba(255,255,255,0.25)" }}>
                <Icon size={18} style={{ color: color }} />
              </div>
              <p className="text-xs font-black text-white/60 uppercase tracking-wide mb-0.5">{label}</p>
              <p className="text-xs font-bold text-white leading-snug">{value}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Form + sidebar ────────────────────────────────── */}
      <section className="py-16 px-4 md:px-10" style={{ background: "rgba(255,255,255,0.95)" }}>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10">

          {/* Form */}
          <div className="md:col-span-3">
            <p className="text-xs font-black tracking-widest uppercase mb-2" style={{ color: PINK }}>Escríbenos</p>
            <h2 className="text-2xl md:text-3xl font-black mb-8" style={{ fontFamily: "'Nunito', sans-serif", color: DARK }}>
              Envíanos un mensaje
            </h2>

            {sent ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                className="rounded-2xl p-10 text-center border-2" style={{ borderColor: `${SKY}40`, background: `${SKY}0c` }}>
                <CheckCircle2 size={56} className="mx-auto mb-4" style={{ color: SKY }} />
                <h3 className="font-black text-xl mb-2" style={{ fontFamily: "'Nunito', sans-serif", color: DARK }}>¡Mensaje enviado!</h3>
                <p className="text-sm" style={{ color: "#6b7280" }}>Te responderemos en menos de 2 horas hábiles a <strong>{form.email}</strong></p>
                <button onClick={() => setSent(false)}
                  className="mt-6 px-6 py-2.5 rounded-xl font-black text-sm text-white"
                  style={{ background: PINK }}>
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
                  <textarea name="mensaje" required rows={5} value={form.mensaje} onChange={handleChange}
                    onFocus={() => setFocused("mensaje")} onBlur={() => setFocused(null)}
                    placeholder="Cuéntanos en qué podemos ayudarte..."
                    style={{ ...inputStyle("mensaje"), resize: "vertical" }} />
                </div>

                <motion.button type="submit" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  className="w-full py-4 rounded-xl font-black text-sm text-white inline-flex items-center justify-center gap-2 shadow-lg"
                  style={{ background: PINK, boxShadow: `0 8px 24px ${PINK}40` }}>
                  <Send size={16} /> Enviar mensaje
                </motion.button>
              </form>
            )}
          </div>

          {/* Sidebar */}
          <div className="md:col-span-2 space-y-5">
            <div className="rounded-2xl p-6 border-2" style={{ borderColor: `${PINK}30`, background: `${PINK}08` }}>
              <h3 className="font-black text-lg mb-3" style={{ fontFamily: "'Nunito', sans-serif", color: DARK }}>¿Eres profesional?</h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "#6b7280" }}>
                ¿Quieres ofrecer tus servicios en nuestra plataforma? Regístrate gratis y comienza a recibir clientes hoy.
              </p>
              <Link to="/garantia"
                className="inline-flex items-center gap-1 text-sm font-black hover:opacity-70 transition-opacity"
                style={{ color: PINK }}>
                Registrarme →
              </Link>
            </div>

            <div className="rounded-2xl p-6 border-2" style={{ borderColor: `${SKY}30`, background: `${SKY}08` }}>
              <h3 className="font-black text-lg mb-3" style={{ fontFamily: "'Nunito', sans-serif", color: DARK }}>Respuesta rápida</h3>
              <div className="space-y-2">
                {[
                  { icon: Clock, text: "Respuesta en menos de 2 hrs hábiles" },
                  { icon: CheckCircle2, text: "Atención personalizada, no bots" },
                  { icon: Phone, text: "También puedes llamarnos directamente" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2 text-sm font-semibold" style={{ color: "#374151" }}>
                    <Icon size={14} style={{ color: SKY, flexShrink: 0 }} />
                    {text}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border-2" style={{ borderColor: `${YELLOW}30` }}>
              <div className="h-40 relative" style={{ background: GRAD_SOFT, backgroundColor: "white" }}>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                  <MapPin size={28} style={{ color: PINK }} className="mb-2" />
                  <p className="font-black text-sm" style={{ color: DARK }}>Santiago, Chile</p>
                  <p className="text-xs font-semibold" style={{ color: "#6b7280" }}>Av. Providencia 1234</p>
                </div>
              </div>
              <div className="p-4" style={{ background: `${YELLOW}18` }}>
                <p className="text-xs font-bold text-center" style={{ color: DARK }}>Lun–Vie · 9:00–18:00 hrs</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
