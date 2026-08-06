import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, Mail, Lock, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginRequest, saveSession } from "@/data/Api";

const PINK = "#e83360";
const BLACK = "#1f2937";
const CYAN = "#55bcd9";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Ingresa tu correo y contraseña.");
      return;
    }

    setLoading(true);

    try {
      const session = await loginRequest(email, password);
      saveSession(session);

      const rol = session.rol;

      if (rol === "MAESTRO") {
        navigate("/perfil-profesional", {
          state: { welcome: true, isNewUser: false },
        });
      } else if (rol === "ADMIN") {
        navigate("/admin", {
          state: { welcome: true, isNewUser: false },
        });
      } else {
        navigate("/perfil-cliente", {
          state: { welcome: true, isNewUser: false },
        });
      }
    } catch (err: unknown) {
      console.error("Error en login:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Correo o contraseña incorrectos. Intenta nuevamente."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full py-12 px-4 flex justify-center items-center min-h-[70vh]">
      <div className="max-w-md w-full mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4"
        >
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors font-normal cursor-pointer"
          >
            <ArrowLeft size={20} />
            Volver al inicio
          </button>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl shadow-2xl p-8 space-y-6"
        >
          {/* Encabezado dentro de la tarjeta en color celeste */}
          <div className="space-y-1 text-left">
            <h1
              className="text-3xl font-black tracking-tight font-poppins"
              style={{ color: PINK }}
            >
              Bienvenido de nuevo
            </h1>
            <p
              className="text-sm font-normal font-poppins"
              style={{ color: BLACK }}
            >
              Ingresa tus datos para continuar
            </p>
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-100 text-red-700 text-sm font-normal">
              <AlertCircle size={18} className="shrink-0" />
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-700 font-normal flex items-center gap-2">
              <Mail size={18} style={{ color: PINK }} />
              Correo electrónico
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Ej: juan.perez@ejemplo.cl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-2 border-gray-200 focus:border-[#55bcd9] transition-colors font-normal rounded-xl"
              autoComplete="email"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-700 font-normal flex items-center gap-2">
              <Lock size={18} style={{ color: PINK }} />
              Contraseña
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-2 border-gray-200 focus:border-[#55bcd9] transition-colors font-normal rounded-xl"
              autoComplete="current-password"
            />
          </div>

          <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} className="pt-2">
            <Button
              type="submit"
              disabled={loading}
              className="w-full py-6 text-lg font-black text-white rounded-full shadow-lg hover:shadow-xl transition-all disabled:opacity-60 cursor-pointer"
              style={{ background: `linear-gradient(135deg, ${PINK} 0%, #d42850 100%)` }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2 font-normal">
                  <Loader2 size={18} className="animate-spin" />
                  Ingresando...
                </span>
              ) : (
                "Ingresar"
              )}
            </Button>
          </motion.div>

          <p className="text-center text-sm text-gray-500 pt-2 font-normal">
            ¿Aún no tienes cuenta?{" "}
            <button
              type="button"
              onClick={() => navigate("/registro")}
              className="font-normal underline hover:text-gray-700 cursor-pointer"
            >
              Regístrate aquí
            </button>
          </p>
        </motion.form>
      </div>
    </div>
  );
}