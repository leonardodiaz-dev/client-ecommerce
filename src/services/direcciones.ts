import type { AxiosError } from "axios";
import type { Direccion, DireccionData } from "../interfaces/direccion";
import apiPrivate from "./apiPrivate";
import type { ApiError } from "../interfaces/apiError";

export const getAllDireccionesByUsuario = async (): Promise<Direccion[]> => {

    try {
        const response = await apiPrivate.get("/addresses")
        console.log(response.data)
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

export const createDireccion = async (direccion: DireccionData): Promise<Direccion> => {

    try {
        const response = await apiPrivate.post("/addresses", direccion)
        console.log(response.data)
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

export const deleteDireccion = async (id: number) => {
    try {
        const response = await apiPrivate.delete(`/addresses/${id}`)
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

export const updateEstadoIsPrincipal = async (id: number) => {
    try {
        const response = await apiPrivate.patch(`/addresses/change/${id}`)
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