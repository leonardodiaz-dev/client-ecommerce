import { ChevronRight } from 'lucide-react';
import type { Categoria } from '../../interfaces/categoria';
import Drawer from '../layouts/Drawer';
import type { NavigateFunction } from 'react-router-dom';

type Props = {
    drawerOpen: boolean
    setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>
    setHoveredCategoria: React.Dispatch<React.SetStateAction<number | null>>
    categorias: Categoria[]
    hoveredCategoria: number | null
    navigate: NavigateFunction
}

const DesktopDrawer = ({
    drawerOpen,
    setDrawerOpen,
    setHoveredCategoria,
    categorias,
    hoveredCategoria,
    navigate }: Props) => {
    return (
        <Drawer
            isOpen={drawerOpen}
            onClose={() => {
                setDrawerOpen(false);
                setHoveredCategoria(null);
            }}
            position="left"
        >
            <nav className="relative flex">
                <ul className="w-64 bg-white">
                    {categorias.map((c) => (
                        <li
                            key={c.id}
                            onMouseEnter={() => setHoveredCategoria(c.id)}
                            className="flex flex-row justify-between items-center p-3 rounded-sm cursor-pointer 
                     hover:font-semibold hover:bg-gray-200 hover:border-l-[3px] 
                     hover:border-l-[#B8860B]"
                        >
                            <span>{c.nombre}</span>
                            <ChevronRight className="text-gray-500 hover:text-[#B8860B]" />
                        </li>
                    ))}
                </ul>

                {hoveredCategoria !== null && (
                    <div
                        className="absolute left-64 top-0 w-[800px] bg-gray-50 h-auto 
                   shadow-lg p-6 grid grid-cols-3 gap-6"
                    >
                        {categorias
                            .find((c) => c.id === hoveredCategoria)
                            ?.subcategories.map((sub) => (
                                <div key={sub.id}>
                                    <h3
                                        className="font-semibold text-gray-800 mb-2 cursor-pointer hover:text-[#B8860B]"
                                        onClick={() => {
                                            navigate(`/search?categoria=${sub.nombre}`);
                                            setDrawerOpen(false);
                                            setHoveredCategoria(null);
                                        }}
                                    >
                                        {sub.nombre}
                                    </h3>

                                    <ul className="space-y-1">
                                        {sub.subsubcategories.map((ss) => (
                                            <li
                                                key={ss.id}
                                                className="text-sm text-gray-600 hover:text-blue-600 cursor-pointer"
                                                onClick={() => {
                                                    navigate(`/search?categoria=${ss.nombre}`);
                                                    setDrawerOpen(false);
                                                    setHoveredCategoria(null);
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

export default DesktopDrawer