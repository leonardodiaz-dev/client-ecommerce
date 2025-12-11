import type { AxiosError } from "axios";
import type { ApiError } from "../interfaces/apiError";
import apiPublic from "./apiPublic"
import type { Provincia } from "../interfaces/provincia";

export const getProvinciasByDepartamento = async (id_departamento: number): Promise<Provincia[]> => {
    try {
        const response = await apiPublic.get(`/provinces/find/${id_departamento}`)
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