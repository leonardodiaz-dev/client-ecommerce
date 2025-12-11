import type { AxiosError } from "axios";
import type { ApiError } from "../interfaces/apiError";
import type { Articulo, ArticuloDetalle, RangePrecio, ResultadoBusqueda } from "../interfaces/articulo";
import apiPublic from "./apiPublic";
import apiPrivate from "./apiPrivate";

interface ArticulosResponse {
    last_page: number;
    current_page: number;
    data: Articulo[];
}

export const createArticulo = async (formData: FormData): Promise<Articulo> => {
    try {
        const response = await apiPrivate.post("/articles", formData, {
            headers: { "Content-Type": "multipart/form-data" }
        })
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

export const updateArticulo = async (id: number, formData: FormData): Promise<Articulo> => {
    try {
        formData.append("_method", "PUT");

        const response = await apiPrivate.post(`/articles/${id}`, formData, {
            headers: { "Content-Type": "multipart/form-data" }
        })
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

export const getArticuloBySlug = async (slug: string): Promise<ArticuloDetalle> => {
    try {
        const response = await apiPublic.get(`/articles/slug/${slug}`)
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

export const updateEstadoArticulo = async (id: number, estado: boolean) => {
    try {
        await apiPrivate.patch(`/articles/change/${id}`, { estado })
    
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
        const response = await apiPublic.get(`/articles/show/${id}`)
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
        const response = await apiPrivate.get("/articles")
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

export const getAllArticulos = async (
    filters: {
        marca?: string
        generoId?: string
        nombre?: string
        categoriaNombre?: string
        precioMin?: string
        precioMax?: string
        page?: number
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
        if (filters.page) params.append("page", String(filters.page))
        const response = await apiPublic.get(`/articles/find?${params.toString()}`)
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

export const busqueda = async (value: string): Promise<ResultadoBusqueda> => {
    try {
        const response = await apiPublic.get(`/articles/busqueda?q=${encodeURIComponent(value)}`)
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

export const getRangoPrecio = async (filters: {
    categoria?: string,
    marca?: string
    query?:string
}): Promise<RangePrecio> => {
    const params = new URLSearchParams()
    try {
        if (filters.categoria) params.append("categoria", filters.categoria)
        if (filters.marca) params.append("marca", filters.marca)
        if(filters.query) params.append("query",filters.query)
        const response = await apiPublic.get(`/articles/price?${params.toString()}`,)
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