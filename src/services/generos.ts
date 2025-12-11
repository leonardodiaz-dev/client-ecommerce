import type { AxiosError } from "axios";
import type { Genero } from "../interfaces/genero";
import apiPublic from "./apiPublic";
import type { ApiError } from "../interfaces/apiError";

export const getAllGeneros = async (): Promise<Genero[]> => {

    try {
        const response = await apiPublic.get("/genders")
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

export const getGenerosByCategoria = async (categoria: string): Promise<Genero[]> => {
    try {
        const response = await apiPublic.get("/genders/find", {
            params: {
                categoriaNombre: categoria
            }
        })
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