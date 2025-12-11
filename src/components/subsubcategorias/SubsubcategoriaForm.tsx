import { useDispatch, useSelector } from "react-redux"
import type { SubSubCategoriaFormData } from "../../interfaces/categoria"
import type { AppDispatch, RootState } from "../../store/store"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import Button from "../common/Button"
import { addSubsubcategoria, editSubsubcategoria } from "../../store/subsubcategoriaSlice"
import { fetchSubcategorias } from "../../store/subcategoriaSlice"
import { useToast } from "../../context/useToast"
import { getSubsubcategoria } from "../../services/subsubcategorias"
import OverlayLoader from "../common/OverlayLoader"

type Props = {
    subsubcategoriaId?: number | null
    closeModal: () => void
}

const SubsubcategoriaForm = ({ subsubcategoriaId, closeModal }: Props) => {

    const dispatch = useDispatch<AppDispatch>()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const subcategorias = useSelector((state: RootState) => state.subcategorias.subcategorias)
    const { register, handleSubmit, reset, formState: { errors, isValid, isSubmitting } } = useForm<SubSubCategoriaFormData>({
        mode: 'onChange'
    })
    const { showToast } = useToast()

    useEffect(() => {
        dispatch(fetchSubcategorias())
    }, [dispatch])

    useEffect(() => {

        if (subsubcategoriaId) {
            const fetchSubsubcategoria = async () => {
                setIsLoading(true)
                const res = await getSubsubcategoria(subsubcategoriaId)
                reset({
                    nombre: res.nombre,
                    subcategory_id: res.subcategory_id
                })
                setIsLoading(false)
            }
            fetchSubsubcategoria()
        }

    }, [reset, subsubcategoriaId])

    const onSubmit = async (data: SubSubCategoriaFormData) => {
        try {
            if (subsubcategoriaId) {
                await dispatch(editSubsubcategoria({ id: subsubcategoriaId, subsubcategoria: data })).unwrap()
                showToast("Subsubcategoria editada con exito", {
                    type: 'success'
                })
            } else {
                await dispatch(addSubsubcategoria(data))
                showToast("Subsubcategoria registrada con exito", {
                    type: 'success'
                })
            }
            reset()
            closeModal()
        } catch (error) {
            showToast("Ha ocurrido un error", {
                type: 'error'
            })
            console.log(error)
        }
    }

    if (isLoading) {
        return <OverlayLoader />
    }

    const filterSubcategorias = subcategorias.filter(s => s.estado)

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-2">
                <label htmlFor="nombre">Nombre</label>
                <input
                    type="text"
                    id="nombre"
                    className="border border-gray-300 w-full rounded-lg h-10 px-2 my-2 py-2"
                    {...register("nombre", { required: "El nombre es requerido" })}
                />
                {errors.nombre && (
                    <p className="text-red-500 text-sm">{errors.nombre.message}</p>
                )}
            </div>
            <div className="mb-2">
                <label htmlFor="subcategoria">Subcategoría</label>
                <select id="subcategoria" {...register("subcategory_id", { required: "Selecciona una subcategoria" })} className="border h-10 w-full border-gray-300 rounded-lg my-2 px-2 py-2">
                    <option value="">Seleccione una subcategoría</option>
                    {filterSubcategorias.map((c) => (
                        <option key={c.id} value={c.id}>{c.nombre}</option>
                    ))}
                </select>
                {errors.subcategory_id && <p className="text-red-500">{errors.subcategory_id.message}</p>}
            </div>
            <Button
                type="submit"
                disabled={!isValid && isSubmitting}
                className={`${isValid ? 'bg-[#B8860B] text-white' : 'bg-gray-400 text-gray-500'} w-full`}
            >
                {isSubmitting && subsubcategoriaId ?
                    'Editando...' : isSubmitting ?
                        'Registrando...' : subsubcategoriaId ?
                            'Editar' : 'Registrar'}
            </Button>
        </form>
    )
}

export default SubsubcategoriaForm