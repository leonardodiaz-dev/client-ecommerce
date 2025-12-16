import { useForm } from "react-hook-form"
import Button from "../components/common/Button"
import type { UsuarioFormData } from "../interfaces/usuario"
import { createUsuario, loginUsuario } from "../services/usuarios"
import type { ApiError } from "../interfaces/apiError"
import { useAuth } from "../context/useAuth"
import { useNavigate } from "react-router-dom"

const Register = () => {

    const { login } = useAuth()
    const navigate = useNavigate()
    const { register, handleSubmit, reset, watch, formState: { errors, isValid, isSubmitting } } = useForm<UsuarioFormData>({
        mode: 'onChange'
    })

    const onSubmit = async (data: UsuarioFormData) => {
        try {
            const res = await createUsuario({ ...data, rolesId: [2] })
            console.log(res)
            const response = await loginUsuario(data.email, data.password)
            console.log(response)
            login(response.user, response.token, response.expires_at)
            reset()
            navigate("/");
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
                    <input
                        type="password"
                        id="password"
                        placeholder="Contraseña"
                        className="border border-gray-300 w-full rounded-lg px-2 py-2"
                        {...register("password", {
                            required: 'La contraseña es obligatoria',
                            minLength: {
                                value: 8,
                                message: 'La contraseña debe tener al menos 8 caracteres'
                            },
                            pattern: {
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
                                message: 'Debe contener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo (!@#$%).'
                            }
                        })}
                    />
                    {errors.password && (
                        <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
                    )}
                </div>
                <div className="w-full">
                    <input
                        type="password"
                        id="password_confirmation"
                        placeholder="Confirmar Contraseña"
                        className="border border-gray-300 w-full rounded-lg px-2 py-2"
                        {...register("password_confirmation", {
                            required: 'La confirmacion de la contraseña es obligatoria',
                            validate: (value) => value === watch('password') || 'Las contraseñas no coinciden'
                        })}
                    />
                    {errors.password_confirmation && (
                        <p className="text-sm text-red-500 mt-1">{errors.password_confirmation.message}</p>
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
        </div>

    )
}

export default Register