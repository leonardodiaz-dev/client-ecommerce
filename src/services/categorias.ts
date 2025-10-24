import type { AxiosError } from "axios"
import type { ApiError } from "../interfaces/apiError"
import type { Categoria } from "../interfaces/categoria"
import apiPublic from "./apiPublic"

export const listCategoriasWithSubCategorias = async (): Promise<Categoria[]> => {
    try {
        const response = await apiPublic.get("/categorias/subcategorias")
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

export const getAllCategorias = async (): Promise<Categoria[]> => {
    try {
        const response = await apiPublic.get("/categorias")
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