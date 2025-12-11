
export interface Direccion {
    id: number,
    isPrincipal:boolean
    nombre: string,
    district: string,
    department:string
}

export interface DireccionData {
    district_id:number
    nombre:string
}

export type DireccionFormData = {
    nombre: string,
    district_id:number
    province_id:number
    department_id:number
}