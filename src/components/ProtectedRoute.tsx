import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  // Leemos las credenciales guardadas en la sesión cuando el backend responde en el Login
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  // Validamos que exista token activo y que el rol sea de Administrador
  const isAdmin = Boolean(token) && userRole === "ADMIN";

  if (!isAdmin) {
    // Si no está autenticado como admin, se redirige a la página principal
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}