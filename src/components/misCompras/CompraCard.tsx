import type { CompraItem } from "../../services/compras"

type Props = {
    item: CompraItem
}

const CompraCard = ({ item }: Props) => {
    return (
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
    )
}

export default CompraCard