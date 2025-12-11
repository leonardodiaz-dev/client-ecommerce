import { useForm } from 'react-hook-form'
import type { UpdateContrasena } from '../../interfaces/usuario'
import { updatedPassword } from '../../services/usuarios'
import type { ApiError } from '../../interfaces/apiError'
import { useAuth } from '../../context/useAuth'
import Button from '../common/Button'

const CambiarContrasenaForm = () => {

    const { handleSubmit, register, watch, formState: { errors } } = useForm<UpdateContrasena>()

    const { logout } = useAuth()

    const onSubmit = async (data: UpdateContrasena) => {
        try {
            await updatedPassword(data)
            logout()
        } catch (error) {
            const apiError = error as ApiError
            console.log(apiError.message)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-lg rounded-lg p-5 w-full 
        sm:w-1/2 mx-auto">
            <div className="mb-5">
                <label htmlFor="contrasenaActual" className="block mb-2 text-sm font-medium text-black">
                    Contraseña Actual
                </label>
                <input type="password" {...register('contrasena_actual', { required: 'La contraseña actual es obligatoria.' })}
                    className={`bg-gray-50 border text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${errors.contrasena_actual ? 'border-red-500' : 'border-gray-300'
                        }`}
                />
                {errors.contrasena_actual && (
                    <p className="text-red-500 text-sm mt-1">{errors.contrasena_actual.message}</p>
                )}
            </div>
            <div className="mb-5">
                <label htmlFor="nuevaContrasena" className="block mb-2 text-sm font-medium text-black">
                    Nueva Contraseña
                </label>
                <input type="password" {...register('nueva_contrasena', { required: 'La nueva contraseña es obligatoria.' })}
                    className={`bg-gray-50 border text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${errors.nueva_contrasena ? 'border-red-500' : 'border-gray-300'
                        }`}
                />
                {errors.nueva_contrasena && (
                    <p className="text-red-500 text-sm mt-1">{errors.nueva_contrasena.message}</p>
                )}
            </div>
            <div className="mb-5">
                <label htmlFor="repetirContrasena" className="block mb-2 text-sm font-medium text-black">
                    Repetir Nueva Contraseña
                </label>
                <input type="password" {...register('repetir_contrasena', {
                    required: 'Repetir la nueva contraseña es obligatorio.',
                    validate: (value) =>
                        value === watch('nueva_contrasena') || 'Las contraseñas no coinciden.',
                })}
                    className={`bg-gray-50 border text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${errors.repetir_contrasena ? 'border-red-500' : 'border-gray-300'
                        }`}
                />
                {errors.repetir_contrasena && (
                    <p className="text-red-500 text-sm mt-1">{errors.repetir_contrasena.message}</p>
                )}
            </div>
            <Button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
                Guardar
            </Button>
        </form>
    )
}

export default CambiarContrasenaForm