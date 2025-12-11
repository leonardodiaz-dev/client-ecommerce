import { useForm } from "react-hook-form"
import type { Usuario, UsuarioFormData } from "../../interfaces/usuario"
import Button from "../common/Button"
import { useEffect } from "react"
import { useToast } from "../../context/useToast"
import { useFetchData } from "../../hooks/useFetchData"
import { getRoles } from "../../services/roles"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "../../store/store"
import { addUsuario } from "../../store/usuarioSlice"

type UsuarioFormProps = {
    usuario?: Usuario | null
    closeModal: () => void
}

const UsuarioForm = ({ usuario, closeModal }: UsuarioFormProps) => {

    const dispatch = useDispatch<AppDispatch>()
    const { register, handleSubmit, reset, watch, formState: { errors, isValid, isSubmitting } } = useForm<UsuarioFormData>({
        mode: 'onChange'
    })
    const { showToast } = useToast()
    const { data: roles, loading } = useFetchData(getRoles)

    useEffect(() => {
        reset({ ...usuario })
    }, [reset, usuario])

    const onSubmit = async (data: UsuarioFormData) => {
        try {
            await dispatch(addUsuario(data)).unwrap()
            showToast('Usuario registrado con exito', {
                type: 'success'
            })
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
                <label className="font-semibold">Roles</label>

                {
                    loading ? (
                        <div className="flex items-center justify-center bg-white/70 ">
                            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-1 mt-1">
                            {roles.map((rol) => (
                                <label key={rol.id} className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        value={rol.id}
                                        {...register("rolesId", {
                                            required: "Debes seleccionar al menos un rol",
                                        })}
                                    />
                                    <span>{rol.nombre}</span>
                                </label>
                            ))}
                        </div>
                    )
                }

                {errors.rolesId && (
                    <p className="text-red-500 text-sm">{errors.rolesId.message}</p>
                )}
            </div>

            <div className="mb-2">
                <label htmlFor="contrasena">Contraseña</label>
                <input type="password" id="password" placeholder="Contraseña" className="border border-gray-300 w-full rounded-lg px-2 py-2"
                    {...register("password", { required: 'La contraseña es obligatoria' })} />
                {errors.password && (
                    <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
                )}
            </div>
            <div className="mb-5">
                <label htmlFor="contrasena">Confirmar Contraseña</label>
                <input type="password" id="password_confirmation" placeholder="Confirmar Contraseña" className="border border-gray-300 w-full rounded-lg px-2 py-2"
                    {...register("password_confirmation", {
                        required: 'La confirmacion de la contraseña es obligatoria',
                        validate: (value) => value === watch('password') || 'Las contraseñas no coinciden'
                    })} />
                {errors.password_confirmation && (
                    <p className="text-sm text-red-500 mt-1">{errors.password_confirmation.message}</p>
                )}
            </div>
            <Button
                type="submit"
                disabled={!isValid && isSubmitting}
                className={`${isValid ? 'bg-[#B8860B] text-white' : 'bg-gray-400 text-gray-500'} w-full`}
            >
                {isSubmitting ? 'Registrando...' : 'Registrar'}
            </Button>
        </form >
    )
}

export default UsuarioForm