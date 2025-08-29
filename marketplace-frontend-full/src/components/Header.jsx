import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../state/AuthContext'
import api from '../api/axios'

export default function Header() {
  const { user, signout } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    try {
      // Отправляем запрос на бэкенд, чтобы удалить cookie
      await api.post('/auth/logout')
    } catch (e) {
      console.error('Ошибка выхода:', e)
    }
    // Чистим локальный state
    signout()
    // Редирект на главную
    navigate('/')
  }

  return (
      <header className="bg-white sticky top-0 z-20 shadow">
        <div className="container mx-auto px-4 py-3 flex items-center gap-4">
          <Link to="/" className="text-2xl font-bold text-blue-600">MyShop</Link>
          <div className="flex-1">
            <input className="input" placeholder="Поиск товаров..." />
          </div>
          <nav className="flex items-center gap-4">
            <Link to="/products" className="text-gray-700 hover:text-black">Каталог</Link>
            <Link to="/cart" className="text-gray-700 hover:text-black">Корзина</Link>
            {user ? (
                <div className="flex items-center gap-3">
                  <Link to="/profile" className="text-gray-700">{user.username}</Link>
                  <button className="btn btn-outline" onClick={handleLogout}>Выйти</button>
                </div>
            ) : (
                <div className="flex items-center gap-2">
                  <Link to="/login" className="btn btn-outline">Войти</Link>
                  <Link to="/register" className="btn btn-primary">Регистрация</Link>
                </div>
            )}
          </nav>
        </div>
      </header>
  )
}