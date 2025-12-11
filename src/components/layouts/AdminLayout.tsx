import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Home,
  Menu,
  X,
  Package,
  Store,
  PackagePlus,
  Users,
  ChevronDown,
  Tags,
} from "lucide-react";
import { useAuth } from "../../context/useAuth";

export default function AdminLayout() {

  const location = useLocation();
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [open, setOpen] = useState<boolean>(false)
  const { isAuthenticated, user, logout } = useAuth()
  const links = [
    { to: "/admin/home", label: "Home", icon: <Home size={18} /> },
    { to: "/panel/usuarios", label: "Usuarios", icon: <Users size={18} /> },
    { to: "/panel/articulos", label: "Articulos", icon: <Package size={18} /> },
    { to: "/panel/proveedores", label: "Proveedores", icon: <Store size={18} /> },
    { to: "/panel/ingresos", label: "Ingresos", icon: <PackagePlus size={18} /> },
    { to: "/panel/categorias", label: "Categorias", icon: <Tags size={18} /> },
    { to: "/panel/subcategorias", label: "Subcategorias", icon: <Tags size={18} /> },
    { to: "/panel/subsubcategorias", label: "Subsubcategorias", icon: <Tags size={18} /> },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar móvil */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden transition ${sidebarOpen ? "block" : "hidden"
          }`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      <aside
        className={`fixed top-0 left-0 w-64 bg-black text-gray-300 p-4 z-50 transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static`}
      >
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-sm font-bold text-white border-b border-gray-700 pb-2">
            Admin Dashboard
          </h1>
          <button
            className="md:hidden text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex flex-col gap-4">
          {links.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-2 px-3 py-2 rounded-md transition ${isActive
                  ? "bg-[#B8860B] text-white"
                  : "hover:bg-[#B8860B] hover:text-white"
                  }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1 flex overflow-auto flex-col">
        {/* Topbar */}
        <header className="flex justify-between items-center bg-black text-white px-6 py-3 border-b border-gray-700">
          <div className="flex items-center gap-2 font-bold text-lg">
            {/* Botón hamburguesa móvil */}
            <button
              className="md:hidden text-white"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
          </div>

          <div className="flex items-center gap-4">

            <div className="relative flex flex-row justify-center items-center">
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-1 px-3 py-2 rounded-md hover:bg-gray-800"
              >
                <p className="text-sm font-medium text-white">
                  {user?.nombre ? `Hola, ${user?.nombre}` : "Hola, Inicia sesión"}
                </p>
                <ChevronDown className="w-4 h-4 text-white" />
              </button>

              {open && (
                <div className="absolute top-10 right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-200 z-20">
                  {isAuthenticated && (
                    <ul className="py-2 text-sm text-gray-700">
                      <li>
                        <span className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            navigate("/panel/configuracion")
                            setOpen(false)
                          }}>
                          Configuración
                        </span>
                      </li>
                      <li>
                        <span
                          className="block px-4 py-2 text-red-600 font-medium hover:bg-gray-100 cursor-pointer"
                          onClick={logout}
                        >
                          Logout
                        </span>
                      </li>
                    </ul>
                  )}
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Contenido dinámico */}
        <main className="flex-1 bg-gray-200 p-3 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
