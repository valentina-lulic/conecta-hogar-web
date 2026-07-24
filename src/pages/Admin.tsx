import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  CheckCircle2,
  Clock,
  XCircle,
  LogOut,
  ShieldCheck,
  Search,
  UserCheck,
  AlertCircle,
  Loader2
} from "lucide-react";

const PINK = "#e83360";
const YELLOW = "#f5d318";
const SKY = "#55bcd9";
const DARK = "#0a6880";

// Cambiar por la URL real de tu backend
const API_URL = "http://localhost:8080/api";

interface Professional {
  id: number;
  name: string;
  specialty: string;
  location: string;
  status: "Pendiente" | "Aprobado" | "Rechazado";
  date: string;
}

export default function Admin() {
  const navigate = useNavigate();
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"Todos" | "Pendiente" | "Aprobado" | "Rechazado">("Todos");

  // 1. Cargar lista de profesionales desde el Backend
  useEffect(() => {
    const fetchProfessionals = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_URL}/admin/professionals`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setProfessionals(data);
        } else {
          console.error("Error al obtener profesionales:", response.statusText);
        }
      } catch (error) {
        console.error("Error conectando con el servidor:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfessionals();
  }, []);

  // 2. Cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  // 3. Cambiar estado de verificación en el Backend
  const handleStatusChange = async (id: number, newStatus: "Aprobado" | "Rechazado") => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/admin/professionals/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        // Actualizamos estado local
        setProfessionals(prev =>
          prev.map(p => p.id === id ? { ...p, status: newStatus } : p)
        );
      } else {
        alert("No se pudo actualizar el estado del profesional.");
      }
    } catch (error) {
      console.error("Error al actualizar estado:", error);
    }
  };

  // Filtrado de registros
  const filteredProfessionals = professionals.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "Todos" || p.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen py-10 px-4 md:px-10 relative z-10" style={{ backgroundColor: "rgba(249, 250, 251, 0.85)" }}>
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Encabezado */}
        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <ShieldCheck size={24} style={{ color: PINK }} />
              <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full text-white" style={{ background: PINK }}>
                Panel de Control
              </span>
            </div>
            <h1 className="text-3xl font-black" style={{ fontFamily: "'Nunito', sans-serif", color: DARK }}>
              Gestión de Profesionales
            </h1>
            <p className="text-sm font-semibold text-gray-500 mt-1">
              Verifica y administra las solicitudes del sistema
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-black text-sm text-red-600 bg-red-50 border border-red-100 hover:bg-red-100 transition-colors"
          >
            <LogOut size={16} />
            Cerrar Sesión
          </motion.button>
        </div>

        {/* Tarjetas de Estadísticas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="p-3 rounded-xl" style={{ backgroundColor: `${SKY}20` }}>
              <Users size={22} style={{ color: SKY }} />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400">Total Solicitudes</p>
              <p className="text-2xl font-black" style={{ color: DARK }}>{professionals.length}</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="p-3 rounded-xl" style={{ backgroundColor: `${YELLOW}30` }}>
              <Clock size={22} style={{ color: "#d9ab00" }} />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400">Pendientes</p>
              <p className="text-2xl font-black" style={{ color: DARK }}>
                {professionals.filter(p => p.status === "Pendiente").length}
              </p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-green-100">
              <UserCheck size={22} className="text-green-600" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400">Aprobados</p>
              <p className="text-2xl font-black" style={{ color: DARK }}>
                {professionals.filter(p => p.status === "Aprobado").length}
              </p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-red-100">
              <AlertCircle size={22} className="text-red-600" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400">Rechazados</p>
              <p className="text-2xl font-black" style={{ color: DARK }}>
                {professionals.filter(p => p.status === "Rechazado").length}
              </p>
            </div>
          </div>
        </div>

        {/* Tabla de Administración */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-4 justify-between mb-6">
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 max-w-md flex-1">
              <Search size={16} className="text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por nombre o especialidad..."
                value={searchTerm}
                onChange={e => setSearchQuery(e.target.value)}
                className="bg-transparent outline-none text-sm font-semibold text-gray-700 w-full"
              />
            </div>

            <div className="flex gap-2 overflow-x-auto pb-1 md:pb-0">
              {(["Todos", "Pendiente", "Aprobado", "Rechazado"] as const).map(status => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${filterStatus === status
                      ? "bg-gray-800 text-white shadow"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 text-gray-400 gap-2">
              <Loader2 className="animate-spin" size={32} style={{ color: SKY }} />
              <p className="text-sm font-semibold">Cargando datos del servidor...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-wider">
                    <th className="pb-4">Profesional</th>
                    <th className="pb-4">Especialidad</th>
                    <th className="pb-4">Ubicación</th>
                    <th className="pb-4">Fecha</th>
                    <th className="pb-4">Estado</th>
                    <th className="pb-4 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredProfessionals.length > 0 ? (
                    filteredProfessionals.map(pro => (
                      <tr key={pro.id} className="text-sm font-semibold hover:bg-gray-50/50 transition-colors">
                        <td className="py-4 font-bold" style={{ color: DARK }}>{pro.name}</td>
                        <td className="py-4 text-gray-600">{pro.specialty}</td>
                        <td className="py-4 text-gray-500">{pro.location}</td>
                        <td className="py-4 text-gray-400 text-xs">{pro.date}</td>
                        <td className="py-4">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black ${pro.status === "Aprobado" ? "bg-green-100 text-green-700" :
                              pro.status === "Pendiente" ? "bg-yellow-100 text-yellow-700" :
                                "bg-red-100 text-red-700"
                            }`}>
                            {pro.status === "Aprobado" && <CheckCircle2 size={12} />}
                            {pro.status === "Pendiente" && <Clock size={12} />}
                            {pro.status === "Rechazado" && <XCircle size={12} />}
                            {pro.status}
                          </span>
                        </td>
                        <td className="py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {pro.status !== "Aprobado" && (
                              <button
                                onClick={() => handleStatusChange(pro.id, "Aprobado")}
                                className="px-3 py-1.5 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 font-bold text-xs transition-colors"
                              >
                                Aprobar
                              </button>
                            )}
                            {pro.status !== "Rechazado" && (
                              <button
                                onClick={() => handleStatusChange(pro.id, "Rechazado")}
                                className="px-3 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 font-bold text-xs transition-colors"
                              >
                                Rechazar
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="text-center py-8 text-gray-400 font-medium">
                        No se encontraron registros.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}