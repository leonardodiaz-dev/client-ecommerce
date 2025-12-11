import Inicio from "./pages/Inicio"
import './App.css'
import { Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import { AuthProvider } from "./context/AuthProvider"
import AdminLayout from "./components/layouts/AdminLayout"
import Articulos from "./pages/Articulos"
import Proveedores from "./pages/Proveedores"
import Ingresos from "./pages/Ingresos"
import ProtectedRoute from "./components/login/ProtectedRoute"
import Search from "./pages/Search"
import PublicLayout from "./components/layouts/PublicLayout"
import Product from "./pages/Product"
import Cart from "./pages/Cart"
import Usuarios from "./pages/Usuarios"
import Categorias from "./pages/Categorias"
import Subcategorias from "./pages/Subcategorias"
import Subsubcategoria from "./pages/Subsubcategoria"
import Configuracion from "./pages/Configuracion"
import ClienteLayout from "./components/layouts/ClienteLayout"
import Miperfil from "./pages/Miperfil"
import Direcciones from "./pages/Direcciones"
import Register from "./pages/Register"
import Checkout from "./pages/Checkout"
import Success from "./pages/Success"
import Cancel from "./pages/Cancel"
import { ToastProvider } from "./context/ToastProvider"
import SelectRol from "./pages/SelectRol"

const App = () => {
  return (
    <>
      <AuthProvider>
        <ToastProvider>
          <Routes>
            <Route path="/" element={<PublicLayout />}>
              <Route index element={<Inicio />} />
              <Route path="search" element={<Search />} />
              <Route path="product/:slug" element={<Product />} />
              <Route path="cart" element={<Cart />} />
            </Route>
            <Route path="/" element={<Inicio />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/checkout" element={<ProtectedRoute>
              <Checkout />
            </ProtectedRoute>} />
            <Route path="/seleccionar-rol" element={
              <ProtectedRoute>
                <SelectRol />
              </ProtectedRoute>} />
            <Route path="/success" element={<Success />} />
            <Route path="/cancel" element={<Cancel />} />
            <Route path="/panel" element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>}>
              <Route path="articulos" element={<Articulos />} />
              <Route path="usuarios" element={<Usuarios />} />
              <Route path="proveedores" element={<Proveedores />} />
              <Route path="ingresos" element={<Ingresos />} />
              <Route path="categorias" element={<Categorias />} />
              <Route path="subcategorias" element={<Subcategorias />} />
              <Route path="subsubcategorias" element={<Subsubcategoria />} />
              <Route path="configuracion" element={<Configuracion />} />
            </Route>
            <Route path='myaccount' element={
              <ProtectedRoute>
                <ClienteLayout />
              </ProtectedRoute>
            }>
              <Route path="myProfile" element={<Miperfil />} />
              <Route path="addresses" element={<Direcciones />} />
            </Route>
          </Routes>
        </ToastProvider>
      </AuthProvider>
    </>
  )
}

export default App