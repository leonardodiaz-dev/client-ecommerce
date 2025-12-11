import { useNavigate } from "react-router-dom"
import type { Articulo } from "../../interfaces/articulo"

type Props = {
    articulo: Articulo
}

const ArticuloCard = ({ articulo }: Props) => {

    const navigate = useNavigate()
    
    return (
        <div className="flex flex-col justify-center w-full cursor-pointer bg-white shadow-xl rounded-lg items-center"
            onClick={() => navigate(`/product/${articulo.slug}`)}>
            <img className="w-full h-60" src={`${import.meta.env.VITE_BASE_URL}storage/${articulo.imagen}`} />
            <div className="flex flex-col justify-start items-start w-full gap-2 px-4 py-2">
                <h2>{articulo.brand?.nombre}</h2>
                <p className="font-semibold">{articulo.nombre}</p>
                <p>
                    S/
                    {Number(articulo.precioVenta).toLocaleString("es-PE", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    })}
                </p>
            </div>
        </div>
    )
}

export default ArticuloCard