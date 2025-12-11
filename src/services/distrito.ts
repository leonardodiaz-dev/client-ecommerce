import type { AxiosError } from "axios"
import type { Distrito } from "../interfaces/distrito"
import apiPublic from "./apiPublic"
import type { ApiError } from "../interfaces/apiError"

export const getDistritosByProvincia = async (id_provincia: number): Promise<Distrito[]> => {
    try {
        const response = await apiPublic(`/districts/find/${id_provincia}`)
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