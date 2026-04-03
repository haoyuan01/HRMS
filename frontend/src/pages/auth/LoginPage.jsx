import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Eye, EyeOff, AlertCircle } from 'lucide-react'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    setTimeout(() => {
      const result = login(email, password)
      setLoading(false)
      if (result.success) {
        navigate(result.role === 'admin' ? '/admin/dashboard' : '/employee/dashboard')
      } else {
        setError(result.message)
      }
    }, 600)
  }

  return (
    <div className="min-h-screen bg-surface flex">
      {/* Left — hero panel */}
      <div
        className="hidden lg:flex lg:w-1/2 flex-col justify-between p-14"
        style={{ background: 'linear-gradient(135deg, #00288e 0%, #1e40af 100%)' }}
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-md bg-white/10 flex items-center justify-center">
            <span className="text-white font-manrope font-bold">H</span>
          </div>
          <span className="text-white font-manrope font-bold text-lg tracking-tight">HRMS</span>
        </div>

        <div>
          <p className="text-white/50 font-inter text-sm uppercase tracking-[0.1em] mb-4">The Executive Atelier</p>
          <h1 className="font-manrope font-bold text-5xl text-white leading-tight mb-6">
            People-first<br />HR, beautifully<br />managed.
          </h1>
          <p className="font-inter text-white/70 text-base leading-relaxed max-w-sm">
            A premium human resource platform designed for clarity, precision, and the teams that demand both.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {[['248', 'Employees'], ['12', 'Departments'], ['99.9%', 'Uptime']].map(([val, lbl]) => (
            <div key={lbl} className="bg-white/10 rounded-md p-4">
              <p className="font-manrope font-bold text-2xl text-white">{val}</p>
              <p className="font-inter text-white/60 text-xs mt-1">{lbl}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right — login form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex items-center gap-3 mb-10 lg:hidden">
            <div className="w-9 h-9 rounded-md flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#00288e,#1e40af)' }}>
              <span className="text-white font-manrope font-bold">H</span>
            </div>
            <span className="font-manrope font-bold text-on_surface text-lg">HRMS</span>
          </div>

          <h2 className="font-manrope font-bold text-3xl text-on_surface mb-1">Welcome back</h2>
          <p className="font-inter text-on_surface_variant text-sm mb-8">Sign in to your workspace</p>

          {error && (
            <div className="flex items-center gap-2 bg-error_container text-on_error_container rounded-md px-4 py-3 mb-6 text-sm font-inter">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div>
              <label className="section-label block mb-2">Email Address</label>
              <input
                type="email"
                className="input-field"
                placeholder="you@company.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="section-label block mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  className="input-field pr-10"
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPw(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-on_surface_variant hover:text-on_surface transition-colors"
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full py-3 mt-2 disabled:opacity-60">
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

          <div className="mt-8 p-4 bg-surface_container_low rounded-md">
            <p className="section-label mb-3">Demo Credentials</p>
            <div className="flex flex-col gap-2 text-xs font-inter text-on_surface_variant">
              <div className="flex justify-between">
                <span>Admin portal:</span>
                <span className="text-on_surface">admin@company.com / any password</span>
              </div>
              <div className="flex justify-between">
                <span>Employee portal:</span>
                <span className="text-on_surface">james@company.com / any password</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
