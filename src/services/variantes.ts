import type { AxiosError } from "axios";
import type { BuscarVariante } from "../interfaces/variante";
import apiPublic from "./apiPublic";
import type { ApiError } from "../interfaces/apiError";

export const buscarVariante = async (codigo: string): Promise<BuscarVariante[]> => {
    try {
        const response = await apiPublic.get("/variants/find", {
            params: { codigo }
        })
        console.log(response.data)
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