import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import bgImg from "../../assets/images/FONDOAPPFINAL.webp";

interface PageStyle {
  bgPosition: string;
}

const PAGE_STYLES: Record<string, PageStyle> = {
  // 🟢 Home: Se mantiene en la cima turquesa
  home: {
    bgPosition: "top center",
  },
  // 🟡 Contacto: Bajamos a 42% para ocultar todo el verde y centrar el amarillo puro
  contacto: {
    bgPosition: "center 40%",
  },
  // 🟠 Garantía: Bajamos a 88% para cortar el amarillo e iniciar en el naranja cálido
  garantia: {
    bgPosition: "center 90%",
  },
  // ⚪ Vista por defecto
  default: {
    bgPosition: "top center",
  },
};

export function MapBackground() {
  const { pathname } = useLocation();
  const path = pathname.toLowerCase().replace("/", "");

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = bgImg as unknown as string;
    document.head.appendChild(link);
  }, []);

  let currentKey = "default";
  if (path === "" || path === "home") currentKey = "home";
  else if (path.includes("contacto")) currentKey = "contacto";
  else if (path.includes("garantia")) currentKey = "garantia";

  const currentStyle = PAGE_STYLES[currentKey] || PAGE_STYLES.default;

  return (
    <div
      className="fixed md:absolute inset-0 z-0 pointer-events-none bg-no-repeat transition-all duration-300"
      style={{
        backgroundImage: `url(${bgImg as unknown as string})`,
        backgroundSize: "cover",
        backgroundPosition: currentStyle.bgPosition,
      }}
      aria-hidden
    />
  );
}

export default MapBackground;