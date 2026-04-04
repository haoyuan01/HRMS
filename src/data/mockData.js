// ── Employees ──────────────────────────────────────────────────────────────
export const employees = [
  { id: 'EMP-001', name: 'Alice Johnson',   department: 'Engineering',    position: 'Senior Engineer',       email: 'alice@company.com',  phone: '+1 555-0101', status: 'Active',   joinDate: '2021-03-15', avatar: null },
  { id: 'EMP-002', name: 'Bob Martinez',    department: 'Design',         position: 'UI/UX Designer',        email: 'bob@company.com',    phone: '+1 555-0102', status: 'Active',   joinDate: '2022-07-01', avatar: null },
  { id: 'EMP-003', name: 'Carol Williams',  department: 'Marketing',      position: 'Marketing Manager',     email: 'carol@company.com',  phone: '+1 555-0103', status: 'Active',   joinDate: '2020-11-20', avatar: null },
  { id: 'EMP-004', name: 'David Lee',       department: 'Finance',        position: 'Financial Analyst',     email: 'david@company.com',  phone: '+1 555-0104', status: 'On Leave', joinDate: '2019-06-10', avatar: null },
  { id: 'EMP-005', name: 'Eva Brown',       department: 'Engineering',    position: 'Backend Developer',     email: 'eva@company.com',    phone: '+1 555-0105', status: 'Active',   joinDate: '2023-01-09', avatar: null },
  { id: 'EMP-006', name: 'Frank Wilson',    department: 'Operations',     position: 'Operations Lead',       email: 'frank@company.com',  phone: '+1 555-0106', status: 'Active',   joinDate: '2018-04-25', avatar: null },
  { id: 'EMP-007', name: 'Grace Chen',      department: 'Engineering',    position: 'Frontend Developer',    email: 'grace@company.com',  phone: '+1 555-0107', status: 'Active',   joinDate: '2022-09-12', avatar: null },
  { id: 'EMP-008', name: 'Henry Davis',     department: 'Sales',          position: 'Sales Executive',       email: 'henry@company.com',  phone: '+1 555-0108', status: 'Active',   joinDate: '2021-05-03', avatar: null },
  { id: 'EMP-009', name: 'Iris Thompson',   department: 'HR',             position: 'HR Coordinator',        email: 'iris@company.com',   phone: '+1 555-0109', status: 'Active',   joinDate: '2020-02-17', avatar: null },
  { id: 'EMP-010', name: 'James Carter',    department: 'Engineering',    position: 'Full Stack Developer',  email: 'james@company.com',  phone: '+1 555-0110', status: 'Active',   joinDate: '2021-08-30', avatar: null },
]

// ── Leave Requests ──────────────────────────────────────────────────────────
export const leaveRequests = [
  { id: 'LV-001', employeeId: 'EMP-010', employeeName: 'James Carter',   type: 'Annual Leave',  startDate: '2026-04-07', endDate: '2026-04-11', days: 5, reason: 'Family vacation',         status: 'Pending',  appliedOn: '2026-03-20' },
  { id: 'LV-002', employeeId: 'EMP-002', employeeName: 'Bob Martinez',   type: 'Sick Leave',    startDate: '2026-03-25', endDate: '2026-03-26', days: 2, reason: 'Medical appointment',      status: 'Approved', appliedOn: '2026-03-22' },
  { id: 'LV-003', employeeId: 'EMP-004', employeeName: 'David Lee',      type: 'Annual Leave',  startDate: '2026-03-18', endDate: '2026-03-28', days: 9, reason: 'Extended family trip',     status: 'Approved', appliedOn: '2026-03-10' },
  { id: 'LV-004', employeeId: 'EMP-007', employeeName: 'Grace Chen',     type: 'Unpaid Leave',  startDate: '2026-04-14', endDate: '2026-04-14', days: 1, reason: 'Personal errand',          status: 'Rejected', appliedOn: '2026-03-21' },
  { id: 'LV-005', employeeId: 'EMP-003', employeeName: 'Carol Williams', type: 'Annual Leave',  startDate: '2026-04-21', endDate: '2026-04-25', days: 5, reason: 'Spring break holiday',     status: 'Pending',  appliedOn: '2026-03-25' },
  { id: 'LV-006', employeeId: 'EMP-005', employeeName: 'Eva Brown',      type: 'Sick Leave',    startDate: '2026-03-27', endDate: '2026-03-27', days: 1, reason: 'Feeling unwell',           status: 'Approved', appliedOn: '2026-03-27' },
]

// ── Payroll ─────────────────────────────────────────────────────────────────
export const payrollRecords = [
  { id: 'PAY-001', employeeId: 'EMP-001', employeeName: 'Alice Johnson',   department: 'Engineering', month: 'March 2026',    basicSalary: 8500, overtime: 320,  deductions: 510,  netSalary: 8310,  status: 'Paid',    payDate: '2026-03-25' },
  { id: 'PAY-002', employeeId: 'EMP-002', employeeName: 'Bob Martinez',    department: 'Design',      month: 'March 2026',    basicSalary: 6200, overtime: 0,    deductions: 372,  netSalary: 5828,  status: 'Paid',    payDate: '2026-03-25' },
  { id: 'PAY-003', employeeId: 'EMP-003', employeeName: 'Carol Williams',  department: 'Marketing',   month: 'March 2026',    basicSalary: 7100, overtime: 150,  deductions: 426,  netSalary: 6824,  status: 'Paid',    payDate: '2026-03-25' },
  { id: 'PAY-004', employeeId: 'EMP-004', employeeName: 'David Lee',       department: 'Finance',     month: 'March 2026',    basicSalary: 7800, overtime: 0,    deductions: 468,  netSalary: 7332,  status: 'Pending', payDate: null },
  { id: 'PAY-005', employeeId: 'EMP-005', employeeName: 'Eva Brown',       department: 'Engineering', month: 'March 2026',    basicSalary: 7200, overtime: 480,  deductions: 432,  netSalary: 7248,  status: 'Paid',    payDate: '2026-03-25' },
  { id: 'PAY-006', employeeId: 'EMP-010', employeeName: 'James Carter',    department: 'Engineering', month: 'March 2026',    basicSalary: 7500, overtime: 200,  deductions: 450,  netSalary: 7250,  status: 'Paid',    payDate: '2026-03-25' },
]

