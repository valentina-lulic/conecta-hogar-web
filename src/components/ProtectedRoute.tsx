import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getToken, getRole } from "@/data/Api";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: string[]; // Lista opcional de roles permitidos (ej: ["admin", "profesional"])
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const token = getToken();
  const rawRole = getRole();
  const location = useLocation();

  // 1. Si no está autenticado, redirigir al Login guardando la ubicación actual
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Normalizamos el rol a minúsculas para comparaciones seguras
  const role = rawRole?.toLowerCase() || "";

  // 2. Si se especificaron roles permitidos y el usuario NO tiene uno de ellos, redirigir al inicio
  if (allowedRoles && allowedRoles.length > 0) {
    const hasPermission = allowedRoles.some((allowedRole) =>
      role.includes(allowedRole.toLowerCase())
    );

    if (!hasPermission) {
      return <Navigate to="/" replace />;
    }
  }

  // 3. Si todo está correcto, renderizar la página protegida
  return <>{children}</>;
}