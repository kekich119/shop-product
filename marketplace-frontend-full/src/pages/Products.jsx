import { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import api from '../api/axios'

export default function Products() {
    const [products, setProducts] = useState([])
    const [query, setQuery] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadProducts() {
            try {
                const response = await api.get('/api/get/products') // твой контроллер
                setProducts(response.data)
            } catch (e) {
                console.error('Ошибка при загрузке товаров:', e)
            } finally {
                setLoading(false)
            }
        }
        loadProducts()
    }, [])

    // фильтруем по поисковому запросу
    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase())
    )

    if (loading) return <div>Загрузка товаров...</div>

    return (
        <div>
            <div className="flex items-center gap-3 mb-4">
                <input
                    className="input"
                    placeholder="Поиск в каталоге"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                />
                <button className="btn btn-outline">Фильтры</button>
                <button className="btn btn-outline">Сортировка</button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {filtered.map(p => (
                    <ProductCard key={p.id} product={p} />
                ))}
            </div>
        </div>
    )
}