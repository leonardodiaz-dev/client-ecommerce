import type { AxiosError } from "axios";
import apiPublic from "./apiPublic"
import type { ApiError } from "../interfaces/apiError";
import type { SubCategoria, SubCategoriaFormData, SubSubCategoria } from "../interfaces/categoria";
import apiPrivate from "./apiPrivate";

export const getSubcategoriasByCategoriaId = async (id: number): Promise<SubCategoria[]> => {
    try {
        const response = await apiPublic.get(`/subcategories/category/${id}`)
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

export const createSubcategoria = async (subcategoria: SubCategoriaFormData) => {
    try {
        const response = await apiPrivate.post("/subcategories", subcategoria)
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

export const updateSubcategoria = async (id: number, subcategoria: SubCategoriaFormData): Promise<SubCategoria> => {
    try {
        const response = await apiPrivate.put(`/subcategories/${id}`, subcategoria)
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

export const updateEstadoubcategoria = async (id: number, estado: boolean) => {
    try {
        await apiPrivate.patch(`/subcategories/change/${id}`, { estado })
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

export const getAllSubcategorias = async (): Promise<SubCategoria[]> => {
    try {
        const response = await apiPrivate.get(`/subcategories`)
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

export const getSubcategoria = async (id: number): Promise<SubCategoria> => {
    try {
        const response = await apiPrivate.get(`/subcategories/${id}`)
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

export const getSubsubcategorias = async (nombre: string): Promise<SubSubCategoria[]> => {
    try {
        const response = await apiPublic.get(`/subsubcategories/find/${nombre}`)
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