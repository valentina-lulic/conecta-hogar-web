import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, Mail, Lock, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginRequest, saveSession } from "@/data/Api";

const PINK = "#e83360";

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

  navigate("/");
} catch (err) {
  setError(
    err instanceof Error
      ? err.message
      : "No se pudo iniciar sesión."
  );
} finally {
  setLoading(false);
}
  };


  return (
    <div className="w-full py-12 px-4 flex justify-center items-center min-h-[70vh]">
      <div className="max-w-md w-full mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors mb-6 font-normal"
          >
            <ArrowLeft size={20} />
            Volver al inicio
          </button>

          {/* TÍTULO POPPINS BLACK */}
          <h1
            className="text-4xl font-black text-white mb-2 tracking-tight"
            style={{ textShadow: "0 2px 8px rgba(7, 7, 7, 0.9)" }}
          >
            Bienvenido de nuevo
          </h1>

          {/* SUBTÍTULO POPPINS SUAVE */}
          <p
            className="text-white text-lg font-normal opacity-90"
            style={{ textShadow: "0 1px 4px rgba(13, 13, 14, 0.7)" }}
          >
            Ingresa tus datos para continuar
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-2xl p-8 space-y-6"
        >
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
              className="border-2 border-gray-200 focus:border-[#55bcd9] transition-colors font-normal"
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
              className="border-2 border-gray-200 focus:border-[#55bcd9] transition-colors font-normal"
              autoComplete="current-password"
            />
          </div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="pt-2">
            <Button
              type="submit"
              disabled={loading}
              className="w-full py-6 text-lg font-black text-white rounded-xl shadow-lg hover:shadow-xl transition-shadow disabled:opacity-60"
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
              className="font-normal underline hover:text-gray-700"
            >
              Regístrate aquí
            </button>
          </p>
        </motion.form>
      </div>
    </div>
  );
}