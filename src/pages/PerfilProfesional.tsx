import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Phone, Mail, MapPin, Briefcase, Power, Save,
  CheckCircle2, Sparkles, ArrowLeft, Pencil, X, Camera
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getSession } from "@/data/Api";

const PINK = "#e83360";

function extraerDatosCompletos(session: any) {
  if (!session) return { nombreCompleto: "", correo: "" };

  const nom = session.nombre || session.name || session.nombres || session.firstName || session.first_name || session.username || session.usuario || session.user?.nombre || session.user?.name || "";
  const ape = session.apellido || session.lastname || session.lastName || session.last_name || session.user?.apellido || "";

  let nombreCompleto = `${nom} ${ape}`.trim();
  const correo = session.correo || session.email || session.user?.correo || session.user?.email || session.sub || "";

  if (!nombreCompleto && correo.includes("@")) {
    nombreCompleto = correo.split("@")[0];
  }

  return { nombreCompleto, correo };
}

export default function PerfilProfesional() {
  const navigate = useNavigate();

  const [guardado, setGuardado] = useState(false);
  const [editando, setEditando] = useState(false);

  const fotoGuardada = localStorage.getItem("user_avatar") || "";

  const [perfil, setPerfil] = useState({
    nombre: "",
    especialidad: "Gasfiteria y Plomeria",
    telefono: "+56 9 1234 5678",
    correo: "",
    comuna: "La Florida, Santiago",
    disponible: true,
    foto: fotoGuardada,
  });

  useEffect(() => {
    const currentSession: any = getSession();
    if (!currentSession) {
      navigate("/login");
      return;
    }

    const { nombreCompleto, correo } = extraerDatosCompletos(currentSession);

    setPerfil((prev) => ({
      ...prev,
      nombre: nombreCompleto || prev.nombre || "Profesional",
      correo: correo || currentSession.correo || currentSession.email || prev.correo || "profesional@ejemplo.cl",
      especialidad: currentSession.especialidad || currentSession.user?.especialidad || prev.especialidad,
      telefono: currentSession.telefono || currentSession.user?.telefono || prev.telefono,
      comuna: currentSession.direccion || currentSession.comuna || prev.comuna,
    }));
  }, [navigate]);

  const handleChange = (field: string, value: any) => {
    setPerfil((prev) => ({ ...prev, [field]: value }));
  };

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const fotoBase64 = reader.result as string;
        handleChange("foto", fotoBase64);
        localStorage.setItem("user_avatar", fotoBase64);
      };
      reader.readAsDataURL(file);
    }
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
      direccion: perfil.comuna,
      especialidad: perfil.especialidad,
    };
    localStorage.setItem("session", JSON.stringify(nuevaSesion));

    setTimeout(() => {
      setGuardado(false);
      setEditando(false);
    }, 1500);
  };

  return (
    <div className="w-full min-h-screen py-12 px-4 flex justify-center items-center">
      <div className="max-w-4xl w-full mx-auto space-y-6">

        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-gray-800 hover:text-black transition-colors font-semibold bg-white/80 backdrop-blur-md px-4 py-2 rounded-full w-fit shadow-sm border border-white/50 text-sm cursor-pointer"
        >
          <ArrowLeft size={18} /> Volver al inicio
        </button>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white/95 backdrop-blur-md p-6 sm:p-8 rounded-3xl shadow-xl border border-white/50">
          <div className="flex flex-col sm:flex-row items-center gap-5">
            
            <div className="relative group">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-[#55bcd9] text-white flex items-center justify-center font-black text-3xl shadow-md border-4 border-white overflow-hidden">
                {perfil.foto ? (
                  <img src={perfil.foto} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  perfil.nombre ? perfil.nombre.charAt(0).toUpperCase() : "P"
                )}
              </div>

              <label
                htmlFor="foto-upload"
                className="absolute bottom-0 right-0 p-2 bg-[#e83360] text-white rounded-full shadow-md cursor-pointer hover:scale-105 transition-transform"
                title="Cambiar foto de perfil"
              >
                <Camera size={14} />
                <input
                  id="foto-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFotoChange}
                  className="hidden"
                />
              </label>
            </div>

            <div className="text-center sm:text-left space-y-1">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h1 className="text-2xl sm:text-3xl font-black text-gray-900">
                  {perfil.nombre || "Profesional"}
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
            className={`flex items-center justify-center gap-2.5 px-5 py-3 rounded-full font-bold text-sm transition-all shadow-md cursor-pointer ${perfil.disponible ? "bg-emerald-500 text-white" : "bg-gray-400 text-white"
              }`}
          >
            <Power size={18} />
            <span>{perfil.disponible ? "En Linea (Disponible)" : "Fuera de Servicio"}</span>
          </button>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 space-y-5 border border-gray-100">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <div>
              <h2 className="text-lg font-black text-gray-900">Informacion de Contacto Registrada</h2>
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
                  <Phone size={13} style={{ color: PINK }} /> Telefono (WhatsApp)
                </span>
                <p className="text-xs sm:text-sm font-bold text-gray-800">{perfil.telefono}</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                <span className="text-[11px] font-bold text-gray-400 uppercase flex items-center gap-1.5">
                  <Mail size={13} style={{ color: PINK }} /> Correo Electronico
                </span>
                <p className="text-xs sm:text-sm font-bold text-gray-800 truncate">{perfil.correo || "No especificado"}</p>
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
                  <Label className="text-xs font-bold text-gray-700">Telefono</Label>
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