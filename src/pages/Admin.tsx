import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
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
  Loader2,
  LayoutDashboard,
  BarChart3,
  Settings as SettingsIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  Eye,
  Pencil,
  RefreshCw,
  Save,
  Home,
  TrendingUp,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

// ---- Paleta de marca Conecta Hogar ----
const PINK = "#e83360";
const YELLOW = "#f5d318";
const SKY = "#55bcd9";
const DARK = "#0a6880";

// Cambiar por la URL real de tu backend
const API_URL = "http://localhost:8080/api";

type Tab = "dashboard" | "profesionales" | "usuarios" | "estadisticas" | "configuracion";

interface Professional {
  id: number;
  name: string;
  specialty: string;
  location: string;
  status: "Pendiente" | "Aprobado" | "Rechazado";
  date: string;
}

type Role = "Cliente" | "Profesional" | "Administrador";
type UserStatus = "Activo" | "Inactivo";

interface AppUser {
  id: number;
  name: string;
  email: string;
  role: Role;
  status: UserStatus;
  registeredAt: string;
}

const FALLBACK_USERS: AppUser[] = [
  { id: 1, name: "Valentina Rojas", email: "v.rojas@gmail.com", role: "Cliente", status: "Activo", registeredAt: "14-01-2024" },
  { id: 2, name: "Carlos Mendoza", email: "cmendoza@hotmail.com", role: "Profesional", status: "Activo", registeredAt: "02-02-2024" },
  { id: 3, name: "Sofía Torres", email: "sofia.torres@icloud.com", role: "Cliente", status: "Inactivo", registeredAt: "19-02-2024" },
  { id: 4, name: "Ricardo Fuentes", email: "rfuentes@empresa.cl", role: "Administrador", status: "Activo", registeredAt: "29-02-2024" },
  { id: 5, name: "Camila Vega", email: "camivega@gmail.com", role: "Profesional", status: "Activo", registeredAt: "13-03-2024" },
];

const ROLE_STYLES: Record<Role, string> = {
  Cliente: "bg-sky-100 text-sky-700",
  Profesional: "bg-yellow-100 text-yellow-700",
  Administrador: "bg-pink-100 text-pink-700",
};

const FALLBACK_MONTHLY = [
  { month: "Ene", total: 8 },
  { month: "Feb", total: 10 },
  { month: "Mar", total: 7 },
  { month: "Abr", total: 18 },
  { month: "May", total: 22 },
  { month: "Jun", total: 15 },
  { month: "Jul", total: 27 },
];

