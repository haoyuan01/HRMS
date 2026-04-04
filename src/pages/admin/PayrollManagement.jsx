import { useState } from 'react'
import { Search, Download, DollarSign } from 'lucide-react'
import StatusBadge from '../../components/shared/StatusBadge'
import Avatar from '../../components/shared/Avatar'
import StatCard from '../../components/shared/StatCard'
import { payrollRecords } from '../../data/mockData'
import { formatCurrency, formatDate } from '../../utils/format'

export default function PayrollManagement() {
  const [search, setSearch]           = useState('')
  const [monthFilter, setMonthFilter] = useState('March 2026')

  const filtered = payrollRecords.filter(r =>
    r.employeeName.toLowerCase().includes(search.toLowerCase()) &&
    (monthFilter === 'All' || r.month === monthFilter)
  )

  const totalNet      = filtered.reduce((s, r) => s + r.netSalary, 0)
  const totalOvertime = filtered.reduce((s, r) => s + r.overtime, 0)
  const paid          = filtered.filter(r => r.status === 'Paid').length
  const pending       = filtered.filter(r => r.status === 'Pending').length

  return (
    <div className="flex flex-col gap-6 md:gap-8">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <p className="section-label mb-1">Finance</p>
          <h1 className="font-manrope font-bold text-3xl md:text-4xl text-on_surface">Payroll Management</h1>
          <p className="font-inter text-on_surface_variant text-sm mt-1">Process and review employee compensation</p>
        </div>
        <button className="btn-primary gap-2 self-start">
          <Download size={16} />
          Export
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5">
        <StatCard label="Total Net Payout" value={formatCurrency(totalNet)}      sub={monthFilter}  icon={DollarSign} accent />
        <StatCard label="Total Overtime"   value={formatCurrency(totalOvertime)} sub="This period"  icon={DollarSign} />
        <StatCard label="Processed"        value={paid}                                 sub="Payments completed"    />
        <StatCard label="Pending"          value={pending}                              sub="Awaiting processing"   />
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
          className="input-field sm:w-48"
          value={monthFilter}
          onChange={e => setMonthFilter(e.target.value)}
        >
          {['March 2026', 'February 2026', 'January 2026', 'All'].map(m => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="atelier-table min-w-[750px]">
            <thead>
              <tr>
                <th className="pl-6">Employee</th>
                <th>Department</th>
                <th>Basic Salary</th>
                <th>Overtime</th>
                <th>Deductions</th>
                <th>Net Salary</th>
                <th>Status</th>
                <th className="pr-6">Pay Date</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(r => (
                <tr key={r.id} className="hover:bg-surface_container transition-colors">
                  <td className="pl-6">
                    <div className="flex items-center gap-3">
                      <Avatar name={r.employeeName} size="sm" />
                      <span className="font-medium whitespace-nowrap">{r.employeeName}</span>
                    </div>
                  </td>
                  <td className="text-on_surface_variant whitespace-nowrap">{r.department}</td>
                  <td className="font-manrope font-semibold whitespace-nowrap">{formatCurrency(r.basicSalary)}</td>
                  <td className="text-on_surface_variant">{r.overtime > 0 ? formatCurrency(r.overtime) : '—'}</td>
                  <td className="text-error whitespace-nowrap">-{formatCurrency(r.deductions)}</td>
                  <td className="font-manrope font-bold text-on_surface whitespace-nowrap">{formatCurrency(r.netSalary)}</td>
                  <td><StatusBadge status={r.status} /></td>
                  <td className="pr-6 text-on_surface_variant whitespace-nowrap">{r.payDate ? formatDate(r.payDate) : '—'}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={8} className="text-center py-12 text-on_surface_variant">No records found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
