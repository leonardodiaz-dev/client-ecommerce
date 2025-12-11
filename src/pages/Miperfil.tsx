import { useEffect } from "react"
import { useAuth } from "../context/useAuth"
import type { DatosPersonalesFormData } from "../interfaces/usuario"
import { updatedUsuario } from "../services/usuarios"
import type { ApiError } from "../interfaces/apiError"
import { useForm } from "react-hook-form"
import Button from "../components/common/Button"

const Miperfil = () => {

    const { handleSubmit, register, reset, formState: { errors, isSubmitting } } = useForm<DatosPersonalesFormData>()

    const { user, setUser } = useAuth()

    useEffect(() => {

        reset({ ...user })

    }, [reset, user])

    const onSubmit = async (data: DatosPersonalesFormData) => {
        try {
            const res = await updatedUsuario(data)
            setUser(res)
            localStorage.setItem("user", JSON.stringify(res))
        } catch (error) {
            const apiError = error as ApiError
            console.log(apiError.message)
        }
    }

    return (
        <div className="w-full space-y-5">
            <h2 className="text-xl">Perfil</h2>
            <form className='bg-white rounded-lg shadow-lg w-full p-5' onSubmit={handleSubmit(onSubmit)}>

                <div className="border-b border-gray-900/10 pb-12">

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                        <div className="sm:col-span-3">
                            <label className="block text-sm font-medium leading-6 text-black">
                                Nombre de Usuario
                            </label>
                            <input
                                type="text" {...register("nombre", { required: "El nombre es obligatorio" })}
                                className="block border border-gray-300 w-full rounded-lg h-10 p-2 my-2 placeholder:text-gray-400"
                            />
                            {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre.message}</p>}
                        </div>

                        <div className="sm:col-span-3">
                            <label className="block text-sm font-medium leading-6 text-black">
                                Apellidos
                            </label>
                            <input
                                type="text" {...register("apellido", { required: "Los apellidos son obligatorios" })}
                                className="block border border-gray-300 w-full rounded-lg h-10 px-2 my-2 py-2 shadow-sm placeholder:text-gray-400"
                            />
                            {errors.apellido && <p className="text-red-500 text-sm">{errors.apellido.message}</p>}
                        </div>

                        <div className="sm:col-span-3">
                            <label className="block text-sm font-medium leading-6 text-black">
                                DNI
                            </label>
                            <input
                                maxLength={8}
                                type="text" {...register('dni', {
                                    required: "El Dni es requerido",
                                    pattern: {
                                        value: /^\d{8}$/,
                                        message: "El DNI debe tener 8 dígitos"
                                    }
                                })}
                                readOnly
                                className="block border border-gray-300 bg-gray-200 w-full focus:outline-none rounded-lg h-10 p-2 my-2 placeholder:text-gray-400"
                                onChange={(e) => e.target.value = e.target.value.replace(/\D/g, "")}
                            />
                            {errors.dni && <p className="text-red-500 text-sm">{errors.dni.message}</p>}
                        </div>

                        <div className="sm:col-span-3">
                            <label className="block text-sm font-medium leading-6 text-black">
                                Teléfono
                            </label>
                            <input
                                maxLength={9}
                                type="tel"
                                {...register('telefono', {
                                    required: "El teléfono es requerido",
                                    pattern: {
                                        value: /^[0-9]{9}$/,
                                        message: "El teléfono debe tener 9 dígitos"
                                    }
                                })}
                                onChange={(e) => e.target.value = e.target.value.replace(/\D/g, "")}
                                className="block border border-gray-300 w-full rounded-lg h-10 px-2 my-2 py-2 shadow-sm placeholder:text-gray-400"
                            />
                            {errors.telefono && <span className="text-red-500">{errors.telefono.message}</span>}
                        </div>

                        <div className="sm:col-span-3">
                            <label className="block text-sm font-medium leading-6 text-black">
                                Correo
                            </label>
                            <input
                                type="email"
                                {...register('email', {
                                    required: "El correo es requerido",
                                    pattern: {
                                        value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                        message: "Formato de correo inválido"
                                    }
                                })}
                                className="block border border-gray-300 w-full rounded-lg h-10 p-2 my-2 placeholder:text-gray-400 "
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                        </div>
                    </div>
                </div>

                <div className="flex justify-end mt-4">
                    <Button disabled={isSubmitting}
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-70">
                        {isSubmitting ? 'Editando...' : 'Editar'}
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default Miperfil