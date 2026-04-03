import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  const login = (email, password) => {
    // Mock login — role determined by email domain
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
      setUser(mockUser)
      return { success: true, role: mockUser.role }
    }
    return { success: false, message: 'Invalid credentials' }
  }

  const logout = () => setUser(null)

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
