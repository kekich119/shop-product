import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../state/AuthContext'

export default function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [ok, setOk] = useState('')
  const { signup } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setOk('')
    try {
      await signup({ username, email, password })
      setOk('Регистрация успешна. Теперь войдите.')
      setTimeout(() => navigate('/login'), 600)
    } catch (e) {
      setError('Пользователь или email уже существуют')
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow">
      <h1 className="text-2xl font-bold mb-4">Регистрация</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <div className="label">Имя пользователя</div>
          <input className="input" value={username} onChange={e => setUsername(e.target.value)} />
        </div>
        <div>
          <div className="label">Email</div>
          <input type="email" className="input" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div>
          <div className="label">Пароль</div>
          <input type="password" className="input" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        {ok && <div className="text-green-600 text-sm">{ok}</div>}
        <button className="btn btn-primary w-full" type="submit">Создать аккаунт</button>
      </form>
      <div className="text-sm text-gray-600 mt-4">
        Уже есть аккаунт? <Link to="/login" className="text-blue-600">Войти</Link>
      </div>
    </div>
  )
}