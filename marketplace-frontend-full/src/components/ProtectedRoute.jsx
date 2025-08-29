import { Navigate } from 'react-router-dom'
import { useAuth } from '../state/AuthContext'

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <div className="text-center py-10">Загрузка...</div>
  if (!user) return <Navigate to="/login" replace />
  return children
}