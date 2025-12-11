import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type { Direccion, DireccionData } from "../interfaces/direccion"
import { createDireccion, deleteDireccion, getAllDireccionesByUsuario, updateEstadoIsPrincipal } from "../services/direcciones"

interface CategoriaStore {
    direcciones: Direccion[]
    status: "idle" | "loading" | "succeeded" | "failed"
    error: string | null
}

const initialState: CategoriaStore = {
    direcciones: [],
    status: "idle",
    error: null
}

export const fetchDirecciones =
    createAsyncThunk("direcciones/fetchDirecciones", async (_, { rejectWithValue }) => {
        try {
            return await getAllDireccionesByUsuario()
        } catch (error) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
            return rejectWithValue("Error desconocido");
        }
    })

export const addDireccion =
    createAsyncThunk("direcciones/addDireccion", async (direccionData: DireccionData, { rejectWithValue }) => {
        try {
            return await createDireccion(direccionData)
        } catch (error) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
            return rejectWithValue("Error desconocido");
        }
    })

export const removeDireccion =
    createAsyncThunk("direcciones/removeDireccion", async (id: number, { rejectWithValue }) => {
        try {
            await deleteDireccion(id)
            return id
        } catch (error) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
            return rejectWithValue("Error desconocido");
        }
    })

export const changeEstadoDireccion =
    createAsyncThunk("direcciones/changeEstadoDireccion", async (id: number, { rejectWithValue }) => {
        try {
            await updateEstadoIsPrincipal(id)
            return id
        } catch (error) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
            return rejectWithValue("Error desconocido");
        }
    })

const direccionSlice = createSlice({
    name: "direcciones",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDirecciones.pending, (state) => {
                state.status = "loading"
            })
            .addCase(fetchDirecciones.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload as string;
            })
            .addCase(fetchDirecciones.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.direcciones = action.payload
            })
            .addCase(addDireccion.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.direcciones.push(action.payload)
            })
            .addCase(removeDireccion.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.direcciones = state.direcciones.filter(d =>
                    d.id !== action.payload
                )
            })
            .addCase(changeEstadoDireccion.fulfilled, (state, action) => {
                state.status = 'succeeded'
                const ixdDireccionprincipal = state.direcciones.findIndex(d =>
                    d.isPrincipal === true
                )
                if (ixdDireccionprincipal !== -1) {
                    state.direcciones[ixdDireccionprincipal].isPrincipal = false
                }
                const idxDireccion = state.direcciones.findIndex(d =>
                    d.id === action.payload
                )
                state.direcciones[idxDireccion].isPrincipal = true
            })
    },
})

export default direccionSlice.reducer