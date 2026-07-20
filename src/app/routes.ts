import { createBrowserRouter } from "react-router";
import { Root }     from "./components/custom/Root";
import { Home }     from "./pages/Home";
import { Garantia } from "./pages/Garantia";
import { Contacto } from "./pages/Contacto";
import { Registro } from "./pages/Registro";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true,        Component: Home     },
      { path: "garantia",   Component: Garantia },
      { path: "contacto",   Component: Contacto },
      { path: "registro",   Component: Registro },
    ],
  },
]);