import type { SubCategoria, SubSubCategoria } from "./categoria"
import type { Genero } from "./genero"
import type { Marca } from "./marca"

export interface Articulo {
    idArticulo: number
    codigo: string
    nombre: string
    slug: string
    genero: Genero
    generoId?: number
    marca?: Marca
    marcaId?: number
    precioVenta: string
    imagen?: string
    estado: boolean
    categoria: string
    categoriaId?: number
    subcategoriaId?: number
    subSubcategoriaId?: number
    variantes: {
        idVariante: number
        colorId: number
        tallaId: number
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
    idVariante: number
    talla: string
    color: string
    stock: number
}

export interface ArticuloFormData {
    nombre: string
    precioVenta: string | null
    marcaId?: number | null
    imagen: string | null
    generoId: number | null
    categoriaId?: number | null
    subcategoriaId?: number | null
    subSubcategoriaId?: number | null
    variantes: {
        colorId: number | null
        tallaId: number | null
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