import React from "react"
import type { Direccion } from "../../interfaces/direccion"
import CambiarDireccionCard from "./CambiarDireccionCard"
import Button from "../common/Button"

type Props = {
    direcciones: Direccion[]
    setDireccion: React.Dispatch<React.SetStateAction<Direccion | null>>
    selectedDireccion: number
    onDireccionChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const CambiarDireccionForm = ({ direcciones, setDireccion, onDireccionChange, selectedDireccion }: Props) => {

    const handleSeleccionar = () => {
        const newDireccion = direcciones.find(d => d.id === selectedDireccion)
        if (newDireccion) {
            localStorage.setItem("direccionItem", JSON.stringify(newDireccion))
            setDireccion(newDireccion)
        }
    }
    return (
        <div className="flex flex-col gap-2">
            {
                direcciones.map(d => (
                    <CambiarDireccionCard
                        key={d.id}
                        direccion={d}
                        selectedDireccion={selectedDireccion}
                        onDireccionChange={onDireccionChange} />
                ))
            }
            <Button className="bg-[#B8860B] text-white"
                onClick={handleSeleccionar}>
                Seleccionar
            </Button>
        </div>
    )
}

export default CambiarDireccionForm