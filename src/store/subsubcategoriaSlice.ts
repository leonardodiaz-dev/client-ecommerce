import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { SubSubCategoria, SubSubCategoriaFormData } from "../interfaces/categoria";
import { createSubsubcategoria, getAllSubsubcategorias, updateEstadosubsubcategoria, updateSubsubcategoria } from "../services/subsubcategorias";

interface SubcategoriaStore {
    subsubcategorias: SubSubCategoria[]
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

const initialState: SubcategoriaStore = {
    subsubcategorias: [],
    status: "idle",
    error: null
}

type EditarSubsubcategoria = {
    id: number
    subsubcategoria: SubSubCategoriaFormData
}

export const fetchSubsubcategorias =
    createAsyncThunk("subsubcategorias/fetchSubsubcategorias", async (_, { rejectWithValue }) => {
        try {
            return await getAllSubsubcategorias()
        } catch (error) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
            return rejectWithValue("Error desconocido");
        }
    })
export const addSubsubcategoria =
    createAsyncThunk("subcategorias/addSubcategorias", async (subsubcategoria: SubSubCategoriaFormData, { rejectWithValue }) => {
        try {
            return await createSubsubcategoria(subsubcategoria)
        } catch (error) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
            return rejectWithValue("Error desconocido");
        }
    })

export const editSubsubcategoria =
    createAsyncThunk("subcategorias/editSubcategoria", async ({ id, subsubcategoria }: EditarSubsubcategoria, { rejectWithValue }) => {
        try {
            return await updateSubsubcategoria(id, subsubcategoria)
        } catch (error) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
            return rejectWithValue("Error desconocido");
        }
    })
export const changeEstadoSubsubcategoria =
    createAsyncThunk("subcategorias/changeEstadoSubsubcategoria", async ({ id, estado }: { id: number, estado: boolean }, { rejectWithValue }) => {
        try {
            updateEstadosubsubcategoria(id, estado)
            return { id, estado }
        } catch (error) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
            return rejectWithValue("Error desconocido");
        }
    })

const subsubcategoriaSlice = createSlice({
    name: "subsubcategorias",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSubsubcategorias.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.payload as string
            })
            .addCase(fetchSubsubcategorias.pending, (state) => {
                state.status = "loading"
                state.error = null;
            })
            .addCase(fetchSubsubcategorias.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.subsubcategorias = action.payload;
                state.error = null;
            })
            .addCase(changeEstadoSubsubcategoria.fulfilled, (state, action) => {
                state.status = 'succeeded'
                const updated = action.payload
                const index = state.subsubcategorias.findIndex(s =>
                    s.id === updated.id
                )
                state.subsubcategorias[index].estado = updated.estado
            })
            .addCase(addSubsubcategoria.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.subsubcategorias.push(action.payload)
            })
            .addCase(editSubsubcategoria.fulfilled, (state, action: PayloadAction<SubSubCategoria>) => {
                state.status = 'succeeded'
                const updated = action.payload
                const index = state.subsubcategorias.findIndex(s =>
                    s.id === updated.id
                )
                state.subsubcategorias[index] = updated
            })
    },
})

export default subsubcategoriaSlice.reducer