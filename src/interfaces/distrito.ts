import type { Provincia } from "./provincia"


export interface Distrito {
    id:number
    nombre:string
    provincia:Provincia
}
