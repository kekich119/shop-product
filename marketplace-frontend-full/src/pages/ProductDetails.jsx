import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api/axios'
import { useAuth } from '../state/AuthContext'

export default function ProductDetails() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    async function loadProduct() {
      try {
        const response = await api.get(`/api/get/product/${id}`, { withCredentials: true })
        setProduct(response.data)
      } catch (e) {
        console.error('Ошибка при загрузке товара:', e)
      } finally {
        setLoading(false)
      }
    }
    loadProduct()
  }, [id])

  const handleAddToCart = async () => {
    if (!user) {
      alert('Сначала войдите в аккаунт')
      return
    }

    try {
      await api.post('/api/add/cart', {
        userId: user.id,         // camelCase для backend
        productId: product.id,   // id товара
        quantity: 1
      }, { withCredentials: true })
      alert('Товар добавлен в корзину!')
    } catch (error) {
      console.error('Ошибка добавления в корзину:', error)
      alert('Не удалось добавить товар в корзину.')
    }
  }

  if (loading) return <div>Загрузка товара...</div>
  if (!product) return <div>Товар не найден</div>

  return (
      <div className="grid md:grid-cols-2 gap-6">
        <img
            src={`http://localhost:8080${product.imageUrl}`} // product.imageUrl уже содержит /images/...
            alt={product.name}
            className="w-full rounded-2xl shadow"
        />
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <div className="text-2xl font-bold">{product.price.toLocaleString()} ₽</div>
          <p className="text-gray-600">{product.description}</p>
          <button className="btn btn-primary w-full md:w-auto" onClick={handleAddToCart}>
            Добавить в корзину
          </button>
        </div>
      </div>
  )
}