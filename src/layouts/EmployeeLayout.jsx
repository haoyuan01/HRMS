import { useState, useEffect } from 'react'
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Avatar from '../components/shared/Avatar'
import {
  LayoutDashboard, FileText, CreditCard, Receipt,
  ChevronDown, LogOut, Bell, Menu, X,
} from 'lucide-react'

const navItems = [
  { to: '/employee/dashboard', label: 'My Dashboard', icon: LayoutDashboard },
  { to: '/employee/leave',     label: 'Leave',         icon: FileText        },
  { to: '/employee/payslips',  label: 'My Payslips',   icon: CreditCard      },
  { to: '/employee/expenses',  label: 'Expenses',      icon: Receipt         },
]

export default function EmployeeLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024)

  useEffect(() => {
    const onResize = () => {
      const desktop = window.innerWidth >= 1024
      setIsDesktop(desktop)
      if (desktop) setSidebarOpen(true)
    }
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    if (!isDesktop) setSidebarOpen(false)
  }, [location.pathname, isDesktop])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const SidebarContent = () => (
    <>
      <div className="h-16 flex items-center px-6 gap-3 flex-shrink-0">
        <div className="w-8 h-8 rounded-md flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#00288e,#1e40af)' }}>
          <span className="text-white font-manrope font-bold text-sm">H</span>
        </div>
        <span className="font-manrope font-bold text-on_surface text-base tracking-tight">HRMS</span>
        <span className="ml-auto text-[10px] font-inter font-semibold uppercase tracking-widest text-on_surface_variant bg-surface_container px-2 py-0.5 rounded">Employee</span>
        {!isDesktop && (
          <button onClick={() => setSidebarOpen(false)} className="ml-2 w-7 h-7 rounded-md flex items-center justify-center hover:bg-surface_container_high">
            <X size={16} className="text-on_surface_variant" />
          </button>
        )}
      </div>

      <nav className="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto">
        <p className="section-label px-3 mb-2">My Portal</p>
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <Icon size={18} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="px-3 pb-6">
        <button onClick={handleLogout} className="nav-item w-full text-on_surface_variant hover:text-error">
          <LogOut size={18} />
          <span>Sign Out</span>
        </button>
      </div>
    </>
  )

  return (
    <div className="flex h-screen bg-surface overflow-hidden">
      {/* Desktop sidebar */}
      {isDesktop && (
        <aside className={`${sidebarOpen ? 'w-64' : 'w-0 overflow-hidden'} flex-shrink-0 bg-surface_container_low flex flex-col transition-all duration-300`}>
          <SidebarContent />
        </aside>
      )}

      {/* Mobile drawer overlay */}
      {!isDesktop && sidebarOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-on_surface/40 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <aside className="fixed inset-y-0 left-0 z-50 w-72 bg-surface_container_low flex flex-col shadow-ambient-lg">
            <SidebarContent />
          </aside>
        </>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <header
          className="h-16 bg-surface_container_lowest/70 backdrop-blur-md flex items-center px-4 md:px-6 gap-3 flex-shrink-0"
          style={{ borderBottom: '1px solid rgba(196,197,213,0.15)' }}
        >
          <button
            onClick={() => setSidebarOpen(v => !v)}
            className="w-8 h-8 rounded-md flex items-center justify-center hover:bg-surface_container_high transition-colors flex-shrink-0"
          >
            <Menu size={18} className="text-on_surface_variant" />
          </button>

          <div className="flex-1 min-w-0" />

          <button className="w-9 h-9 rounded-md flex items-center justify-center hover:bg-surface_container_high transition-colors flex-shrink-0">
            <Bell size={18} className="text-on_surface_variant" />
          </button>

          <div className="relative flex-shrink-0">
            <button
              onClick={() => setProfileOpen(v => !v)}
              className="flex items-center gap-2 px-2 md:px-3 py-1.5 rounded-md hover:bg-surface_container_high transition-colors"
            >
              <Avatar name={user?.name} size="sm" />
              <div className="text-left hidden md:block">
                <p className="font-inter font-medium text-sm text-on_surface leading-none">{user?.name}</p>
                <p className="font-inter text-xs text-on_surface_variant leading-none mt-0.5">{user?.department}</p>
              </div>
              <ChevronDown size={14} className="text-on_surface_variant hidden md:block" />
            </button>

            {profileOpen && (
              <div className="absolute right-0 top-full mt-2 w-52 card z-50 py-2 px-0">
                <div className="px-4 py-2" style={{ borderBottom: '1px solid rgba(196,197,213,0.15)' }}>
                  <p className="font-inter font-medium text-sm text-on_surface">{user?.name}</p>
                  <p className="font-inter text-xs text-on_surface_variant">{user?.email}</p>
                </div>
                <button onClick={handleLogout} className="w-full text-left px-4 py-2.5 text-sm font-inter text-on_surface_variant hover:bg-surface_container_high hover:text-error transition-colors flex items-center gap-2 mt-1">
                  <LogOut size={14} /> Sign Out
                </button>
              </div>
            )}
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
