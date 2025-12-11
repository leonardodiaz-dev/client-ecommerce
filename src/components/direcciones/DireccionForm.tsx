import { useForm } from "react-hook-form";
import Button from "../common/Button"
import type { DireccionData, DireccionFormData } from "../../interfaces/direccion";
import { useFetchData } from "../../hooks/useFetchData";
import { getAllDepartamentos } from "../../services/departamentos";
import { getProvinciasByDepartamento } from "../../services/provincias";
import { useCallback } from "react";
import { getDistritosByProvincia } from "../../services/distrito";
import type { ApiError } from "../../interfaces/apiError";
import { useDispatch } from "react-redux";
import { addDireccion } from "../../store/direccionSlice";
import type { AppDispatch } from "../../store/store";

type DireccionFormProps = {
    closeModal: () => void
}

const DireccionForm = ({ closeModal }: DireccionFormProps) => {

    const dispatch = useDispatch<AppDispatch>()
    const { register, handleSubmit, reset, watch, formState: { errors, isValid, isSubmitting } } = useForm<DireccionFormData>({
        mode: "onChange"
    });

    const departamentoId = watch("department_id")
    const provinciaId = watch("province_id")

    const fetchProvincias = useCallback(
        () => departamentoId ? getProvinciasByDepartamento(departamentoId) : Promise.resolve([]),
        [departamentoId],
    )
    const fetchDistritos = useCallback(
        () => provinciaId ? getDistritosByProvincia(provinciaId) : Promise.resolve([]),
        [provinciaId],
    )

    const { data: departamentos, loading: loadingDepartamentos } = useFetchData(getAllDepartamentos)
    const { data: provincias, loading: loadingProvincias } = useFetchData(fetchProvincias)
    const { data: distritos, loading: loadingDistritos } = useFetchData(fetchDistritos)

    const onSubmit = async (data: DireccionFormData) => {
        try {
            const newDireccion: DireccionData = {
                district_id: data.district_id,
                nombre: data.nombre
            }
            await dispatch(addDireccion(newDireccion)).unwrap()
            reset()
            closeModal()
        } catch (error) {
            const apiError = error as ApiError
            console.log(apiError.message)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-2">
                <label htmlFor="departamento">Departamento</label>
                {
                    loadingDepartamentos ? (
                        <div className="flex items-center justify-cente">
                            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    ) : (
                        <select id="departamento" {...register("department_id", { required: "El departamento es requerido" })} className="border h-10 border-gray-300 rounded-lg w-full my-2 px-2 py-2">
                            <option value="">Seleccione un departamento</option>
                            {departamentos.map((d) => (
                                <option key={d.id} value={d.id}>{d.nombre}</option>
                            ))}
                        </select>
                    )
                }
            </div>
            <div className="mb-2">
                <label htmlFor="provincia">Provincia</label>
                {
                    loadingProvincias ? (
                        <div className="flex items-center justify-cente">
                            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    ) : (
                        <select id="provincia" {...register("province_id", { required: "La provincia es requerida" })} className="border h-10 border-gray-300 rounded-lg w-full my-2 px-2 py-2">
                            <option value="">Seleccione una provincia </option>
                            {provincias.map((p) => (
                                <option key={p.id} value={p.id}>{p.nombre}</option>
                            ))}
                        </select>
                    )
                }
            </div>
            <div className="mb-2">
                <label htmlFor="distrito">Distrito</label>
                {
                    loadingDistritos ? (
                        <div className="flex items-center justify-cente">
                            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    ) : (
                        <select id="distrito" {...register("district_id", { required: "El distrito es requerido" })} className="border h-10 border-gray-300 rounded-lg w-full my-2 px-2 py-2">
                            <option value="">Seleccione un distrito</option>
                            {distritos.map((d) => (
                                <option key={d.id} value={d.id}>{d.nombre}</option>
                            ))}
                        </select>
                    )
                }
            </div>

            <div className="mb-2">
                <label htmlFor="direccion">Dirección</label>
                <input
                    type="text"
                    id="direccion"
                    className="border border-gray-300 w-full rounded-lg my-2 h-10 px-2 py-2"
                    {...register("nombre", { required: "La direccion es requerida" })}
                />
                {errors.nombre && (
                    <p className="text-red-500 text-sm">{errors.nombre.message}</p>
                )}
            </div>

            <Button
                type="submit"
                disabled={!isValid || isSubmitting}
                className={`${isValid && !isSubmitting ? 'bg-[#B8860B] text-white' : 'bg-gray-400 text-gray-500'} w-full`}
            >
                {isSubmitting ? '...Registrando' : 'Registrar'}
            </Button>
        </form>
    )
}

export default DireccionForm