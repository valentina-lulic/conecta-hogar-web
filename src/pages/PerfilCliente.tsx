import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import {
  Sparkles,
  ThumbsUp,
  ThumbsDown,
  ArrowLeft,
  Search,
  CheckCircle2,
  ShieldCheck,
  Info,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getSession, getMaestros } from "@/data/Api";
import { type Profesional } from "@/data/profesionales";

const PINK = "#e83360";

export default function PerfilCliente() {
  const navigate = useNavigate();
  const location = useLocation();

  const [session, setSession] = useState<any>(null);
  const [profesionales, setProfesionales] = useState<Profesional[]>([]);
  const [cargando, setCargando] = useState(true);
  const [votoExitoso, setVotoExitoso] = useState<string | null>(null);

  const [mostrarBienvenida, setMostrarBienvenida] = useState(
    location.state?.welcome || false
  );

  useEffect(() => {
    const currentSession = getSession();
    if (!currentSession) {
      navigate("/login");
      return;
    }
    setSession(currentSession);

    if (location.state?.welcome) {
      const timer = setTimeout(() => {
        setMostrarBienvenida(false);
      }, 4000);
      return () => clearTimeout(timer);
    }

    async function cargarLista() {
      try {
        setCargando(true);
        const data = await getMaestros();
        const mapeados = data.map((m: any) => ({
          ...m,
          likes: m.meGusta || m.likes || 0,
          dislikes: m.noMeGusta || m.dislikes || 0,
        }));
        setProfesionales(mapeados);
      } catch (error) {
        console.error("Error al cargar profesionales", error);
      } finally {
        setCargando(false);
      }
    }

    cargarLista();
    return () => {};
  }, [navigate, location.state]);

  const handleVoto = (id: number, nombre: string, tipo: "like" | "dislike") => {
    setProfesionales((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          return {
            ...p,
            likes: tipo === "like" ? (p.likes || 0) + 1 : p.likes,
            dislikes: tipo === "dislike" ? ((p as any).dislikes || 0) + 1 : (p as any).dislikes,
          };
        }
        return p;
      })
    );

    const textoAccion = tipo === "like" ? "Me gusta" : "No me gusta";
    setVotoExitoso(`¡Registraste "${textoAccion}" para ${nombre}!`);
    setTimeout(() => setVotoExitoso(null), 3000);
  };

  const nombreCliente =
    session?.nombre || session?.name || session?.user?.nombre || "CLIENTE";
  const apellidoCliente =
    session?.apellido || session?.user?.apellido || "";
  const esUsuarioNuevo = location.state?.isNewUser;

  return (
    <div className="w-full min-h-screen pt-14 sm:pt-16 pb-12 px-4 flex justify-center items-start">
      <div className="max-w-4xl w-full mx-auto space-y-6">
        
        <button
          type="button"
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-gray-800 hover:text-black transition-colors font-semibold bg-white/80 backdrop-blur-md px-3.5 py-1.5 rounded-full w-fit shadow-sm border border-white/50 text-xs cursor-pointer"
        >
          <ArrowLeft size={16} />
          Volver al inicio
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
                ? `¡Bienvenido(a) a Conecta Hogar, ${nombreCliente}! 🎉`
                : `¡Bienvenido(a) de nuevo, ${nombreCliente}! 👋`}
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

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/95 backdrop-blur-md p-6 sm:p-7 rounded-3xl shadow-xl border border-white/50 relative overflow-hidden text-center sm:text-left"
        >
          <div className="absolute top-0 right-0 -mt-6 -mr-6 w-32 h-32 bg-pink-100 rounded-full blur-2xl opacity-60 pointer-events-none" />

          <div className="space-y-1.5 relative z-10">
            <span className="inline-flex items-center gap-1.5 text-xs bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-full w-fit">
              <ShieldCheck size={14} /> Cliente Conecta Hogar
            </span>

            <h1 className="text-2xl sm:text-3xl font-black text-gray-900">
              ¡Bienvenido(a), <span className="uppercase">{nombreCliente}</span> {apellidoCliente}! 👋
            </h1>

            <p className="text-gray-600 font-normal text-xs sm:text-sm max-w-2xl">
              Encuentra a los mejores técnicos para tu hogar o evalúa la atención de los servicios contratados.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100 space-y-4"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-3">
            <div>
              <h2 className="text-base sm:text-lg font-black text-gray-900 flex items-center gap-2">
                <Sparkles size={18} style={{ color: PINK }} />
                Plataforma de Servicios
              </h2>
              <p className="text-xs text-gray-500 font-normal">
                Aprende cómo funciona el servicio o explora directamente la lista de especialistas.
              </p>
            </div>

            <Button
              onClick={() => navigate("/profesionales")}
              className="bg-[#e83360] hover:bg-[#d42850] text-white font-bold text-xs rounded-full px-5 py-2 flex items-center gap-2 shadow-md cursor-pointer shrink-0"
            >
              <Search size={14} /> Ver Lista Completa
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div
              onClick={() => navigate("/nosotros")}
              className="p-5 rounded-2xl border border-gray-100 bg-slate-50 hover:bg-sky-50/40 hover:border-sky-400 transition-all cursor-pointer group flex items-start gap-4 shadow-2xs"
            >
              <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center font-bold shrink-0">
                <Info size={22} />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-gray-900 text-sm sm:text-base group-hover:text-sky-600 transition-colors">
                  ¿Cómo Funciona Conecta Hogar?
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Conoce los pasos sencillos para buscar, contactar y evaluar a los profesionales.
                </p>
              </div>
            </div>

            <div
              onClick={() => navigate("/profesionales")}
              className="p-5 rounded-2xl border border-gray-100 bg-slate-50 hover:bg-pink-50/40 hover:border-[#e83360] transition-all cursor-pointer group flex items-start gap-4 shadow-2xs"
            >
              <div className="w-12 h-12 rounded-2xl bg-pink-100 text-[#e83360] flex items-center justify-center font-bold shrink-0">
                <Users size={22} />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-gray-900 text-sm sm:text-base group-hover:text-[#e83360] transition-colors">
                  Directorio de Profesionales
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Encuentra técnicos clasificados por especialidad y obtén sus teléfonos directos.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {votoExitoso && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold text-xs flex items-center justify-center gap-2 shadow-sm text-center"
          >
            <CheckCircle2 size={16} className="text-emerald-600" />
            {votoExitoso}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl shadow-xl p-6 sm:p-7 space-y-4 border border-gray-100"
        >
          <div className="border-b border-gray-100 pb-3">
            <h2 className="text-base sm:text-lg font-black text-gray-900 flex items-center gap-2">
              <ThumbsUp size={18} className="text-sky-500" />
              Calificar Trabajo Contratado
            </h2>
            <p className="text-xs text-gray-500 font-normal mt-0.5">
              Si un profesional realizó un servicio en tu hogar, evalúa su atención presionando Me Gusta o No Me Gusta.
            </p>
          </div>

          {cargando ? (
            <div className="py-6 text-center text-gray-500 font-medium text-xs">
              Cargando profesionales...
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
              {profesionales.map((p) => {
                const likes = p.likes || 0;
                const dislikes = (p as any).dislikes || 0;

                return (
                  <div
                    key={p.id}
                    className="p-4 rounded-2xl border border-gray-100 bg-slate-50/70 hover:border-gray-300 transition-all flex items-center justify-between gap-3 shadow-2xs"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-pink-100 font-bold text-[#e83360] flex items-center justify-center text-xs shrink-0">
                        {p.nombre ? p.nombre.charAt(0).toUpperCase() : "P"}
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-bold text-gray-900 text-xs sm:text-sm truncate">
                          {p.nombre} {p.apellido}
                        </h3>
                        <p className="text-[11px] text-gray-500 truncate">{p.especialidad}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleVoto(p.id, `${p.nombre} ${p.apellido}`, "like")}
                        className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 hover:bg-emerald-100 transition-all font-bold text-xs cursor-pointer"
                        title="Me Gusta"
                      >
                        <ThumbsUp size={13} />
                        <span>{likes}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleVoto(p.id, `${p.nombre} ${p.apellido}`, "dislike")}
                        className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100 transition-all font-bold text-xs cursor-pointer"
                        title="No Me Gusta"
                      >
                        <ThumbsDown size={13} />
                        <span>{dislikes}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </motion.div>

      </div>
    </div>
  );
}