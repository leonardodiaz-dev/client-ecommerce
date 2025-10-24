import { useForm } from "react-hook-form"
import type { Usuario, UsuarioFormData } from "../../interfaces/usuario"
import Button from "../common/Button"
import { createUsuario } from "../../services/usuarios"
import { useEffect } from "react"

type UsuarioFormProps = {
    usuario?: Usuario | null
    closeModal: () => void
}

const UsuarioForm = ({ usuario, closeModal }: UsuarioFormProps) => {
    const { register, handleSubmit, reset, formState: { errors, isValid, isSubmitting } } = useForm<UsuarioFormData>({
        mode: 'onChange'
    })

    useEffect(() => {
        reset({ ...usuario })
    }, [reset, usuario])


    const onSubmit = async (data: UsuarioFormData) => {
        try {
            const res = await createUsuario({ ...data, rolNombre: "Administrador" })
            console.log(res)
            closeModal()
            reset()
        } catch (error) {
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
                    {...register("nombre")}
                />
                {errors.nombre && (
                    <p className="text-red-500 text-sm">{errors.nombre.message}</p>
                )}
            </div>
            <div className="mb-2">
                <label htmlFor="apellido">Apellidos</label>
                <input
                    type="text"
                    id="apellido"
                    className="border border-gray-300 w-full rounded-lg h-10 px-2 py-2"
                    {...register("apellido")}
                />
                {errors.apellido && (
                    <p className="text-red-500 text-sm">{errors.apellido.message}</p>
                )}
            </div>
            <div className="mb-2">
                <label htmlFor="dni">Dni</label>
                <input type="text" id="dni" placeholder="DNI" className="border border-gray-300 w-full rounded-lg px-2 py-2"
                    maxLength={8}
                    {...register("dni", {
                        required: 'El dni es obligatorio'
                    })}
                    onChange={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, "")}
                />
                {errors.dni && (
                    <p className="text-sm text-red-500 mt-1">{errors.dni.message}</p>
                )}
            </div>
            <div className="mb-2">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="DNI" className="border border-gray-300 w-full rounded-lg px-2 py-2"
                    {...register("email", {
                        required: "El correo es requerido",
                        pattern: {
                            value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                            message: "Formato de correo inválido"
                        }
                    })} />
                {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
            </div>
            <div className="mb-2">
                <label htmlFor="telefono">Telefono</label>
                <div className="flex flex-row">
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
                        onChange={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, "")}
                    />
                </div>
            </div>
            <div className="mb-2">
                <label htmlFor="contrasena">Contraseña</label>
                <input type="password" id="password" placeholder="Contraseña" className="border border-gray-300 w-full rounded-lg px-2 py-2"
                    {...register("contrasena", { required: 'La contraseña es obligatoria' })} />
                {errors.contrasena && (
                    <p className="text-sm text-red-500 mt-1">{errors.contrasena.message}</p>
                )}
            </div>
            <Button
                type="submit"
                disabled={!isValid && isSubmitting}
                className={`${isValid ? 'bg-[#B8860B] text-white' : 'bg-gray-400 text-gray-500'} w-full`}
            >
                {isSubmitting ? 'Registrando...' : 'Registrar'}
            </Button>
        </form>
    )
}

export default UsuarioForm