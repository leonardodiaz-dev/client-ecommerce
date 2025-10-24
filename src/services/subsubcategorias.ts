import type { AxiosError } from "axios"
import type { SubSubCategoria } from "../interfaces/categoria"
import apiPublic from "./apiPublic"
import type { ApiError } from "../interfaces/apiError"
import type { Marca } from "../interfaces/marca"

export const getSubsubcategoriasBySubCategoriaId = async (id: number): Promise<SubSubCategoria[]> => {

    try {
        const response = await apiPublic.get(`/subsubcategorias/${id}`)
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

export const obtenerMarcasBySubsubcategoria = async (nombre:string): Promise<Marca[]> => {
    try {
        const response = await apiPublic.get(`/subsubcategorias/marcas/${nombre}`)
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