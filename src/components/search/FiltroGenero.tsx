import { ChevronDown, ChevronUp } from "lucide-react"
import type { Genero } from "../../interfaces/genero"
import { useState } from "react"
import { useSearchParams } from "react-router-dom"

type FiltroGenereProps = {
    generos: Genero[]
    value?: string
}

const FiltroGenero = ({ generos, value }: FiltroGenereProps) => {

    const [searchParams, setSearchParams] = useSearchParams();
    const [open, setOpen] = useState(true);

    const handleChange = (generoId: number) => {
        const current = searchParams.get("generoId")?.split(",").filter(Boolean) || [];
        const updated = current.includes(generoId.toString())
            ? current.filter((id) => id !== generoId.toString())
            : [...current, generoId.toString()];

        searchParams.set("generoId", updated.join(","));
        if (updated.length === 0) searchParams.delete("generoId")
        setSearchParams(searchParams);
    };
    const selectedIds = searchParams.get("generoId")?.split(",") || [];

    const generosFilter = generos.filter(g =>
        value === 'Hombres' ?
            g.nombre !== 'Mujer'
            : value === 'Mujeres' ?
                g.nombre !== 'Hombre'
                : g
    )

    return (
        <div className="border-b border-gray-200 pb-2">
            <button
                type="button"
                className="flex items-center justify-between w-full py-3 text-left"
                onClick={() => setOpen(!open)}
            >
                <h4 className="text-lg font-semibold text-gray-800">Genero</h4>
                {open ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
            </button>

            <div
                className={`transition-all duration-300 overflow-hidden ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                <div className="flex flex-col gap-2 pl-2 pb-2">
                    {generosFilter.map((g) => (
                        <label
                            key={g.idGenero}
                            className="flex items-center gap-2 cursor-pointer text-gray-700 hover:text-gray-900"
                        >
                            <input
                                type="checkbox"
                                className="w-4 h-4 accent-indigo-600 cursor-pointer"
                                checked={selectedIds.includes(g.idGenero.toString())}
                                onChange={() => handleChange(g.idGenero)}
                            />
                            {g.nombre}
                        </label>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default FiltroGenero