import type { AxiosError } from "axios";
import type { Proveedor } from "../interfaces/proveedor";
import apiPrivate from "./apiPrivate";
import type { ApiError } from "../interfaces/apiError";
import type { ProveedorFormData } from "../schemas/proveedorSchema";

export const createProvedor = async (proveedor: ProveedorFormData): Promise<Proveedor> => {
    try {
        const response = await apiPrivate.post<Proveedor>("/proveedores", proveedor)
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

export const updateProveedor = async (id:number,proveedor: ProveedorFormData): Promise<Proveedor> => {
    try {
        const response = await apiPrivate.put(`/proveedores/${id}`, proveedor)
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

export const getAllProveedores = async (): Promise<Proveedor[]> => {
    try {
        const response = await apiPrivate.get("/proveedores")
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

export const existProveedor = async (ruc: string, id?: number): Promise<boolean> => {

    try {
        const res = await apiPrivate.get(`/proveedores/exist/${ruc}`, {
            params: { excludeId: id },
        });
        return res.data.existe;
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
