import { useState } from 'react'
import { Search, Filter, UserPlus, Mail, Phone } from 'lucide-react'
import StatusBadge from '../../components/shared/StatusBadge'
import Avatar from '../../components/shared/Avatar'
import { employees, departments } from '../../data/mockData'
import { formatDate } from '../../utils/format'

export default function EmployeeDirectory() {
  const [search, setSearch]       = useState('')
  const [deptFilter, setDeptFilter] = useState('All')
  const [viewMode, setViewMode]   = useState('table')

  const filtered = employees.filter(e => {
    const matchSearch =
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.email.toLowerCase().includes(search.toLowerCase()) ||
      e.position.toLowerCase().includes(search.toLowerCase())
    const matchDept = deptFilter === 'All' || e.department === deptFilter
    return matchSearch && matchDept
  })

  return (
    <div className="flex flex-col gap-6 md:gap-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <p className="section-label mb-1">Human Resources</p>
          <h1 className="font-manrope font-bold text-3xl md:text-4xl text-on_surface">Employee Directory</h1>
          <p className="font-inter text-on_surface_variant text-sm mt-1">{employees.length} employees across {departments.length} departments</p>
        </div>
        <button className="btn-primary gap-2 self-start">
          <UserPlus size={16} />
          Add Employee
        </button>
      </div>

      {/* Filters */}
      <div className="card flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-on_surface_variant" />
            <input
              type="text"
              className="input-field pl-9"
              placeholder="Search by name, email or position…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-on_surface_variant flex-shrink-0" />
            <select
              className="input-field flex-1 sm:w-44"
              value={deptFilter}
              onChange={e => setDeptFilter(e.target.value)}
            >
              <option value="All">All Departments</option>
              {departments.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
        </div>
        <div className="flex gap-1 bg-surface_container_low rounded-md p-1 self-start">
          {['table', 'grid'].map(m => (
            <button
              key={m}
              onClick={() => setViewMode(m)}
              className={`px-3 py-1.5 rounded text-xs font-inter font-medium capitalize transition-colors ${viewMode === m ? 'bg-surface_container_lowest text-on_surface shadow-ambient' : 'text-on_surface_variant hover:text-on_surface'}`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Table view */}
      {viewMode === 'table' && (
        <div className="card p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="atelier-table min-w-[700px]">
              <thead>
                <tr>
                  <th className="pl-6">Employee</th>
                  <th>Department</th>
                  <th>Position</th>
                  <th>Contact</th>
                  <th>Status</th>
                  <th className="pr-6">Join Date</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(emp => (
                  <tr key={emp.id} className="cursor-pointer hover:bg-surface_container transition-colors">
                    <td className="pl-6">
                      <div className="flex items-center gap-3">
                        <Avatar name={emp.name} size="md" />
                        <div>
                          <p className="font-medium text-on_surface whitespace-nowrap">{emp.name}</p>
                          <p className="text-xs text-on_surface_variant">{emp.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap">{emp.department}</td>
                    <td className="text-on_surface_variant whitespace-nowrap">{emp.position}</td>
                    <td>
                      <div className="flex flex-col gap-0.5">
                        <span className="flex items-center gap-1 text-xs text-on_surface_variant whitespace-nowrap">
                          <Mail size={11} />{emp.email}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-on_surface_variant whitespace-nowrap">
                          <Phone size={11} />{emp.phone}
                        </span>
                      </div>
                    </td>
                    <td><StatusBadge status={emp.status} /></td>
                    <td className="pr-6 text-on_surface_variant whitespace-nowrap">{formatDate(emp.joinDate)}</td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={6} className="text-center py-12 text-on_surface_variant">No employees found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Grid view */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5">
          {filtered.map(emp => (
            <div key={emp.id} className="card flex flex-col gap-4 cursor-pointer hover:shadow-ambient-lg transition-shadow">
              <div className="flex items-center gap-3">
                <Avatar name={emp.name} size="lg" />
                <div className="flex-1 min-w-0">
                  <p className="font-manrope font-semibold text-on_surface truncate">{emp.name}</p>
                  <p className="font-inter text-xs text-on_surface_variant truncate">{emp.position}</p>
                </div>
                <StatusBadge status={emp.status} />
              </div>
              <div className="flex flex-col gap-1.5 text-xs font-inter">
                <span className="flex items-center gap-2 text-on_surface_variant truncate"><Mail size={12} />{emp.email}</span>
                <span className="flex items-center gap-2 text-on_surface_variant"><Phone size={12} />{emp.phone}</span>
              </div>
              <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid rgba(196,197,213,0.15)' }}>
                <span className="section-label">{emp.department}</span>
                <span className="font-inter text-xs text-on_surface_variant">Since {formatDate(emp.joinDate)}</span>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <p className="col-span-full text-center py-12 text-on_surface_variant font-inter">No employees found.</p>
          )}
        </div>
      )}
    </div>
  )
}
