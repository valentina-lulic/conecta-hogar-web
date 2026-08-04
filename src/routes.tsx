import { createBrowserRouter } from "react-router-dom";
import Root from "./components/custom/Root";
import Home from "./pages/Home";
import { Nosotros } from "./pages/Nosotros";
import Profesionales from "./pages/Profesionales";
import { Garantia } from "./pages/Garantia";
import { Contacto } from "./pages/Contacto";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import PerfilProfesional from "./pages/PerfilProfesional";
import PerfilCliente from "./pages/PerfilCliente";
import ProtectedRoute from "./components/ProtectedRoute";
import { Registro } from "./pages/Registro"; 

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      { path: "nosotros", element: <Nosotros /> },
      
      // 🟢 RUTA DE PROFESIONALES: Visible para cualquier usuario logueado
      {
        path: "profesionales",
        element: (
          <ProtectedRoute>
            <Profesionales />
          </ProtectedRoute>
        ),
      },

      { path: "garantia", element: <Garantia /> },
      { path: "contacto", element: <Contacto /> },
      { path: "registro", element: <Registro /> },
      { path: "login", element: <Login /> },
      
      // 🟢 RUTA PERFIL DEL PROFESIONAL
      {
        path: "perfil-profesional",
        element: (
          <ProtectedRoute allowedRoles={["PROFESIONAL", "MAESTRO", "ROLE_MAESTRO", "profesional", "maestro"]}>
            <PerfilProfesional />
          </ProtectedRoute>
        ),
      },

      // 🟢 RUTA PERFIL DEL CLIENTE
      {
        path: "perfil-cliente",
        element: (
          <ProtectedRoute allowedRoles={["CLIENTE", "ROLE_CLIENTE", "cliente"]}>
            <PerfilCliente />
          </ProtectedRoute>
        ),
      },

      // 🟢 PANEL DE ADMIN (Dentro de Root para compartir Navigation/Layout)
      {
        path: "admin",
        element: (
          <ProtectedRoute allowedRoles={["ADMIN", "ROLE_ADMIN", "admin", "administrador"]}>
            <Admin />
          </ProtectedRoute>
        ),
      },
    ],
  },

  // 404 Redirección
  {
    path: "*",
    element: <Home />,
  },
]);