import { useState } from 'react'
import { Search, Check, X, Receipt } from 'lucide-react'
import StatusBadge from '../../components/shared/StatusBadge'
import Avatar from '../../components/shared/Avatar'
import StatCard from '../../components/shared/StatCard'
import { expenseClaims as initialClaims } from '../../data/mockData'
import { formatCurrency, formatDate } from '../../utils/format'

export default function ExpenseManagement() {
  const [claims, setClaims]           = useState(initialClaims)
  const [search, setSearch]           = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  const filtered = claims.filter(c => {
    const matchSearch = c.employeeName.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'All' || c.status === statusFilter
    return matchSearch && matchStatus
  })

  const approve = (id) => setClaims(prev => prev.map(c => c.id === id ? { ...c, status: 'Approved' } : c))
  const reject  = (id) => setClaims(prev => prev.map(c => c.id === id ? { ...c, status: 'Rejected' } : c))

  const pending       = claims.filter(c => c.status === 'Pending').length
  const approved      = claims.filter(c => c.status === 'Approved').length
  const totalApproved = claims.filter(c => c.status === 'Approved').reduce((s, c) => s + c.amount, 0)

  return (
    <div className="flex flex-col gap-6 md:gap-8">
      <div>
        <p className="section-label mb-1">Finance</p>
        <h1 className="font-manrope font-bold text-3xl md:text-4xl text-on_surface">Expense Management</h1>
        <p className="font-inter text-on_surface_variant text-sm mt-1">Review, approve and track employee expense claims</p>
      </div>

      <div className="grid grid-cols-3 gap-4 md:gap-5">
        <StatCard label="Pending Review"  value={pending}                        icon={Receipt} accent />
        <StatCard label="Approved"        value={approved}                       icon={Receipt} />
        <StatCard label="Total Approved"  value={formatCurrency(totalApproved)} icon={Receipt} />
      </div>

      {/* Filters */}
      <div className="card flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-on_surface_variant" />
          <input
            type="text"
            className="input-field pl-9"
            placeholder="Search employee or category…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <select
          className="input-field sm:w-44"
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
        >
          {['All', 'Pending', 'Approved', 'Rejected'].map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="atelier-table min-w-[700px]">
            <thead>
              <tr>
                <th className="pl-6">Employee</th>
                <th>Category</th>
                <th>Description</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
                <th className="pr-6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(c => (
                <tr key={c.id} className="hover:bg-surface_container transition-colors">
                  <td className="pl-6">
                    <div className="flex items-center gap-3">
                      <Avatar name={c.employeeName} size="sm" />
                      <div>
                        <p className="font-medium whitespace-nowrap">{c.employeeName}</p>
                        <p className="text-xs text-on_surface_variant">{c.employeeId}</p>
                      </div>
                    </div>
                  </td>
                  <td><span className="badge-pending capitalize">{c.category}</span></td>
                  <td className="text-on_surface_variant max-w-[180px] truncate">{c.description}</td>
                  <td className="whitespace-nowrap">{formatDate(c.date)}</td>
                  <td className="font-manrope font-bold text-on_surface whitespace-nowrap">{formatCurrency(c.amount)}</td>
                  <td><StatusBadge status={c.status} /></td>
                  <td className="pr-6">
                    {c.status === 'Pending' ? (
                      <div className="flex gap-2">
                        <button onClick={() => approve(c.id)} className="w-7 h-7 rounded-md bg-secondary_container text-on_secondary_container flex items-center justify-center hover:opacity-80 transition-opacity" title="Approve">
                          <Check size={14} />
                        </button>
                        <button onClick={() => reject(c.id)} className="w-7 h-7 rounded-md bg-error_container text-on_error_container flex items-center justify-center hover:opacity-80 transition-opacity" title="Reject">
                          <X size={14} />
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs text-on_surface_variant">—</span>
                    )}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={7} className="text-center py-12 text-on_surface_variant">No claims found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
