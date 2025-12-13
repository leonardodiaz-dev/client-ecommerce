import { useDispatch } from "react-redux";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { ArticuloSeleccionado } from "../../interfaces/articulo";
import Button from "../common/Button";
import { additionProduct, subtractionProduct } from "../../store/carritoSlice";

interface AddedToCartItemProps {
    product: ArticuloSeleccionado
    onClose: () => void;
}

const AddedToCartItem = ({ product, onClose }: AddedToCartItemProps) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <div className="p-6 rounded-2xl flex flex-col gap-5 max-w-md mx-auto">

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 border border-gray-200 rounded-lg p-4">
                <img
                    src={`${import.meta.env.VITE_BASE_URL}storage/${product.imagen}`}
                    alt={product.nombre}
                    className="w-32 h-32 object-contain rounded-lg"
                />

                <div className="flex flex-col gap-1 text-center sm:text-left">
                    <p className="font-semibold text-gray-800">{product.nombre}</p>
                    <p className="text-sm text-gray-500">{product.marca}</p>
                    {product.talla && <p className="text-sm text-gray-500">Talla: {product.talla}</p>}
                    {product.color && <p className="text-sm text-gray-500">Color: {product.color}</p>}
                    <p className="text-lg font-bold text-[#B8860B] mt-2">S/ {product.precio.toFixed(2)}</p>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-4">
                <div className="flex flex-row items-center gap-3">
                    <Button
                        className="bg-gray-800 cursor-pointer text-white"
                        onClick={() => dispatch(subtractionProduct(product.idVariante))}
                    >
                        -
                    </Button>
                    <span className="text-lg font-semibold">{product.cantidad}</span>
                    <Button
                        className="bg-gray-800 cursor-pointer text-white"
                        onClick={() => dispatch(additionProduct(product.idVariante))}
                    >
                        +
                    </Button>
                </div>
                <p className="text-sm text-gray-500"> Maximo {product.stock} unidades</p>
            </div>

            <div className="flex justify-between items-center mt-4">
                <Button
                    className="bg-gray-200 text-gray-700 hover:bg-gray-300"
                    onClick={onClose}
                >
                    Seguir comprando
                </Button>

                <Button
                    className="bg-[#B8860B] hover:bg-[#a0740c] text-white flex items-center gap-2"
                    onClick={() => {
                        onClose();
                        navigate("/cart");
                    }}
                >
                    <ShoppingCart size={18} /> Ir al carrito
                </Button>
            </div>
        </div>
    );
};

export default AddedToCartItem;
