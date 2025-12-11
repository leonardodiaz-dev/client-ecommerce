import type { AxiosError } from "axios"
import type { ApiError } from "../interfaces/apiError"
import type { Categoria, CategoriaFormData } from "../interfaces/categoria"
import apiPublic from "./apiPublic"
import apiPrivate from "./apiPrivate"

export const listCategoriasWithSubCategorias = async (): Promise<Categoria[]> => {
    try {
        const response = await apiPublic.get("/categories/hierarchy")
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

export const createCategoria = async (categoria: CategoriaFormData): Promise<Categoria> => {
    try {
        const response = await apiPrivate.post("/categories", categoria)
        console.log(response.data.data)
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

export const updateCategoria = async (id: number, categoria: CategoriaFormData): Promise<Categoria> => {
    try {
        const response = await apiPrivate.put(`/categories/${id}`, categoria)
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

export const updateEstadoCategoria = async (id: number, estado: boolean) => {
    try {
        await apiPrivate.patch(`/categories/change/${id}`, { estado })
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

export const getAllCategorias = async (): Promise<Categoria[]> => {
    try {
        const response = await apiPrivate.get("/categories")
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