import { ArrowLeft } from "lucide-react"
import Button from "../components/common/Button"
import { useNavigate } from "react-router-dom"
import type { Usuario } from "../interfaces/usuario"
import { useForm } from "react-hook-form"
import { loginUsuario } from "../services/usuarios"
import type { ApiError } from "../interfaces/apiError"
import { useAuth } from "../context/useAuth"

const Login = () => {

    const { register, handleSubmit, formState: { errors, isValid } } = useForm<Pick<Usuario, 'email' | 'contrasena'>>({
        mode: 'onChange'
    })
    const { login } = useAuth()
    const navigate = useNavigate()

    const onSubmit = async (data: Pick<Usuario, 'email' | 'contrasena'>) => {
        try {
            const response = await loginUsuario(data.email, data.contrasena)
            login(response.user, response.token, response.expiresAt)
            if(response.user.rol.nombre === 'Administrador') navigate("/panel/articulos")
            if(response.user.rol.nombre === 'Cliente') navigate("/")    
            console.log(response)
        } catch (error) {
            const apiError = error as ApiError
            console.log(apiError.message)
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
                        <input type="password" id="contrasena" placeholder="********" className="border-1 border-gray-300 w-full rounded-lg px-2 py-2"
                            {...register("contrasena", { required: "La contraseña es obligatoria" })} />
                        {errors.contrasena && (
                            <p className="text-sm text-red-500 mt-1">{errors.contrasena.message}</p>
                        )}
                    </div>
                    <Button
                        type="submit"
                        disabled={!isValid}
                        className={`${isValid ? 'bg-[#B8860B] text-white' : 'bg-gray-400 text-gray-500'} w-full`}
                    >
                        Ingresar
                    </Button>
                    <p onClick={() => navigate("/register")}>¿No tienes una cuenta ? <span className="text-[#B8860B] hover:underline cursor-pointer">Registrate</span></p>
                </form>
            </div>
        </div>
    )
}

export default Login