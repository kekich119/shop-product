import { Link } from 'react-router-dom'
import api from '../api/axios'
import { useAuth } from '../state/AuthContext'

export default function ProductCard({ product }) {
    const { user } = useAuth()

    // функция добавления в корзину
    const handleAddToCart = async (e) => {
        e.preventDefault() // чтобы не сработал Link
        if (!user) {
            alert('Сначала войдите в аккаунт')
            return
        }

        try {
            await api.post('/api/add/cart', { productId: product.id, quantity: 1 })
            alert('Товар добавлен в корзину!')
        } catch (error) {
            console.error('Ошибка добавления в корзину:', error)
        }
    }

    return (
        <div className="card p-3 bg-white">
            <Link to={`/products/${product.id}`}>
                <img
                    src={`http://localhost:8080${product.imageUrl}`} // product.imageUrl уже содержит /images/...
                    alt={product.name}
                    className="w-full rounded-2xl shadow"
                />
                <h3 className="mt-3 font-semibold line-clamp-2 min-h-[3rem]">{product.name}</h3>
            </Link>
            <div className="mt-2 flex items-center justify-between">
                <div className="text-lg font-bold">{product.price.toLocaleString()} ₽</div>
                <button className="btn btn-primary" onClick={handleAddToCart}>
                    В корзину
                </button>
            </div>
        </div>
    )
}