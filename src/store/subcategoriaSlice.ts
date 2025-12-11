import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { SubCategoria, SubCategoriaFormData } from "../interfaces/categoria";
import { createSubcategoria, getAllSubcategorias, updateEstadoubcategoria, updateSubcategoria } from "../services/subcategorias";

interface SubcategoriaStore {
    subcategorias: SubCategoria[]
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

const initialState: SubcategoriaStore = {
    subcategorias: [],
    status: "idle",
    error: null
}

type EditarSubcategoria = {
    id: number
    subcategoria: SubCategoriaFormData
}

export const fetchSubcategorias =
    createAsyncThunk("subcategorias/fetchSubcategorias", async (_, { rejectWithValue }) => {
        try {
            return await getAllSubcategorias()
        } catch (error) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
            return rejectWithValue("Error desconocido");
        }
    })

export const addSubcategoria =
    createAsyncThunk("subcategorias/addSubcategorias", async (subcategoria: SubCategoriaFormData, { rejectWithValue }) => {
        try {
            return await createSubcategoria(subcategoria)
        } catch (error) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
            return rejectWithValue("Error desconocido");
        }
    })

export const editSubcategoria =
    createAsyncThunk("subcategorias/editSubcategoria", async ({ id, subcategoria }: EditarSubcategoria, { rejectWithValue }) => {
        try {
            return await updateSubcategoria(id, subcategoria)
        } catch (error) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
            return rejectWithValue("Error desconocido");
        }
    })

export const changeEstadoSubcategoria =
    createAsyncThunk("subcategorias/changeEstadoSubcategoria", async ({ id, estado }: { id: number, estado: boolean }, { rejectWithValue }) => {
        try {
            updateEstadoubcategoria(id, estado)
            return { id, estado }
        } catch (error) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
            return rejectWithValue("Error desconocido");
        }

    })

const subcategoriaSlice = createSlice({
    name: "subcategorias",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSubcategorias.pending, (state) => {
                state.status = "loading"
            })
            .addCase(fetchSubcategorias.rejected, (state) => {
                state.status = 'failed'
            })
            .addCase(fetchSubcategorias.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.subcategorias = action.payload
            })
            .addCase(addSubcategoria.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.subcategorias.push(action.payload)
            })
            .addCase(editSubcategoria.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.subcategorias = state.subcategorias.map(s =>
                    s.id === action.payload.id ?
                        action.payload : s
                )
            })
            .addCase(changeEstadoSubcategoria.fulfilled, (state, action) => {
                state.status = 'succeeded'
                const updated = action.payload
                const index = state.subcategorias.findIndex(s =>
                    s.id === updated.id
                )
                state.subcategorias[index].estado = updated.estado
            })
            .addCase(changeEstadoSubcategoria.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.payload as string;
            })
    },
})

export default subcategoriaSlice.reducer