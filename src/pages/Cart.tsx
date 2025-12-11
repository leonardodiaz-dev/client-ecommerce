import { useSelector } from "react-redux"
import CartList from "../components/cart/CartList"
import type { RootState } from "../store/store"
import { totalPrecio, totalProductos } from "../store/carritoSlice"
import Button from "../components/common/Button"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/useAuth"

const Cart = () => {

    const navigate = useNavigate()
    const { isAuthenticated } = useAuth()
    const carrito = useSelector((state: RootState) => state.carrito.carrito)
    const total = useSelector(totalProductos);
    const precio = useSelector(totalPrecio)

    return (
        <div className="flex flex-col sm:flex-row justify-around items-start bg-gray-100 gap-5 min-h-screen p-4">
            {
                total > 0 ? (
                    <>
                        <CartList carrito={carrito} />
                        <div className="flex flex-col gap-3 w-full sm:w-2/6 bg-white p-3 rounded-lg shadow-xl">
                            <h3 className="text-lg font-bold">Resumen de la orden</h3>
                            <div className="flex flex-row justify-between">
                                <p>Productos<span>({total})</span></p>
                                <span>{precio.toFixed(2)}</span>
                            </div>
                            <hr className="text-gray-400" />
                            <div className="flex flex-row justify-between">
                                <p>Total</p>
                                <span>{precio.toFixed(2)}</span>
                            </div>
                            <Button className="bg-[#B8860B] text-white"
                                onClick={() => {
                                    if (!isAuthenticated) navigate('login')
                                    navigate('/checkout')
                                }}>
                                Continuar
                            </Button>
                        </div>
                    </>
                ) : (
                    <div className="bg-white rounded-lg p-6 flex flex-col items-center text-center">
                        <img src="/compras.png" alt="Carrito vacío" className="w-40 mb-4" />
                        <h2 className="text-xl font-semibold mb-2">Tu carrito está vacío</h2>
                        <p className="text-gray-600 mb-4">¡Agrega tus productos favoritos y completa tu compra!</p>
                        <Button
                            onClick={() => navigate('/')}
                            className="bg-[#B8860B] text-white transition"
                        >
                            Ir a la tienda
                        </Button>
                    </div>
                )
            }
        </div>
    )
}

export default Cart