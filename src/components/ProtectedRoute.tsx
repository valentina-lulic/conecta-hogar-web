interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  // Dejamos pasar libremente para probar las vistas en desarrollo
  return <>{children}</>;
}