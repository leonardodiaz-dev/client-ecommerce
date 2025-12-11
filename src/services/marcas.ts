import type { AxiosError } from "axios";
import type { Marca } from "../interfaces/marca";
import apiPublic from "./apiPublic";
import type { ApiError } from "../interfaces/apiError";
import type { SubSubCategoria } from "../interfaces/categoria";

export const getAllMarcas = async (): Promise<Marca[]> => {

    try {
        const response = await apiPublic.get("/brands")
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

export const getSubSubcategoriasByMarca = async (nombre: string): Promise<SubSubCategoria[]> => {

    try {
        const response = await apiPublic.get(`/subsubcategories/brand/${nombre}`)
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

export const getMarcasByArticle = async (nombre: string): Promise<Marca[]> => {

    try {
        const response = await apiPublic.get(`/brands/find-byArticle/${nombre}`)
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


