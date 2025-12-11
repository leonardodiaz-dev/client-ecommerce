import type { AxiosError } from "axios"
import type { ApiError } from "../interfaces/apiError"
import apiPrivate from "./apiPrivate"

interface DatosVenta {
    address_id: number
    items: {
        variant_id: number
        name: string
        precio: number
        cantidad: number
    }[]
}

export const createSession = async (datosVenta: DatosVenta) => {
    console.log(datosVenta)
    try {
       const response = await apiPrivate.post("/stripe/create-session",datosVenta)
       return response.data
    } catch (err) {
        const error = err as AxiosError<ApiError>;

        if (error.response) {
            console.error("Error de validación:", error.response.data);
            throw error.response.data;
        } else {
            console.error("Error inesperado:", error.message);
            throw { message: error.message } as ApiError;
        }
    }
}