import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, UserCircle, Mail, MapPin, IdCard, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

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
  const [formData, setFormData] = useState({
    nombre: "",
    rut: "",
    correo: "",
    direccion: "",
    tipoUsuario: "" as "cliente" | "profesional" | "",
    especialidades: [] as string[],
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleTipoChange = (tipo: "cliente" | "profesional") => {
    setFormData((prev) => ({
      ...prev,
      tipoUsuario: prev.tipoUsuario === tipo ? "" : tipo,
      especialidades: tipo === "cliente" ? [] : prev.especialidades,
    }));
  };

  const toggleEspecialidad = (especialidad: string) => {
    setFormData((prev) => ({
      ...prev,
      especialidades: prev.especialidades.includes(especialidad)
        ? prev.especialidades.filter((e) => e !== especialidad)
        : [...prev.especialidades, especialidad],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nombre || !formData.rut || !formData.correo || !formData.direccion || !formData.tipoUsuario) {
      alert("Por favor completa todos los campos");
      return;
    }

    if (formData.tipoUsuario === "profesional" && formData.especialidades.length === 0) {
      alert("Por favor selecciona al menos una especialidad");
      return;
    }

    console.log("Datos del formulario:", formData);
    navigate("/");
  };

  return (
    <div className="relative w-full min-h-screen py-12 px-4 flex justify-center items-center">
      <div className="max-w-3xl w-full mx-auto relative z-10">

        {/* Botón Volver */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-gray-800 hover:text-black transition-colors mb-6 font-semibold bg-white/70 backdrop-blur-md px-4 py-2 rounded-full w-fit shadow-sm border border-white/50 text-sm"
        >
          <ArrowLeft size={18} />
          Volver al inicio
        </button>

        {/* Cápsula / Formulario estilo Glassmorphism */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 space-y-6"
        >
          {/* Header dentro de la cápsula */}
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
              placeholder="Ej: juan.perez@ejemplo.cl"
              value={formData.correo}
              onChange={(e) => handleInputChange("correo", e.target.value)}
              className="border border-gray-100 bg-gray-50 text-gray-800 font-normal placeholder:text-gray-400 focus:border-[#e83360] focus:bg-white transition-all shadow-inner rounded-xl py-5"
            />
          </div>

          {/* Dirección */}
          <div className="space-y-2">
            <Label htmlFor="direccion" className="text-gray-800 font-semibold flex items-center gap-2 text-sm">
              <MapPin size={18} style={{ color: PINK }} />
              Dirección
            </Label>
            <Input
              id="direccion"
              type="text"
              placeholder="Ej: Av. Libertador Bernardo O'Higgins 123, Santiago"
              value={formData.direccion}
              onChange={(e) => handleInputChange("direccion", e.target.value)}
              className="border border-gray-100 bg-gray-50 text-gray-800 font-normal placeholder:text-gray-400 focus:border-[#e83360] focus:bg-white transition-all shadow-inner rounded-xl py-5"
            />
          </div>

          {/* Tipo de usuario */}
          <div className="space-y-3 pt-4 border-t border-gray-100">
            <Label className="text-gray-800 font-semibold flex items-center gap-2 text-sm">
              <Briefcase size={18} style={{ color: PINK }} />
              Tipo de usuario
            </Label>
            <div className="flex flex-col sm:flex-row gap-4">
              <div
                onClick={() => handleTipoChange("cliente")}
                className={`flex-1 p-4 border rounded-xl cursor-pointer transition-all ${formData.tipoUsuario === "cliente"
                  ? "border-[#e83360] bg-gray-50 shadow-md scale-[1.01]"
                  : "border-gray-100 bg-gray-100 hover:bg-gray-200 shadow-inner"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={formData.tipoUsuario === "cliente"}
                    onClick={(e) => e.stopPropagation()}
                    onCheckedChange={() => handleTipoChange("cliente")}
                  />
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">Cliente</p>
                    <p className="text-xs text-gray-600 font-normal">Busco contratar servicios</p>
                  </div>
                </div>
              </div>

              <div
                onClick={() => handleTipoChange("profesional")}
                className={`flex-1 p-4 border rounded-xl cursor-pointer transition-all ${formData.tipoUsuario === "profesional"
                  ? "border-[#e83360] bg-gray-50 shadow-md scale-[1.01]"
                  : "border-gray-100 bg-gray-100 hover:bg-gray-200 shadow-inner"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={formData.tipoUsuario === "profesional"}
                    onClick={(e) => e.stopPropagation()}
                    onCheckedChange={() => handleTipoChange("profesional")}
                  />
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">Profesional</p>
                    <p className="text-xs text-gray-600 font-normal">Ofrezco servicios</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Especialidades */}
          {formData.tipoUsuario === "profesional" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.3 }}
              className="space-y-3 pt-4 border-t border-gray-100"
            >
              <Label className="text-gray-800 font-semibold text-sm">Especialidades</Label>
              <p className="text-xs text-gray-600 font-normal">Selecciona todas las que apliquen</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ESPECIALIDADES.map((especialidad) => (
                  <div
                    key={especialidad}
                    onClick={() => toggleEspecialidad(especialidad)}
                    className={`p-3 border rounded-xl cursor-pointer transition-all ${formData.especialidades.includes(especialidad)
                      ? "border-[#e83360] bg-gray-50 shadow-inner"
                      : "border-gray-100 bg-gray-100 hover:bg-gray-200 shadow-inner"
                      }`}
                  >
                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={formData.especialidades.includes(especialidad)}
                        onClick={(e) => e.stopPropagation()}
                        onCheckedChange={() => toggleEspecialidad(especialidad)}
                      />
                      <span className="text-sm font-medium text-gray-800">{especialidad}</span>
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
              className="w-full py-6 text-base font-bold text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
              style={{ background: `linear-gradient(135deg, ${PINK} 0%, #d42850 100%)` }}
            >
              Registrar
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