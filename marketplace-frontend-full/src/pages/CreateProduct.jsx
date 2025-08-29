import { useState } from 'react'
import api from '../api/axios'

export default function CreateProduct() {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [imageFile, setImageFile] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!name || !price || !imageFile) {
            alert('Заполните имя, цену и выберите картинку')
            return
        }

        setLoading(true)
        try {
            const formData = new FormData()
            formData.append('name', name)
            formData.append('price', price)
            formData.append('description', description)
            formData.append('image', imageFile) // должно быть 'image', а не 'imageUrl'
            await api.post('/api/add/product', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            alert('Товар создан!')
            setName('')
            setPrice('')
            setDescription('')
            setImageFile(null)
        } catch (err) {
            console.error('Ошибка создания товара:', err)
            alert('Ошибка при создании товара')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow">
            <h1 className="text-2xl font-bold mb-4">Создать товар</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    className="input w-full"
                    placeholder="Название"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <input
                    className="input w-full"
                    placeholder="Цена"
                    type="number"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                />
                <textarea
                    className="input w-full"
                    placeholder="Описание"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={e => setImageFile(e.target.files[0])}
                />
                <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                    {loading ? 'Создание...' : 'Создать товар'}
                </button>
            </form>
        </div>
    )
}