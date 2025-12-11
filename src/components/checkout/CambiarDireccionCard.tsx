import React from 'react'
import type { Direccion } from '../../interfaces/direccion'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../../store/store'
import { removeDireccion } from '../../store/direccionSlice'

type Props = {
    direccion: Direccion
    selectedDireccion: number
    onDireccionChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const CambiarDireccionCard = ({ direccion, onDireccionChange, selectedDireccion }: Props) => {
    const dispatch = useDispatch<AppDispatch>()
    return (
        <div className='flex flex-row justify-between border-1 rounded-lg border-gray-300 p-5'>
            <div className='flex flex-row gap-2'>
                <input className='w-5 h-5' type="radio" name="direccion"
                    id="direccion" value={direccion.id.toString()}
                    checked={selectedDireccion.toString() === direccion.id.toString()}
                    onChange={onDireccionChange} />
                <p>{direccion.nombre}</p>
            </div>
            <p className='underline cursor-pointer'
                onClick={() => dispatch(removeDireccion(direccion.id))}>
                Eliminar
            </p>
        </div>
    )
}

export default CambiarDireccionCard