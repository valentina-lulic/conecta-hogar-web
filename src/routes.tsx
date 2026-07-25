import { createBrowserRouter } from "react-router-dom";
import Root from "./components/custom/Root";
import Home from "./pages/Home";
import { Nosotros } from "./pages/Nosotros";
import Profesionales from "./pages/Profesionales";
import { Garantia } from "./pages/Garantia";
import { Contacto } from "./pages/Contacto";
import { Registro } from "./pages/Registro";
import Admin from "./pages/Admin";
import ProtectedRoute from "./components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      { path: "nosotros", element: <Nosotros /> },
      { path: "profesionales", element: <Profesionales /> },
      { path: "garantia", element: <Garantia /> },
      { path: "contacto", element: <Contacto /> },
      { path: "registro", element: <Registro /> },
    ],
  },
  
  // 2. Ruta protegida a Pantalla Completa (Dashboard del Admin sin Navbar cliente)
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <Admin />
      </ProtectedRoute>
    ),
  },

  // 3. Redirección para URLs desconocidas (404)
  {
    path: "*",
    element: <Home />,
  }
]);