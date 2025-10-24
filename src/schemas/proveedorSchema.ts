import { z } from "zod";

export const proveedorSchema = z.object({

    nombre: z
        .string()
        .min(1, "El nombre es obligatorio")
        .max(50, "El nombre no debe exceder 50 caracteres"),
    ruc: z
        .string()
        .regex(/^[0-9]+$/, "El RUC solo debe contener números")
        .length(11, "El RUC debe tener 11 dígitos"),
    direccion: z
        .string()
        .min(1, "La dirección es obligatoria"),
    telefono: z
        .string()
        .regex(/^[0-9]+$/, "El teléfono solo debe contener números")
        .length(9, "El teléfono debe tener 9 dígitos"),
})

export type ProveedorFormData = z.infer<typeof proveedorSchema>;
