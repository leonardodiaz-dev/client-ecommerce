import type { AxiosError } from "axios";
import apiPrivate from "./apiPrivate";
import type { ApiError } from "../interfaces/apiError";

export interface Compra {
    sale_id: number
    fecha: string
    total: number
    items: CompraItem[]
}

export interface CompraItem {
    cantidad: number
    precio: number
    subtotal: number
    variant: {
        id: number
        color?: string | null
        size?: string | null
    }
    article: {
        id: number
        nombre: string
        imagen: string
    }
}

export const getComprasByUser = async (): Promise<Compra[]> => {
    try {
        const response = await apiPrivate.get('/sale-details')
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

