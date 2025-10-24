import { z } from "zod";

export const detalleSchema = z.object({
    varianteId: z
        .number()
        .min(1, "Debe seleccionar una variante"),
    cantidad: z
        .number()
        .min(1, "La cantidad debe ser al menos 1"),
});

export const ingresoSchema = z.object({
    proveedorId: z.number() 
        .min(1, "Debe seleccionar un proveedor"),
    detalles: z
        .array(detalleSchema)
        .min(1, "Debe registrar al menos una variante en el ingreso"),
});

export type IngresoFormInput = z.infer<typeof ingresoSchema>; 

export type IngresoFormData = {
    proveedorId: number;
    detalles: z.infer<typeof detalleSchema>[];
}