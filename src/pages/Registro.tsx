import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, UserCircle, Mail, Lock, IdCard, Briefcase, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

import { registrarUsuario, type RegistroData } from "../data/registroApi";

const PINK = "#e83360";

const ESPECIALIDADES = [
  "Gasfitería",
  "Electricidad",
  "Albañilería",
  "Control de Plagas",
  "Carpintería",
  "Techado",
  "Pintura",
  "Cerrajería",
];

export function Registro() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    nombre: "",
    rut: "",
    correo: "",
    password: "",
    tipoUsuario: "" as "cliente" | "profesional" | "",
    especialidad: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Selección directa y única del tipo de usuario
  const handleTipoChange = (tipo: "cliente" | "profesional") => {
    setFormData((prev) => ({
      ...prev,
      tipoUsuario: tipo,
      especialidad: tipo === "cliente" ? "" : prev.especialidad,
    }));
  };

  // Selección única de especialidad
  const handleEspecialidadSelect = (especialidad: string) => {
    setFormData((prev) => ({
      ...prev,
      especialidad: prev.especialidad === especialidad ? "" : especialidad,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nombre || !formData.rut || !formData.correo || !formData.password || !formData.tipoUsuario) {
      alert("Por favor completa todos los campos requeridos.");
      return;
    }

    if (formData.tipoUsuario === "profesional" && !formData.especialidad) {
      alert("Por favor selecciona una especialidad.");
      return;
    }

    setLoading(true);

    try {
      const payload: RegistroData = {
        nombre: formData.nombre,
        rut: formData.rut,
        correo: formData.correo,
        password: formData.password,
        tipoUsuario: formData.tipoUsuario as "cliente" | "profesional",
        especialidad: formData.tipoUsuario === "profesional" ? formData.especialidad : undefined,
      };

      const respuesta = await registrarUsuario(payload);

      alert(respuesta.message || "¡Registro completado exitosamente!");
      navigate("/");
    } catch (error: any) {
      alert(error.message || "Hubo un problema al intentar registrarte.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full min-h-screen py-12 px-4 flex justify-center items-center">
      <div className="max-w-3xl w-full mx-auto relative z-10">

        {/* Botón Volver */}
        <button
          type="button"
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-gray-800 hover:text-black transition-colors mb-6 font-semibold bg-white/70 backdrop-blur-md px-4 py-2 rounded-full w-fit shadow-sm border border-white/50 text-sm"
        >
          <ArrowLeft size={18} />
          Volver al inicio
        </button>

        {/* Formulario */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 space-y-6"
        >
          {/* Header */}
          <div className="text-center md:text-left border-b border-gray-100 pb-6">
            <h1
              className="text-3xl md:text-4xl font-bold mb-2 tracking-tight drop-shadow-sm"
              style={{ color: PINK }}
            >
              Únete a Conecta Hogar
            </h1>
            <p className="text-gray-800 text-base font-normal">
              Completa tus datos para registrarte en nuestra plataforma
            </p>
          </div>

          {/* Nombre */}
          <div className="space-y-2">
            <Label htmlFor="nombre" className="text-gray-800 font-semibold flex items-center gap-2 text-sm">
              <UserCircle size={18} style={{ color: PINK }} />
              Nombre completo
            </Label>
            <Input
              id="nombre"
              type="text"
              disabled={loading}
              placeholder="Ej: Juan Pérez González"
              value={formData.nombre}
              onChange={(e) => handleInputChange("nombre", e.target.value)}
              className="border border-gray-100 bg-gray-50 text-gray-800 font-normal placeholder:text-gray-400 focus:border-[#e83360] focus:bg-white transition-all shadow-inner rounded-xl py-5"
            />
          </div>

          {/* RUT */}
          <div className="space-y-2">
            <Label htmlFor="rut" className="text-gray-800 font-semibold flex items-center gap-2 text-sm">
              <IdCard size={18} style={{ color: PINK }} />
              RUT
            </Label>
            <Input
              id="rut"
              type="text"
              disabled={loading}
              placeholder="Ej: 12.345.678-9"
              value={formData.rut}
              onChange={(e) => handleInputChange("rut", e.target.value)}
              className="border border-gray-100 bg-gray-50 text-gray-800 font-normal placeholder:text-gray-400 focus:border-[#e83360] focus:bg-white transition-all shadow-inner rounded-xl py-5"
            />
          </div>

          {/* Correo */}
          <div className="space-y-2">
            <Label htmlFor="correo" className="text-gray-800 font-semibold flex items-center gap-2 text-sm">
              <Mail size={18} style={{ color: PINK }} />
              Correo electrónico
            </Label>
            <Input
              id="correo"
              type="email"
              disabled={loading}
              placeholder="Ej: juan.perez@ejemplo.cl"
              value={formData.correo}
              onChange={(e) => handleInputChange("correo", e.target.value)}
              className="border border-gray-100 bg-gray-50 text-gray-800 font-normal placeholder:text-gray-400 focus:border-[#e83360] focus:bg-white transition-all shadow-inner rounded-xl py-5"
            />
          </div>

          {/* Contraseña */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-800 font-semibold flex items-center gap-2 text-sm">
              <Lock size={18} style={{ color: PINK }} />
              Contraseña
            </Label>
            <Input
              id="password"
              type="password"
              disabled={loading}
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              className="border border-gray-100 bg-gray-50 text-gray-800 font-normal placeholder:text-gray-400 focus:border-[#e83360] focus:bg-white transition-all shadow-inner rounded-xl py-5"
            />
          </div>

          {/* Tipo de usuario (Sin subtítulos de ayuda y con selección única) */}
          <div className="space-y-3 pt-4 border-t border-gray-100">
            <Label className="text-gray-800 font-semibold flex items-center gap-2 text-sm">
              <Briefcase size={18} style={{ color: PINK }} />
              Tipo de usuario
            </Label>
            <div className="flex flex-col sm:flex-row gap-4">
              
              {/* Opción Cliente */}
              <div
                onClick={() => !loading && handleTipoChange("cliente")}
                className={`flex-1 p-4 border rounded-xl cursor-pointer transition-all flex items-center gap-3 ${
                  formData.tipoUsuario === "cliente"
                    ? "border-[#e83360] bg-gray-50 shadow-md scale-[1.01]"
                    : "border-gray-100 bg-gray-100 hover:bg-gray-200 shadow-inner"
                }`}
              >
                <Checkbox
                  checked={formData.tipoUsuario === "cliente"}
                  disabled={loading}
                  onClick={(e) => e.stopPropagation()}
                  onCheckedChange={() => handleTipoChange("cliente")}
                />
                <span className="font-semibold text-gray-800 text-sm">Cliente</span>
              </div>

              {/* Opción Profesional */}
              <div
                onClick={() => !loading && handleTipoChange("profesional")}
                className={`flex-1 p-4 border rounded-xl cursor-pointer transition-all flex items-center gap-3 ${
                  formData.tipoUsuario === "profesional"
                    ? "border-[#e83360] bg-gray-50 shadow-md scale-[1.01]"
                    : "border-gray-100 bg-gray-100 hover:bg-gray-200 shadow-inner"
                }`}
              >
                <Checkbox
                  checked={formData.tipoUsuario === "profesional"}
                  disabled={loading}
                  onClick={(e) => e.stopPropagation()}
                  onCheckedChange={() => handleTipoChange("profesional")}
                />
                <span className="font-semibold text-gray-800 text-sm">Profesional</span>
              </div>

            </div>
          </div>

          {/* Especialidades (Selección Única) */}
          {formData.tipoUsuario === "profesional" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.3 }}
              className="space-y-3 pt-4 border-t border-gray-100"
            >
              <Label className="text-gray-800 font-semibold text-sm">Especialidad</Label>
              <p className="text-xs text-gray-600 font-normal">Selecciona tu especialidad principal</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ESPECIALIDADES.map((item) => (
                  <div
                    key={item}
                    onClick={() => !loading && handleEspecialidadSelect(item)}
                    className={`p-3 border rounded-xl cursor-pointer transition-all ${
                      formData.especialidad === item
                        ? "border-[#e83360] bg-gray-50 shadow-inner"
                        : "border-gray-100 bg-gray-100 hover:bg-gray-200 shadow-inner"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={formData.especialidad === item}
                        disabled={loading}
                        onClick={(e) => e.stopPropagation()}
                        onCheckedChange={() => handleEspecialidadSelect(item)}
                      />
                      <span className="text-sm font-medium text-gray-800">{item}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Botón de registro */}
          <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} className="pt-4">
            <Button
              type="submit"
              disabled={loading}
              className="w-full py-6 text-base font-bold text-white rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
              style={{ background: `linear-gradient(135deg, ${PINK} 0%, #d42850 100%)` }}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Registrando...
                </>
              ) : (
                "Registrar"
              )}
            </Button>
          </motion.div>

          <p className="text-center text-xs text-gray-700 font-normal pt-2">
            Al registrarte, aceptas nuestros{" "}
            <a href="#" className="underline hover:text-black font-medium">
              Términos y Condiciones
            </a>
          </p>
        </motion.form>
      </div>
    </div>
  );
}