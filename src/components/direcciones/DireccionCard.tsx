import { useDispatch } from "react-redux"
import type { Direccion } from "../../interfaces/direccion"
import type { AppDispatch } from "../../store/store"
import { changeEstadoDireccion, removeDireccion } from "../../store/direccionSlice"


type DireccionCardProps = {
    direccion: Direccion
}

const DireccionCard = ({ direccion }: DireccionCardProps) => {
    const dispatch = useDispatch<AppDispatch>()
    return (
        <div className="flex flex-row justify-between bg-white shadow-xl rounded-lg px-4 py-5 w-full">
            <div className="flex flex-col justify-start">
                {
                    direccion.isPrincipal && (
                        <p className="bg-green-400 text-sm w-20 rounded-sm text-center text-white p-0.5">Principal</p>
                    )
                }
                <h3 className="text-md font-semibold">{direccion.nombre}</h3>
                <p className="text-sm">{direccion.district},{direccion.department}</p>
            </div>
            <div className="flex flex-row gap-2">
                {
                    !direccion.isPrincipal && (
                        <p className="cursor-pointer text-sm underline"
                            onClick={() => dispatch(changeEstadoDireccion(direccion.id))}>
                            Guardar como principal
                        </p>
                    )
                }
                <p className="cursor-pointer text-sm underline"
                    onClick={() => dispatch(removeDireccion(direccion.id))}>
                    Eliminar
                </p>
            </div>
        </div>
    )
}

export default DireccionCard