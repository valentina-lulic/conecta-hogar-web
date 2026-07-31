import { useState } from "react";
import {
  profesionales,
  especialidades,
  obtenerEtiquetaProfesional,
  type Profesional,
} from "../data/profesionales.ts";

function iniciales(nombre: string) {
  return nombre
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function Profesionales() {
  const [busqueda, setBusqueda] = useState("");
  const [profesionalSeleccionado, setProfesionalSeleccionado] =
    useState<Profesional | null>(null);

  const profesionalesFiltrados = profesionales.filter((p: Profesional) => {
    const especialidad = especialidades.find(
      (e) => e.key === p.especialidad
    );

    const texto =
      `${p.nombre} ${especialidad?.nombre} ${p.certificacion || ""} ${p.direccion || ""}`
        .toLowerCase();

    return texto.includes(busqueda.toLowerCase());
  });

  return (
    <div
      className="w-full min-h-screen bg-cover bg-no-repeat font-sans bg-top"
      style={{
        backgroundImage: "url('/FONDOAPPFINAL.png')",
      }}
    >
      {/* Hero Section */}
      <section className="relative pt-28 sm:pt-36 pb-10 sm:pb-14 px-4 sm:px-6 text-center -mt-16 sm:-mt-24 isolate overflow-hidden">
        {/* Capa de degradado + blur + difuminado */}
        <div
          className="absolute inset-0 -z-10 backdrop-blur-sm"
          style={{
            background:
              "linear-gradient(90deg, rgba(14, 165, 233, 0.55) 0%, rgba(34, 197, 94, 0.45) 50%, rgba(234, 179, 8, 0.55) 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 75%, transparent 100%)",
            maskImage: "linear-gradient(to bottom, black 75%, transparent 100%)",
          }}
        />
        <div className="max-w-3xl mx-auto">
          <span className="inline-block text-xs font-bold tracking-wider uppercase text-white bg-navy/30 px-3.5 py-1.5 rounded-full mb-3 sm:mb-4">
            Directorio de profesionales
          </span>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-teal leading-tight mb-2 font-poppins">
            Encuentra al profesional
            <span className="text-coral"> perfecto</span>
            <br />
            para tu hogar
          </h1>
          <p className="mt-2 sm:mt-3 text-sm sm:text-base text-teal/90 max-w-lg mx-auto px-2">
            Explora por especialidad, revisa su certificación y la satisfacción
            de clientes anteriores antes de contactarlo.
          </p>

          {/* Buscador Responsivo */}
          <div className="mt-6 sm:mt-7 max-w-xl mx-auto flex flex-col sm:flex-row items-stretch sm:items-center bg-[#fffdf6] rounded-2xl sm:rounded-full p-2 sm:p-1.5 sm:pl-6 shadow-xl gap-2 sm:gap-0">
            <div className="flex items-center flex-1 px-2 sm:px-0">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                className="text-muted-foreground shrink-0"
              >
                <circle cx="11" cy="11" r="7" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="¿Qué tipo de profesional necesitas?"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full bg-transparent border-none outline-none px-3 py-2 text-sm text-foreground placeholder-muted-foreground font-medium"
              />
            </div>
            <button className="bg-coral hover:bg-coral-dark text-white font-bold text-sm px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-full transition-colors cursor-pointer font-poppins w-full sm:w-auto">
              Buscar
            </button>
          </div>
          <p className="mt-3 text-xs text-teal/80">
            {busqueda && `${profesionalesFiltrados.length} resultados`}
          </p>
        </div>
      </section>

      {/* Secciones por Especialidad */}
      <main id="sectionsContainer" className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
        {especialidades.map((esp) => {
          const listaFiltrada = profesionalesFiltrados.filter(
            (p) => p.especialidad === esp.key
          );

          if (busqueda && listaFiltrada.length === 0) return null;

          return (
            <section className="py-6" key={esp.key}>
              {/* Título de Especialidad y Contador */}
              <div className="flex items-center gap-3 mb-5">
                <span
                  className="w-3.5 h-3.5 rounded-full shrink-0 shadow-xs"
                  style={{ background: esp.color }}
                />
                <h2 className="text-xl sm:text-2xl font-extrabold text-white font-poppins drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)] tracking-wide">
                  {esp.nombre}
                </h2>
                <span className="text-xs text-white bg-coral px-2.5 py-0.5 rounded-full font-bold shadow-xs border-none">
                  {listaFiltrada.length}
                </span>
              </div>

              {/* Grid de Tarjetas Responsivo */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
                {listaFiltrada
                  .sort((a, b) => {
                    const peso = (prof: Profesional) => {
                      const tag = obtenerEtiquetaProfesional(prof)?.claseCSS;
                      if (tag === "top") return 3;
                      if (tag === "verificada") return 2;
                      if (tag === "destacado") return 1;
                      return 0;
                    };
                    return peso(b) - peso(a) || b.likes - a.likes;
                  })
                  .map((p) => {
                    const badgeInfo = obtenerEtiquetaProfesional(p);

                    return (
                      <article
                        className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between p-4 sm:p-5"
                        key={p.id}
                      >
                        <div className="flex flex-col gap-3.5">
                          {/* Fila Superior: Foto + Info */}
                          <div className="flex items-start gap-3.5">
                            <div className="relative shrink-0">
                              <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl overflow-hidden bg-slate-100 flex items-center justify-center font-bold text-turquoise-dark text-lg font-poppins">
                                {p.foto ? (
                                  <img
                                    src={p.foto}
                                    alt={p.nombre}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  iniciales(p.nombre)
                                )}
                              </div>
                              <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white" />
                            </div>

                            <div className="flex flex-col items-start gap-0.5 min-w-0 flex-1">
                              <h3 className="text-base font-extrabold text-slate-900 leading-tight font-poppins truncate w-full">
                                {p.nombre}
                              </h3>

                              {/* Badge */}
                              {badgeInfo && (
                                <span
                                  className={`inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-full my-0.5 text-white ${
                                    badgeInfo.claseCSS === "top"
                                      ? "bg-coral"
                                      : badgeInfo.claseCSS === "verificada"
                                      ? "bg-turquoise"
                                      : "bg-yellow-brand !text-slate-900!"
                                  }`}
                                >
                                  {badgeInfo.label}
                                </span>
                              )}

                              <p className="text-xs font-medium text-slate-500 line-clamp-1">
                                {p.certificacion}
                              </p>

                              {/* Likes */}
                              <div className="flex items-center gap-1.5 mt-0.5 text-xs text-slate-500">
                                <svg
                                  width="14"
                                  height="14"
                                  viewBox="0 0 24 24"
                                  fill="#38bdf8"
                                  stroke="#38bdf8"
                                >
                                  <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                                </svg>
                                <span className="font-extrabold text-slate-900">
                                  {p.likes}
                                </span>
                                <span>Me gusta</span>
                              </div>
                            </div>
                          </div>

                          {/* Dirección / Ubicación */}
                          {p.direccion && (
                            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium -mt-0.5">
                              <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#94a3b8"
                                strokeWidth="2"
                                className="shrink-0"
                              >
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                <circle cx="12" cy="10" r="3" />
                              </svg>
                              <span className="truncate">{p.direccion}</span>
                            </div>
                          )}
                        </div>

                        {/* Botones de Acción */}
                        <div className="flex items-center gap-2.5 pt-3 mt-auto">
                          <button
                            className="flex-1 h-10 sm:h-11 px-4 rounded-full text-xs font-extrabold text-white bg-coral hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer shadow-xs"
                            onClick={() => setProfesionalSeleccionado(p)}
                          >
                            Contactar
                          </button>

                          <a
                            className="px-3.5 h-10 sm:h-11 rounded-full border-2 border-turquoise text-turquoise bg-white flex items-center justify-center hover:opacity-80 hover:scale-[1.03] active:scale-[0.97] transition-all"
                            href={`tel:${p.whatsapp}`}
                            aria-label="Llamar"
                          >
                            <svg
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#38bdf8"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                            </svg>
                          </a>
                        </div>
                      </article>
                    );
                  })}
              </div>
            </section>
          );
        })}

        {profesionalesFiltrados.length === 0 && (
          <div className="text-center py-16 text-muted-foreground font-medium text-sm bg-white/80 rounded-2xl backdrop-blur-xs">
            No encontramos profesionales que coincidan 🔍
          </div>
        )}
      </main>

      {/* Modal de contacto Responsivo */}
      {profesionalSeleccionado && (
        <div
          className="fixed inset-0 z-50 bg-[#16284a]/45 flex items-center justify-center p-4 animate-in fade-in duration-150"
          onClick={() => setProfesionalSeleccionado(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-sm w-full p-5 sm:p-7 relative shadow-2xl border border-border"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3.5 right-3.5 bg-background hover:bg-border text-muted-foreground w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-colors text-xs"
              onClick={() => setProfesionalSeleccionado(null)}
            >
              ✕
            </button>

            <div className="text-center mb-5">
              <div className="w-16 h-16 sm:w-17 sm:h-17 rounded-2xl bg-turquoise-dark text-white flex items-center justify-center font-bold text-lg mx-auto mb-2.5 overflow-hidden font-poppins">
                {profesionalSeleccionado.foto ? (
                  <img
                    src={profesionalSeleccionado.foto}
                    alt={profesionalSeleccionado.nombre}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                ) : (
                  iniciales(profesionalSeleccionado.nombre)
                )}
              </div>

              <h3 className="text-base font-bold text-slate-900 font-poppins">
                {profesionalSeleccionado.nombre}
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                {profesionalSeleccionado.certificacion}
              </p>
            </div>

            <div className="flex flex-col gap-2.5">
              <a
                className="flex items-center gap-3 p-3 rounded-xl border border-border hover:border-turquoise hover:bg-turquoise/10 transition-colors text-foreground text-sm font-semibold"
                href={`https://wa.me/${profesionalSeleccionado.whatsapp}`}
                target="_blank"
                rel="noreferrer"
              >
                <div className="w-9 h-9 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#FFF">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.124-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span>WhatsApp</span>
                  <span className="text-xs font-normal text-muted-foreground">
                    {profesionalSeleccionado.whatsapp}
                  </span>
                </div>
              </a>

              <a
                className="flex items-center gap-3 p-3 rounded-xl border border-border hover:border-turquoise hover:bg-turquoise/10 transition-colors text-foreground text-sm font-semibold"
                href={`tel:${profesionalSeleccionado.whatsapp}`}
              >
                <div className="w-9 h-9 rounded-full bg-turquoise-dark text-white flex items-center justify-center shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#FFF">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span>Llamar</span>
                  <span className="text-xs font-normal text-muted-foreground">
                    {profesionalSeleccionado.whatsapp}
                  </span>
                </div>
              </a>

              <a
                className="flex items-center gap-3 p-3 rounded-xl border border-border hover:border-turquoise hover:bg-turquoise/10 transition-colors text-foreground text-sm font-semibold"
                href={`mailto:${
                  profesionalSeleccionado.email || "contacto@conectahogar.cl"
                }`}
              >
                <div className="w-9 h-9 rounded-full bg-navy text-white flex items-center justify-center shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#FFF">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                </div>
                <div className="flex flex-col min-w-0">
                  <span>Correo</span>
                  <span className="text-xs font-normal text-muted-foreground truncate">
                    {profesionalSeleccionado.email || "correo@ejemplo.cl"}
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profesionales;