import type { AxiosError } from "axios";
import type { Detalles, Ingreso, IngresoFormData } from "../interfaces/ingreso";
import apiPrivate from "./apiPrivate";
import type { ApiError } from "../interfaces/apiError";

export const getAllIngresos = async (): Promise<Detalles[]> => {
    try {
        const response = await apiPrivate.get("/ingresos")
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

export const createIngreso = async (ingreso:IngresoFormData):Promise<Ingreso> => {
    try {
        const response = await apiPrivate.post("/ingresos",ingreso)
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