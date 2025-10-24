import type { AxiosError } from "axios";
import apiPublic from "./apiPublic"
import type { ApiError } from "../interfaces/apiError";
import type { SubCategoria, SubSubCategoria } from "../interfaces/categoria";

export const getSubcategoriasByCategoriaId = async (id: number): Promise<SubCategoria[]> => {
    try {
        const response = await apiPublic.get(`/subcategorias/${id}`)
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

export const getSubsubcategorias = async (nombre: string): Promise<SubSubCategoria[]> => {
    try {
        const response = await apiPublic.get(`/subcategorias/obtener/${nombre}`)
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