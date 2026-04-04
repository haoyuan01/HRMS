import { useAuth } from '../../context/AuthContext'
import StatCard from '../../components/shared/StatCard'
import StatusBadge from '../../components/shared/StatusBadge'
import Avatar from '../../components/shared/Avatar'
import { employeeDashboardStats, leaveBalances, leaveRequests, expenseClaims, myPayslips } from '../../data/mockData'
import { CreditCard, FileText, Receipt, TrendingUp, Calendar } from 'lucide-react'
import { formatCurrency, formatDate } from '../../utils/format'

const myLeave       = leaveRequests.filter(r => r.employeeId === 'EMP-010').slice(0, 3)
const myExpenses    = expenseClaims.filter(c => c.employeeId === 'EMP-010').slice(0, 3)
const latestPayslip = myPayslips[0]

export default function EmployeeDashboard() {
  const { user } = useAuth()
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <div className="flex flex-col gap-8 md:gap-10">
      {/* Header */}
      <div className="flex items-center gap-3 md:gap-4">
        <Avatar name={user?.name} size="lg" className="flex-shrink-0" />
        <div className="min-w-0">
          <p className="section-label mb-0.5">{greeting}</p>
          <h1 className="font-manrope font-bold text-2xl md:text-4xl text-on_surface truncate">{user?.name}</h1>
          <p className="font-inter text-on_surface_variant text-xs md:text-sm mt-0.5">{user?.department} · {user?.id}</p>
        </div>
      </div>

      {/* KPI grid */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5">
        <StatCard label="Annual Leave Left"       value={`${leaveBalances.annual.remaining} days`} sub={`${leaveBalances.annual.used} used of ${leaveBalances.annual.total}`} icon={Calendar}   />
        <StatCard label="Sick Leave Left"         value={`${leaveBalances.sick.remaining} days`}   sub={`${leaveBalances.sick.used} used of ${leaveBalances.sick.total}`}     icon={FileText}   />
        <StatCard label="Attendance This Month"   value={`${employeeDashboardStats.attendanceThisMonth}%`} sub="Based on working days" icon={TrendingUp} accent />
        <StatCard label="Next Pay Date"           value={formatDate(employeeDashboardStats.nextPayDate)} sub="Scheduled disbursement" icon={CreditCard} />
      </div>

      {/* Latest payslip banner */}
      <div
        className="rounded-md p-5 md:p-6 flex items-center justify-between"
        style={{ background: 'linear-gradient(135deg,#00288e,#1e40af)' }}
      >
        <div>
          <p className="font-inter text-white/70 text-xs uppercase tracking-[0.08em] mb-1">Latest Payslip · {latestPayslip.month}</p>
          <p className="font-manrope font-bold text-2xl md:text-3xl text-white">{formatCurrency(latestPayslip.netSalary)}</p>
          <p className="font-inter text-white/60 text-sm mt-1">Net salary · Paid {formatDate(latestPayslip.payDate)}</p>
        </div>
        <div className="w-11 h-11 md:w-14 md:h-14 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
          <CreditCard size={22} className="text-white" />
        </div>
      </div>

      {/* Leave balance cards */}
      <div>
        <h2 className="font-manrope font-semibold text-base md:text-lg text-on_surface mb-4">Leave Balance</h2>
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
      </div>

      {/* Two-column: leave + expenses */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 md:gap-8">
        {/* My Leave Requests */}
        <div className="card">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-manrope font-semibold text-base md:text-lg text-on_surface">My Leave Requests</h2>
            <button className="btn-tertiary text-xs py-1.5 px-3">View All</button>
          </div>
          {myLeave.length === 0 ? (
            <p className="text-on_surface_variant text-sm font-inter text-center py-8">No leave requests yet.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {myLeave.map(r => (
                <div key={r.id} className="bg-surface_container_low rounded-md p-4 flex items-start sm:items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-inter font-medium text-sm text-on_surface">{r.type}</p>
                    <p className="font-inter text-xs text-on_surface_variant mt-0.5">{formatDate(r.startDate)} → {formatDate(r.endDate)} · {r.days} days</p>
                  </div>
                  <StatusBadge status={r.status} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* My Expense Claims */}
        <div className="card">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-manrope font-semibold text-base md:text-lg text-on_surface">My Expense Claims</h2>
            <button className="btn-tertiary text-xs py-1.5 px-3">View All</button>
          </div>
          {myExpenses.length === 0 ? (
            <p className="text-on_surface_variant text-sm font-inter text-center py-8">No expense claims yet.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {myExpenses.map(c => (
                <div key={c.id} className="bg-surface_container_low rounded-md p-4 flex items-start sm:items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-inter font-medium text-sm text-on_surface truncate">{c.description}</p>
                    <p className="font-inter text-xs text-on_surface_variant mt-0.5">{c.category} · {formatDate(c.date)}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="font-manrope font-bold text-on_surface text-sm">{formatCurrency(c.amount)}</span>
                    <StatusBadge status={c.status} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
