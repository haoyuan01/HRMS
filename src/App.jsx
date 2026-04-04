import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'

import LoginPage from './pages/auth/LoginPage'

import AdminLayout from './layouts/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import EmployeeDirectory from './pages/admin/EmployeeDirectory'
import PayrollManagement from './pages/admin/PayrollManagement'
import LeaveManagement from './pages/admin/LeaveManagement'
import ExpenseManagement from './pages/admin/ExpenseManagement'

import EmployeeLayout from './layouts/EmployeeLayout'
import EmployeeDashboard from './pages/employee/EmployeeDashboard'
import LeavePage from './pages/employee/LeavePage'
import MyPayslips from './pages/employee/MyPayslips'
import ExpensesPage from './pages/employee/ExpensesPage'

function ProtectedRoute({ children, requiredRole }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to={user.role === 'admin' ? '/admin/dashboard' : '/employee/dashboard'} replace />
  }
  return children
}

function RootRedirect() {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  return <Navigate to={user.role === 'admin' ? '/admin/dashboard' : '/employee/dashboard'} replace />
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootRedirect />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Admin portal */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard"  element={<AdminDashboard />} />
            <Route path="employees"  element={<EmployeeDirectory />} />
            <Route path="payroll"    element={<PayrollManagement />} />
            <Route path="leave"      element={<LeaveManagement />} />
            <Route path="expenses"   element={<ExpenseManagement />} />
          </Route>

          {/* Employee portal */}
          <Route
            path="/employee"
            element={
              <ProtectedRoute requiredRole="employee">
                <EmployeeLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<EmployeeDashboard />} />
            <Route path="leave"     element={<LeavePage />} />
            <Route path="payslips"  element={<MyPayslips />} />
            <Route path="expenses"  element={<ExpensesPage />} />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
