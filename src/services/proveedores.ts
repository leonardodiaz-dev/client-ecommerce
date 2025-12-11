import type { AxiosError } from "axios";
import type { Proveedor } from "../interfaces/proveedor";
import apiPrivate from "./apiPrivate";
import type { ApiError } from "../interfaces/apiError";
import type { ProveedorFormData } from "../schemas/proveedorSchema";

export const createProvedor = async (proveedor: ProveedorFormData): Promise<Proveedor> => {
    try {
        const response = await apiPrivate.post("/suppliers", proveedor)
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

export const updateProveedor = async (id: number, proveedor: ProveedorFormData): Promise<Proveedor> => {
    try {
        const response = await apiPrivate.put(`/suppliers/${id}`, proveedor)
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

export const updateEstadoProveedor = async (id: number, estado: boolean): Promise<void> => {
    try {
        await apiPrivate.patch(`/suppliers/change/${id}`, { estado })
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

export const getAllProveedores = async (): Promise<Proveedor[]> => {
    try {
        const response = await apiPrivate.get("/suppliers")
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

export const existProveedor = async (ruc: string, id?: number): Promise<boolean> => {

    try {
        const res = await apiPrivate.get(`/suppliers/exist/${ruc}`, {
            params: { id },
        });
        return res.data;
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

};
