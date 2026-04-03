import { useState } from 'react'
import { Search, Check, X, FileText } from 'lucide-react'
import StatusBadge from '../../components/shared/StatusBadge'
import Avatar from '../../components/shared/Avatar'
import StatCard from '../../components/shared/StatCard'
import { leaveRequests as initialRequests } from '../../data/mockData'

export default function LeaveManagement() {
  const [requests, setRequests]       = useState(initialRequests)
  const [search, setSearch]           = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  const filtered = requests.filter(r => {
    const matchSearch = r.employeeName.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'All' || r.status === statusFilter
    return matchSearch && matchStatus
  })

  const approve = (id) => setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'Approved' } : r))
  const reject  = (id) => setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'Rejected' } : r))

  const pending  = requests.filter(r => r.status === 'Pending').length
  const approved = requests.filter(r => r.status === 'Approved').length
  const rejected = requests.filter(r => r.status === 'Rejected').length

  return (
    <div className="flex flex-col gap-6 md:gap-8">
      <div>
        <p className="section-label mb-1">Administration</p>
        <h1 className="font-manrope font-bold text-3xl md:text-4xl text-on_surface">Leave Management</h1>
        <p className="font-inter text-on_surface_variant text-sm mt-1">Review and action all employee leave requests</p>
      </div>

      <div className="grid grid-cols-3 gap-4 md:gap-5">
        <StatCard label="Pending"  value={pending}  icon={FileText} accent />
        <StatCard label="Approved" value={approved} icon={FileText} />
        <StatCard label="Rejected" value={rejected} icon={FileText} />
      </div>

      {/* Filters */}
      <div className="card flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-on_surface_variant" />
          <input
            type="text"
            className="input-field pl-9"
            placeholder="Search employee…"
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
          <table className="atelier-table min-w-[780px]">
            <thead>
              <tr>
                <th className="pl-6">Employee</th>
                <th>Type</th>
                <th>Start</th>
                <th>End</th>
                <th>Days</th>
                <th>Reason</th>
                <th>Status</th>
                <th className="pr-6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(r => (
                <tr key={r.id} className="hover:bg-surface_container transition-colors">
                  <td className="pl-6">
                    <div className="flex items-center gap-3">
                      <Avatar name={r.employeeName} size="sm" />
                      <div>
                        <p className="font-medium whitespace-nowrap">{r.employeeName}</p>
                        <p className="text-xs text-on_surface_variant">{r.employeeId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="text-on_surface_variant whitespace-nowrap">{r.type}</td>
                  <td className="whitespace-nowrap">{r.startDate}</td>
                  <td className="whitespace-nowrap">{r.endDate}</td>
                  <td className="font-manrope font-semibold">{r.days}</td>
                  <td className="text-on_surface_variant max-w-[160px] truncate">{r.reason}</td>
                  <td><StatusBadge status={r.status} /></td>
                  <td className="pr-6">
                    {r.status === 'Pending' ? (
                      <div className="flex gap-2">
                        <button onClick={() => approve(r.id)} className="w-7 h-7 rounded-md bg-secondary_container text-on_secondary_container flex items-center justify-center hover:opacity-80 transition-opacity" title="Approve">
                          <Check size={14} />
                        </button>
                        <button onClick={() => reject(r.id)} className="w-7 h-7 rounded-md bg-error_container text-on_error_container flex items-center justify-center hover:opacity-80 transition-opacity" title="Reject">
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
                <tr><td colSpan={8} className="text-center py-12 text-on_surface_variant">No requests found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
