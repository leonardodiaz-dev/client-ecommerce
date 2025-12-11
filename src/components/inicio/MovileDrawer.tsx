import type { NavigateFunction } from "react-router-dom";
import type { Categoria } from "../../interfaces/categoria";
import Drawer from "../layouts/Drawer";
import { ArrowLeft, ChevronRight } from "lucide-react";

type Props = {
    drawerOpen: boolean
    setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>
    categorias: Categoria[]
    navigate: NavigateFunction
    selectedCategoria: number | null
    setSelectedCategoria: React.Dispatch<React.SetStateAction<number | null>>
}

const MovileDrawer = ({
    drawerOpen,
    setDrawerOpen,
    categorias,
    navigate,
    selectedCategoria,
     setSelectedCategoria
}: Props) => {
    return (
        <Drawer
            isOpen={drawerOpen}
            onClose={() => {
                setDrawerOpen(false);
                setSelectedCategoria(null);
            }}
            position="left"
        >
            <nav className="h-full bg-white overflow-y-auto">
                {/* Categorías principales */}
                {!selectedCategoria && (
                    <ul>
                        {categorias.map((c) => (
                            <li
                                key={c.id}
                                className="flex justify-between items-center p-4 hover:bg-gray-100 cursor-pointer"
                                onClick={() => setSelectedCategoria(c.id)}
                            >
                                <span>{c.nombre}</span>
                                <ChevronRight />
                            </li>
                        ))}
                    </ul>
                )}

                {/* Subcategorías */}
                {selectedCategoria && (
                    <div className="p-4">
                        <button
                            onClick={() => setSelectedCategoria(null)}
                            className="flex items-center mb-4 text-gray-700 hover:text-black"
                        >
                            <ArrowLeft className="mr-2" size={18} /> Volver
                        </button>

                        {categorias
                            .find((c) => c.id === selectedCategoria)
                            ?.subcategories.map((sub) => (
                                <div key={sub.id} className="mb-4">
                                    <h3
                                        className="font-semibold text-gray-800 mb-2 cursor-pointer hover:text-lime-700"
                                        onClick={() => {
                                            navigate(`/search?categoria=${sub.nombre}`);
                                            setDrawerOpen(false);
                                            setSelectedCategoria(null);
                                        }}
                                    >
                                        {sub.nombre}
                                    </h3>
                                    <ul className="ml-3 space-y-1">
                                        {sub.subsubcategories?.map((ss) => (
                                            <li
                                                key={ss.id}
                                                className="text-sm text-gray-600 hover:text-lime-700 cursor-pointer"
                                                onClick={() => {
                                                    navigate(`/search?categoria=${ss.nombre}`);
                                                    setDrawerOpen(false);
                                                    setSelectedCategoria(null);
                                                }}
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
    )
}

export default MovileDrawer