import type { AxiosError } from "axios"
import type { SubSubCategoria, SubSubCategoriaFormData } from "../interfaces/categoria"
import apiPublic from "./apiPublic"
import type { ApiError } from "../interfaces/apiError"
import type { Marca } from "../interfaces/marca"
import apiPrivate from "./apiPrivate"

export const getSubsubcategoriasBySubCategoriaId = async (id: number): Promise<SubSubCategoria[]> => {

    try {
        const response = await apiPublic.get(`/subsubcategories/subcategory/${id}`)
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

export const obtenerMarcasBySubsubcategoria = async (nombre: string): Promise<Marca[]> => {
    try {
        const response = await apiPublic.get(`/brands/find/${nombre}`)
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

export const createSubsubcategoria = async (subsubcategoria: SubSubCategoriaFormData) => {
    try {
        const response = await apiPrivate.post("/subsubcategories", subsubcategoria)
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

export const updateSubsubcategoria = async (id: number, subsubcategoria: SubSubCategoriaFormData): Promise<SubSubCategoria> => {
    try {
        const response = await apiPrivate.put(`/subsubcategories/${id}`, subsubcategoria)
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


export const getAllSubsubcategorias = async (): Promise<SubSubCategoria[]> => {
    try {
        const response = await apiPrivate.get(`/subsubcategories`)
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

export const getSubsubcategoria = async (id: number): Promise<SubSubCategoria> => {
    try {
        const response = await apiPrivate.get(`/subsubcategories/${id}`)
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

export const updateEstadosubsubcategoria = async (id: number, estado: boolean) => {
    try {
        await apiPublic.patch(`/subsubcategories/change/${id}`, { estado })
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