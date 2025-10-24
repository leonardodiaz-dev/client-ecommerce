export interface Categoria {
    idCategoria:number
    nombre:string
    subcategorias:SubCategoria[]
}
 
export interface SubCategoria {
    idSubcategoria:number
    nombre:string
    subsubcategorias:SubSubCategoria[]
}

export interface SubSubCategoria {
    idSubSubcategoria:number
    nombre:string
    subcategoria:SubCategoria
}