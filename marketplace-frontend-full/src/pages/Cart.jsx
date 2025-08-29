import { useEffect, useState } from 'react'
import api from '../api/axios'

export default function Cart() {
    const [cartItems, setCartItems] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadCart() {
            try {
                // Получаем корзину текущего пользователя
                const response = await api.get('/api/view/cart', { withCredentials: true })
                const cart = response.data

                // Подгружаем данные о каждом продукте
                const cartWithProducts = await Promise.all(
                    cart.map(async (item) => {
                        try {
                            const prodResp = await api.get(`/api/get/product/${item.productId}`, { withCredentials: true })
                            return { ...item, product: prodResp.data }
                        } catch {
                            return { ...item, product: null }
                        }
                    })
                )

                setCartItems(cartWithProducts)
            } catch (e) {
                console.error('Ошибка при загрузке корзины:', e)
            } finally {
                setLoading(false)
            }
        }
        loadCart()
    }, [])

    // Удаляем товар по productId
    const handleRemove = async (productId) => {
        try {
            await api.delete(`/api/remove/cart/${productId}`, { withCredentials: true })
            setCartItems(prev => prev.filter(item => item.productId !== productId))
        } catch (e) {
            console.error('Ошибка удаления из корзины:', e)
        }
    }

    if (loading) return <div>Загрузка корзины...</div>
    if (cartItems.length === 0)
        return (
            <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow">
                <h1 className="text-2xl font-bold mb-4">Корзина</h1>
                <div className="text-gray-600">Пока пусто. Добавьте товары из каталога.</div>
            </div>
        )

    const total = cartItems.reduce(
        (sum, item) => sum + (item.product ? item.product.price * item.quantity : 0),
        0
    )

    return (
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow space-y-4">
            <h1 className="text-2xl font-bold mb-4">Корзина</h1>

            {cartItems.map(item => (
                <div key={item.id} className="flex items-center justify-between border-b pb-2">
                    <div className="flex items-center gap-4">
                        {item.product ? (
                            <>
                                <img
                                    src={item.product.image}
                                    alt={item.product.name}
                                    className="w-20 h-20 object-cover rounded-xl"
                                />
                                <div>
                                    <div className="font-semibold">{item.product.name}</div>
                                    <div className="text-gray-500">Кол-во: {item.quantity}</div>
                                </div>
                            </>
                        ) : (
                            <div>Товар не найден</div>
                        )}
                    </div>
                    <div className="flex flex-col items-end gap-2">
                        <div className="font-bold">
                            {item.product ? (item.product.price * item.quantity).toLocaleString() : 0} ₽
                        </div>
                        <button className="btn btn-outline btn-sm" onClick={() => handleRemove(item.productId)}>
                            Удалить
                        </button>
                    </div>
                </div>
            ))}

            <div className="text-right font-bold text-xl mt-4">Итого: {total.toLocaleString()} ₽</div>
            <button className="btn btn-primary w-full mt-2">Оформить заказ</button>
        </div>
    )
}