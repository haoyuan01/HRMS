import { useState } from 'react'
import { Plus, X, Calendar } from 'lucide-react'
import StatusBadge from '../../components/shared/StatusBadge'
import { leaveRequests as initial, leaveBalances, leaveTypes } from '../../data/mockData'
import { formatDate } from '../../utils/format'

const myLeave = initial.filter(r => r.employeeId === 'EMP-010')

export default function LeavePage() {
  const [requests, setRequests] = useState(myLeave)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm]         = useState({ type: leaveTypes[0], startDate: '', endDate: '', reason: '' })
  const [errors, setErrors]     = useState({})

  const calcDays = (start, end) => {
    if (!start || !end) return 0
    const diff = (new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24) + 1
    return diff > 0 ? diff : 0
  }

  const validate = () => {
    const e = {}
    if (!form.startDate) e.startDate = 'Required'
    if (!form.endDate)   e.endDate   = 'Required'
    if (form.endDate && form.startDate && form.endDate < form.startDate) e.endDate = 'Must be after start date'
    if (!form.reason.trim()) e.reason = 'Required'
    return e
  }

  const submit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    const days = calcDays(form.startDate, form.endDate)
    setRequests(prev => [{
      id: `LV-NEW-${Date.now()}`,
      employeeId: 'EMP-010',
      employeeName: 'James Carter',
      ...form,
      days,
      status: 'Pending',
      appliedOn: new Date().toISOString().split('T')[0],
    }, ...prev])
    setShowForm(false)
    setForm({ type: leaveTypes[0], startDate: '', endDate: '', reason: '' })
    setErrors({})
  }

  return (
    <div className="flex flex-col gap-6 md:gap-8">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <p className="section-label mb-1">Employee Self-Service</p>
          <h1 className="font-manrope font-bold text-3xl md:text-4xl text-on_surface">Leave</h1>
          <p className="font-inter text-on_surface_variant text-sm mt-1">Apply for leave and track your requests</p>
        </div>
        <button onClick={() => setShowForm(true)} className="btn-primary gap-2 self-start">
          <Plus size={16} />
          Apply for Leave
        </button>
      </div>

      {/* Leave balance */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5">
        {Object.entries(leaveBalances).map(([type, data]) => (
          <div key={type} className="card flex flex-col gap-3">
            <p className="section-label capitalize">{type} Leave</p>
            <div className="flex items-end gap-2">
              <p className="font-manrope font-bold text-4xl text-on_surface">{data.remaining}</p>
              <p className="font-inter text-sm text-on_surface_variant mb-1">/ {data.total} days</p>
            </div>
            <div className="h-1.5 rounded-full bg-surface_container_high overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{ width: `${(data.remaining / data.total) * 100}%`, background: 'linear-gradient(90deg,#00288e,#1e40af)' }}
              />
            </div>
            <p className="font-inter text-xs text-on_surface_variant">{data.used} days used</p>
          </div>
        ))}
      </div>

      {/* Apply form modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-on_surface/40 backdrop-blur-sm p-0 sm:p-4">
          <div
            className="card w-full sm:max-w-lg rounded-t-xl rounded-b-none sm:rounded-md max-h-[92vh] overflow-y-auto"
            style={{ boxShadow: '0 -4px 40px 0 rgba(25,28,30,0.12)' }}
          >
            {/* Drag handle on mobile */}
            <div className="flex justify-center mb-4 sm:hidden">
              <div className="w-10 h-1 rounded-full bg-outline_variant" />
            </div>

            <div className="flex items-center justify-between mb-6">
              <h2 className="font-manrope font-bold text-xl text-on_surface">Apply for Leave</h2>
              <button onClick={() => setShowForm(false)} className="w-8 h-8 rounded-md hover:bg-surface_container_high flex items-center justify-center transition-colors">
                <X size={16} className="text-on_surface_variant" />
              </button>
            </div>

            <form onSubmit={submit} className="flex flex-col gap-5">
              <div>
                <label className="section-label block mb-2">Leave Type</label>
                <select
                  className="input-field"
                  value={form.type}
                  onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
                >
                  {leaveTypes.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              {/* Stack dates on mobile, side-by-side on sm+ */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="section-label block mb-2">Start Date</label>
                  <input
                    type="date"
                    className="input-field"
                    value={form.startDate}
                    onChange={e => {
                      const val = e.target.value
                      setForm(f => ({
                        ...f,
                        startDate: val,
                        // clear end date if it's now before the new start
                        endDate: f.endDate && f.endDate < val ? '' : f.endDate,
                      }))
                    }}
                  />
                  {errors.startDate && <p className="text-error text-xs mt-1 font-inter">{errors.startDate}</p>}
                </div>
                <div>
                  <label className="section-label block mb-2">End Date</label>
                  <input
                    type="date"
                    className="input-field"
                    value={form.endDate}
                    min={form.startDate || undefined}
                    onChange={e => setForm(f => ({ ...f, endDate: e.target.value }))}
                  />
                  {errors.endDate && <p className="text-error text-xs mt-1 font-inter">{errors.endDate}</p>}
                </div>
              </div>

              {form.startDate && form.endDate && calcDays(form.startDate, form.endDate) > 0 && (
                <div className="bg-surface_container_low rounded-md px-4 py-3 flex items-center gap-2">
                  <Calendar size={14} className="text-primary" />
                  <span className="font-inter text-sm text-on_surface">
                    <strong className="font-manrope font-bold">{calcDays(form.startDate, form.endDate)}</strong> day(s) requested
                  </span>
                </div>
              )}

              <div>
                <label className="section-label block mb-2">Reason</label>
                <textarea
                  className="input-field resize-none h-24"
                  placeholder="Briefly describe the reason for your leave…"
                  value={form.reason}
                  onChange={e => setForm(f => ({ ...f, reason: e.target.value }))}
                />
                {errors.reason && <p className="text-error text-xs mt-1 font-inter">{errors.reason}</p>}
              </div>

              <div className="flex gap-3 justify-end pt-2 pb-2">
                <button type="button" onClick={() => setShowForm(false)} className="btn-tertiary">Cancel</button>
                <button type="submit" className="btn-primary">Submit Request</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* My requests table */}
      <div className="card p-0 overflow-hidden">
        <div className="px-6 py-5" style={{ borderBottom: '1px solid rgba(196,197,213,0.15)' }}>
          <h2 className="font-manrope font-semibold text-base md:text-lg text-on_surface">My Leave History</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="atelier-table min-w-[600px]">
            <thead>
              <tr>
                <th className="pl-6">Type</th>
                <th>Start</th>
                <th>End</th>
                <th>Days</th>
                <th>Reason</th>
                <th>Applied</th>
                <th className="pr-6">Status</th>
              </tr>
            </thead>
            <tbody>
              {requests.map(r => (
                <tr key={r.id} className="hover:bg-surface_container transition-colors">
                  <td className="pl-6 font-medium whitespace-nowrap">{r.type}</td>
                  <td className="whitespace-nowrap">{formatDate(r.startDate)}</td>
                  <td className="whitespace-nowrap">{formatDate(r.endDate)}</td>
                  <td className="font-manrope font-semibold">{r.days}</td>
                  <td className="text-on_surface_variant max-w-[160px] truncate">{r.reason}</td>
                  <td className="text-on_surface_variant whitespace-nowrap">{formatDate(r.appliedOn)}</td>
                  <td className="pr-6"><StatusBadge status={r.status} /></td>
                </tr>
              ))}
              {requests.length === 0 && (
                <tr><td colSpan={7} className="text-center py-12 text-on_surface_variant">No leave requests yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
