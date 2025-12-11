import type { Articulo } from '../../interfaces/articulo'
import ArticuloCard from './ArticuloCard'

type Props = {
    articulos: Articulo[]
}

const ListArticulos = ({ articulos }: Props) => {
    return (
        <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
            {articulos.map(a => (
                <ArticuloCard key={a.id} articulo={a} />
            ))}
        </div>
    )
}

export default ListArticulos