import type { SubCategoria, SubSubCategoria } from "./categoria"
import type { Genero } from "./genero"
import type { Marca } from "./marca"

export interface Articulo {
    id: number
    codigo: string
    nombre: string
    slug: string
    gender: Genero
    gender_id:number
    brand?: Marca
    brand_id:number
    precioVenta: number
    imagen?: string
    estado: boolean
    subsubcategory:SubSubCategoria
    category_id?: number
    subcategory_id?: number
    subsubcategory_id?: number
    variants: {
        id: number
        color_id: number
        talla_id: number
    }[]
}

export interface ArticuloDetalle {
    id: number
    nombre: string
    slug: string
    codigo: string
    precio: number
    subcategoria: SubCategoria
    subsubcategoria: string
    imagen: string
    marca: string
    tallas: string[]
    colores: string[]
    stockTotal: number
    variantes: Variante[]
}

export interface ArticuloSeleccionado {
    idVariante: number
    idProducto: number
    nombre: string
    stock: number
    precio: number
    marca: string
    talla?: string
    color?: string
    imagen: string
    cantidad: number
}

export interface Variante {
    id: number
    talla: string
    color: string
    stock: number
}

export interface ArticuloFormData {
    nombre: string
    precioVenta: string | null
    brand_id?: number | null
    imagen: string | null
    gender_id: number | null
    category_id?: number | null
    subcategory_id?: number | null
    subsubcategory_id?: number | null
    variants: {
        id: number| null
        color_id: number | null
        size_id: number | null
    }[]
}

export interface ResultadoBusqueda {
    query: string
    resultados: Resultados
}

export interface Resultados {
    articulos: Articulo[]
    marcas: Marca[]
    subcategorias: SubCategoria[]
    subsubcategorias: SubSubCategoria[]
}

export type RangePrecio = {
    min:string
    max:string
}