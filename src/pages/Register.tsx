import { useForm } from "react-hook-form"
import Button from "../components/common/Button"
import type { UsuarioFormData } from "../interfaces/usuario"
import { createUsuario } from "../services/usuarios"
import type { ApiError } from "../interfaces/apiError"

const Register = () => {
    const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm<UsuarioFormData>({
        mode: 'onChange'
    })

    const onSubmit = async (data: UsuarioFormData) => {
        try {
            const response = await createUsuario({ ...data, rolNombre: "Cliente" })
            console.log(response)
            reset()
        } catch (error) {
            const apiError = error as ApiError
            console.log(apiError.message)
        }
    }
    return (
        <div className="flex justify-center items-center bg-gray-200 min-h-screen p-3">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center items-center rounded-lg bg-white shadow-lg w-full max-w-md px-8 py-5 gap-5">
                <h2 className="font-semibold text-center">Ingresa los datos para crear tu cuenta</h2>
                <div className="w-full">
                    <input type="text" id="nombre" placeholder="Nombre" className="border border-gray-300 w-full rounded-lg px-2 py-2"
                        {...register("nombre", { required: 'El nombre es obligatorio' })} />
                    {errors.nombre && (
                        <p className="text-sm text-red-500 mt-1">{errors.nombre.message}</p>
                    )}
                </div>
                <div className="w-full">
                    <input type="text" id="apellido" placeholder="Apellidos" className="border border-gray-300 w-full rounded-lg px-2 py-2"
                        {...register("apellido", { required: 'Los apellidos son obligatorios' })} />
                    {errors.apellido && (
                        <p className="text-sm text-red-500 mt-1">{errors.apellido.message}</p>
                    )}
                </div>
                <div className="w-full">
                    <input type="text" id="dni" placeholder="DNI" className="border border-gray-300 w-full rounded-lg px-2 py-2"
                        maxLength={8}
                        {...register("dni", {
                            required: 'El dni es obligatorio', pattern: {
                                value: /^[0-9]{8}$/,
                                message: "El DNI debe tener 8 dígitos numéricos",
                            },
                        })} />
                    {errors.dni && (
                        <p className="text-sm text-red-500 mt-1">{errors.dni.message}</p>
                    )}
                </div>
                <div className="w-full">
                    <input type="email" id="email" placeholder="Email" className="border border-gray-300 w-full rounded-lg px-2 py-2"
                        {...register("email", { required: 'El email es obligatorio' })} />
                    {errors.email && (
                        <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
                    )}
                </div>

                <div className="flex w-full">
                    <span className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-l-lg">+51</span>
                    <input
                        type="tel"
                        id="telefono"
                        placeholder="999 999 999"
                        maxLength={9}
                        className="border border-gray-300 w-full rounded-r-lg px-2 py-2"
                        {...register("telefono", {
                            required: 'El telefono es obligatorio', pattern: {
                                value: /^[9][0-9]{8}$/,
                                message: "Número de celular inválido",
                            },
                        })}
                    />
                </div>
                <div className="w-full">
                    <input type="password" id="password" placeholder="Contraseña" className="border border-gray-300 w-full rounded-lg px-2 py-2"
                        {...register("contrasena", { required: 'La contraseña es obligatoria' })} />
                    {errors.contrasena && (
                        <p className="text-sm text-red-500 mt-1">{errors.contrasena.message}</p>
                    )}
                </div>
                <Button
                    type="submit"
                    disabled={!isValid}
                    className={`${isValid ? 'bg-[#B8860B] text-white' : 'bg-gray-400 text-gray-500'} w-full`}
                >
                    Registrarme
                </Button>
            </form>
        </div>

    )
}

export default Register