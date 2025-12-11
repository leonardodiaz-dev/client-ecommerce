import { useForm } from "react-hook-form"
import type { Categoria, CategoriaFormData } from "../../interfaces/categoria"
import Button from "../common/Button"
import { useEffect } from "react"
import type { AppDispatch } from "../../store/store"
import { useDispatch } from "react-redux"
import { addCategoria, editCategoria } from "../../store/categoriaSlice"
import { useToast } from "../../context/useToast"

type Props = {
    closeModal: () => void
    categoria?: Categoria | null
}

const CategoriaForm = ({ closeModal, categoria }: Props) => {

    const dispatch = useDispatch<AppDispatch>();
    const { register, handleSubmit, reset, formState: { errors, isValid, isSubmitting } } = useForm<CategoriaFormData>({
        mode: 'onChange'
    })
    const { showToast } = useToast()

    useEffect(() => {
        reset({ ...categoria })
    }, [reset, categoria])

    const onSubmit = async (data: CategoriaFormData) => {
        try {
            if (categoria) {
                await dispatch(editCategoria({ id: categoria.id, categoria: data })).unwrap();
                showToast("Categoria editada con exito", {
                    type: 'success'
                })
            } else {
                await dispatch(addCategoria(data)).unwrap()
                showToast("Categoria registrada con exito", {
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

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-2">
                <label htmlFor="nombre">Nombre</label>
                <input
                    type="text"
                    id="nombre"
                    className="border border-gray-300 w-full rounded-lg h-10 px-2 py-2"
                    {...register("nombre", { required: "El nombre es requerido" })}
                />
                {errors.nombre && (
                    <p className="text-red-500 text-sm">{errors.nombre.message}</p>
                )}
            </div>
            <Button
                type="submit"
                disabled={!isValid && isSubmitting}
                className={`${isValid ? 'bg-[#B8860B] text-white' : 'bg-gray-400 text-gray-500'} w-full`}
            >
                {isSubmitting && categoria ?
                    'Editando...' : isSubmitting ?
                        'Registrando...' : categoria ?
                            'Editar' : 'Registrar'}
            </Button>
        </form>
    )
}

export default CategoriaForm