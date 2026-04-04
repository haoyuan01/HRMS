import { useState } from 'react'
import { Plus, X, Upload, Receipt } from 'lucide-react'
import StatusBadge from '../../components/shared/StatusBadge'
import StatCard from '../../components/shared/StatCard'
import { expenseClaims as initial, expenseCategories } from '../../data/mockData'
import { formatCurrency, formatDate } from '../../utils/format'

const myInitial = initial.filter(c => c.employeeId === 'EMP-010')

export default function ExpensesPage() {
  const [claims, setClaims]   = useState(myInitial)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm]       = useState({ category: expenseCategories[0], amount: '', description: '', date: '', receipt: '' })
  const [errors, setErrors]   = useState({})

  const validate = () => {
    const e = {}
    if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0) e.amount = 'Enter a valid amount'
    if (!form.description.trim()) e.description = 'Required'
    if (!form.date) e.date = 'Required'
    return e
  }

  const submit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setClaims(prev => [{
      id: `EXP-NEW-${Date.now()}`,
      employeeId: 'EMP-010',
      employeeName: 'James Carter',
      ...form,
      amount: parseFloat(form.amount),
      status: 'Pending',
      submittedOn: new Date().toISOString().split('T')[0],
      approvedBy: null,
    }, ...prev])
    setShowForm(false)
    setForm({ category: expenseCategories[0], amount: '', description: '', date: '', receipt: '' })
    setErrors({})
  }

  const totalApproved = claims.filter(c => c.status === 'Approved').reduce((s, c) => s + c.amount, 0)
  const pending       = claims.filter(c => c.status === 'Pending').length

  return (
    <div className="flex flex-col gap-6 md:gap-8">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <p className="section-label mb-1">Employee Self-Service</p>
          <h1 className="font-manrope font-bold text-3xl md:text-4xl text-on_surface">Expenses</h1>
          <p className="font-inter text-on_surface_variant text-sm mt-1">Submit and track your expense claims</p>
        </div>
        <button onClick={() => setShowForm(true)} className="btn-primary gap-2 self-start">
          <Plus size={16} />
          New Claim
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 md:gap-5">
        <StatCard label="Total Claims"   value={claims.length}                 icon={Receipt} />
        <StatCard label="Pending"        value={pending}                       icon={Receipt} accent />
        <StatCard label="Total Approved" value={formatCurrency(totalApproved)} icon={Receipt} />
      </div>

      {/* New claim modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-on_surface/40 backdrop-blur-sm p-0 sm:p-4">
          <div
            className="card w-full sm:max-w-lg rounded-b-none sm:rounded-md max-h-[90vh] overflow-y-auto"
            style={{ boxShadow: '0 16px 40px 0 rgba(25,28,30,0.12)' }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-manrope font-bold text-xl text-on_surface">Submit Expense Claim</h2>
              <button onClick={() => setShowForm(false)} className="w-8 h-8 rounded-md hover:bg-surface_container_high flex items-center justify-center transition-colors">
                <X size={16} className="text-on_surface_variant" />
              </button>
            </div>

            <form onSubmit={submit} className="flex flex-col gap-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="section-label block mb-2">Category</label>
                  <select className="input-field" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                    {expenseCategories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="section-label block mb-2">Amount (USD)</label>
                  <input
                    type="number" step="0.01" min="0"
                    className="input-field" placeholder="0.00"
                    value={form.amount}
                    onChange={e => setForm(f => ({ ...f, amount: e.target.value }))}
                  />
                  {errors.amount && <p className="text-error text-xs mt-1 font-inter">{errors.amount}</p>}
                </div>
              </div>

              <div>
                <label className="section-label block mb-2">Expense Date</label>
                <input type="date" className="input-field" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
                {errors.date && <p className="text-error text-xs mt-1 font-inter">{errors.date}</p>}
              </div>

              <div>
                <label className="section-label block mb-2">Description</label>
                <textarea
                  className="input-field resize-none h-20"
                  placeholder="Briefly describe the expense…"
                  value={form.description}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                />
                {errors.description && <p className="text-error text-xs mt-1 font-inter">{errors.description}</p>}
              </div>

              <div>
                <label className="section-label block mb-2">Receipt (optional)</label>
                <div className="border-2 border-dashed border-outline_variant/40 rounded-md p-5 flex flex-col items-center gap-2 cursor-pointer hover:bg-surface_container_low transition-colors">
                  <Upload size={20} className="text-on_surface_variant" />
                  <p className="font-inter text-sm text-on_surface_variant text-center">Click to upload or drag & drop</p>
                  <p className="font-inter text-xs text-outline">PNG, JPG, PDF up to 5MB</p>
                </div>
              </div>

              <div className="flex gap-3 justify-end pt-2">
                <button type="button" onClick={() => setShowForm(false)} className="btn-tertiary">Cancel</button>
                <button type="submit" className="btn-primary">Submit Claim</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Claims table */}
      <div className="card p-0 overflow-hidden">
        <div className="px-6 py-5" style={{ borderBottom: '1px solid rgba(196,197,213,0.15)' }}>
          <h2 className="font-manrope font-semibold text-base md:text-lg text-on_surface">My Claims</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="atelier-table min-w-[560px]">
            <thead>
              <tr>
                <th className="pl-6">Category</th>
                <th>Description</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Submitted</th>
                <th className="pr-6">Status</th>
              </tr>
            </thead>
            <tbody>
              {claims.map(c => (
                <tr key={c.id} className="hover:bg-surface_container transition-colors">
                  <td className="pl-6"><span className="badge-pending capitalize">{c.category}</span></td>
                  <td className="text-on_surface_variant max-w-[200px] truncate">{c.description}</td>
                  <td className="whitespace-nowrap">{formatDate(c.date)}</td>
                  <td className="font-manrope font-bold text-on_surface whitespace-nowrap">{formatCurrency(c.amount)}</td>
                  <td className="text-on_surface_variant whitespace-nowrap">{formatDate(c.submittedOn)}</td>
                  <td className="pr-6"><StatusBadge status={c.status} /></td>
                </tr>
              ))}
              {claims.length === 0 && (
                <tr><td colSpan={6} className="text-center py-12 text-on_surface_variant">No expense claims yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
