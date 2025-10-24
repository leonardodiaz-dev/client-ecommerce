import { useSelector } from "react-redux"
import CartList from "../components/cart/CartList"
import type { RootState } from "../store/store"
import { totalPrecio, totalProductos } from "../store/carritoSlice"

const Cart = () => {

    const carrito = useSelector((state: RootState) => state.carrito.carrito)
    const total = useSelector(totalProductos);
    const precio = useSelector(totalPrecio)

    return (
        <div className="flex flex-col sm:flex-row justify-around items-start bg-gray-100 gap-5 min-h-screen p-3">
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
            </div>
        </div>
    )
}

export default Cart