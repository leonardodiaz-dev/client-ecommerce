import { ChevronDown, ChevronRight, Menu, Search, ShoppingCart, X } from "lucide-react";
import { useState } from "react";
import Drawer from "./Drawer";
import type { Categoria } from "../../interfaces/categoria";
import { listCategorias } from "../../services/categorias";
import { useFetchData } from "../../hooks/useFetchData";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

const NavBar = () => {

    const [search, setSearch] = useState<string>("")
    const navigate = useNavigate()
    const { isAuthenticated, user } = useAuth()
    const [open, setOpen] = useState<boolean>(false)
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [hoveredCategoria, setHoveredCategoria] = useState<number | null>(null);
    const { data: categorias, loading, error } = useFetchData<Categoria>(listCategorias);
    if (loading) return <p>Cargando...</p>;
    if (error) return <p>{error}</p>;
    
    return (
        <>
            <header className="bg-[#1E1E1E] text-white">
                <div className="flex flex-row justify-between px-3 items-center h-16">

                    <div className="flex flex-row justify-center items-center cursor-pointer gap-2"
                        onClick={() => setDrawerOpen(true)}>
                        <Menu />
                        <p>Menu</p>
                    </div>
                    <div className="flex flex-row justify-center items-center gap-5">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Buscar"
                                className="rounded-lg border text-black outline-none py-2 pl-3 pr-16 w-72 bg-white h-10"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />

                            {search !== "" && (
                                <button
                                    className="absolute top-2 cursor-pointer right-10"
                                    onClick={() => setSearch("")}
                                >
                                    <X color="black" />
                                </button>
                            )}

                            <button className="absolute top-0 -right-2 flex justify-center items-center rounded-full bg-gray-800 h-10 w-10">
                                <Search color="white" size={20} />
                            </button>
                        </div>
                        <div className="relative flex flex-row justify-center items-center">

                            <button
                                onClick={() => setOpen(!open)}
                                className="flex items-center gap-1 px-3 py-2 rounded-md hover:bg-gray-800"
                            >
                                <p className="text-sm font-medium text-white"> {user?.nombre ? `Hola, ${user?.nombre}` : 'Hola, Inicia sesión'}</p>
                                <ChevronDown className="w-4 h-4 text-white" />
                            </button>

                            {open && (
                                <div className="absolute top-10 right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-200 z-20">
                                    {isAuthenticated ? (
                                        <ul className="py-2 text-sm text-gray-700">
                                            <li>
                                                <span className="block px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                                    Mi cuenta
                                                </span>
                                            </li>
                                            <li>
                                                <span className="block px-4 py-2 text-red-600 font-medium hover:bg-gray-100 cursor-pointer">
                                                    Logout
                                                </span>
                                            </li>
                                        </ul>
                                    ) : (
                                        <ul className="py-2 text-sm text-gray-700">
                                            <li>
                                                <span className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                                    onClick={() => navigate("/login")}>
                                                    Inicia sesión
                                                </span>
                                            </li>
                                            <li>
                                                <span className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                                    onClick={() => navigate("/register")}>
                                                    Regístrate
                                                </span>
                                            </li>
                                            <li>
                                                <span className="block px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                                    Mi cuenta
                                                </span>
                                            </li>
                                        </ul>
                                    )
                                    }
                                </div>
                            )}
                        </div>
                        <button className="rounded-lg p-3 hover:bg-gray-100">
                            <ShoppingCart />
                        </button>
                    </div>
                </div>
            </header>
            <Drawer isOpen={drawerOpen} onClose={() => { setDrawerOpen(false); setHoveredCategoria(null) }} position="left">
                <nav className="relative flex">
                    <ul className="w-64 bg-white">
                        {categorias.map((c) => (
                            <li
                                key={c.idCategoria}
                                onMouseEnter={() => setHoveredCategoria(c.idCategoria)}
                                className="flex flex-row justify-between hover:font-semibold hover:bg-gray-200 p-3 hover:border-l-3 rounded-sm 
                                hover:border-l-[#B8860B] cursor-pointer"
                            >
                                <span>{c.nombre}</span>
                                <ChevronRight className="text-gray-500 hover:text-[#B8860B]" />
                            </li>
                        ))}
                    </ul>

                    {hoveredCategoria !== null && (
                        <div
                            className="absolute left-64 top-0 w-[800px] bg-gray-50 h-auto shadow-lg p-6 grid grid-cols-3 gap-6"
                        >
                            {categorias
                                .find((c) => c.idCategoria === hoveredCategoria)
                                ?.subcategorias.map((sub) => (
                                    <div key={sub.idSubcategoria}>
                                        <h3 className="font-semibold text-gray-800 mb-2">{sub.nombre}</h3>
                                        <ul className="space-y-1">
                                            {sub.subsubcategorias.map((ss) => (
                                                <li
                                                    key={ss.idSubSubCategoria}
                                                    className="text-sm text-gray-600 hover:text-blue-600 cursor-pointer"
                                                >
                                                    {ss.nombre}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                        </div>
                    )}
                </nav>
            </Drawer>
        </>
    );
}

export default NavBar