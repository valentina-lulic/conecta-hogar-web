import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import {
  User,
  Phone,
  Mail,
  MapPin,
  Briefcase,
  ThumbsUp,
  Power,
  Save,
  CheckCircle2,
  Sparkles,
  ArrowLeft,
  Camera,
  Pencil,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getSession } from "@/data/Api";

const PINK = "#e83360";

export default function PerfilProfesional() {
  const navigate = useNavigate();
  const location = useLocation();

  const [session, setSession] = useState<any>(getSession());
  const [guardado, setGuardado] = useState(false);
  const [editando, setEditando] = useState(false);

  const [mostrarBienvenida, setMostrarBienvenida] = useState(
    location.state?.welcome || false
  );

  const fotoGuardada = localStorage.getItem("user_avatar") || "";

  const obtenerNombreSesion = (s: any) =>
    s?.nombre || s?.name || s?.user?.nombre || "Profesional";

  const [perfil, setPerfil] = useState({
    nombre: obtenerNombreSesion(session),
    especialidad: session?.especialidad || session?.user?.especialidad || "Gasfitería y Plomería",
    telefono: session?.telefono || session?.user?.telefono || "+56 9 1234 5678",
    correo: session?.correo || session?.email || session?.user?.correo || "profesional@ejemplo.cl",
    comuna: session?.comuna || session?.direccion || "La Florida, Santiago",
    descripcion:
      session?.descripcion ||
      "Más de 10 años de experiencia en reparación de fugas, instalación de calefón y mantención de tuberías en el hogar.",
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
    setSession(currentSession);

    const nombreReal = obtenerNombreSesion(currentSession);
    setPerfil((prev) => ({
      ...prev,
      nombre: nombreReal,
      especialidad: currentSession?.especialidad || currentSession?.user?.especialidad || prev.especialidad,
      telefono: currentSession?.telefono || currentSession?.user?.telefono || prev.telefono,
      correo: currentSession?.correo || currentSession?.email || currentSession?.user?.correo || prev.correo,
      comuna: currentSession?.comuna || currentSession?.direccion || prev.comuna,
    }));

    if (location.state?.welcome) {
      const timer = setTimeout(() => {
        setMostrarBienvenida(false);
      }, 4000);
      return () => clearTimeout(timer);
    }

    return () => {};
  }, [navigate, location.state]);

  const handleChange = (field: string, value: any) => {
    setPerfil((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        handleChange("foto", base64String);
        localStorage.setItem("user_avatar", base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGuardar = (e: React.FormEvent) => {
    e.preventDefault();
    setGuardado(true);

    if (perfil.foto) {
      localStorage.setItem("user_avatar", perfil.foto);
    }

    setTimeout(() => {
      setGuardado(false);
      setEditando(false);
    }, 2000);
  };

  return (
    <div className="w-full min-h-screen py-12 px-4 flex justify-center items-center">
      <div className="max-w-4xl w-full mx-auto space-y-6">
        
        {/* Volver */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-gray-800 hover:text-black transition-colors font-semibold bg-white/80 backdrop-blur-md px-4 py-2 rounded-full w-fit shadow-sm border border-white/50 text-sm cursor-pointer"
        >
          <ArrowLeft size={18} />
          Volver al inicio
        </button>

        {/* Banner de bienvenida temporal */}
        {mostrarBienvenida && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 rounded-2xl bg-emerald-500 text-white font-bold text-sm flex items-center justify-between shadow-lg"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 size={18} />
              {location.state?.message || "¡Bienvenido(a) a Conecta Hogar!"}
            </div>
            <button
              type="button"
              onClick={() => setMostrarBienvenida(false)}
              className="text-xs underline hover:opacity-80 cursor-pointer"
            >
              Cerrar
            </button>
          </motion.div>
        )}

        {/* Panel Principal con Foto */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white/95 backdrop-blur-md p-6 sm:p-8 rounded-3xl shadow-xl border border-white/50"
        >
          <div className="flex flex-col sm:flex-row items-center sm:items-start md:items-center gap-5">
            <div className="relative group shrink-0">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-[#55bcd9] text-white flex items-center justify-center font-black text-3xl shadow-md overflow-hidden border-4 border-white">
                {perfil.foto ? (
                  <img
                    src={perfil.foto}
                    alt={perfil.nombre}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  perfil.nombre.charAt(0).toUpperCase()
                )}
              </div>

              <label
                htmlFor="foto-input-main"
                className="absolute -bottom-2 -right-2 bg-[#e83360] text-white p-2.5 rounded-full shadow-lg cursor-pointer hover:bg-[#d42850] transition-all hover:scale-110 flex items-center justify-center"
                title="Cambiar foto de perfil"
              >
                <Camera size={18} />
                <input
                  id="foto-input-main"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>

            <div className="text-center sm:text-left space-y-1">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h1 className="text-2xl sm:text-3xl font-black text-gray-900">
                  {perfil.nombre}
                </h1>
                <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <Sparkles size={12} /> Profesional
                </span>
              </div>
              <p className="text-gray-500 font-medium text-sm">
                {perfil.especialidad}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => handleChange("disponible", !perfil.disponible)}
            className={`flex items-center justify-center gap-2.5 px-5 py-3 rounded-full font-bold text-sm transition-all shadow-md cursor-pointer shrink-0 ${
              perfil.disponible
                ? "bg-emerald-500 text-white hover:bg-emerald-600"
                : "bg-gray-400 text-white hover:bg-gray-500"
            }`}
          >
            <Power size={18} />
            <span>{perfil.disponible ? "En Línea (Disponible)" : "Fuera de Servicio"}</span>
          </button>
        </motion.div>

        {/* Métricas */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl shadow-lg border border-slate-100 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-sky-50 text-sky-600">
              <ThumbsUp size={24} />
            </div>
            <div>
              <p className="text-2xl font-black text-slate-900">{perfil.likes}</p>
              <p className="text-xs text-slate-500 font-medium">Reacciones Positivas</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-lg border border-slate-100 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600">
              <Power size={24} />
            </div>
            <div>
              <p className="text-lg font-black text-slate-900">
                {perfil.disponible ? "Visible" : "Oculto"}
              </p>
              <p className="text-xs text-slate-500 font-medium">Estado en Buscador</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-lg border border-slate-100 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-pink-50 text-pink-600">
              <User size={24} />
            </div>
            <div>
              <p className="text-lg font-black text-slate-900">Verificado</p>
              <p className="text-xs text-slate-500 font-medium">Nivel de Cuenta</p>
            </div>
          </div>
        </div>

        {/* Información Registrada */}
        <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 space-y-5 border border-gray-100">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <div>
              <h2 className="text-lg font-black text-gray-900">
                Información de Contacto Registrada
              </h2>
              <p className="text-xs text-gray-500">
                Estos son los datos visibles para los clientes que te contacten.
              </p>
            </div>

            <Button
              type="button"
              onClick={() => setEditando(!editando)}
              variant="outline"
              className="text-xs font-bold rounded-full border-gray-200 hover:border-[#e83360] hover:text-[#e83360] flex items-center gap-2 cursor-pointer"
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
                <p className="text-xs sm:text-sm font-bold text-gray-800">
                  {perfil.especialidad}
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                <span className="text-[11px] font-bold text-gray-400 uppercase flex items-center gap-1.5">
                  <Phone size={13} style={{ color: PINK }} /> Teléfono (WhatsApp)
                </span>
                <p className="text-xs sm:text-sm font-bold text-gray-800">
                  {perfil.telefono}
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                <span className="text-[11px] font-bold text-gray-400 uppercase flex items-center gap-1.5">
                  <Mail size={13} style={{ color: PINK }} /> Correo Electrónico
                </span>
                <p className="text-xs sm:text-sm font-bold text-gray-800 truncate">
                  {perfil.correo}
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                <span className="text-[11px] font-bold text-gray-400 uppercase flex items-center gap-1.5">
                  <MapPin size={13} style={{ color: PINK }} /> Comuna de Cobertura
                </span>
                <p className="text-xs sm:text-sm font-bold text-gray-800 truncate">
                  {perfil.comuna}
                </p>
              </div>
            </div>
          ) : (
            <motion.form
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              onSubmit={handleGuardar}
              className="space-y-6 pt-2"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-gray-700 font-semibold flex items-center gap-2 text-sm">
                    <Briefcase size={16} style={{ color: PINK }} />
                    Especialidad
                  </Label>
                  <Input
                    type="text"
                    value={perfil.especialidad}
                    onChange={(e) => handleChange("especialidad", e.target.value)}
                    className="border-2 border-gray-200 focus:border-[#55bcd9]"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-700 font-semibold flex items-center gap-2 text-sm">
                    <Phone size={16} style={{ color: PINK }} />
                    Teléfono (WhatsApp)
                  </Label>
                  <Input
                    type="text"
                    value={perfil.telefono}
                    onChange={(e) => handleChange("telefono", e.target.value)}
                    className="border-2 border-gray-200 focus:border-[#55bcd9]"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-700 font-semibold flex items-center gap-2 text-sm">
                    <Mail size={16} style={{ color: PINK }} />
                    Correo Electrónico
                  </Label>
                  <Input
                    type="email"
                    value={perfil.correo}
                    onChange={(e) => handleChange("correo", e.target.value)}
                    className="border-2 border-gray-200 focus:border-[#55bcd9]"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-700 font-semibold flex items-center gap-2 text-sm">
                    <MapPin size={16} style={{ color: PINK }} />
                    Comuna
                  </Label>
                  <Input
                    type="text"
                    value={perfil.comuna}
                    onChange={(e) => handleChange("comuna", e.target.value)}
                    className="border-2 border-gray-200 focus:border-[#55bcd9]"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                {guardado && (
                  <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                    <CheckCircle2 size={16} /> ¡Cambios guardados!
                  </span>
                )}
                <Button
                  type="submit"
                  className="ml-auto px-6 py-2.5 text-xs font-bold text-white rounded-xl shadow-md cursor-pointer flex items-center gap-2"
                  style={{ background: `linear-gradient(135deg, ${PINK} 0%, #d42850 100%)` }}
                >
                  <Save size={16} /> Guardar Cambios
                </Button>
              </div>
            </motion.form>
          )}
        </div>

      </div>
    </div>
  );
}