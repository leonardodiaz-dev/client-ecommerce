import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type { Articulo } from "../interfaces/articulo"
import { createArticulo, listarArticulos, updateArticulo, updateEstadoArticulo } from "../services/articulos"

interface ArticuloStore {
    articulos: Articulo[]
    status: "idle" | "loading" | "succeeded" | "failed"
    updating: "idle" | "loading" | "succeeded" | "failed"
    error: string | null
}

interface EditArticulo {
    id: number
    formData: FormData
}

const initialState: ArticuloStore = {
    articulos: [],
    status: "idle",
    updating: "idle",
    error: null
}

export const fetchArticulos =
    createAsyncThunk("articulos/fetchArticulos", async (_, { rejectWithValue }) => {
        try {
            return await listarArticulos()
        } catch (error) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
            return rejectWithValue("Error desconocido");
        }
    })

export const addArticulo =
    createAsyncThunk("articulos/addArticulo", async (formData: FormData, { rejectWithValue }) => {
        try {
            return await createArticulo(formData)
        } catch (error) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
            return rejectWithValue("Error desconocido");
        }
    })

export const editArticulo =
    createAsyncThunk("articulo/updateArticulo", async ({ id, formData }: EditArticulo, { rejectWithValue }) => {
        try {
            return await updateArticulo(id, formData)
        } catch (error) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
            return rejectWithValue("Error desconocido");
        }
    })

export const changeEstadoArticulo =
    createAsyncThunk("articulos/changeEstadoArticulo", async ({ id, estado }: { id: number, estado: boolean }, { rejectWithValue }) => {
        try {
            updateEstadoArticulo(id, estado)
            return { id, estado }
        } catch (error) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
            return rejectWithValue("Error desconocido");
        }

    })

const articuloSlice = createSlice({
    name: "categorias",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticulos.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchArticulos.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.articulos = action.payload;
                state.error = null;
            })
            .addCase(fetchArticulos.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            })
            .addCase(addArticulo.fulfilled, (state, action) => {
                console.log(action.payload)
                state.status = 'succeeded'
                state.articulos.push(action.payload)
            })
            .addCase(editArticulo.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.articulos = state.articulos.map(a =>
                    a.id === action.payload.id ?
                        action.payload : a
                )
            })
            .addCase(changeEstadoArticulo.fulfilled, (state, action) => {
                state.status = 'succeeded'
                const updated = action.payload
                const index = state.articulos.findIndex(a =>
                    a.id === updated.id
                )
                state.articulos[index].estado = updated.estado
            })
    }
})

export default articuloSlice.reducer