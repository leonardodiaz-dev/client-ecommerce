import { useForm } from "react-hook-form"
import type { SubCategoriaFormData } from "../../interfaces/categoria"
import Button from "../common/Button"
import { useFetchData } from "../../hooks/useFetchData"
import { getAllCategorias } from "../../services/categorias"
import type { ApiError } from "../../interfaces/apiError"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "../../store/store"
import { addSubcategoria, editSubcategoria } from "../../store/subcategoriaSlice"
import { useToast } from "../../context/useToast"
import { getSubcategoria } from "../../services/subcategorias"

type Props = {
    subcategoriaId?: number
    closeModal: () => void
}

const SubcategoriasForm = ({ subcategoriaId, closeModal }: Props) => {

    const dispatch = useDispatch<AppDispatch>()
    const { register, handleSubmit, reset, formState: { errors, isValid, isSubmitting } } = useForm<SubCategoriaFormData>({
        mode: 'onChange'
    })
    const { showToast } = useToast()
    const { data: categorias, loading, error } = useFetchData(getAllCategorias)

    useEffect(() => {

        const fetchSubcategoria = async () => {
            if (subcategoriaId) {
                const res = await getSubcategoria(subcategoriaId)
                reset({
                    nombre: res.nombre,
                    category_id: res.category_id
                })
            }
        }
        fetchSubcategoria()
    }, [reset, subcategoriaId])

    const onSubmit = async (data: SubCategoriaFormData) => {
        try {
            if (subcategoriaId && subcategoriaId !== 0) {
                await dispatch(editSubcategoria({ id: subcategoriaId, subcategoria: data }))
                showToast("Subcategoria editada con exito", {
                    type: 'success'
                })
            } else {
                await dispatch(addSubcategoria(data))
                showToast("Subcategoria registrada con exito", {
                    type: 'success'
                })
            }
            reset()
            closeModal()
        } catch (error) {
            const apiError = error as ApiError
            showToast("Ha ocurrido un error", {
                type: 'error'
            })
            console.log(apiError.message)
        }
    }

    if (error) return <p>{error}</p>

    const filterCategorias = categorias.filter(c => c.estado)

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
                <label htmlFor="categoria">Categoría</label>
                {loading ? (
                    <div className="flex items-center justify-center">
                        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <select id="categoria" {...register("category_id", { required: "Selecciona una categoria" })} className="border h-10 w-full border-gray-300 rounded-lg my-2 px-2 py-2">
                        <option value="">Seleccione una categoría</option>
                        {filterCategorias.map((c) => (
                            <option key={c.id} value={c.id}>{c.nombre}</option>
                        ))}
                    </select>
                )}
                {errors.category_id && <p className="text-red-500">{errors.category_id.message}</p>}
            </div>
            <Button
                type="submit"
                disabled={!isValid && isSubmitting}
                className={`${isValid ? 'bg-[#B8860B] text-white' : 'bg-gray-400 text-gray-500'} w-full`}
            >
                {isSubmitting && subcategoriaId !== 0 ?
                    'Editando...' : isSubmitting ?
                        'Registrando...' : subcategoriaId !== 0 ?
                            'Editar' : 'Registrar'}
            </Button>
        </form >
    )
}

export default SubcategoriasForm