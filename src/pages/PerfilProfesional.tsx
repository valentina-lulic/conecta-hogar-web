import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getSession } from "@/data/Api";

const PINK = "#e83360";

export default function PerfilProfesional() {
  const navigate = useNavigate();
  const [session] = useState(getSession());
  const [guardado, setGuardado] = useState(false);

  // Recupera la foto guardada en el navegador si existe
  const fotoGuardada = localStorage.getItem("user_avatar") || "";

  const [perfil, setPerfil] = useState({
    nombre: session?.name || "Juan Pérez",
    especialidad: "Gasfitería y Plomería",
    telefono: "+56 9 1234 5678",
    correo: "juan.perez@ejemplo.cl",
    comuna: "La Florida, Santiago",
    descripcion:
      "Más de 10 años de experiencia en reparación de fugas, instalación de calefón y mantención de tuberías en el hogar.",
    disponible: true,
    likes: 24,
    foto: fotoGuardada,
  });

  useEffect(() => {
    const currentSession = getSession();
    if (!currentSession) {
      navigate("/login");
    }
  }, [navigate]);

  const handleChange = (field: string, value: any) => {
    setPerfil((prev) => ({ ...prev, [field]: value }));
  };

  // 🟢 Manejo de selección de archivo de foto de perfil
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        handleChange("foto", base64String);
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
    }, 3000);
  };

  return (
    <div className="w-full min-h-screen py-12 px-4 flex justify-center items-center">
      <div className="max-w-4xl w-full mx-auto space-y-8">
        {/* Volver */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-gray-800 hover:text-black transition-colors font-semibold bg-white/80 backdrop-blur-md px-4 py-2 rounded-full w-fit shadow-sm border border-white/50 text-sm cursor-pointer"
        >
          <ArrowLeft size={18} />
          Volver al inicio
        </button>

        {/* Encabezado del Perfil */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white/95 backdrop-blur-md p-6 sm:p-8 rounded-3xl shadow-xl border border-white/50"
        >
          <div className="flex flex-col sm:flex-row items-center sm:items-start md:items-center gap-5">
            {/* 📸 FOTO DE PERFIL CON BOTÓN RÁPIDO */}
            <div className="relative group">
              <div className="w-24 h-24 rounded-2xl bg-[#55bcd9] text-white flex items-center justify-center font-black text-3xl shadow-inner overflow-hidden border-4 border-white">
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

              {/* Botón flotante para cambiar foto */}
              <label
                htmlFor="foto-input"
                className="absolute -bottom-2 -right-2 bg-[#e83360] text-white p-2.5 rounded-full shadow-lg cursor-pointer hover:bg-[#d42850] transition-transform hover:scale-110 flex items-center justify-center"
                title="Cambiar foto de perfil"
              >
                <Camera size={16} />
                <input
                  id="foto-input"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>

            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h1 className="text-2xl sm:text-3xl font-black text-gray-900">
                  {perfil.nombre}
                </h1>
                <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <Sparkles size={12} /> Profesional
                </span>
              </div>
              <p className="text-gray-500 font-medium text-sm mt-1">
                {perfil.especialidad}
              </p>
            </div>
          </div>

          {/* Estado de Disponibilidad */}
          <button
            type="button"
            onClick={() => handleChange("disponible", !perfil.disponible)}
            className={`flex items-center justify-center gap-2.5 px-5 py-3 rounded-full font-bold text-sm transition-all shadow-md cursor-pointer ${
              perfil.disponible
                ? "bg-emerald-500 text-white hover:bg-emerald-600"
                : "bg-gray-400 text-white hover:bg-gray-500"
            }`}
          >
            <Power size={18} />
            <span>{perfil.disponible ? "En Línea (Disponible)" : "Fuera de Servicio"}</span>
          </button>
        </motion.div>

        {/* Reputación / Métricas */}
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

        {/* Formulario de Edición */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleGuardar}
          className="bg-white rounded-3xl shadow-2xl p-6 sm:p-10 space-y-6"
        >
          <div className="border-b border-gray-100 pb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800">
              Editar mi Información Pública
            </h2>
            {guardado && (
              <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                <CheckCircle2 size={16} /> ¡Cambios guardados!
              </span>
            )}
          </div>

          {/* 🖼️ SECCIÓN DE SUBIDA / URL DE FOTO */}
          <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <Label className="text-gray-800 font-semibold flex items-center gap-2 text-sm">
              <Camera size={18} style={{ color: PINK }} />
              Foto de perfil
            </Label>
            
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
              <label
                htmlFor="foto-input-form"
                className="flex items-center justify-center gap-2 bg-white border-2 border-dashed border-gray-300 hover:border-[#e83360] px-4 py-2.5 rounded-xl cursor-pointer text-xs font-bold text-gray-700 transition-colors"
              >
                <Upload size={16} /> Subir desde PC
                <input
                  id="foto-input-form"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>

              <span className="text-xs text-gray-400 text-center sm:text-left">o ingresar URL:</span>

              <Input
                type="url"
                placeholder="https://ejemplo.com/mi-foto.jpg"
                value={perfil.foto.startsWith("data:") ? "" : perfil.foto}
                onChange={(e) => handleChange("foto", e.target.value)}
                className="bg-white border-2 border-gray-200 focus:border-[#55bcd9] text-xs flex-1"
              />
            </div>
          </div>

          {/* Resto de campos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-gray-700 font-semibold flex items-center gap-2 text-sm">
                <Briefcase size={16} style={{ color: PINK }} />
                Especialidad Principal
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
                Teléfono de Contacto (WhatsApp)
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
                Comuna de Cobertura
              </Label>
              <Input
                type="text"
                value={perfil.comuna}
                onChange={(e) => handleChange("comuna", e.target.value)}
                className="border-2 border-gray-200 focus:border-[#55bcd9]"
              />
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <Label className="text-gray-700 font-semibold text-sm">
              Presentación de tus Servicios (Biografía)
            </Label>
            <textarea
              rows={4}
              value={perfil.descripcion}
              onChange={(e) => handleChange("descripcion", e.target.value)}
              className="w-full border-2 border-gray-200 focus:border-[#55bcd9] rounded-xl p-3 text-sm text-gray-800 outline-none transition-colors"
              placeholder="Describe tu trabajo y garantías..."
            />
          </div>

          <div className="pt-4 flex justify-end">
            <Button
              type="submit"
              className="px-8 py-6 text-base font-bold text-white rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center gap-2"
              style={{ background: `linear-gradient(135deg, ${PINK} 0%, #d42850 100%)` }}
            >
              <Save size={18} />
              Guardar Perfil
            </Button>
          </div>
        </motion.form>
      </div>
    </div>
  );
}