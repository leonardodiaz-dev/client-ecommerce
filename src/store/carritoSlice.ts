import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ArticuloSeleccionado } from "../interfaces/articulo";

export interface CarritoStore {
    carrito: ArticuloSeleccionado[]
}

const carritoStore = localStorage.getItem("carrito")

const updateStore = (carrito: ArticuloSeleccionado[]) => {
    localStorage.setItem("carrito", JSON.stringify(carrito))
}

const initialState: CarritoStore = {
    carrito: carritoStore ? JSON.parse(carritoStore) : []
}


const carritoSlice = createSlice({
    name: "carrito",
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<ArticuloSeleccionado>) => {

            const findVariante = state.carrito.find(c => c.idVariante === action.payload.idVariante)

            if (findVariante) {
                const cantidadActualizar = action.payload.cantidad + findVariante.cantidad
                if (findVariante.stock >= cantidadActualizar) findVariante.cantidad = cantidadActualizar
            } else {
                state.carrito.push(action.payload)
            }
            updateStore(state.carrito)
        },
        additionProduct: (state, action: PayloadAction<number>) => {
            const findVariante = state.carrito.find(c => c.idVariante === action.payload)
            if (findVariante && findVariante.cantidad < findVariante.stock) {
                findVariante.cantidad++
                updateStore(state.carrito)
            }
        },
        subtractionProduct: (state, action: PayloadAction<number>) => {
            const findVariante = state.carrito.find(c => c.idVariante === action.payload)
            console.log(findVariante?.stock)
            if (findVariante && findVariante.cantidad > 1) {
                findVariante.cantidad--
                updateStore(state.carrito)
            }
        },
        deleteProduct: (state, action: PayloadAction<number>) => {
            state.carrito = state.carrito.filter(c => c.idVariante !== action.payload)
            updateStore(state.carrito)
        },
        clearCarrito: (state) => {
            state.carrito = [];
            localStorage.removeItem("carrito");
        },
    }, selectors: {
        totalProductos: (state) => state.carrito.reduce((total, item) => total + item.cantidad, 0),
        totalPrecio: (state) => state.carrito.reduce((total, item) =>
            total + item.precio * item.cantidad
            , 0),
        selectProductoById: (state, idVariante: number) =>
            state.carrito.find((item) => item.idVariante === idVariante) || null,
    }
})

export const { addProduct, deleteProduct, additionProduct, subtractionProduct, clearCarrito } = carritoSlice.actions
export const { totalProductos, totalPrecio, selectProductoById } = carritoSlice.selectors;
export default carritoSlice.reducer