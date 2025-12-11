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
    supplier_id: number
    variants:{
        id: number
        cantidad:number
    }[]
}

export interface Detalles {
    id:number
    cantidad:number
    variant:Variante
}

interface Variante {
    idVariante: number
    articuloId: number
    colorId: number
    color: Color
    article: Articulo
    tallaId: number
    size: Talla
    stock: number
}