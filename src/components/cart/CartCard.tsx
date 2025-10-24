import { Trash2 } from "lucide-react"
import type { ArticuloSeleccionado } from "../../interfaces/articulo"
import Button from "../common/Button"
import { useDispatch } from "react-redux"
import { additionProduct, deleteProduct, subtractionProduct } from "../../store/carritoSlice"
import type { AppDispatch } from "../../store/store"

type CartCardProps = {
    product: ArticuloSeleccionado
}

const CartCard = ({ product }: CartCardProps) => {
    const dispatch = useDispatch<AppDispatch>()
    return (
        <div className="flex flex-col sm:flex-row justify-between items-center border border-gray-300 gap-4 p-4 rounded-lg shadow-sm">
            
            <img
                className="w-28 h-28 object-contain"
                src={`${import.meta.env.VITE_BASE_URL}${product?.imagen}`}
                alt={product.nombre}
            />

            <div className="flex flex-col items-center sm:items-start gap-1">
                <p className="text-lg font-semibold">{product.nombre}</p>
                <p className="text-sm text-gray-600">{product.marca}</p>
                <p className="text-sm text-gray-600">
                    Talla: <span className="font-medium">{product.talla}</span>
                </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <p className="text-xl font-semibold text-gray-800">S/{product.precio}</p>

                <div className="flex flex-col items-center gap-1">
                    <div className="flex items-center gap-2">
                        <Button
                            className="bg-gray-800 text-white w-8 h-8 flex justify-center items-center"
                            onClick={() => dispatch(subtractionProduct(product.idVariante))}
                        >
                            -
                        </Button>
                        <span className="text-lg w-6 text-center">{product.cantidad}</span>
                        <Button
                            className="bg-gray-800 text-white w-8 h-8 flex justify-center items-center"
                            onClick={() => dispatch(additionProduct(product.idVariante))}
                        >
                            +
                        </Button>
                    </div>
                    <span className="text-xs text-gray-500">Máx. {product.stock} unidades</span>
                </div>

                <Button
                    className="rounded-lg hover:bg-red-500 hover:text-white text-gray-500 p-2"
                    onClick={() => dispatch(deleteProduct(product.idVariante))}
                >
                    <Trash2 size={18} />
                </Button>
            </div>
        </div>
    )
}

export default CartCard