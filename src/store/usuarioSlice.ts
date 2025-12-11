import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Usuario, UsuarioFormData } from "../interfaces/usuario";
import { createUsuario, getAllUsuarios } from "../services/usuarios";

interface UsuarioStore {
    usuarios: Usuario[]
    status: "idle" | "loading" | "succeeded" | "failed"
    error: string | null
}

const initialState: UsuarioStore = {
    usuarios: [],
    status: 'idle',
    error: null
}

export const fetchUsuarios = createAsyncThunk("usuarios/fetchUsuarios", async (_, { rejectWithValue }) => {
    try {
        return await getAllUsuarios()
    } catch (error) {
        if (error instanceof Error) {
            return rejectWithValue(error.message);
        }
        return rejectWithValue("Error desconocido");
    }
})

export const addUsuario = createAsyncThunk("usuarios/addUsuario", async (usuario: UsuarioFormData, { rejectWithValue }) => {
    try {
        return await createUsuario(usuario)
    } catch (error) {
        if (error instanceof Error) {
            return rejectWithValue(error.message);
        }
        return rejectWithValue("Error desconocido");
    }
})

const usuarioSlice = createSlice({
    name: 'usuarios',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsuarios.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.usuarios = action.payload
            })
            .addCase(addUsuario.fulfilled,(state,action) => {
                state.status = 'succeeded'
                state.usuarios.push(action.payload)
            })
    },
})

export default usuarioSlice.reducer