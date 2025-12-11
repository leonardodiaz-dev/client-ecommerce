export interface Categoria {
    id: number
    nombre: string
    estado: boolean
    subcategories: SubCategoria[]
}

export type CategoriaFormData = Omit<Categoria, 'id' | 'subcategorias'>

export interface SubCategoria {
    id: number
    nombre: string
    estado: boolean
    category_id:number
    subsubcategories: SubSubCategoria[]
    category: Categoria
}

export type SubCategoriaFormData = {
    nombre: string
    category_id: number
}

export interface SubSubCategoria {
    id: number
    nombre: string
    estado: boolean
    subcategory_id:number
    subcategory: SubCategoria
}

export type SubSubCategoriaFormData = {
    nombre: string
    subcategory_id: number
}