import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import {
  Phone, Mail, MapPin, Briefcase, Power, Save,
  CheckCircle2, Sparkles, ArrowLeft, Pencil, X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getSession } from "@/data/Api";

const PINK = "#e83360";

export default function PerfilProfesional() {
  const navigate = useNavigate();
  const location = useLocation();

  const [guardado, setGuardado] = useState(false);
  const [editando, setEditando] = useState(false);
  const [mostrarBienvenida, setMostrarBienvenida] = useState(location.state?.welcome || false);

  const fotoGuardada = localStorage.getItem("user_avatar") || "";

  const [perfil, setPerfil] = useState({
    nombre: "",
    apellido: "",
    especialidad: "Gasfitería y Plomería",
    telefono: "+56 9 1234 5678",
    correo: "profesional@ejemplo.cl",
    comuna: "La Florida, Santiago",
    descripcion: "",
    disponible: true,
    likes: 24,
    foto: fotoGuardada,
  });

  useEffect(() => {
    const currentSession: any = getSession();
    if (!currentSession) {
      navigate("/login");
      return;
    }

    const nombreReal = currentSession.nombre || currentSession.name || currentSession.user?.nombre || "Profesional";
    const apellidoReal = currentSession.apellido || currentSession.user?.apellido || "";

    setPerfil((prev) => ({
      ...prev,
      nombre: `${nombreReal} ${apellidoReal}`.trim(),
      especialidad: currentSession.especialidad || currentSession.user?.especialidad || prev.especialidad,
      telefono: currentSession.telefono || currentSession.user?.telefono || prev.telefono,
      correo: currentSession.correo || currentSession.email || currentSession.user?.correo || prev.correo,
      comuna: currentSession.direccion || currentSession.comuna || prev.comuna,
    }));

    let timer: ReturnType<typeof setTimeout> | undefined;

    if (location.state?.welcome) {
      timer = setTimeout(() => {
        setMostrarBienvenida(false);
      }, 4000);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [navigate, location.state]);

  const handleChange = (field: string, value: any) => {
    setPerfil((prev) => ({ ...prev, [field]: value }));
  };

  const handleGuardar = async (e: React.FormEvent) => {
    e.preventDefault();
    setGuardado(true);

    const sessionActual: any = getSession() || {};
    const nuevaSesion = {
      ...sessionActual,
      nombre: perfil.nombre,
      telefono: perfil.telefono,
      correo: perfil.correo,
      email: perfil.correo,
      direccion: perfil.comuna,
      especialidad: perfil.especialidad,
    };
    localStorage.setItem("session", JSON.stringify(nuevaSesion));

    try {
      await fetch("http://localhost:8080/profesionales/actualizar", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(perfil),
      });
    } catch (err) {
      console.warn("Backend no disponible, datos actualizados en sesión local.", err);
    }

    setTimeout(() => {
      setGuardado(false);
      setEditando(false);
    }, 1500);
  };

  const esUsuarioNuevo = location.state?.isNewUser;

  return (
    <div className="w-full min-h-screen py-12 px-4 flex justify-center items-center">
      <div className="max-w-4xl w-full mx-auto space-y-6">

        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-gray-800 hover:text-black transition-colors font-semibold bg-white/80 backdrop-blur-md px-4 py-2 rounded-full w-fit shadow-sm border border-white/50 text-sm cursor-pointer"
        >
          <ArrowLeft size={18} /> Volver al inicio
        </button>

        {mostrarBienvenida && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 rounded-2xl bg-emerald-500 text-white font-bold text-sm flex items-center justify-between shadow-lg"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 size={18} />
              {esUsuarioNuevo
                ? `¡Bienvenido(a) a Conecta Hogar, ${perfil.nombre}! 🎉`
                : `¡Bienvenido(a) de nuevo, ${perfil.nombre}! 👋`}
            </div>
            <button
              onClick={() => setMostrarBienvenida(false)}
              className="text-xs underline cursor-pointer"
            >
              Cerrar
            </button>
          </motion.div>
        )}

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white/95 backdrop-blur-md p-6 sm:p-8 rounded-3xl shadow-xl border border-white/50">
          <div className="flex flex-col sm:flex-row items-center gap-5">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-[#55bcd9] text-white flex items-center justify-center font-black text-3xl shadow-md border-4 border-white">
              {perfil.nombre ? perfil.nombre.charAt(0).toUpperCase() : "P"}
            </div>

            <div className="text-center sm:text-left space-y-1">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h1 className="text-2xl sm:text-3xl font-black text-gray-900">
                  {perfil.nombre || "Cargando..."}
                </h1>
                <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <Sparkles size={12} /> Profesional
                </span>
              </div>
              <p className="text-gray-500 font-medium text-sm">{perfil.especialidad}</p>
            </div>
          </div>

          <button
            onClick={() => handleChange("disponible", !perfil.disponible)}
            className={`flex items-center justify-center gap-2.5 px-5 py-3 rounded-full font-bold text-sm transition-all shadow-md cursor-pointer ${
              perfil.disponible ? "bg-emerald-500 text-white" : "bg-gray-400 text-white"
            }`}
          >
            <Power size={18} />
            <span>{perfil.disponible ? "En Línea (Disponible)" : "Fuera de Servicio"}</span>
          </button>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 space-y-5 border border-gray-100">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <div>
              <h2 className="text-lg font-black text-gray-900">Información de Contacto Registrada</h2>
              <p className="text-xs text-gray-500">Datos visibles para los clientes que te contacten.</p>
            </div>
            <Button
              onClick={() => setEditando(!editando)}
              variant="outline"
              className="text-xs font-bold rounded-full border-gray-200 hover:border-[#e83360] hover:text-[#e83360] flex items-center gap-2"
            >
              {editando ? <X size={14} /> : <Pencil size={14} />}
              {editando ? "Cancelar" : "Editar Datos"}
            </Button>
          </div>

          {!editando ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                <span className="text-[11px] font-bold text-gray-400 uppercase flex items-center gap-1.5">
                  <Briefcase size={13} style={{ color: PINK }} /> Especialidad
                </span>
                <p className="text-xs sm:text-sm font-bold text-gray-800">{perfil.especialidad}</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                <span className="text-[11px] font-bold text-gray-400 uppercase flex items-center gap-1.5">
                  <Phone size={13} style={{ color: PINK }} /> Teléfono (WhatsApp)
                </span>
                <p className="text-xs sm:text-sm font-bold text-gray-800">{perfil.telefono}</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                <span className="text-[11px] font-bold text-gray-400 uppercase flex items-center gap-1.5">
                  <Mail size={13} style={{ color: PINK }} /> Correo Electrónico
                </span>
                <p className="text-xs sm:text-sm font-bold text-gray-800 truncate">{perfil.correo}</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                <span className="text-[11px] font-bold text-gray-400 uppercase flex items-center gap-1.5">
                  <MapPin size={13} style={{ color: PINK }} /> Comuna de Cobertura
                </span>
                <p className="text-xs sm:text-sm font-bold text-gray-800 truncate">{perfil.comuna}</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleGuardar} className="space-y-4 pt-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label className="text-xs font-bold text-gray-700">Nombre Completo</Label>
                  <Input
                    value={perfil.nombre}
                    onChange={(e) => handleChange("nombre", e.target.value)}
                    className="rounded-xl border-gray-200"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs font-bold text-gray-700">Especialidad</Label>
                  <Input
                    value={perfil.especialidad}
                    onChange={(e) => handleChange("especialidad", e.target.value)}
                    className="rounded-xl border-gray-200"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs font-bold text-gray-700">Teléfono</Label>
                  <Input
                    value={perfil.telefono}
                    onChange={(e) => handleChange("telefono", e.target.value)}
                    className="rounded-xl border-gray-200"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs font-bold text-gray-700">Comuna</Label>
                  <Input
                    value={perfil.comuna}
                    onChange={(e) => handleChange("comuna", e.target.value)}
                    className="rounded-xl border-gray-200"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                {guardado && (
                  <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                    <CheckCircle2 size={16} /> ¡Datos guardados!
                  </span>
                )}
                <Button
                  type="submit"
                  className="ml-auto px-6 py-2.5 text-xs font-bold text-white rounded-xl shadow-md cursor-pointer flex items-center gap-2"
                  style={{ background: PINK }}
                >
                  <Save size={16} /> Guardar Cambios
                </Button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}