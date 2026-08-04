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
import ProtectedRoute from "./components/ProtectedRoute"; // 👈 Tu componente protector de rutas

// Importamos Registro de tu compañera respetando su exportación
import { Registro } from "./pages/Registro"; 

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      { path: "nosotros", element: <Nosotros /> },
      
      // 🟢 RUTA DE PROFESIONALES PROTEGIDA: Solo visible tras iniciar sesión
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
          <ProtectedRoute>
            <PerfilProfesional />
          </ProtectedRoute>
        ),
      },
    ],
  },

  // Panel de Admin Protegido
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <Admin />
      </ProtectedRoute>
    ),
  },

  // 404 Redirección
  {
    path: "*",
    element: <Home />,
  },
]);