export default function AdminPanel() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // ---- Estado: Profesionales (conectado a tu backend real) ----
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [loadingProfessionals, setLoadingProfessionals] = useState(true);
  const [filterStatus, setFilterStatus] = useState<"Todos" | "Pendiente" | "Aprobado" | "Rechazado">("Todos");
  const [searchTerm, setSearchQuery] = useState("");

  // ---- Estado: Usuarios ----
  const [users, setUsers] = useState<AppUser[]>(FALLBACK_USERS);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [usingFallbackUsers, setUsingFallbackUsers] = useState(true);
  const [userSearch, setUserSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<"Todos" | Role>("Todos");
  const [statusFilter, setStatusFilter] = useState<"Todos" | UserStatus>("Todos");

  // ---- Estado: Configuración ----
  const [platformName, setPlatformName] = useState("Conecta Hogar");
  const [supportEmail, setSupportEmail] = useState("soporte@conectahogar.cl");
  const [commission, setCommission] = useState("8");
  const [savingSettings, setSavingSettings] = useState(false);
  const [settingsSaved, setSettingsSaved] = useState(false);

  // 1. Cargar profesionales desde el Backend
  useEffect(() => {
    const fetchProfessionals = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_URL}/admin/professionals`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
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
        setLoadingProfessionals(false);
      }
    };
    fetchProfessionals();
  }, []);

  // 2. Cargar usuarios desde el Backend (con datos de respaldo si el endpoint no existe aún)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_URL}/admin/users`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
          setUsingFallbackUsers(false);
        }
      } catch (error) {
        console.error("Error conectando con el servidor:", error);
      } finally {
        setLoadingUsers(false);
      }
    };
    fetchUsers();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  // 3. Cambiar estado de verificación de un profesional
  const handleStatusChange = async (id: number, newStatus: "Aprobado" | "Rechazado") => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/admin/professionals/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (response.ok) {
        setProfessionals((prev) => prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p)));
      } else {
        alert("No se pudo actualizar el estado del profesional.");
      }
    } catch (error) {
      console.error("Error al actualizar estado:", error);
    }
  };

  const handleSaveSettings = async () => {
    setSavingSettings(true);
    setSettingsSaved(false);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/admin/settings`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ platformName, supportEmail, commission: Number(commission) }),
      });
      if (response.ok) {
        setSettingsSaved(true);
      } else {
        alert("No se pudo guardar la configuración.");
      }
    } catch (error) {
      console.error("Error al guardar configuración:", error);
    } finally {
      setSavingSettings(false);
    }
  };

  const filteredProfessionals = professionals.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "Todos" || p.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearch.toLowerCase());
    const matchesRole = roleFilter === "Todos" || u.role === roleFilter;
    const matchesStatus = statusFilter === "Todos" || u.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const initials = (name: string) =>
    name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();

  const clients = users.filter((u) => u.role === "Cliente").length;
  const profesionalesUsuarios = users.filter((u) => u.role === "Profesional").length;
  const admins = users.filter((u) => u.role === "Administrador").length;
  const activeUsers = users.filter((u) => u.status === "Activo").length;
  const inactiveUsers = users.filter((u) => u.status === "Inactivo").length;

  const distribution = [
    { name: "Clientes", value: clients, color: SKY },
    { name: "Profesionales", value: profesionalesUsuarios, color: YELLOW },
    { name: "Administradores", value: admins, color: PINK },
  ];

  const NAV_ITEMS: { key: Tab; label: string; icon: React.ElementType }[] = [
    { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { key: "profesionales", label: "Gestión Profesionales", icon: UserCheck },
    { key: "usuarios", label: "Gestión de Usuarios", icon: Users },
    { key: "estadisticas", label: "Estadísticas", icon: BarChart3 },
    { key: "configuracion", label: "Configuración", icon: SettingsIcon },
  ];

  return (
    <div
      className="flex h-screen text-gray-800 font-sans overflow-hidden"
      style={{ backgroundColor: "rgba(249, 250, 251, 0.85)" }}
    >
      {/* SIDEBAR */}
      <aside
        className={`${sidebarOpen ? "w-64" : "w-20"} bg-white border-r border-gray-100 transition-all duration-300 flex flex-col justify-between z-20`}
      >
        <div>
          <div className="p-5 flex items-center gap-2 border-b border-gray-100">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: PINK }}>
              <Home size={18} className="text-white" />
            </div>
            {sidebarOpen && (
              <div>
                <h1 className="font-black text-gray-900 text-base leading-tight" style={{ fontFamily: "'Nunito', sans-serif" }}>
                  Conecta Hogar
                </h1>
                <span
                  className="inline-block mt-1 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full text-white"
                  style={{ background: PINK }}
                >
                  Panel Admin
                </span>
              </div>
            )}
          </div>

          <nav className="p-3 space-y-1.5">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const active = activeTab === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => setActiveTab(item.key)}
                  className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-black transition-colors ${active ? "text-white" : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                    }`}
                  style={{ backgroundColor: active ? PINK : "transparent" }}
                >
                  <Icon size={18} className="shrink-0" />
                  {sidebarOpen && <span>{item.label}</span>}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-3 border-t border-gray-100 space-y-1.5">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-bold text-gray-500 hover:bg-gray-50 transition-colors"
          >
            {sidebarOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} className="mx-auto" />}
            {sidebarOpen && <span>Ocultar</span>}
          </button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl font-black text-sm text-red-600 bg-red-50 border border-red-100 hover:bg-red-100 transition-colors"
          >
            <LogOut size={18} className="shrink-0" />
            {sidebarOpen && <span>Cerrar sesión</span>}
          </motion.button>
        </div>
      </aside>

      {/* CONTENIDO */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8 space-y-6 max-w-6xl mx-auto">
          {/* ---------- DASHBOARD ---------- */}
          {activeTab === "dashboard" && (
            <>
              <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
                <h2 className="text-3xl font-black" style={{ fontFamily: "'Nunito', sans-serif", color: DARK }}>
                  Dashboard
                </h2>
                <p className="text-sm font-semibold text-gray-500 mt-1">
                  Resumen general de la plataforma Conecta Hogar
                </p>
                {usingFallbackUsers && (
                  <p className="text-xs font-semibold text-gray-400 mt-3">
                    Mostrando datos de ejemplo — conecta el endpoint /admin/users para ver datos reales.
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard icon={Users} color={SKY} label="Total usuarios" value={users.length} />
                <StatCard icon={UserCheck} color={SKY} label="Clientes" value={clients} />
                <StatCard icon={ShieldCheck} color={YELLOW} iconColor="#d9ab00" label="Profesionales" value={profesionalesUsuarios} />
                <StatCard icon={ShieldCheck} color={PINK} label="Administradores" value={admins} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <StatCard icon={UserCheck} colorClass="bg-green-100" iconClass="text-green-600" label="Usuarios activos" value={activeUsers} />
                <StatCard icon={XCircle} colorClass="bg-red-100" iconClass="text-red-600" label="Usuarios inactivos" value={inactiveUsers} />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
                  <div className="flex items-center gap-2 mb-6">
                    <TrendingUp size={18} style={{ color: PINK }} />
                    <h3 className="text-sm font-black text-gray-700 uppercase tracking-wide">Nuevos usuarios por mes</h3>
                  </div>
                  <ResponsiveContainer width="100%" height={260}>
                    <BarChart data={FALLBACK_MONTHLY}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" />
                      <XAxis dataKey="month" tick={{ fontSize: 12, fontWeight: 700, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #f1f1f1", fontWeight: 600, fontSize: 13 }} />
                      <Bar dataKey="total" fill={PINK} radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
                  <div className="flex items-center gap-2 mb-6">
                    <Users size={18} style={{ color: SKY }} />
                    <h3 className="text-sm font-black text-gray-700 uppercase tracking-wide">Distribución por tipo</h3>
                  </div>
                  <ResponsiveContainer width="100%" height={260}>
                    <PieChart>
                      <Pie data={distribution} dataKey="value" nameKey="name" innerRadius={60} outerRadius={90} paddingAngle={3}>
                        {distribution.map((entry) => (
                          <Cell key={entry.name} fill={entry.color} />
                        ))}
                      </Pie>
                      <Legend iconType="circle" wrapperStyle={{ fontSize: 12, fontWeight: 700 }} />
                      <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #f1f1f1", fontWeight: 600, fontSize: 13 }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </>
          )}

          {/* ---------- GESTIÓN DE PROFESIONALES ---------- */}
          {activeTab === "profesionales" && (
            <>
              <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 mb-1">
                  <ShieldCheck size={24} style={{ color: PINK }} />
                  <span
                    className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full text-white"
                    style={{ background: PINK }}
                  >
                    Panel de Control
                  </span>
                </div>
                <h2 className="text-3xl font-black" style={{ fontFamily: "'Nunito', sans-serif", color: DARK }}>
                  Gestión de Profesionales
                </h2>
                <p className="text-sm font-semibold text-gray-500 mt-1">
                  Verifica y administra las solicitudes del sistema
                </p>
              </div>

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
                      {professionals.filter((p) => p.status === "Pendiente").length}
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
                      {professionals.filter((p) => p.status === "Aprobado").length}
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
                      {professionals.filter((p) => p.status === "Rechazado").length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8">
                <div className="flex flex-col md:flex-row gap-4 justify-between mb-6">
                  <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 max-w-md flex-1">
                    <Search size={16} className="text-gray-400" />
                    <input
                      type="text"
                      placeholder="Buscar por nombre o especialidad..."
                      value={searchTerm}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-transparent outline-none text-sm font-semibold text-gray-700 w-full"
                    />
                  </div>
                  <div className="flex gap-2 overflow-x-auto pb-1 md:pb-0">
                    {(["Todos", "Pendiente", "Aprobado", "Rechazado"] as const).map((status) => (
                      <button
                        key={status}
                        onClick={() => setFilterStatus(status)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${filterStatus === status ? "bg-gray-800 text-white shadow" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                          }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>

                {loadingProfessionals ? (
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
                          filteredProfessionals.map((pro) => (
                            <tr key={pro.id} className="text-sm font-semibold hover:bg-gray-50/50 transition-colors">
                              <td className="py-4 font-bold" style={{ color: DARK }}>{pro.name}</td>
                              <td className="py-4 text-gray-600">{pro.specialty}</td>
                              <td className="py-4 text-gray-500">{pro.location}</td>
                              <td className="py-4 text-gray-400 text-xs">{pro.date}</td>
                              <td className="py-4">
                                <span
                                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black ${pro.status === "Aprobado"
                                    ? "bg-green-100 text-green-700"
                                    : pro.status === "Pendiente"
                                      ? "bg-yellow-100 text-yellow-700"
                                      : "bg-red-100 text-red-700"
                                    }`}
                                >
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
            </>
          )}

          {/* ---------- GESTIÓN DE USUARIOS ---------- */}
          {activeTab === "usuarios" && (
            <>
              <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-black" style={{ fontFamily: "'Nunito', sans-serif", color: DARK }}>
                    Gestión de Usuarios
                  </h2>
                  <p className="text-sm font-semibold text-gray-500 mt-1">
                    {filteredUsers.length} usuarios encontrados
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-black text-sm text-white transition-colors"
                  style={{ background: PINK }}
                >
                  <Plus size={16} />
                  Nuevo Usuario
                </motion.button>
              </div>

              {usingFallbackUsers && (
                <p className="text-xs font-semibold text-gray-400 -mt-4 px-2">
                  Mostrando datos de ejemplo — conecta el endpoint /admin/users para ver datos reales.
                </p>
              )}

              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8">
                <div className="flex flex-col md:flex-row gap-4 justify-between mb-6">
                  <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 max-w-md flex-1">
                    <Search size={16} className="text-gray-400" />
                    <input
                      type="text"
                      placeholder="Buscar por nombre o correo..."
                      value={userSearch}
                      onChange={(e) => setUserSearch(e.target.value)}
                      className="bg-transparent outline-none text-sm font-semibold text-gray-700 w-full"
                    />
                  </div>
                  <div className="flex gap-2">
                    <select
                      value={roleFilter}
                      onChange={(e) => setRoleFilter(e.target.value as "Todos" | Role)}
                      className="px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm font-bold text-gray-600 outline-none"
                    >
                      <option value="Todos">Todos los roles</option>
                      <option value="Cliente">Cliente</option>
                      <option value="Profesional">Profesional</option>
                      <option value="Administrador">Administrador</option>
                    </select>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value as "Todos" | UserStatus)}
                      className="px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm font-bold text-gray-600 outline-none"
                    >
                      <option value="Todos">Todos los estados</option>
                      <option value="Activo">Activo</option>
                      <option value="Inactivo">Inactivo</option>
                    </select>
                  </div>
                </div>

                {loadingUsers ? (
                  <div className="flex flex-col items-center justify-center py-12 text-gray-400 gap-2">
                    <Loader2 className="animate-spin" size={32} style={{ color: SKY }} />
                    <p className="text-sm font-semibold">Cargando usuarios...</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-wider">
                          <th className="pb-4">#</th>
                          <th className="pb-4">Usuario</th>
                          <th className="pb-4">Correo</th>
                          <th className="pb-4">Rol</th>
                          <th className="pb-4">Estado</th>
                          <th className="pb-4">Registro</th>
                          <th className="pb-4 text-right">Acciones</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {filteredUsers.length > 0 ? (
                          filteredUsers.map((u, i) => (
                            <tr key={u.id} className="text-sm font-semibold hover:bg-gray-50/50 transition-colors">
                              <td className="py-4 text-gray-400 text-xs">{String(i + 1).padStart(2, "0")}</td>
                              <td className="py-4">
                                <div className="flex items-center gap-3">
                                  <div
                                    className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-black text-white"
                                    style={{ background: SKY }}
                                  >
                                    {initials(u.name)}
                                  </div>
                                  <span className="font-bold" style={{ color: DARK }}>{u.name}</span>
                                </div>
                              </td>
                              <td className="py-4 text-gray-500">{u.email}</td>
                              <td className="py-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-black ${ROLE_STYLES[u.role]}`}>
                                  {u.role}
                                </span>
                              </td>
                              <td className="py-4">
                                <span
                                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black ${u.status === "Activo" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                                    }`}
                                >
                                  <span className={`w-1.5 h-1.5 rounded-full ${u.status === "Activo" ? "bg-green-600" : "bg-red-600"}`} />
                                  {u.status}
                                </span>
                              </td>
                              <td className="py-4 text-gray-400 text-xs">{u.registeredAt}</td>
                              <td className="py-4 text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <button className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors">
                                    <Eye size={15} />
                                  </button>
                                  <button className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors">
                                    <Pencil size={15} />
                                  </button>
                                  <button className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors">
                                    <RefreshCw size={15} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={7} className="text-center py-8 text-gray-400 font-medium">
                              No se encontraron registros.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </>
          )}

          {/* ---------- ESTADÍSTICAS ---------- */}
          {activeTab === "estadisticas" && (
            <>
              <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
                <h2 className="text-3xl font-black" style={{ fontFamily: "'Nunito', sans-serif", color: DARK }}>
                  Estadísticas del Sistema
                </h2>
                <p className="text-sm font-semibold text-gray-500 mt-1">
                  Métricas de rendimiento y actividad en Conecta Hogar
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <StatCard
                  icon={TrendingUp}
                  colorClass="bg-green-100"
                  iconClass="text-green-600"
                  label="Tasa de aprobación"
                  value={
                    professionals.length
                      ? Math.round((professionals.filter((p) => p.status === "Aprobado").length / professionals.length) * 100)
                      : 0
                  }
                  suffix="%"
                />
                <StatCard
                  icon={Clock}
                  color={YELLOW}
                  iconColor="#d9ab00"
                  label="Solicitudes pendientes"
                  value={professionals.filter((p) => p.status === "Pendiente").length}
                />
                <StatCard icon={Users} color={SKY} label="Usuarios activos" value={activeUsers} />
              </div>

              <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 mb-6">
                  <BarChart3 size={18} style={{ color: PINK }} />
                  <h3 className="text-sm font-black text-gray-700 uppercase tracking-wide">
                    Estado de solicitudes de profesionales
                  </h3>
                </div>
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart
                    data={[
                      { estado: "Pendiente", total: professionals.filter((p) => p.status === "Pendiente").length },
                      { estado: "Aprobado", total: professionals.filter((p) => p.status === "Aprobado").length },
                      { estado: "Rechazado", total: professionals.filter((p) => p.status === "Rechazado").length },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" />
                    <XAxis dataKey="estado" tick={{ fontSize: 12, fontWeight: 700, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #f1f1f1", fontWeight: 600, fontSize: 13 }} />
                    <Bar dataKey="total" fill={SKY} radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </>
          )}

          {/* ---------- CONFIGURACIÓN ---------- */}
          {activeTab === "configuracion" && (
            <>
              <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 mb-1">
                  <SettingsIcon size={22} style={{ color: PINK }} />
                  <h2 className="text-3xl font-black" style={{ fontFamily: "'Nunito', sans-serif", color: DARK }}>
                    Configuración
                  </h2>
                </div>
                <p className="text-sm font-semibold text-gray-500 mt-1">Ajustes generales de la plataforma</p>
              </div>

              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8 max-w-xl space-y-5">
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">Nombre de la plataforma</label>
                  <input
                    type="text"
                    value={platformName}
                    onChange={(e) => setPlatformName(e.target.value)}
                    className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm font-semibold text-gray-700 outline-none focus:border-gray-300"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">Correo de soporte</label>
                  <input
                    type="email"
                    value={supportEmail}
                    onChange={(e) => setSupportEmail(e.target.value)}
                    className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm font-semibold text-gray-700 outline-none focus:border-gray-300"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">Comisión por servicio (%)</label>
                  <input
                    type="number"
                    value={commission}
                    onChange={(e) => setCommission(e.target.value)}
                    className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm font-semibold text-gray-700 outline-none focus:border-gray-300"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSaveSettings}
                  disabled={savingSettings}
                  className="flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-sm text-white transition-colors disabled:opacity-60"
                  style={{ background: PINK }}
                >
                  {settingsSaved ? <CheckCircle2 size={16} /> : <Save size={16} />}
                  {savingSettings ? "Guardando..." : settingsSaved ? "Guardado" : "Guardar configuración"}
                </motion.button>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

function StatCard({
  icon: Icon,
  color,
  iconColor,
  colorClass,
  iconClass,
  label,
  value,
  suffix,
}: {
  icon: React.ElementType;
  color?: string;
  iconColor?: string;
  colorClass?: string;
  iconClass?: string;
  label: string;
  value: number;
  suffix?: string;
}) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
      <div className={`p-3 rounded-xl ${colorClass ?? ""}`} style={!colorClass ? { backgroundColor: `${color}20` } : undefined}>
        <Icon size={22} className={iconClass} style={!iconClass ? { color: iconColor ?? color } : undefined} />
      </div>
      <div>
        <p className="text-xs font-bold text-gray-400">{label}</p>
        <p className="text-2xl font-black" style={{ color: DARK }}>
          {value}
          {suffix}
        </p>
      </div>
    </div>
  );
}