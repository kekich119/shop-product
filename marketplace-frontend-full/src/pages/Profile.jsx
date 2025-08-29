import { useAuth } from '../state/AuthContext'

export default function Profile() {
  const { user } = useAuth()

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow space-y-4">
      <h1 className="text-2xl font-bold">Профиль</h1>
      <div className="text-gray-700">Имя пользователя: <b>{user?.username}</b></div>
      <div className="grid gap-3 md:grid-cols-2">
        <div className="card p-4">
          <div className="font-semibold mb-2">Личные данные</div>
          <div className="text-sm text-gray-600">Скоро здесь появится редактирование профиля.</div>
        </div>
        <div className="card p-4">
          <div className="font-semibold mb-2">История заказов</div>
          <div className="text-sm text-gray-600">Пока пусто.</div>
        </div>
      </div>
    </div>
  )
}