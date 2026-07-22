import { createBrowserRouter } from "react-router-dom";
import { Root } from "./components/custom/Root";
import { Home } from "./pages/Home";
import Profesionales from "./pages/Profesionales";
import { Garantia } from "./pages/Garantia";
import { Contacto } from "./pages/Contacto";
import { Registro } from "./pages/Registro";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "profesionales",
        element: <Profesionales />,
      },
      {
        path: "garantia",
        element: <Garantia />,
      },
      {
        path: "contacto",
        element: <Contacto />,
      },
      {
        path: "registro",
        element: <Registro />,
      },
    ],
  },
]);