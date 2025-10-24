import { useForm } from "react-hook-form"
import Button from "../common/Button"
import { zodResolver } from "@hookform/resolvers/zod";
import { proveedorSchema, type ProveedorFormData } from "../../schemas/proveedorSchema";
import { createProvedor, existProveedor, updateProveedor } from "../../services/proveedores";
import type { ApiError } from "../../interfaces/apiError";
import type { Proveedor } from "../../interfaces/proveedor";
import { useEffect, useState } from "react";

type Props = {
    proveedor?: Proveedor | null
    closeModal: () => void
}

const ProveedorForm = ({ proveedor, closeModal }: Props) => {
    const { register, handleSubmit, reset, formState: { errors, isValid, isSubmitting } } = useForm<ProveedorFormData>({
        resolver: zodResolver(proveedorSchema),
        mode: "onChange"
    });
    const [erroRuc, setErrorRuc] = useState<string>("")

    useEffect(() => {
        reset({ ...proveedor })
    }, [reset, proveedor])

    const onSubmit = async (data: ProveedorFormData) => {
        const initialData = {
            nombre:proveedor?.nombre,
            ruc:proveedor?.ruc,
            direccion:proveedor?.direccion,
            telefono:proveedor?.telefono
        }

        const sinCambios = JSON.stringify(initialData) === JSON.stringify(data)

        if (sinCambios) {
            return alert("No se han hecho moficicaciones")
        }

        try {
            if (proveedor) {
                const res = await updateProveedor(proveedor.idProveedor, data)
                console.log(res)
            } else {
                const res = await createProvedor(data)
                console.log(res)
            }
            reset()
            closeModal()
        } catch (error) {
            const apiError = error as ApiError
            console.log(apiError.message)
        }
    }

    const existRuc = async (ruc: string) => {
        const res = await existProveedor(ruc, proveedor?.idProveedor)
        if (res) {
            setErrorRuc("Ya existe un proveedor con este ruc")
        } else {
            setErrorRuc("")
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
                <label htmlFor="ruc">RUC</label>
                <input
                    type="text"
                    id="ruc"
                    maxLength={11}
                    className="border border-gray-300 w-full rounded-lg h-10 px-2 py-2"
                    {...register("ruc")}
                    onChange={(e) => existRuc(e.target.value)}
                />
                {errors.ruc && (
                    <p className="text-red-500 text-sm">{errors.ruc.message}</p>
                )}
                {erroRuc && (
                    <p className="text-red-500 text-sm">{erroRuc}</p>
                )
                }
            </div>

            <div className="mb-2">
                <label htmlFor="direccion">Dirección</label>
                <input
                    type="text"
                    id="direccion"
                    className="border border-gray-300 w-full rounded-lg h-10 px-2 py-2"
                    {...register("direccion")}
                />
                {errors.direccion && (
                    <p className="text-red-500 text-sm">{errors.direccion.message}</p>
                )}
            </div>

            <div className="mb-2">
                <label htmlFor="telefono">Teléfono</label>
                <input
                    type="tel"
                    id="telefono"
                    maxLength={9}
                    className="border border-gray-300 w-full rounded-lg h-10 px-2 py-2"
                    {...register("telefono")}
                />
                {errors.telefono && (
                    <p className="text-red-500 text-sm">{errors.telefono.message}</p>
                )}
            </div>

            <Button
                type="submit"
                disabled={!isValid || isSubmitting || !!erroRuc}
                className={`${isValid && !isSubmitting && !erroRuc ? 'bg-[#B8860B] text-white' : 'bg-gray-400 text-gray-500'} w-full`}
            >
                {isSubmitting ? '...Registrando' : proveedor ? 'Editar' : 'Registrar'}
            </Button>
        </form>
    )
}

export default ProveedorForm