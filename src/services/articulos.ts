import type { AxiosError } from "axios";
import type { ApiError } from "../interfaces/apiError";
import type { Articulo, ArticuloDetalle, ResultadoBusqueda } from "../interfaces/articulo";
import apiPublic from "./apiPublic";
import apiPrivate from "./apiPrivate";

interface ArticulosResponse {
    total: number;
    currentPage: number;
    totalPages: number;
    results: Articulo[];
}

export const createArticulo = async (formData: FormData): Promise<Articulo> => {
    try {
        const response = await apiPrivate.post("/articulos", formData)
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

export const updateArticulo = async (id: number, formData: FormData): Promise<Articulo> => {
    try {
        const response = await apiPrivate.put(`/articulos/${id}`, formData)
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

export const getArticuloBySlug = async (slug:string) :Promise<ArticuloDetalle> => {
    try {
        const response = await apiPublic.get(`/articulos/slug/${slug}`)
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

export const getArticuloById = async (id: number): Promise<Articulo> => {
    try {
        const response = await apiPublic.get(`/articulos/${id}`)
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

export const listarArticulos = async (): Promise<Articulo[]> => {
    try {
        const response = await apiPublic.get("/articulos")
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

export const getAllArticulos = async (
    filters: {
        marca?: string
        generoId?: string
        nombre?: string
        categoriaNombre?: string
        precioMin?: string
        precioMax?: string
    }
): Promise<ArticulosResponse> => {
    const params = new URLSearchParams()
    try {
        if (filters.marca) params.append("marca", filters.marca);
        if (filters.generoId) params.append("generoId", filters.generoId)
        if (filters.nombre) params.append("nombre", filters.nombre)
        if (filters.precioMin) params.append("precioMin", filters.precioMin)
        if (filters.precioMax) params.append("precioMax", filters.precioMax)
        if (filters.categoriaNombre) params.append("categoriaNombre", String(filters.categoriaNombre))
        const response = await apiPublic.get(`/articulos/search?${params.toString()}`)
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

export const busqueda = async (value:string):Promise<ResultadoBusqueda> => {
    try {
        const response = await apiPublic.get(`/articulos/busqueda?q=${encodeURIComponent(value)}`)
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