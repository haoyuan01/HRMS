import { Users, DollarSign, FileText, Receipt, UserPlus } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import StatCard from '../../components/shared/StatCard'
import StatusBadge from '../../components/shared/StatusBadge'
import Avatar from '../../components/shared/Avatar'
import { adminDashboardStats, leaveRequests, expenseClaims, employees } from '../../data/mockData'
import { formatCurrency, formatDate } from '../../utils/format'

const recentLeave    = leaveRequests.slice(0, 4)
const recentExpenses = expenseClaims.slice(0, 4)
const recentHires    = employees.slice(-3).reverse()

export default function AdminDashboard() {
  const { user } = useAuth()
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <div className="flex flex-col gap-8 md:gap-10">
      {/* Header */}
      <div>
        <p className="section-label mb-1">{greeting}</p>
        <h1 className="font-manrope font-bold text-3xl md:text-4xl text-on_surface">{user?.name}</h1>
        <p className="font-inter text-on_surface_variant text-sm mt-1">
          Here's what's happening across the organisation today.
        </p>
      </div>

      {/* KPI grid */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5">
        <StatCard label="Total Headcount"        value={adminDashboardStats.totalHeadcount}       sub={`${adminDashboardStats.activeEmployees} active · ${adminDashboardStats.onLeave} on leave`} icon={Users}    />
        <StatCard label="New Hires This Month"   value={adminDashboardStats.newHiresThisMonth}    sub="Since March 1, 2026"  icon={UserPlus}  />
        <StatCard label="Pending Leave"          value={adminDashboardStats.pendingLeaveRequests} sub="Awaiting approval"    icon={FileText}  accent />
        <StatCard label="Pending Expenses"       value={adminDashboardStats.pendingExpenses}      sub="Awaiting review"      icon={Receipt}   />
      </div>

      {/* Payroll banner */}
      <div
        className="rounded-md p-5 md:p-6 flex items-center justify-between"
        style={{ background: 'linear-gradient(135deg,#00288e,#1e40af)' }}
      >
        <div>
          <p className="font-inter text-white/70 text-xs uppercase tracking-[0.08em] mb-1">Monthly Payroll</p>
          <p className="font-manrope font-bold text-2xl md:text-3xl text-white">
            {formatCurrency(adminDashboardStats.totalPayrollThisMonth)}
          </p>
          <p className="font-inter text-white/60 text-sm mt-1">Next pay date: {formatDate(adminDashboardStats.payrollDue)}</p>
        </div>
        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 flex items-center justify-center">
          <DollarSign size={24} className="text-white" />
        </div>
      </div>

      {/* Two-column tables */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 md:gap-8">
        {/* Recent Leave Requests */}
        <div className="card">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-manrope font-semibold text-base md:text-lg text-on_surface">Recent Leave Requests</h2>
            <button className="btn-tertiary text-xs py-1.5 px-3">View All</button>
          </div>
          <div className="overflow-x-auto -mx-6">
            <table className="atelier-table min-w-[420px] px-6">
              <thead>
                <tr>
                  <th className="pl-6">Employee</th>
                  <th>Type</th>
                  <th>Days</th>
                  <th className="pr-6">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentLeave.map(r => (
                  <tr key={r.id}>
                    <td className="pl-6">
                      <div className="flex items-center gap-2">
                        <Avatar name={r.employeeName} size="sm" />
                        <span className="font-medium whitespace-nowrap">{r.employeeName}</span>
                      </div>
                    </td>
                    <td className="text-on_surface_variant whitespace-nowrap">{r.type}</td>
                    <td>{r.days}</td>
                    <td className="pr-6"><StatusBadge status={r.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Expense Claims */}
        <div className="card">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-manrope font-semibold text-base md:text-lg text-on_surface">Recent Expense Claims</h2>
            <button className="btn-tertiary text-xs py-1.5 px-3">View All</button>
          </div>
          <div className="overflow-x-auto -mx-6">
            <table className="atelier-table min-w-[380px]">
              <thead>
                <tr>
                  <th className="pl-6">Employee</th>
                  <th>Category</th>
                  <th>Amount</th>
                  <th className="pr-6">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentExpenses.map(r => (
                  <tr key={r.id}>
                    <td className="pl-6">
                      <div className="flex items-center gap-2">
                        <Avatar name={r.employeeName} size="sm" />
                        <span className="font-medium whitespace-nowrap">{r.employeeName}</span>
                      </div>
                    </td>
                    <td className="text-on_surface_variant whitespace-nowrap">{r.category}</td>
                    <td className="font-manrope font-semibold whitespace-nowrap">{formatCurrency(r.amount)}</td>
                    <td className="pr-6"><StatusBadge status={r.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Recent Hires */}
      <div className="card">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-manrope font-semibold text-base md:text-lg text-on_surface">Recent Hires</h2>
          <button className="btn-tertiary text-xs py-1.5 px-3">View Directory</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {recentHires.map(emp => (
            <div key={emp.id} className="bg-surface_container_low rounded-md p-4 flex items-center gap-3">
              <Avatar name={emp.name} size="lg" />
              <div>
                <p className="font-inter font-medium text-sm text-on_surface">{emp.name}</p>
                <p className="font-inter text-xs text-on_surface_variant">{emp.position}</p>
                <p className="font-inter text-xs text-on_surface_variant mt-0.5">{emp.department}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
