import type { Articulo } from '../../interfaces/articulo'
import ArticuloCard from './ArticuloCard'

type Props = {
    articulos: Articulo[]
}

const ListArticulos = ({ articulos }: Props) => {
    return (
        <div className='grid grid-cols-4 gap-4'>
            {articulos.map(a => (
                <ArticuloCard key={a.idArticulo} articulo={a} />
            ))}
        </div>
    )
}

export default ListArticulos