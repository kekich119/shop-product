import { createContext, useContext, useEffect, useState } from 'react'
import api from '../api/axios'

const AuthCtx = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  async function refreshUser() {
    try {
      const { data } = await api.get('/secured/user')
      if (typeof data === 'string' && data !== 'You are not logged in') {
        setUser({ username: data })
      } else {
        setUser(null)
      }
    } catch (e) {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refreshUser()
  }, [])

  async function signin(username, password) {
    await api.post('/auth/signin', { username, password })
    await refreshUser()
  }

  async function signup({ username, email, password }) {
    await api.post('/auth/signup', { username, email, password })
  }

  function signout() {
    setUser(null)
  }

  return (
    <AuthCtx.Provider value={{ user, loading, signin, signout, signup }}>
      {children}
    </AuthCtx.Provider>
  )
}

export const useAuth = () => useContext(AuthCtx)