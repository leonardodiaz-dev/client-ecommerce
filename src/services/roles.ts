import type { AxiosError } from "axios";
import apiPrivate from "./apiPrivate"
import type { ApiError } from "../interfaces/apiError";
import type { Rol } from "../interfaces/rol";

export const getRoles = async ():Promise<Rol[]> => {
    try {
        const response = await apiPrivate.get('/roles')
        return response.data.data
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