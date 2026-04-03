import { useState } from 'react'
import { Download, CreditCard } from 'lucide-react'
import StatusBadge from '../../components/shared/StatusBadge'
import { myPayslips } from '../../data/mockData'
import { formatCurrency, formatDate } from '../../utils/format'

export default function MyPayslips() {
  const [selected, setSelected] = useState(myPayslips[0])

  return (
    <div className="flex flex-col gap-6 md:gap-8">
      <div>
        <p className="section-label mb-1">Employee Self-Service</p>
        <h1 className="font-manrope font-bold text-3xl md:text-4xl text-on_surface">My Payslips</h1>
        <p className="font-inter text-on_surface_variant text-sm mt-1">View and download your salary statements</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 md:gap-8">
        {/* Payslip list */}
        <div className="flex flex-col gap-3">
          <p className="section-label px-1">Payslip History</p>
          <div className="flex xl:flex-col gap-3 overflow-x-auto pb-1 xl:pb-0 xl:overflow-x-visible">
            {myPayslips.map(ps => (
              <button
                key={ps.id}
                onClick={() => setSelected(ps)}
                className={`flex-shrink-0 w-48 xl:w-auto text-left rounded-md p-4 transition-all duration-150 ${selected?.id === ps.id ? 'bg-primary text-white' : 'bg-surface_container_lowest hover:bg-surface_container_low text-on_surface'}`}
                style={selected?.id === ps.id ? { boxShadow: '0 4px 20px rgba(0,40,142,0.25)' } : {}}
              >
                <div className="flex items-center justify-between gap-2">
                  <p className={`font-manrope font-semibold text-sm truncate ${selected?.id === ps.id ? 'text-white' : 'text-on_surface'}`}>{ps.month}</p>
                  <StatusBadge status={ps.status} />
                </div>
                <p className={`font-manrope font-bold text-xl mt-1 ${selected?.id === ps.id ? 'text-white' : 'text-on_surface'}`}>
                  {formatCurrency(ps.netSalary)}
                </p>
                <p className={`font-inter text-xs mt-0.5 ${selected?.id === ps.id ? 'text-white/70' : 'text-on_surface_variant'}`}>
                  Net Pay · {formatDate(ps.payDate)}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Payslip detail */}
        {selected && (
          <div className="xl:col-span-2 card flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div>
                <p className="section-label mb-1">Payslip Detail</p>
                <h2 className="font-manrope font-bold text-2xl text-on_surface">{selected.month}</h2>
                <p className="font-inter text-xs text-on_surface_variant mt-1">Pay date: {formatDate(selected.payDate)}</p>
              </div>
              <button className="btn-primary gap-2 text-sm self-start">
                <Download size={15} />
                Download PDF
              </button>
            </div>

            {/* Earnings */}
            <div>
              <p className="section-label mb-3">Earnings</p>
              <div className="flex flex-col gap-2">
                {[
                  ['Basic Salary', selected.basicSalary],
                  ['Overtime Pay', selected.overtime],
                  ['Allowances',   selected.allowances],
                ].map(([label, val]) => (
                  <div key={label} className="flex justify-between py-2" style={{ borderBottom: '1px solid rgba(196,197,213,0.15)' }}>
                    <span className="font-inter text-sm text-on_surface_variant">{label}</span>
                    <span className="font-manrope font-semibold text-sm text-on_surface">{formatCurrency(val)}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between py-3 mt-1 bg-surface_container_low rounded-md px-4">
                <span className="font-inter text-sm font-semibold text-on_surface">Gross Earnings</span>
                <span className="font-manrope font-bold text-on_surface">
                  {formatCurrency(selected.basicSalary + selected.overtime + selected.allowances)}
                </span>
              </div>
            </div>

            {/* Deductions */}
            <div>
              <p className="section-label mb-3">Deductions</p>
              <div className="flex flex-col gap-2">
                {[
                  ['Statutory Deductions', selected.deductions],
                  ['Income Tax',           selected.tax],
                ].map(([label, val]) => (
                  <div key={label} className="flex justify-between py-2" style={{ borderBottom: '1px solid rgba(196,197,213,0.15)' }}>
                    <span className="font-inter text-sm text-on_surface_variant">{label}</span>
                    <span className="font-manrope font-semibold text-sm text-error">-{formatCurrency(val)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Net pay */}
            <div
              className="rounded-md p-5 flex items-center justify-between"
              style={{ background: 'linear-gradient(135deg,#00288e,#1e40af)' }}
            >
              <div>
                <p className="font-inter text-white/70 text-xs uppercase tracking-[0.08em] mb-1">Net Pay</p>
                <p className="font-manrope font-bold text-3xl md:text-4xl text-white">{formatCurrency(selected.netSalary)}</p>
              </div>
              <div className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                <CreditCard size={22} className="text-white" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
