import { useCallback, useEffect, useState } from "react";
import { getArticuloBySlug } from "../services/articulos";
import { useFetchItem } from "../hooks/useFetchItem";
import OverlayLoader from "../components/common/OverlayLoader";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { ArticuloSeleccionado } from "../interfaces/articulo";
import { addProduct, selectProductoById } from "../store/carritoSlice";
import Button from "../components/common/Button";
import Modal from "../components/common/Modal";
import AddedToCartItem from "../components/cart/AddedToCartItem";
import { type RootState } from "../store/store";
import { useToast } from "../context/useToast";

type SelectedVariante = {
    id: number
    talla: string | null;
    color: string | null;
    stock: number;
};

const Product = () => {

    const { slug } = useParams();
    const dispatch = useDispatch();
    const [cantidad, setCantidad] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [productoSeleccionado, setProductoSeleccionado] = useState<ArticuloSeleccionado | null>(null)
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const [selectedVariante, setSelectedVariante] = useState<SelectedVariante>({
        id: 0,
        talla: null,
        color: null,
        stock: 0,
    });
    const { showToast } = useToast()
    const productoAgregado = useSelector((state: RootState) => selectProductoById(state, selectedVariante.id));
    const fetchProducto = useCallback(
        () => (slug ? getArticuloBySlug(slug) : Promise.resolve(null)),
        [slug],
    );

    const { data: articulo, loading: loadinArticulo, error } = useFetchItem(fetchProducto);

    useEffect(() => {
        if (articulo &&
            articulo.variantes[0]?.talla === "N/A" &&
            articulo.variantes[0]?.color === "N/A") {
            setSelectedVariante(prev => ({
                ...prev,
                idVariante: articulo.variantes[0].id,
                stock: articulo.variantes[0].stock
            })
            )
        }
    }, [articulo])

    useEffect(() => {
        if (productoAgregado) {
            setProductoSeleccionado(productoAgregado);
        }
    }, [productoAgregado]);

    const handleAdd = () => {
        if (!selectedVariante.id) return;
        setCantidad(prev => (prev < selectedVariante.stock ? prev + 1 : prev));
    };

    const handleSubtract = () => {
        if (!selectedVariante.id) return;
        setCantidad(prev => (prev > 1 ? prev - 1 : 1));
    };


    if (loadinArticulo) return <OverlayLoader />;
    if (error) return <p>{error}</p>;
    if (!articulo) return null;
    console.log(articulo)
    const hasTallas = articulo.variantes.some((v) => v.talla && v.talla !== "N/A");
    const hasColores = articulo.variantes.some((v) => v.color && v.color !== "N/A");

    const handleAddCarrito = () => {

        if (
            (hasTallas && !selectedVariante.talla) ||
            (hasColores && !selectedVariante.color)
        ) {
            showToast("Por favor selecciona una talla antes de continuar.", {
                type: 'info'
            })
            return;
        }

        if (selectedVariante.stock === 0) {
            return alert("Producto agotado")
        }

        const producto: ArticuloSeleccionado = {
            idVariante: selectedVariante.id,
            idProducto: articulo.id,
            nombre: articulo.nombre,
            stock: selectedVariante.stock,
            precio: articulo.precio,
            marca: articulo.marca,
            talla: selectedVariante.talla || "",
            color: selectedVariante.color || "",
            imagen: articulo.imagen,
            cantidad,
        };

        dispatch(addProduct(producto));
        openModal();
    };

    return (
        <div className="flex justify-center items-center w-full p-5 gap-4">
            <div className="w-full max-w-3xl mx-auto space-y-4">
                <nav className="text-sm text-gray-500">
                    <ol className="flex flex-wrap items-center gap-1">
                        <li>
                            <Link to="/" className="hover:underline text-gray-600">
                                Home
                            </Link>
                        </li>
                        <li>{">"}</li>
                        <li>
                            <Link
                                to={`/search?categoria=${articulo?.subcategoria.nombre}`}
                                className="hover:underline text-gray-600"
                            >
                                {articulo?.subcategoria.nombre}
                            </Link>
                        </li>
                        <li>{">"}</li>
                        <li className="text-gray-700 font-medium">
                            {articulo?.subsubcategoria}
                        </li>
                    </ol>
                </nav>

                <div className="flex flex-col md:flex-row bg-white shadow-2xl rounded-2xl overflow-hidden w-full">
                    <div className="flex justify-center items-center bg-gray-50 p-4 md:w-1/2">
                        <img
                            src={`${import.meta.env.VITE_BASE_URL}${articulo?.imagen}`}
                            alt={articulo?.nombre}
                            className="rounded-lg w-full max-w-[300px] object-contain"
                        />
                    </div>

                    <div className="flex flex-col gap-3 p-6 md:w-1/2">
                        <h2 className="text-xl font-bold text-gray-800">{articulo?.marca}</h2>
                        <p className="text-gray-700 text-lg">{articulo?.nombre}</p>
                        <p className="text-sm text-gray-500">Código: {articulo?.codigo}</p>

                        {hasTallas && (
                            <div>
                                <p>Talla:</p>
                                <div className="flex flex-wrap gap-2">
                                    {articulo.variantes
                                        .filter((v) => v.talla && v.talla !== "N/A")
                                        .map((v) => (
                                            <p
                                                key={v.id}
                                                className={`border p-2 rounded-lg 
                                                    ${selectedVariante.talla === v.talla ? "border-gray-700" : "border-gray-300"} 
                                                    ${v.stock === 0 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                                                    `}

                                                onClick={() => {
                                                    setCantidad(1);
                                                    if (v.stock === 0) {
                                                        showToast("Esta talla está agotada.", { type: "info" });
                                                        return;
                                                    }
                                                    setSelectedVariante(prev => ({
                                                        ...prev,
                                                        id: v.id,
                                                        talla: v.talla,
                                                        stock: v.stock,
                                                    }));
                                                }}

                                            >
                                                {v.talla}
                                            </p>
                                        ))}
                                </div>
                            </div>
                        )}

                        {hasColores && (
                            <div>
                                <p>Color:</p>
                                <div className="flex flex-wrap gap-2">
                                    {articulo.variantes
                                        .filter((v) => v.color && v.color !== "N/A")
                                        .map((v) => (
                                            <p
                                                key={`${v.id}-${v.color}`}
                                                className={`border ${selectedVariante.color === v.color
                                                    ? "border-gray-700"
                                                    : "border-gray-300"
                                                    } cursor-pointer p-2 rounded-lg ${v.stock === 0 ? "opacity-50 cursor-not-allowed" : ""
                                                    }`}
                                                onClick={() =>
                                                    v.stock > 0 &&
                                                    setSelectedVariante((prev) => ({
                                                        ...prev,
                                                        id: v.id,
                                                        color: v.color,
                                                        stock: v.stock,
                                                    }))
                                                }
                                            >
                                                {v.color}
                                            </p>
                                        ))}
                                </div>
                            </div>
                        )}

                        <div className="my-4">
                            <p className="text-3xl font-semibold text-[#B8860B]">
                                S/ {Number(articulo?.precio).toFixed(2)}
                            </p>
                        </div>

                        <div className="flex items-center gap-4">
                            <span className="font-medium text-gray-700">Cantidad:</span>
                            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                                <button
                                    disabled={!selectedVariante.id}
                                    onClick={handleSubtract}
                                    className="px-3 py-1 text-lg font-bold text-gray-600 hover:bg-gray-100"
                                >
                                    -
                                </button>
                                <span className="px-4 py-1 text-lg font-medium">{cantidad}</span>
                                <button
                                    disabled={!selectedVariante.id}
                                    onClick={handleAdd}
                                    className="px-3 py-1 text-lg font-bold text-gray-600 hover:bg-gray-100"
                                >
                                    +
                                </button>
                            </div>
                            <span className="text-sm">
                                {selectedVariante.id
                                    ? selectedVariante.stock === 0
                                        ? "Esta talla está agotada"
                                        : `Máximo ${selectedVariante.stock} unidades`
                                    : ""}
                            </span>
                        </div>

                        <Button
                            className="bg-[#B8860B] hover:bg-[#a0740c] text-white mt-6 w-full py-3 rounded-xl text-lg font-semibold transition-all"
                            onClick={handleAddCarrito}
                        >
                            Agregar al carrito
                        </Button>
                    </div>
                </div>
            </div>
            <Modal isOpen={isModalOpen} handleClose={closeModal} width="max-w-2xl" title="Producto agregado al carrito" >
                {isModalOpen && productoSeleccionado && (
                    <AddedToCartItem product={productoSeleccionado} onClose={closeModal} />
                )}
            </Modal>
        </div>
    );
};

export default Product