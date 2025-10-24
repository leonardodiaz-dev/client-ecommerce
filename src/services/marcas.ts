import type { AxiosError } from "axios";
import type { Marca } from "../interfaces/marca";
import apiPublic from "./apiPublic";
import type { ApiError } from "../interfaces/apiError";
import type { SubSubCategoria } from "../interfaces/categoria";

export const getAllMarcas = async (): Promise<Marca[]> => {

    try {
        const response = await apiPublic.get("/marcas")
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
        const response = await apiPublic.get(`/marcas/${nombre}/subsubcategorias`)
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