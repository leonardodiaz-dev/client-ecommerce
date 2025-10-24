import type { AxiosError } from "axios";
import type { ApiError } from "../interfaces/apiError";
import type { LoginUser, Usuario, UsuarioFormData } from "../interfaces/usuario";
import apiPublic from "./apiPublic";
import apiPrivate from "./apiPrivate";

export const createUsuario = async (usuarioForm: UsuarioFormData): Promise<Usuario> => {

    try {
        const response = await apiPublic.post("/usuarios", usuarioForm)
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

export const getAllUsuarios = async (): Promise<Usuario[]> => {
    try {
        const response = await apiPrivate.get("/usuarios")
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

export const loginUsuario = async (email: string, contrasena: string): Promise<LoginUser> => {
    try {
        const response = await apiPublic.post("/login", { email, contrasena })
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