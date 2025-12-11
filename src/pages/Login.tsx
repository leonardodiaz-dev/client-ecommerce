import { ArrowLeft } from "lucide-react"
import Button from "../components/common/Button"
import { useLocation, useNavigate } from "react-router-dom"
import type { Usuario } from "../interfaces/usuario"
import { useForm } from "react-hook-form"
import { loginUsuario } from "../services/usuarios"
import { useAuth } from "../context/useAuth"
import { useState } from "react"

const Login = () => {

    const { register, handleSubmit, formState: { errors, isValid, isSubmitting } } = useForm<Pick<Usuario, 'email' | 'password'>>({
        mode: 'onChange'
    })
    const [error, setError] = useState('');
    const { login } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    const onSubmit = async (data: Pick<Usuario, 'email' | 'password'>) => {
        try {
            const response = await loginUsuario(data.email, data.password)
            console.log(response)
            login(response.user, response.token, response.expires_at)
            console.log(response.user.roles.length)
            if (response.user.roles.length === 2) return navigate('/seleccionar-rol')
            const redirectPath = location.state?.from?.pathname || "/";
            navigate(redirectPath, { replace: true });
        } catch (error) {
            setError('Credenciales incorrectas. Intenta nuevamente.');
            console.log(error)
        }
    }

    return (
        <div className="flex flex-col justify-center items-center bg-gray-200 min-h-screen p-5">
            <div className="space-y-3">
                <div className="p-3 bg-[#B8860B] text-white rounded-lg cursor-pointer w-32"
                    onClick={() => navigate("/")}>
                    <p><ArrowLeft className="inline-block" /> Atras</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center items-center py-5 px-10 rounded-lg shadow-lg bg-white gap-5">
                    <h2 className="text-2xl font-semibold">Iniciar sesión</h2>
                    <p>Ingresa tu correo y contraseña para iniciar sesion</p>
                    <div className="flex flex-col justify-start w-full">
                        <label htmlFor="correo">Correo</label>
                        <input type="email" id="correo" className="border-1 border-gray-300 w-full rounded-lg px-2 py-2"
                            {...register("email", { required: "El email es requerido" })} />
                        {errors.email && (
                            <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
                        )}
                    </div>
                    <div className="flex flex-col justify-start w-full">
                        <label htmlFor="correo">Contraseña</label>
                        <input type="password" id="password" placeholder="********" className="border-1 border-gray-300 w-full rounded-lg px-2 py-2"
                            {...register("password", { required: "La contraseña es obligatoria" })} />
                        {errors.password && (
                            <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
                        )}
                    </div>
                    {error && <p className="text-red-500 text-start text-sm">{error}</p>}
                    <Button
                        type="submit"
                        disabled={!isValid || isSubmitting}
                        className={`${isValid && !isSubmitting ? 'bg-[#B8860B] text-white' : 'bg-gray-400 text-gray-500'} w-full`}
                    >
                        { isSubmitting ? '...Cargando':'Ingresar'}
                    </Button>
                    <p onClick={() => navigate("/register")}>¿No tienes una cuenta ? <span className="text-[#B8860B] hover:underline cursor-pointer">Registrate</span></p>
                </form>
            </div>
        </div>
    )
}

export default Login