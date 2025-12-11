import type { Rol } from "./rol"

export interface Usuario {
    id: number
    nombre: string
    apellido: string
    dni: string
    email: string
    telefono: string
    password: string
    password_confirmation: string
    roles: Rol[]
    rolesId: number[]
}

export type UsuarioFormData = Omit<Usuario, 'idUsuario' | 'roles'>

export type DatosPersonalesFormData = Omit<Usuario, 'idUsuario' | 'rolId' | 'contrasena' | 'rol' | 'rolNombre'>

export interface LoginUser {
    message: string
    token: string
    expires_in: number
    expires_at: string
    user: Usuario
}

export type UpdateContrasena = {
    contrasena_actual: string
    nueva_contrasena: string
    repetir_contrasena: string
}