import { createContext, useContext, useState } from 'react'

const AUTH_KEY = 'hrms_user'
const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(AUTH_KEY)
      return saved ? JSON.parse(saved) : null
    } catch {
      return null
    }
  })

  const login = (email, password) => {
    if (email && password) {
      const isAdmin = email.includes('admin') || email === 'hr@company.com'
      const mockUser = {
        id: isAdmin ? 'ADM-001' : 'EMP-042',
        name: isAdmin ? 'Sarah Mitchell' : 'James Carter',
        email,
        role: isAdmin ? 'admin' : 'employee',
        department: isAdmin ? 'Human Resources' : 'Engineering',
        avatar: null,
      }
      localStorage.setItem(AUTH_KEY, JSON.stringify(mockUser))
      setUser(mockUser)
      return { success: true, role: mockUser.role }
    }
    return { success: false, message: 'Invalid credentials' }
  }

  const logout = () => {
    localStorage.removeItem(AUTH_KEY)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
