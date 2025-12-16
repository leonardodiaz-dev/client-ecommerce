import { useEffect, useState } from "react"
import { getComprasByUser, type Compra } from "../services/compras"
import OverlayLoader from "../components/common/OverlayLoader"
import CompraCard from "../components/misCompras/CompraCard"

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
                                <CompraCard item={item} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>

    )
}

export default MisCompras