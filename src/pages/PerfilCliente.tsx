import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import {
  Sparkles,
  ThumbsUp,
  ArrowLeft,
  Search,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getSession, getMaestros } from "@/data/Api";
import { type Profesional } from "@/data/profesionales";

const PINK = "#e83360";

export default function PerfilCliente() {
  const navigate = useNavigate();
  const [session] = useState(getSession());
  const [profesionales, setProfesionales] = useState<Profesional[]>([]);
  const [cargando, setCargando] = useState(true);
  const [votoExitoso, setVotoExitoso] = useState<string | null>(null);

  useEffect(() => {
    const currentSession = getSession();
    if (!currentSession) {
      navigate("/login");
      return;
    }

    async function cargarLista() {
      try {
        setCargando(true);
        const data = await getMaestros();
        const mapeados = data.map((m: any) => ({
          ...m,
          likes: m.meGusta || m.likes || 0,
        }));
        setProfesionales(mapeados);
      } catch (error) {
        console.error("Error al cargar profesionales", error);
      } finally {
        setCargando(false);
      }
    }

    cargarLista();
  }, [navigate]);

  const handleVotar = (id: number, nombre: string) => {
    setProfesionales((prev) =>
      prev.map((p) => (p.id === id ? { ...p, likes: (p.likes || 0) + 1 } : p))
    );

    setVotoExitoso(`¡Calificación registrada para ${nombre}!`);
    setTimeout(() => setVotoExitoso(null), 3000);
  };

  return (
    <div className="w-full min-h-screen pt-14 sm:pt-16 pb-8 px-4 flex justify-center items-start">
      <div className="max-w-4xl w-full mx-auto space-y-4">
        
        {/* Botón Volver */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-gray-800 hover:text-black transition-colors font-semibold bg-white/80 backdrop-blur-md px-3.5 py-1.5 rounded-full w-fit shadow-sm border border-white/50 text-xs cursor-pointer"
        >
          <ArrowLeft size={16} />
          Volver al inicio
        </button>

        {/* 🌟 MENSAJE DE BIENVENIDA MÁS LIMPIO (SIN RECUADRO DE FOTO) 🌟 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/95 backdrop-blur-md p-6 sm:p-7 rounded-3xl shadow-xl border border-white/50 relative overflow-hidden text-center sm:text-left"
        >
          <div className="absolute top-0 right-0 -mt-6 -mr-6 w-32 h-32 bg-pink-100 rounded-full blur-2xl opacity-60 pointer-events-none" />
          
          <div className="space-y-1.5">
            <span className="inline-flex items-center gap-1.5 text-xs bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-full">
              <ShieldCheck size={14} /> Cliente Conecta Hogar
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900">
              ¡Bienvenido(a), {session?.name || "Cliente"}! 👋
            </h1>
            <p className="text-gray-600 font-normal text-xs sm:text-sm max-w-2xl">
              Nos alegra tenerte aquí. Explora el directorio de profesionales y ayuda a la comunidad evaluando los servicios prestados.
            </p>
          </div>
        </motion.div>

        {/* Alerta de Voto Registrado */}
        {votoExitoso && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold text-xs flex items-center justify-center gap-2 shadow-sm text-center"
          >
            <CheckCircle2 size={16} className="text-emerald-600" />
            {votoExitoso}
          </motion.div>
        )}

        {/* 🌟 SECCIÓN: CALIFICAR PROFESIONALES 🌟 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl shadow-2xl p-5 sm:p-7 space-y-4"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-3">
            <div>
              <h2 className="text-base sm:text-lg font-black text-gray-900 flex items-center gap-2">
                <Sparkles size={16} style={{ color: PINK }} />
                Califica a los Profesionales
              </h2>
              <p className="text-xs text-gray-500 font-normal">
                Califica el trabajo de los profesionales para destacar su perfil en la comunidad.
              </p>
            </div>

            <Button
              onClick={() => navigate("/profesionales")}
              className="bg-[#e83360] hover:bg-[#46a8c4] text-white font-bold text-xs rounded-full px-4 py-1.5 flex items-center gap-2 shadow-md cursor-pointer"
            >
              <Search size={14} /> Ver Directorio Completo
            </Button>
          </div>

          {/* Estado de Carga */}
          {cargando ? (
            <div className="py-6 text-center text-gray-500 font-medium text-xs">
              Cargando profesionales para evaluar...
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {profesionales.map((p) => (
                <div
                  key={p.id}
                  className="p-3.5 rounded-2xl border border-gray-100 hover:border-[#55bcd9] transition-all bg-slate-50/60 flex items-center justify-between gap-3 shadow-xs"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-gray-200 font-bold text-gray-700 flex items-center justify-center text-xs shrink-0">
                      {p.nombre ? p.nombre.charAt(0).toUpperCase() : "P"}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-gray-900 text-xs sm:text-sm truncate">
                        {p.nombre} {p.apellido}
                      </h3>
                      <p className="text-[11px] text-gray-500 truncate">{p.especialidad}</p>
                      <span className="text-[10px] text-gray-400 font-medium">
                        👍 {p.likes || 0} Calificaciones
                      </span>
                    </div>
                  </div>

                  {/* Botón de Votación */}
                  <button
                    type="button"
                    onClick={() => handleVotar(p.id, `${p.nombre} ${p.apellido}`)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-gray-200 text-slate-700 hover:border-[#e83360] hover:text-[#e83360] hover:bg-pink-50 transition-all font-bold text-xs cursor-pointer shadow-2xs shrink-0"
                    title="Dar Me Gusta"
                  >
                    <ThumbsUp size={13} className="text-sky-500" />
                    <span>Me Gusta</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </motion.div>

      </div>
    </div>
  );
}