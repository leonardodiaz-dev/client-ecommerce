import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Proveedor } from "../interfaces/proveedor";
import { createProvedor, getAllProveedores, updateEstadoProveedor, updateProveedor } from "../services/proveedores";
import type { ProveedorFormData } from "../schemas/proveedorSchema";

interface ProveedorStore {
    proveedores: Proveedor[]
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

const initialState: ProveedorStore = {
    proveedores: [],
    status: "idle",
    error: null
}

type EditarProveedor = {
    id: number
    proveedor: ProveedorFormData
}

export const fetchProveedores =
    createAsyncThunk("proveedores/fetchProveedores", async (_, { rejectWithValue }) => {
        try {
            return await getAllProveedores()
        } catch (error) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
            return rejectWithValue("Error desconocido");
        }
    })

export const addProveedor =
    createAsyncThunk("proveedores/addProveedor", async (proveedor: ProveedorFormData, { rejectWithValue }) => {
        try {
            return await createProvedor(proveedor)
        } catch (error) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
            return rejectWithValue("Error desconocido");
        }
    })

export const editProveedor =
    createAsyncThunk("proveedores/editProveedor", async ({ id, proveedor }: EditarProveedor, { rejectWithValue }) => {
        try {
            return await updateProveedor(id, proveedor)
        } catch (error) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
            return rejectWithValue("Error desconocido");
        }
    })

export const changeEstadoProveedor =
    createAsyncThunk("proveedores/changeEstadoProveedor", async ({ id, estado }: { id: number, estado: boolean }, { rejectWithValue }) => {
        try {
            updateEstadoProveedor(id, estado)
            return { id, estado }
        } catch (error) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
            return rejectWithValue("Error desconocido");
        }

    })

const proveedorSlice = createSlice({
    name: "proveedores",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProveedores.pending, (state) => {
                state.status = "loading"
            })
            .addCase(fetchProveedores.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload as string;
            })
            .addCase(fetchProveedores.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.proveedores = action.payload
            })
            .addCase(addProveedor.fulfilled, (state, action: PayloadAction<Proveedor>) => {
                state.status = "succeeded"
                state.proveedores.push(action.payload)
            })
            .addCase(editProveedor.fulfilled, (state, action: PayloadAction<Proveedor>) => {
                state.status = "succeeded"
                const updated = action.payload
                const index = state.proveedores.findIndex(p =>
                    p.id === updated.id
                )
                state.proveedores[index] = updated
            })
            .addCase(changeEstadoProveedor.fulfilled, (state, action) => {
                state.status = 'succeeded'
                const updated = action.payload
                const index = state.proveedores.findIndex(p =>
                    p.id === updated.id
                )
                state.proveedores[index].estado = updated.estado
            })
    },
})

export default proveedorSlice.reducer