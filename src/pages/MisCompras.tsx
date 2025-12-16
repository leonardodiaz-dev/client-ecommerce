import { useEffect, useState } from "react"
import { getComprasByUser, type Compra } from "../services/compras"
import OverlayLoader from "../components/common/OverlayLoader"

const MisCompras = () => {
    const [compras, setCompras] = useState<Compra[] | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        setIsLoading(true)
        const fetchCompras = async () => {
            const res = await getComprasByUser()
            setCompras(res)
            setIsLoading(false)
        }
        fetchCompras()
    }, [])

    if (isLoading) return <OverlayLoader />

    return (
        <div className="flex flex-col gap-4 w-full">
            <h2 className="text-xl font-semibold">Mis compras</h2>

            <div className="flex flex-col gap-6">
                {compras?.map((compra) => (
                    <div
                        key={compra.sale_id}
                        className="flex flex-col gap-4 p-4 bg-white rounded-xl shadow-sm border w-full max-w-3xl"
                    >
                        <div className="flex justify-between items-center border-b pb-2">
                            <div>
                                <p className="font-semibold text-lg">
                                    Compra #{compra.sale_id}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {new Date(compra.fecha).toLocaleDateString()}
                                </p>
                            </div>

                            <p className="font-semibold text-[#B8860B]">
                                Total: S/ {compra.total.toFixed(2)}
                            </p>
                        </div>

                        <div className="flex flex-col gap-4">
                            {compra.items.map((item) => (
                                <div
                                    key={item.variant.id}
                                    className="flex gap-4 p-3 bg-gray-50 rounded-lg"
                                >
                                    <img
                                        src={`${import.meta.env.VITE_BASE_URL}storage/${item.article.imagen}`}
                                        alt={item.article.nombre}
                                        className="w-24 h-24 object-contain rounded-md bg-white"
                                    />

                                    <div className="flex flex-col justify-between flex-1">
                                        <div>
                                            <p className="font-medium">{item.article.nombre}</p>

                                            {(item.variant.color || item.variant.size) && (
                                                <p className="text-xs text-gray-500">
                                                    {item.variant.color && `Color: ${item.variant.color}`}
                                                    {item.variant.color && item.variant.size && " | "}
                                                    {item.variant.size && `Talla: ${item.variant.size}`}
                                                </p>
                                            )}
                                            <p className="text-sm text-gray-600 mt-1">
                                                {item.cantidad} × S/ {item.precio.toFixed(2)}
                                            </p>
                                        </div>
                                        <p className="font-semibold text-[#B8860B] mt-2">
                                            Subtotal: S/ {item.subtotal.toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>

    )
}

export default MisCompras