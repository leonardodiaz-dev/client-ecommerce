import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { SubSubCategoria } from "../../interfaces/categoria";

type Props = {
    subsubcategorias: SubSubCategoria[]
}

const FilterCategoria = ({ subsubcategorias }: Props) => {

    const [open, setOpen] = useState(true)
    const navigate = useNavigate()

    return (
        <div className="border-b border-gray-200 py-3">
            <button
                onClick={() => setOpen(!open)}
                className="flex justify-between items-center w-full text-left font-semibold text-gray-800"
            >
                <span>Categoria</span>
                {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>

            <div
                className={`transition-all duration-300 overflow-hidden ${open ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0"
                    }`}
            >
                <ul className="flex flex-row flex-wrap gap-2">
                    {subsubcategorias.map((s) => (
                        <li key={s.idSubSubcategoria} className="bg-gray-200 border-1 cursor-pointer border-gray-400 rounded-lg text-gray-800 p-1"
                            onClick={() => navigate(`/search?categoria=${s.nombre}`)}
                        >
                            {s.nombre}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default FilterCategoria