export const myPayslips = [
  { id: 'PS-001', month: 'March 2026',    basicSalary: 7500, overtime: 200,  allowances: 500, deductions: 450,  tax: 900,  netSalary: 6850,  status: 'Paid',    payDate: '2026-03-25' },
  { id: 'PS-002', month: 'February 2026', basicSalary: 7500, overtime: 0,    allowances: 500, deductions: 450,  tax: 900,  netSalary: 6650,  status: 'Paid',    payDate: '2026-02-25' },
  { id: 'PS-003', month: 'January 2026',  basicSalary: 7500, overtime: 350,  allowances: 500, deductions: 450,  tax: 900,  netSalary: 7000,  status: 'Paid',    payDate: '2026-01-25' },
  { id: 'PS-004', month: 'December 2025', basicSalary: 7500, overtime: 600,  allowances: 800, deductions: 450,  tax: 900,  netSalary: 7550,  status: 'Paid',    payDate: '2025-12-24' },
  { id: 'PS-005', month: 'November 2025', basicSalary: 7500, overtime: 0,    allowances: 500, deductions: 450,  tax: 900,  netSalary: 6650,  status: 'Paid',    payDate: '2025-11-25' },
  { id: 'PS-006', month: 'October 2025',  basicSalary: 7500, overtime: 120,  allowances: 500, deductions: 450,  tax: 900,  netSalary: 6770,  status: 'Paid',    payDate: '2025-10-25' },
]

// ── Expenses ─────────────────────────────────────────────────────────────────
export const expenseClaims = [
  { id: 'EXP-001', employeeId: 'EMP-010', employeeName: 'James Carter',    category: 'Travel',        amount: 320.50, description: 'Flight to client site in NYC',         date: '2026-03-15', status: 'Approved', submittedOn: '2026-03-16', approvedBy: 'Sarah Mitchell' },
  { id: 'EXP-002', employeeId: 'EMP-003', employeeName: 'Carol Williams',  category: 'Meals',         amount: 85.00,  description: 'Team lunch — marketing sprint',         date: '2026-03-20', status: 'Pending',  submittedOn: '2026-03-21', approvedBy: null },
  { id: 'EXP-003', employeeId: 'EMP-007', employeeName: 'Grace Chen',      category: 'Software',      amount: 199.00, description: 'Figma annual subscription',             date: '2026-03-10', status: 'Approved', submittedOn: '2026-03-11', approvedBy: 'Sarah Mitchell' },
  { id: 'EXP-004', employeeId: 'EMP-005', employeeName: 'Eva Brown',       category: 'Training',      amount: 450.00, description: 'AWS certification course',              date: '2026-03-05', status: 'Rejected', submittedOn: '2026-03-06', approvedBy: null },
  { id: 'EXP-005', employeeId: 'EMP-001', employeeName: 'Alice Johnson',   category: 'Travel',        amount: 640.00, description: 'Conference airfare — DevSummit 2026',   date: '2026-03-22', status: 'Pending',  submittedOn: '2026-03-23', approvedBy: null },
  { id: 'EXP-006', employeeId: 'EMP-010', employeeName: 'James Carter',    category: 'Equipment',     amount: 120.00, description: 'USB-C hub for remote setup',            date: '2026-03-24', status: 'Pending',  submittedOn: '2026-03-25', approvedBy: null },
]

// ── Dashboard Stats ───────────────────────────────────────────────────────────
export const adminDashboardStats = {
  totalHeadcount: 248,
  activeEmployees: 231,
  onLeave: 12,
  newHiresThisMonth: 5,
  pendingLeaveRequests: 8,
  pendingExpenses: 14,
  payrollDue: '2026-04-25',
  totalPayrollThisMonth: 1_284_500,
}

export const employeeDashboardStats = {
  annualLeaveBalance: 12,
  sickLeaveBalance: 5,
  pendingExpenses: 2,
  approvedExpensesThisMonth: 320.50,
  attendanceThisMonth: 92,  // percent
  nextPayDate: '2026-04-25',
}

export const leaveBalances = {
  annual: { total: 18, used: 6, remaining: 12 },
  sick:   { total: 10, used: 5, remaining: 5  },
  unpaid: { total: 5,  used: 0, remaining: 5  },
}

export const departments = ['Engineering', 'Design', 'Marketing', 'Finance', 'Operations', 'Sales', 'HR']
export const leaveTypes   = ['Annual Leave', 'Sick Leave', 'Unpaid Leave', 'Maternity/Paternity Leave']
export const expenseCategories = ['Travel', 'Meals', 'Software', 'Equipment', 'Training', 'Other']
