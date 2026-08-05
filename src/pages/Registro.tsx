import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, UserCircle, Mail, Lock, IdCard, Briefcase, Phone, MapPin, Loader2 } from "lucide-react";
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
  "Soldaduría",
];

export function Registro() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    rut: "",
    telefono: "",
    direccion: "",
    correo: "",
    password: "",
    tipoUsuario: "" as "cliente" | "profesional" | "",
    especialidad: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleTipoChange = (tipo: "cliente" | "profesional") => {
    setFormData((prev) => ({
      ...prev,
      tipoUsuario: tipo,
      especialidad: tipo === "cliente" ? "" : prev.especialidad,
    }));
  };

  const handleEspecialidadSelect = (especialidad: string) => {
    setFormData((prev) => ({
      ...prev,
      especialidad: prev.especialidad === especialidad ? "" : especialidad,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.nombre ||
      !formData.apellido ||
      !formData.rut ||
      !formData.telefono ||
      !formData.direccion ||
      !formData.correo ||
      !formData.password ||
      !formData.tipoUsuario
    ) {
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
        apellido: formData.apellido,
        rut: formData.rut,
        telefono: formData.telefono,
        direccion: formData.direccion,
        correo: formData.correo,
        password: formData.password,
        tipoUsuario: formData.tipoUsuario as "cliente" | "profesional",
        especialidad: formData.tipoUsuario === "profesional" ? formData.especialidad : undefined,
      };

      const respuesta = await registrarUsuario(payload);

      // 💡 1. GUARDAR SESIÓN AL COMPLETAR EL REGISTRO
      const datosSesion = {
        nombre: formData.nombre,
        apellido: formData.apellido,
        correo: formData.correo,
        email: formData.correo,
        role: formData.tipoUsuario,
        tipo: formData.tipoUsuario,
        especialidad: formData.especialidad,
        telefono: formData.telefono,
        comuna: formData.direccion,
      };

      localStorage.setItem("session", JSON.stringify(datosSesion));

      // 💡 2. REDIRIGIR AL PERFIL CORRESPONDIENTE CON BANNER DE 4 SEGUNDOS
      const rutaDestino = formData.tipoUsuario === "profesional" ? "/perfil-profesional" : "/perfil-cliente";

      navigate(rutaDestino, {
        state: {
          welcome: true,
          message: respuesta.message || "¡Registro completado e inicio de sesión exitoso!",
        },
      });

    } catch (error: any) {
      alert(error.message || "Hubo un problema al intentar registrarte.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full min-h-screen py-6 px-4 flex justify-center items-center">
      <div className="max-w-2xl w-full mx-auto relative z-10">

        {/* Botón Volver */}
        <button
          type="button"
          onClick={() => navigate("/")}
          className="flex items-center gap-1.5 text-gray-800 hover:text-black transition-colors mb-3 font-semibold bg-white/70 backdrop-blur-md px-3 py-1.5 rounded-full w-fit shadow-sm border border-white/50 text-xs"
        >
          <ArrowLeft size={16} />
          Volver al inicio
        </button>

        {/* Formulario Compacto */}
        <motion.form
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-xl p-6 md:p-8 space-y-4"
        >
          {/* Header */}
          <div className="border-b border-gray-100 pb-3">
            <h1
              className="text-2xl md:text-3xl font-bold mb-1 tracking-tight drop-shadow-sm"
              style={{ color: PINK }}
            >
              Únete a Conecta Hogar
            </h1>
            <p className="text-gray-600 text-xs font-normal">
              Completa tus datos para registrarte en nuestra plataforma
            </p>
          </div>

          {/* Grid de Campos Formulario */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">

            {/* Nombre */}
            <div className="space-y-1">
              <Label htmlFor="nombre" className="text-gray-800 font-semibold flex items-center gap-1.5 text-xs">
                <UserCircle size={15} style={{ color: PINK }} />
                Nombre
              </Label>
              <Input
                id="nombre"
                type="text"
                disabled={loading}
                placeholder="Ej: Juan"
                value={formData.nombre}
                onChange={(e) => handleInputChange("nombre", e.target.value)}
                className="border border-gray-200 bg-gray-50 text-gray-800 text-xs placeholder:text-gray-400 focus:border-[#e83360] focus:bg-white transition-all shadow-inner rounded-lg h-9"
              />
            </div>

            {/* Apellido */}
            <div className="space-y-1">
              <Label htmlFor="apellido" className="text-gray-800 font-semibold flex items-center gap-1.5 text-xs">
                <UserCircle size={15} style={{ color: PINK }} />
                Apellido
              </Label>
              <Input
                id="apellido"
                type="text"
                disabled={loading}
                placeholder="Ej: Pérez"
                value={formData.apellido}
                onChange={(e) => handleInputChange("apellido", e.target.value)}
                className="border border-gray-200 bg-gray-50 text-gray-800 text-xs placeholder:text-gray-400 focus:border-[#e83360] focus:bg-white transition-all shadow-inner rounded-lg h-9"
              />
            </div>

            {/* RUT */}
            <div className="space-y-1">
              <Label htmlFor="rut" className="text-gray-800 font-semibold flex items-center gap-1.5 text-xs">
                <IdCard size={15} style={{ color: PINK }} />
                RUT
              </Label>
              <Input
                id="rut"
                type="text"
                disabled={loading}
                placeholder="Ej: 12.345.678-9"
                value={formData.rut}
                onChange={(e) => handleInputChange("rut", e.target.value)}
                className="border border-gray-200 bg-gray-50 text-gray-800 text-xs placeholder:text-gray-400 focus:border-[#e83360] focus:bg-white transition-all shadow-inner rounded-lg h-9"
              />
            </div>

            {/* Teléfono */}
            <div className="space-y-1">
              <Label htmlFor="telefono" className="text-gray-800 font-semibold flex items-center gap-1.5 text-xs">
                <Phone size={15} style={{ color: PINK }} />
                Teléfono
              </Label>
              <Input
                id="telefono"
                type="tel"
                disabled={loading}
                placeholder="Ej: +56 9 1234 5678"
                value={formData.telefono}
                onChange={(e) => handleInputChange("telefono", e.target.value)}
                className="border border-gray-200 bg-gray-50 text-gray-800 text-xs placeholder:text-gray-400 focus:border-[#e83360] focus:bg-white transition-all shadow-inner rounded-lg h-9"
              />
            </div>

            {/* Correo */}
            <div className="space-y-1">
              <Label htmlFor="correo" className="text-gray-800 font-semibold flex items-center gap-1.5 text-xs">
                <Mail size={15} style={{ color: PINK }} />
                Correo electrónico
              </Label>
              <Input
                id="correo"
                type="email"
                disabled={loading}
                placeholder="Ej: juan.perez@ejemplo.cl"
                value={formData.correo}
                onChange={(e) => handleInputChange("correo", e.target.value)}
                className="border border-gray-200 bg-gray-50 text-gray-800 text-xs placeholder:text-gray-400 focus:border-[#e83360] focus:bg-white transition-all shadow-inner rounded-lg h-9"
              />
            </div>

            {/* Contraseña */}
            <div className="space-y-1">
              <Label htmlFor="password" className="text-gray-800 font-semibold flex items-center gap-1.5 text-xs">
                <Lock size={15} style={{ color: PINK }} />
                Contraseña
              </Label>
              <Input
                id="password"
                type="password"
                disabled={loading}
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className="border border-gray-200 bg-gray-50 text-gray-800 text-xs placeholder:text-gray-400 focus:border-[#e83360] focus:bg-white transition-all shadow-inner rounded-lg h-9"
              />
            </div>

            {/* Dirección */}
            <div className="space-y-1 sm:col-span-2">
              <Label htmlFor="direccion" className="text-gray-800 font-semibold flex items-center gap-1.5 text-xs">
                <MapPin size={15} style={{ color: PINK }} />
                Dirección
              </Label>
              <Input
                id="direccion"
                type="text"
                disabled={loading}
                placeholder="Ej: Av. Providencia 1234, Depto 501, Providencia"
                value={formData.direccion}
                onChange={(e) => handleInputChange("direccion", e.target.value)}
                className="border border-gray-200 bg-gray-50 text-gray-800 text-xs placeholder:text-gray-400 focus:border-[#e83360] focus:bg-white transition-all shadow-inner rounded-lg h-9"
              />
            </div>

          </div>

          {/* Tipo de usuario */}
          <div className="space-y-2 pt-2 border-t border-gray-100">
            <Label className="text-gray-800 font-semibold flex items-center gap-1.5 text-xs">
              <Briefcase size={15} style={{ color: PINK }} />
              Tipo de usuario
            </Label>
            <div className="flex gap-3">

              {/* Opción Cliente */}
              <div
                onClick={() => !loading && handleTipoChange("cliente")}
                className={`flex-1 p-2.5 border rounded-lg cursor-pointer transition-all flex items-center gap-2 ${formData.tipoUsuario === "cliente"
                  ? "border-[#e83360] bg-gray-50 shadow-sm"
                  : "border-gray-200 bg-gray-50 hover:bg-gray-100"
                  }`}
              >
                <Checkbox
                  checked={formData.tipoUsuario === "cliente"}
                  disabled={loading}
                  onClick={(e) => e.stopPropagation()}
                  onCheckedChange={() => handleTipoChange("cliente")}
                />
                <span className="font-semibold text-gray-800 text-xs">Cliente</span>
              </div>

              {/* Opción Profesional */}
              <div
                onClick={() => !loading && handleTipoChange("profesional")}
                className={`flex-1 p-2.5 border rounded-lg cursor-pointer transition-all flex items-center gap-2 ${formData.tipoUsuario === "profesional"
                  ? "border-[#e83360] bg-gray-50 shadow-sm"
                  : "border-gray-200 bg-gray-50 hover:bg-gray-100"
                  }`}
              >
                <Checkbox
                  checked={formData.tipoUsuario === "profesional"}
                  disabled={loading}
                  onClick={(e) => e.stopPropagation()}
                  onCheckedChange={() => handleTipoChange("profesional")}
                />
                <span className="font-semibold text-gray-800 text-xs">Profesional</span>
              </div>

            </div>
          </div>

          {/* Especialidades (Selección Única) */}
          {formData.tipoUsuario === "profesional" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.2 }}
              className="space-y-2 pt-2 border-t border-gray-100"
            >
              <Label className="text-gray-800 font-semibold text-xs">Especialidad principal</Label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {ESPECIALIDADES.map((item) => (
                  <div
                    key={item}
                    onClick={() => !loading && handleEspecialidadSelect(item)}
                    className={`p-2 border rounded-lg cursor-pointer transition-all ${formData.especialidad === item
                      ? "border-[#e83360] bg-gray-50 shadow-sm"
                      : "border-gray-200 bg-gray-50 hover:bg-gray-100"
                      }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <Checkbox
                        checked={formData.especialidad === item}
                        disabled={loading}
                        onClick={(e) => e.stopPropagation()}
                        onCheckedChange={() => handleEspecialidadSelect(item)}
                      />
                      <span className="text-[11px] font-medium text-gray-800 truncate">{item}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Botón de registro Redondeado */}
          <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} className="pt-2">
            <Button
              type="submit"
              disabled={loading}
              className="w-full py-4 text-sm font-bold text-white rounded-full shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 h-11"
              style={{ background: `linear-gradient(135deg, ${PINK} 0%, #d42850 100%)` }}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Registrando...
                </>
              ) : (
                "Registrar"
              )}
            </Button>
          </motion.div>

          <p className="text-center text-[11px] text-gray-600 font-normal pt-1">
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