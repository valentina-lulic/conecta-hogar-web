import { useState } from "react";
import { profesionales, especialidades, type Profesional, } from "../data/profesionales";
import "../styles/Profesionales.css";

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

  const profesionalesFiltrados = profesionales.filter((p: any) => {
    const especialidad = especialidades.find(
      (e: any) => e.key === p.especialidad
    );

    const texto =
      `${p.nombre} ${especialidad?.nombre} ${p.certificacion} ${p.direccion || ""}`
        .toLowerCase();

    return texto.includes(busqueda.toLowerCase());
  });

  function porcentajeLikes(p: any) {
    const total = p.likes + p.dislikes;
    return total
      ? Math.round((p.likes / total) * 100)
      : 0;
  }

  function etiquetaProfesional(p: any) {
    const porcentaje = porcentajeLikes(p);
    if (porcentaje >= 95) {
      return "Top Profesional";
    }
    if (porcentaje >= 85) {
      return "Verificado";
    }
    return "Destacado";
  }

  return (
    <>
      <section className="hero">
        <div className="hero-inner">
          <span className="hero-eyebrow">
            Directorio de profesionales
          </span>
          <h1>
            Encuentra al profesional
            <span className="accent">
              {" "}perfecto
            </span>
            <br />
            para tu hogar
          </h1>
          <p>
            Explora por especialidad, revisa su
            certificación y la satisfacción de clientes
            anteriores antes de contactarlo.
          </p>
          <div className="hero-search">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
            >
              <circle cx="11" cy="11" r="7" />
              <line
                x1="21"
                y1="21"
                x2="16.65"
                y2="16.65"
              />
            </svg>
            <input
              type="text"
              placeholder="¿Qué tipo de profesional necesitas?"
              value={busqueda}
              onChange={(e) =>
                setBusqueda(e.target.value)
              }
            />
            <button>
              Buscar
            </button>
          </div>
          <p className="search-meta">
            {
              busqueda &&
              `${profesionalesFiltrados.length} resultados`
            }
          </p>
        </div>
      </section>

      <main id="sectionsContainer">
        {
          especialidades.map((esp: any) => (
            <section
              className="specialty-section"
              key={esp.key}
            >
              <div className="section-head">
                <span
                  className="section-dot"
                  style={{
                    background: esp.color
                  }}
                />
                <h2>
                  {esp.nombre}
                </h2>
                <span className="section-count">
                  {
                    profesionalesFiltrados.filter(
                      (p: any) => p.especialidad === esp.key
                    ).length
                  }
                </span>
              </div>

              <div className="card-grid">
                {
                  profesionalesFiltrados
                    .filter(
                      (p: any) => p.especialidad === esp.key
                    )
                    .map((p: any) => (
                      <article
                        className="card"
                        key={p.id}
                      >
                        <div className="card-body">
                          <div className="card-header">
                            <div
                              className="card-avatar-wrap"
                              style={{
                                ["--card-accent" as string]:
                                esp.color
                              }}
                            >
                              <div className="card-avatar">
                                {p.foto ? (
                                  <img
                                    src={p.foto}
                                    alt={p.nombre}
                                    style={{
                                      width: "100%",
                                      height: "100%",
                                      objectFit: "cover",
                                      borderRadius: "50%"
                                    }}
                                  />
                                ) : (
                                  iniciales(p.nombre)
                                )}
                              </div>
                              <span className="status-dot" />
                            </div>

                            <div>
                              <h3 className="card-name">
                                {p.nombre}
                              </h3>
                              <span className="status-badge">
                                {
                                  etiquetaProfesional(p)
                                }
                              </span>
                              <p className="card-specialty">
                                {esp.nombre}
                              </p>
                            </div>
                          </div>

                          <div className="info-row likes">
                            👍 {p.likes}
                            <span>
                              Me gusta
                            </span>
                          </div>

                          <div className="info-row cert">
                            ✓
                            <span>
                              {p.certificacion}
                            </span>
                          </div>

                          {/* Sección de Dirección agregada */}
                          {p.direccion && (
                            <div className="info-row direccion" style={{ fontSize: "13px", color: "#666", display: "flex", alignItems: "center", gap: "6px" }}>
                              📍 <span>{p.direccion}</span>
                            </div>
                          )}

                          <hr className="card-divider" />

                          <div className="card-actions">
                            <button
                              className="btn-contactar"
                              onClick={() =>
                                setProfesionalSeleccionado(p)
                              }
                            >
                              Contactar
                            </button>

                            <a
                              className="btn-llamar"
                              href={`tel:${p.whatsapp}`}
                            >
                              ☎
                            </a>
                          </div>
                        </div>
                      </article>
                    ))
                }
              </div>
            </section>
          ))
        }

        {
          profesionalesFiltrados.length === 0 &&
          <div className="empty-state">
            No encontramos profesionales que coincidan 🔍
          </div>
        }
      </main>

      {/* MODAL CON ICONOS MEJORADOS */}
      {
        profesionalSeleccionado && (
          <div
            className="modal-overlay open"
            onClick={() =>
              setProfesionalSeleccionado(null)
            }
          >
            <div
              className="modal"
              onClick={(e) =>
                e.stopPropagation()
              }
            >
              <button
                className="modal-close"
                onClick={() =>
                  setProfesionalSeleccionado(null)
                }
              >
                ✕
              </button>

              <div className="modal-header">
                <div className="modal-avatar">
                  {profesionalSeleccionado.foto ? (
                    <img
                      src={profesionalSeleccionado.foto}
                      alt={profesionalSeleccionado.nombre}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "50%"
                      }}
                    />
                  ) : (
                    iniciales(
                      profesionalSeleccionado.nombre
                    )
                  )}
                </div>

                <h3>
                  {
                    profesionalSeleccionado.nombre
                  }
                </h3>

                <p>
                  {
                    profesionalSeleccionado.especialidad
                  }
                </p>
              </div>

              {/* Opciones de contacto con íconos vectoriales limpios */}
              <div className="modal-actions-list" style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "20px" }}>
                <a
                  className="contact-option"
                  href={`https://wa.me/${profesionalSeleccionado.whatsapp}`}
                  style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px", border: "1px solid #e2e8f0", borderRadius: "12px", textDecoration: "none", color: "#1e293b", fontWeight: 500 }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#25D366"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.124-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                  <div>
                    <div style={{ fontSize: "14px" }}>WhatsApp</div>
                    <div style={{ fontSize: "12px", color: "#64748b" }}>{profesionalSeleccionado.whatsapp}</div>
                  </div>
                </a>

                <a
                  className="contact-option"
                  href={`tel:${profesionalSeleccionado.whatsapp}`}
                  style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px", border: "1px solid #e2e8f0", borderRadius: "12px", textDecoration: "none", color: "#1e293b", fontWeight: 500 }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#0284c7"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                  <div>
                    <div style={{ fontSize: "14px" }}>Llamar</div>
                    <div style={{ fontSize: "12px", color: "#64748b" }}>{profesionalSeleccionado.whatsapp}</div>
                  </div>
                </a>

                <a
                  className="contact-option"
                  href={`mailto:${profesionalSeleccionado.email || "contacto@conectahogar.cl"}`}
                  style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px", border: "1px solid #e2e8f0", borderRadius: "12px", textDecoration: "none", color: "#1e293b", fontWeight: 500 }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#475569"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                  <div>
                    <div style={{ fontSize: "14px" }}>Correo</div>
                    <div style={{ fontSize: "12px", color: "#64748b" }}>{profesionalSeleccionado.email || "correo@ejemplo.cl"}</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        )
      }

    </>
  );
}

export default Profesionales;