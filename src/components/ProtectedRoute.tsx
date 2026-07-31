import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  // 1. Obtenemos el token guardado en el navegador tras el login
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role"); // Opcional: si guardas el rol (ej: "ADMIN")

  // 2. Si no hay token, redirigir al Login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 3. (Opcional) Si existe el token pero NO es rol ADMIN, redirigir a inicio
  if (role && role !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  // 4. Si todo está correcto, renderizar la página protegida (Admin)
  return <>{children}</>;
}