import { configureStore } from '@reduxjs/toolkit'
import carritoReducer from './carritoSlice'
import subcategoriaReducer from './subcategoriaSlice'
import categoriaReducer from './categoriaSlice'
import proveedorReducer from './proveedorSlice'
import articuloReducer from './articuloSlice'
import subsubcategoriaReducer from './subsubcategoriaSlice'
import direcionReducer from './direccionSlice'
import usuarioReducer from './usuarioSlice'

export const store = configureStore({
  reducer: {
    carrito:carritoReducer,
    usuarios:usuarioReducer,
    subcategorias:subcategoriaReducer,
    categorias:categoriaReducer,
    proveedores:proveedorReducer,
    articulos:articuloReducer,
    subsubcategorias:subsubcategoriaReducer,
    direciones:direcionReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch