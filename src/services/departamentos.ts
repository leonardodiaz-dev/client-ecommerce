import type { AxiosError } from "axios";
import type { Departamento } from "../interfaces/departamento";
import type { ApiError } from "../interfaces/apiError";
import apiPublic from "./apiPublic";

export const getAllDepartamentos = async (): Promise<Departamento[]> => {
    try {
        const response = await apiPublic.get("departments")
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