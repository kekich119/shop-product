import { useMemo } from 'react'
import ProductCard from '../components/ProductCard'

const mock = Array.from({ length: 8 }).map((_, i) => ({
  id: i + 1,
  name: `Популярный товар #${i + 1}`,
  price: 1990 + i * 100,
  image: `https://picsum.photos/seed/home${i}/600/400`
}))

export default function Home() {
  const items = useMemo(() => mock, [])
  return (
    <div className="space-y-8">
      <section className="bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-2xl p-8 shadow">
        <h1 className="text-3xl font-bold">Добро пожаловать в MyShop</h1>
        <p className="mt-2 text-white/90">Скидки, акции и быстрая доставка</p>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">Популярное</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {items.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </div>
  )
}