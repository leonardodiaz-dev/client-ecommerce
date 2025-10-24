import { useSearchParams } from "react-router-dom";
import type { Marca } from "../../interfaces/marca";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

type Props = {
    marcas: Marca[]
}

const FiltroMarca = ({ marcas}: Props) => {

    const [searchParams, setSearchParams] = useSearchParams();
    const [open, setOpen] = useState(true);

    const handleChange = (marca: string) => {
        const current = searchParams.get("marca")?.split(",").filter(Boolean) || [];
        const updated = current.includes(marca)
            ? current.filter((nombre) => nombre !== marca)
            : [...current, marca];

        searchParams.set("marca", updated.join(","));
        if(updated.length === 0) searchParams.delete("marca")
        setSearchParams(searchParams);
    };

    const selectedIds = searchParams.get("marca")?.split(",") || [];

    return (
        <div className="border-b border-gray-200 pb-2">
            <button
                type="button"
                className="flex items-center justify-between w-full py-3 text-left"
                onClick={() => setOpen(!open)}
            >
                <h4 className="text-lg font-semibold text-gray-800">Marca</h4>
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
                    {marcas.map((m) => (
                        <label
                            key={m.idMarca}
                            className="flex items-center gap-2 cursor-pointer text-gray-700 hover:text-gray-900"
                        >
                            <input
                                type="checkbox"
                                className="w-4 h-4 accent-indigo-600 cursor-pointer"
                                checked={selectedIds.includes(m.nombre.toString())}
                                onChange={() => handleChange(m.nombre)}
                            />
                            {m.nombre}
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FiltroMarca
