import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getSession, getMaestros } from "@/data/Api";
import { type Profesional } from "@/data/profesionales";

const PINK = "#e83360";

function extraerNombreCliente(session: any): { nombre: string; apellido: string } {
  if (!session) return { nombre: "CLIENTE", apellido: "" };

  const nombre =
    session.nombre ||
    session.name ||
    session.nombres ||
    session.firstName ||
    session.username ||
    session.usuario ||
    session.user?.nombre ||
    session.user?.name ||
    "";

  const apellido =
    session.apellido ||
    session.lastname ||
    session.user?.apellido ||
    "";

  if (nombre.trim()) {
    return { nombre: nombre.trim(), apellido: apellido.trim() };
  }

  const correo = session.correo || session.email || session.user?.correo || session.user?.email || session.sub;
  if (correo && typeof correo === "string" && correo.includes("@")) {
    return { nombre: correo.split("@")[0], apellido: "" };
  }

  return { nombre: "CLIENTE", apellido: "" };
}

export default function PerfilCliente() {
  const navigate = useNavigate();

  const [session, setSession] = useState<any>(null);
  const [profesionales, setProfesionales] = useState<Profesional[]>([]);
  const [cargando, setCargando] = useState(true);
  const [votoExitoso, setVotoExitoso] = useState<string | null>(null);

  const [votosRealizados, setVotosRealizados] = useState<number[]>([]);

  useEffect(() => {
    const currentSession: any = getSession();
    if (!currentSession) {
      navigate("/login");
      return;
    }
    setSession(currentSession);

    const userEmail = currentSession.correo || currentSession.email || currentSession.user?.correo || "invitado";
    const votosGuardados = localStorage.getItem(`votos_cliente_${userEmail}`);
    if (votosGuardados) {
      try {
        setVotosRealizados(JSON.parse(votosGuardados));
      } catch (e) {
        console.error("Error al leer votos de localStorage", e);
      }
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
  }, [navigate]);

  const handleVoto = (id: number, nombre: string, tipo: "like" | "dislike") => {
    if (votosRealizados.includes(id)) {
      setVotoExitoso(`Ya has calificado el servicio de ${nombre}.`);
      setTimeout(() => setVotoExitoso(null), 3000);
      return;
    }

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

    const nuevosVotos = [...votosRealizados, id];
    setVotosRealizados(nuevosVotos);

    const userEmail = session?.correo || session?.email || session?.user?.correo || "invitado";
    localStorage.setItem(`votos_cliente_${userEmail}`, JSON.stringify(nuevosVotos));

    const textoAccion = tipo === "like" ? "Me gusta" : "No me gusta";
    setVotoExitoso(`¡Registraste "${textoAccion}" para ${nombre}! Calificacion guardada.`);
    setTimeout(() => setVotoExitoso(null), 3500);
  };

  const { nombre: nombreCliente, apellido: apellidoCliente } = extraerNombreCliente(session);

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
              Encuentra a los mejores tecnicos para tu hogar o evalua la atencion de los servicios contratados.
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
                Aprende como funciona el servicio o explora directamente la lista de especialistas.
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
                  ¿Como Funciona Conecta Hogar?
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
                  Encuentra tecnicos clasificados por especialidad y obten sus telefonos directos.
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
              Si contrataste un servicio, evalua la atencion presionando Me Gusta o No Me Gusta (1 calificacion por servicio).
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
                const yaCalificado = votosRealizados.includes(p.id);

                return (
                  <div
                    key={p.id}
                    className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 shadow-2xs ${
                      yaCalificado
                        ? "bg-slate-100/80 border-gray-200"
                        : "bg-slate-50/70 border-gray-100 hover:border-gray-300"
                    }`}
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
                      {yaCalificado ? (
                        <span className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-gray-200 text-gray-600 font-bold text-[11px]">
                          <Check size={13} className="text-emerald-600" /> Calificado
                        </span>
                      ) : (
                        <>
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
                        </>
                      )}
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