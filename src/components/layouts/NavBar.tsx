import { ChevronDown, ChevronRight, Menu, Search, ShoppingCart, X } from "lucide-react";
import { useRef, useState } from "react";
import Drawer from "./Drawer";
import type { Categoria } from "../../interfaces/categoria";
import { listCategoriasWithSubCategorias } from "../../services/categorias";
import { useFetchData } from "../../hooks/useFetchData";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import { totalProductos } from "../../store/carritoSlice";
import { useSelector } from "react-redux";
import { busqueda } from "../../services/articulos";
import OverlayLoader from "../common/OverlayLoader";
import ResultadosList from "../inicio/ResultadosList";
import type { Resultados } from "../../interfaces/articulo";

const NavBar = () => {

    const [search, setSearch] = useState<string>("")
    const navigate = useNavigate()
    const [showDropdown, setShowDropdown] = useState(false);
    const [results, setResults] = useState<Resultados | null>(null);
    const [loading, setLoading] = useState(false);
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const total = useSelector(totalProductos);
    const { isAuthenticated, user, logout } = useAuth()
    const [open, setOpen] = useState<boolean>(false)
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [hoveredCategoria, setHoveredCategoria] = useState<number | null>(null);
    const { data: categorias, loading: loadingCategoria, error } = useFetchData<Categoria>(listCategoriasWithSubCategorias);

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearch(value);

        if (debounceRef.current) clearTimeout(debounceRef.current);

        debounceRef.current = setTimeout(async () => {
            if (value.length < 2) {
                setResults(null);
                setShowDropdown(false);
                return;
            }

            try {
                setLoading(true);
                const res = await busqueda(value);
                setResults(res.resultados);
                setShowDropdown(true);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }, 400);
    };

    if (loadingCategoria) return <OverlayLoader />;
    if (error) return <p>{error}</p>;

    return (
        <>
            <header className="bg-[#1E1E1E] text-white">
                <div className="flex flex-row justify-between px-3 items-center h-16">

                    <div
                        className="flex flex-row justify-center items-center cursor-pointer gap-2"
                        onClick={() => setDrawerOpen(true)}
                    >
                        <Menu />
                        <p className="hidden sm:block">Menu</p>
                    </div>

                    <div className="hidden md:block relative w-72">
                        <input
                            type="text"
                            placeholder="Buscar productos, marcas o categorías..."
                            className="rounded-lg border text-black outline-none py-2 pl-3 pr-16 w-72 bg-white h-10"
                            value={search}
                            onChange={handleChange}
                            onFocus={() => search.length > 1 && setShowDropdown(true)}
                            onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                        />

                        {search && (
                            <button
                                className="absolute top-2 right-10 cursor-pointer"
                                onClick={() => setSearch("")}
                            >
                                <X color="black" />
                            </button>
                        )}

                        <button className="absolute top-0 -right-2 flex justify-center items-center rounded-full bg-gray-800 h-10 w-10">
                            <Search color="white" size={20} />
                        </button>

                        <ResultadosList results={results} loading={loading} showDropdown={showDropdown} />
                    </div>

                    <div className="flex flex-row items-center gap-3">
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
                                    {isAuthenticated ? (
                                        <ul className="py-2 text-sm text-gray-700">
                                            <li>
                                                <span className="block px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                                    Mi cuenta
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
                                    ) : (
                                        <ul className="py-2 text-sm text-gray-700">
                                            <li>
                                                <span
                                                    className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                                    onClick={() => navigate("/login")}
                                                >
                                                    Inicia sesión
                                                </span>
                                            </li>
                                            <li>
                                                <span
                                                    className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                                    onClick={() => navigate("/register")}
                                                >
                                                    Regístrate
                                                </span>
                                            </li>
                                        </ul>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="relative">
                            <button
                                className="rounded-lg p-3 cursor-pointer"
                                onClick={() => navigate("/cart")}
                            >
                                <ShoppingCart className="w-6 h-6 text-white" />
                            </button>

                            {total > 0 && (
                                <span
                                    className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center"
                                >
                                    {total}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex md:hidden justify-center p-2 bg-[#2A2A2A]">
                    <div className="relative w-full max-w-sm">
                        <input
                            type="text"
                            placeholder="Buscar productos..."
                            className="rounded-lg border text-black outline-none py-2 pl-3 pr-10 w-full bg-white h-10"
                            value={search}
                            onChange={handleChange}
                        />
                        <button className="absolute top-0 right-0 h-10 w-10 flex items-center justify-center bg-gray-800 rounded-r-lg">
                            <Search color="white" size={18} />
                        </button>
                        <ResultadosList results={results} loading={loading} showDropdown={showDropdown} />
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
                                        <h3 className="font-semibold cursor-pointer text-gray-800 mb-2"
                                            onClick={() => {
                                                navigate(`/search?categoria=${sub.nombre}`)
                                                setDrawerOpen(false)
                                                setHoveredCategoria(null)
                                            }}>{sub.nombre}</h3>
                                        <ul className="space-y-1">
                                            {sub.subsubcategorias.map((ss) => (
                                                <li
                                                    key={ss.idSubSubcategoria}
                                                    className="text-sm text-gray-600 hover:text-blue-600 cursor-pointer"
                                                    onClick={() => {
                                                        navigate(`/search?categoria=${ss.nombre}`)
                                                        setDrawerOpen(false)
                                                        setHoveredCategoria(null)
                                                    }}>
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