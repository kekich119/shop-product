// src/api/products.js
import api from './axios'

export const fetchProducts = async () => {
    try {
        const response = await api.get('/api/get/products') // путь к твоему контроллеру
        return response.data // ожидаем массив объектов товаров
    } catch (error) {
        console.error('Ошибка при загрузке товаров:', error)
        return []
    }
}