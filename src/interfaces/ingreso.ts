import type { Articulo } from "./articulo"
import type { Color } from "./color"
import type { Proveedor } from "./proveedor"
import type { Talla } from "./talla"

export interface Ingreso {
    idIngreso: number
    fecha: string
    cantidad: number
    varianteId: number
    detalles:Detalles[]
    proveedorId: number
    proveedor: Proveedor
}

export type IngresoFormData = {
    proveedorId: number
    detalles:{
        varianteId: number
        cantidad:number
    }[]
}

export interface Detalles {
    idDetalle:number
    cantidad:number
    variante:Variante
}

interface Variante {
    idVariante: number
    articuloId: number
    colorId: number
    color: Color
    articulo: Articulo
    tallaId: number
    talla: Talla
    stock: number
}