import { useFieldArray, useForm } from "react-hook-form";
import { useFetchData } from "../../hooks/useFetchData";
import { getAllProveedores } from "../../services/proveedores";
import { useCallback, useState } from "react";
import type { Proveedor } from "../../interfaces/proveedor";
import { buscarVariante } from "../../services/variantes";
import type { BuscarVariante } from "../../interfaces/variante";
import type { IngresoFormData } from "../../interfaces/ingreso";
import Button from "../common/Button";
import { createIngreso } from "../../services/ingresos";

type Props = {
    closeModal: () => void
}

const IngresoForm = ({ closeModal }: Props) => {
    const { register, handleSubmit, reset, control, setError, clearErrors, formState: { errors } } = useForm<IngresoFormData>();

    const { fields, append, remove } = useFieldArray({
        control,
        name: "detalles",
    });

    const [query, setQuery] = useState("");
    const [search, setSearch] = useState("");

    const fetchVariantes = useCallback(
        () => (search ? buscarVariante(search) : Promise.resolve([])),
        [search]
    );

    const { data: variantes, loading: loadingVar } = useFetchData<BuscarVariante>(fetchVariantes);
    const { data: proveedores } = useFetchData<Proveedor>(getAllProveedores);

    const handleBuscar = () => {
        if (query.trim() === "") return alert("Ingrese un código o nombre para buscar");
        setSearch(query);
    };

    const onSubmit = async (data: IngresoFormData) => {
        console.log(data.detalles.length)
        if (data.detalles.length === 0) {
            setError("detalles", { type: "manual", message: "Debe agregar al menos una variante antes de registrar" });
            return;
        }
        try {
            const res = await createIngreso(data)
            console.log(res)
            reset()
            closeModal()
        } catch (error) {
            if (error instanceof Error) {
                console.log(error)
            }
        }
        console.log("Datos enviados:", data);
    };

    const handleSelectVariante = (v: BuscarVariante) => {
        const existingVariante = fields.some(e => e.varianteId === v.idVariante)
        if (existingVariante) return alert("Esta variante ya esta seleccionada")
        append({ varianteId: v.idVariante, cantidad: 1 });
        clearErrors("detalles");
        setSearch("");
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 relative">
            <div>
                <label className="block mb-1">Proveedor</label>
                <select
                    {...register("proveedorId", { required: "El proveedor es obligatorio" })}
                    className="border border-gray-300 rounded-lg w-full h-10 px-2"
                >
                    <option value="">Seleccione un proveedor</option>
                    {proveedores.map((p) => (
                        <option key={p.idProveedor} value={p.idProveedor}>
                            {p.nombre}
                        </option>
                    ))}
                </select>
                {errors.proveedorId && <p className="text-red-500">{errors.proveedorId.message}</p>}
            </div>

            <div>
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Buscar por código"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="border border-gray-300 rounded-lg w-full h-10 px-2"
                    />
                    <button
                        type="button"
                        onClick={handleBuscar}
                        className="bg-blue-500 text-white px-4 rounded-lg"
                    >
                        Buscar
                    </button>
                </div>

                {loadingVar && <p className="text-gray-500 mt-2">Cargando variantes...</p>}
                {!loadingVar && variantes.length > 0 && (
                    <ul className="bg-white border border-gray-300 rounded-lg mt-2 w-full max-h-60 overflow-y-auto shadow-lg">
                        {variantes.map((v) => (
                            <li
                                key={v.idVariante}
                                className="px-3 py-2 hover:bg-blue-100 cursor-pointer flex justify-between items-center"
                                onClick={() => handleSelectVariante(v)}
                            >
                                <div>
                                    <p className="font-medium">{v.articulo.nombre}</p>
                                    <p className="text-sm text-gray-600">
                                        {v.articulo.codigo} | {v.color?.nombre ?? "-"} | {v.talla?.nombre ?? "-"}
                                    </p>
                                </div>
                                <span className="text-blue-500 text-sm">Agregar</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {fields.length > 0 && (
                <div className="mt-4">
                    <h3 className="font-semibold mb-2">Variantes seleccionadas</h3>
                    <ul className="space-y-2">
                        {fields.map((item, index) => (
                            <li
                                key={item.id}
                                className="flex justify-between items-center border rounded-lg p-2 bg-gray-50"
                            >
                                <span>Variante ID: {item.varianteId}</span>
                                <input
                                    type="number"
                                    {...register(`detalles.${index}.cantidad`, { valueAsNumber: true })}
                                    className="border rounded w-20 text-center"
                                />
                                <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className="text-red-500 text-sm hover:underline"
                                >
                                    Quitar
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {errors.detalles && <p className="text-red-500">{errors.detalles.message}</p>}
            <Button type="submit" className="bg-[#B8860B] text-white w-full">
                Registrar ingreso
            </Button>
        </form>
    );
};

export default IngresoForm;
