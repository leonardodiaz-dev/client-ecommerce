import Inicio from "./pages/Inicio"
import './App.css'
import { Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
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

const App = () => {
  return (
    <>
      <AuthProvider>
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
          <Route path="/panel" element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>}>
            <Route path="articulos" element={<Articulos />} />
            <Route path="usuarios" element={<Usuarios />} />
            <Route path="proveedores" element={<Proveedores />} />
            <Route path="ingresos" element={<Ingresos />} />
          </Route>
        </Routes>
      </AuthProvider>
    </>
  )
}

export default App