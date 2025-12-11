import type { AxiosError } from "axios";
import type { ApiError } from "../interfaces/apiError";
import type { DatosPersonalesFormData, LoginUser, UpdateContrasena, Usuario, UsuarioFormData } from "../interfaces/usuario";
import apiPublic from "./apiPublic";
import apiPrivate from "./apiPrivate";

export const createUsuario = async (usuarioForm: UsuarioFormData): Promise<Usuario> => {

    try {
        const response = await apiPublic.post("/auth/register", usuarioForm)
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

export const updatedUsuario = async (usuarioForm: DatosPersonalesFormData): Promise<Usuario> => {

    try {
        const response = await apiPrivate.put("/users", usuarioForm)
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

export const updatedPassword = async (updatedPassword: Omit<UpdateContrasena, 'repetir_contrasena'>): Promise<string> => {

    try {
        const response = await apiPrivate.put("/usuarios/password", updatedPassword)
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
        const response = await apiPrivate.get("/users")
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

export const loginUsuario = async (email: string, password: string): Promise<LoginUser> => {
    try {
        const response = await apiPublic.post("/auth/login", { email, password })
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