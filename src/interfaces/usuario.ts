export interface Usuario {
    idUsuario:number
    nombre:string
    apellido:string
    dni:string
    email:string
    telefono:string
    contrasena:string
    rolId:number
    rolNombre:string
}

export type UsuarioForm = Omit<Usuario,'idUsuario' |'rolId'>

export interface LoginUser {
    message:string
    token:string
    expiresAt:number
    user:Usuario
}