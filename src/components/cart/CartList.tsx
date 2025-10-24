import type { ArticuloSeleccionado } from '../../interfaces/articulo'
import CartCard from './CartCard'

type CartaListProps = {
    carrito: ArticuloSeleccionado[]
}

const CartList = ({ carrito }: CartaListProps) => {
    return (
        <div className='flex flex-col w-full sm:w-4/6 gap-3'>
            <h2 className='text-2xl font-bold'>Carro</h2>
            { carrito.map(c => (
                <CartCard key={c.idVariante} product={c}/>
            ))}
        </div>
    )
}

export default CartList