import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Categoria, CategoriaFormData } from "../interfaces/categoria";
import { createCategoria, getAllCategorias, updateCategoria, updateEstadoCategoria } from "../services/categorias";

interface CategoriaStore {
    categorias: Categoria[]
    status: "idle" | "loading" | "succeeded" | "failed"
    updating: "idle" | "loading" | "succeeded" | "failed"
    error: string | null
}

interface EditCategoria {
    id: number
    categoria: CategoriaFormData
}

const initialState: CategoriaStore = {
    categorias: [],
    status: "idle",
    updating: "idle",
    error: null
}

export const fetchCategorias =
    createAsyncThunk("categorias/fetchCategorias", async (_, { rejectWithValue }) => {
        try {
            return await getAllCategorias()
        } catch (error) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
            return rejectWithValue("Error desconocido");
        }
    })

export const addCategoria =
    createAsyncThunk("categorias/addCategoria", async (categoria: CategoriaFormData, { rejectWithValue }) => {
        try {
            return await createCategoria(categoria)
        } catch (error) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
            return rejectWithValue("Error desconocido");
        }
    })

export const editCategoria =
    createAsyncThunk("categorias/updateCategoria", async ({ id, categoria }: EditCategoria, { rejectWithValue }) => {
        try {
            return await updateCategoria(id, categoria)
        } catch (error) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
            return rejectWithValue("Error desconocido");
        }
    })

export const changeEstadoCategoria =
    createAsyncThunk("subcategorias/changeEstadoSubCategoria", async ({ id, estado }: { id: number, estado: boolean }, { rejectWithValue }) => {
        try {
            updateEstadoCategoria(id, estado)
            return { id, estado }
        } catch (error) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
            return rejectWithValue("Error desconocido");
        }

    })

const categoriaSlice = createSlice({
    name: "categorias",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategorias.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchCategorias.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.categorias = action.payload;
                state.error = null;
            })
            .addCase(fetchCategorias.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            })
            .addCase(editCategoria.pending, (state) => {
                state.updating = "loading";
                state.error = null;
            })
            .addCase(editCategoria.fulfilled, (state, action) => {
                state.updating = "succeeded";
                const updated = action.payload;
                const index = state.categorias.findIndex(
                    (c) => c.id === updated.id
                );
                if (index !== -1) state.categorias[index] = updated;
            })
            .addCase(editCategoria.rejected, (state, action) => {
                state.updating = "failed";
                state.error = action.payload as string;
            })
            .addCase(addCategoria.pending, (state) => {
                state.status = "loading"
                state.error = null
            })
            .addCase(addCategoria.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.categorias.push(action.payload)
            })
            .addCase(addCategoria.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.payload as string;
            })
            .addCase(changeEstadoCategoria.fulfilled, (state, action) => {
                state.status = "succeeded"
                const updated = action.payload
                const index = state.categorias.findIndex(s =>
                    s.id === updated.id
                )
                state.categorias[index].estado = updated.estado
            })
    }
})

export default categoriaSlice.reducer