import { useState, useEffect } from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { Sparkles, User, LogOut } from "lucide-react";
import { getSession, clearSession } from "@/data/Api";

export default function Root() {
  const location = useLocation();
  const navigate = useNavigate();

  const [showWelcome, setShowWelcome] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    // 1. Obtener datos de la sesión guardada
    const currentSession = getSession();
    setSession(currentSession);

    let timer: ReturnType<typeof setTimeout> | undefined;

    // 2. Si viene la flag 'welcome' en la navegación, mostramos el cartel
    if (location.state?.welcome) {
      setShowWelcome(true);
      setIsNewUser(Boolean(location.state?.isNewUser));

      // 3. Temporizador para ocultar el mensaje a los 4 segundos (4000 ms)
      timer = setTimeout(() => {
        setShowWelcome(false);
      }, 4000);
    }

    // Retorno de limpieza uniforme para evitar advertencias de TypeScript
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [location]);

  // Extraer el nombre para mostrar en la barra y el mensaje de bienvenida
  const nombreUsuario =
    session?.nombre ||
    session?.name ||
    session?.user?.nombre ||
    (session?.correo ? session.correo.split("@")[0] : "USUARIO");

  const handleLogout = () => {
    clearSession();
    setSession(null);
    setShowWelcome(false);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center">
      {/* NAVBAR HEADER */}
      <header className="w-full max-w-6xl mx-auto p-4 flex items-center justify-between relative z-50">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="w-9 h-9 rounded-xl bg-[#e83360] flex items-center justify-center text-white font-bold">
            CH
          </div>
          <span className="font-black text-gray-900 text-lg">CONECTA HOGAR</span>
        </div>

        {/* MENÚ SUPERIOR Y DATOS DEL USUARIO */}
        <div className="flex items-center gap-3">
          {session ? (
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
              <User size={16} className="text-[#e83360]" />
              <span className="text-xs font-bold text-gray-800 uppercase">
                Hola, {nombreUsuario}
              </span>
              <button
                onClick={handleLogout}
                className="ml-2 text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                title="Cerrar sesión"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-[#e83360] text-white text-xs font-bold px-4 py-2 rounded-full shadow-md cursor-pointer"
            >
              Ingresar
            </button>
          )}
        </div>
      </header>

      {/* MENSAJE FLOTANTE DE BIENVENIDA (DURA 4 SEGUNDOS) */}
      {showWelcome && (
        <div className="fixed top-20 z-50 animate-bounce-short">
          <div className="bg-white/95 backdrop-blur-md border border-gray-100 shadow-2xl rounded-2xl px-5 py-2.5 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-[#e83360] shrink-0">
              <Sparkles size={18} />
            </div>
            <div className="text-left">
              <p className="text-[11px] font-semibold text-gray-400">
                ¡Inicio de sesión exitoso!
              </p>
              <p className="text-xs sm:text-sm font-bold text-gray-900">
                {isNewUser
                  ? `Bienvenido(a), ${nombreUsuario.toUpperCase()}`
                  : `Bienvenido(a) de nuevo, ${nombreUsuario.toUpperCase()}`}{" "}
                👏
              </p>
            </div>
          </div>
        </div>
      )}

      {/* CONTENIDO DE LAS RUTAS */}
      <main className="w-full flex-1">
        <Outlet />
      </main>
    </div>
  );
}