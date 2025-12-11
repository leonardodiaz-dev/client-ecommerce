import { IdCard, LockKeyhole } from "lucide-react"
import { useState } from "react"
import DatosPersonalesForm from "../components/configuracion/DatosPersonalesForm"
import CambiarContrasenaForm from "../components/configuracion/CambiarContrasenaForm"

const Configuracion = () => {

    const [linkSelect, setLinkSelect] = useState("datos-personales")

    return (
        <div  className="flex flex-col items-center justify-start w-full p-5 text-gray-900 h-full">
            <h2 className="text-lg font-semibold text-center mb-2">Mis Datos</h2>
            <div className='flex flex-row items-start justify-center h-1/6 mb-4 w-full'>
                <ul className='flex flex-row bg-white border-gray-200  justify-center items-center w-full sm:w-1/2 h-full mb-5 sm:mb-0 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white p-2'>
                    <a className={`${linkSelect === 'datos-personales' ? 'bg-gray-400 hover:bg-gray-500 rounded-lg' : ''} flex items-center p-2 me-5 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600`}
                        onClick={() => setLinkSelect("datos-personales")}>
                        <IdCard className="w-5 h-5 mr-2" /> Datos Personales
                    </a>
                    <a className={`${linkSelect === 'cambiar-contrasena' ? 'bg-gray-400 hover:bg-gray-500 rounded-lg' : ''} flex items-center p-2 me-5 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600`}
                        onClick={() => setLinkSelect("cambiar-contrasena")}>
                        <LockKeyhole className="w-5 h-5 mr-2" /> Cambiar Contraseña
                    </a>
                </ul>
            </div>
            {linkSelect === "datos-personales" ? (
                <DatosPersonalesForm />
            ) : (
                <CambiarContrasenaForm />
            )}
        </div>
  )
}

export default Configuracion