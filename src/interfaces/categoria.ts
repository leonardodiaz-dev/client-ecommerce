export interface Categoria {
    idCategoria:number
    nombre:string
    subcategorias:SubCategoria[]
}
 
interface SubCategoria {
    idSubcategoria:number
    nombre:string
    subsubcategorias:SubSubCategoria[]
}

interface SubSubCategoria {
    idSubSubCategoria:number
    nombre:string
}