import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../state/AuthContext'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { signin } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    try {
      await signin(username, password)
      navigate('/profile')
    } catch (e) {
      setError('Неверный логин или пароль')
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow">
      <h1 className="text-2xl font-bold mb-4">Войти</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <div className="label">Имя пользователя</div>
          <input className="input" value={username} onChange={e => setUsername(e.target.value)} />
        </div>
        <div>
          <div className="label">Пароль</div>
          <input type="password" className="input" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <button className="btn btn-primary w-full" type="submit">Войти</button>
      </form>
      <div className="text-sm text-gray-600 mt-4">
        Нет аккаунта? <Link to="/register" className="text-blue-600">Зарегистрироваться</Link>
      </div>
    </div>
  )
}