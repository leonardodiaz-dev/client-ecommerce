import type { AxiosError } from "axios";
import type { Color } from "../interfaces/color";
import apiPublic from "./apiPublic";
import type { ApiError } from "../interfaces/apiError";

export const getAllColores = async (): Promise<Color[]> => {

    try {
        const response = await apiPublic.get("/colores")
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