import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, UserCircle, Mail, MapPin, IdCard, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const PINK = "#e83360";
//const YELLOW = "#f5d318";
//const SKY = "#55bcd9";

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
    <div className="w-full py-12 px-4 flex justify-center items-center">
      {/* Aumentamos el ancho máximo a 3xl para que la cápsula sea más grande */}
      <div className="max-w-3xl w-full mx-auto">

        {/* Botón Volver */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-gray-800 hover:text-black transition-colors mb-6 font-bold bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full w-fit shadow-sm"
        >
          <ArrowLeft size={20} />
          Volver al inicio
        </button>

        {/* Cápsula / Formulario con Transparencia y Vidrio Esmerilado */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="bg-white/90 backdrop-blur-md border border-white/40 rounded-3xl shadow-2xl p-8 md:p-12 space-y-6"
        >
          {/* Header dentro de la cápsula con el color PINK */}
          <div className="text-center md:text-left border-b-2 border-gray-100/80 pb-6">
            <h1
              className="text-3xl md:text-4xl font-black mb-2"
              style={{ color: PINK }}
            >
              Únete a Conecta Hogar
            </h1>
            <p className="text-gray-600 text-base md:text-lg font-medium">
              Completa tus datos para registrarte en nuestra plataforma
            </p>
          </div>

          {/* Nombre */}
          <div className="space-y-2">
            <Label htmlFor="nombre" className="text-gray-700 font-bold flex items-center gap-2">
              <UserCircle size={18} style={{ color: PINK }} />
              Nombre completo
            </Label>
            <Input
              id="nombre"
              type="text"
              placeholder="Ej: Juan Pérez González"
              value={formData.nombre}
              onChange={(e) => handleInputChange("nombre", e.target.value)}
              className="border-2 border-gray-200/80 bg-white/80 focus:border-[#55bcd9] transition-colors"
            />
          </div>

          {/* RUT */}
          <div className="space-y-2">
            <Label htmlFor="rut" className="text-gray-700 font-bold flex items-center gap-2">
              <IdCard size={18} style={{ color: PINK }} />
              RUT
            </Label>
            <Input
              id="rut"
              type="text"
              placeholder="Ej: 12.345.678-9"
              value={formData.rut}
              onChange={(e) => handleInputChange("rut", e.target.value)}
              className="border-2 border-gray-200/80 bg-white/80 focus:border-[#55bcd9] transition-colors"
            />
          </div>

          {/* Correo */}
          <div className="space-y-2">
            <Label htmlFor="correo" className="text-gray-700 font-bold flex items-center gap-2">
              <Mail size={18} style={{ color: PINK }} />
              Correo electrónico
            </Label>
            <Input
              id="correo"
              type="email"
              placeholder="Ej: juan.perez@ejemplo.cl"
              value={formData.correo}
              onChange={(e) => handleInputChange("correo", e.target.value)}
              className="border-2 border-gray-200/80 bg-white/80 focus:border-[#55bcd9] transition-colors"
            />
          </div>

          {/* Dirección */}
          <div className="space-y-2">
            <Label htmlFor="direccion" className="text-gray-700 font-bold flex items-center gap-2">
              <MapPin size={18} style={{ color: PINK }} />
              Dirección
            </Label>
            <Input
              id="direccion"
              type="text"
              placeholder="Ej: Av. Libertador Bernardo O'Higgins 123, Santiago"
              value={formData.direccion}
              onChange={(e) => handleInputChange("direccion", e.target.value)}
              className="border-2 border-gray-200/80 bg-white/80 focus:border-[#55bcd9] transition-colors"
            />
          </div>

          {/* Tipo de usuario */}
          <div className="space-y-3 pt-4 border-t-2 border-gray-100/80">
            <Label className="text-gray-700 font-bold flex items-center gap-2">
              <Briefcase size={18} style={{ color: PINK }} />
              Tipo de usuario
            </Label>
            <div className="flex flex-col sm:flex-row gap-4">
              <div
                onClick={() => handleTipoChange("cliente")}
                className={`flex-1 p-4 border-2 rounded-xl cursor-pointer transition-all ${formData.tipoUsuario === "cliente"
                    ? "border-[#55bcd9] bg-[#55bcd9]/10 shadow-md"
                    : "border-gray-200/80 bg-white/50 hover:border-gray-300"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={formData.tipoUsuario === "cliente"}
                    onClick={(e) => e.stopPropagation()}
                    onCheckedChange={() => handleTipoChange("cliente")}
                  />
                  <div>
                    <p className="font-bold text-gray-800">Cliente</p>
                    <p className="text-sm text-gray-600">Busco contratar servicios</p>
                  </div>
                </div>
              </div>

              <div
                onClick={() => handleTipoChange("profesional")}
                className={`flex-1 p-4 border-2 rounded-xl cursor-pointer transition-all ${formData.tipoUsuario === "profesional"
                    ? "border-[#55bcd9] bg-[#55bcd9]/10 shadow-md"
                    : "border-gray-200/80 bg-white/50 hover:border-gray-300"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={formData.tipoUsuario === "profesional"}
                    onClick={(e) => e.stopPropagation()}
                    onCheckedChange={() => handleTipoChange("profesional")}
                  />
                  <div>
                    <p className="font-bold text-gray-800">Profesional</p>
                    <p className="text-sm text-gray-600">Ofrezco servicios</p>
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
              className="space-y-3 pt-4 border-t-2 border-gray-100/80"
            >
              <Label className="text-gray-700 font-bold">Especialidades</Label>
              <p className="text-sm text-gray-600">Selecciona todas las que apliquen</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ESPECIALIDADES.map((especialidad) => (
                  <div
                    key={especialidad}
                    onClick={() => toggleEspecialidad(especialidad)}
                    className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${formData.especialidades.includes(especialidad)
                        ? "border-[#e83360] bg-[#e83360]/10 shadow-sm"
                        : "border-gray-200/80 bg-white/50 hover:border-gray-300"
                      }`}
                  >
                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={formData.especialidades.includes(especialidad)}
                        onClick={(e) => e.stopPropagation()}
                        onCheckedChange={() => toggleEspecialidad(especialidad)}
                      />
                      <span className="text-sm font-semibold text-gray-700">{especialidad}</span>
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
              className="w-full py-6 text-lg font-black text-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              style={{ background: `linear-gradient(135deg, ${PINK} 0%, #d42850 100%)` }}
            >
              Registrar
            </Button>
          </motion.div>

          <p className="text-center text-sm text-gray-500 pt-2">
            Al registrarte, aceptas nuestros{" "}
            <a href="#" className="underline hover:text-gray-700 font-medium">
              Términos y Condiciones
            </a>
          </p>
        </motion.form>
      </div>
    </div>
  );
}