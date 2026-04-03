export default function StatusBadge({ status }) {
  const map = {
    Approved:  'badge-approved',
    Present:   'badge-present',
    Active:    'badge-approved',
    Paid:      'badge-approved',
    Pending:   'badge-pending',
    'On Leave':'badge-pending',
    Rejected:  'badge-rejected',
    Absent:    'badge-absent',
    Inactive:  'badge-rejected',
  }
  const cls = map[status] || 'badge-pending'
  return <span className={cls}>{status}</span>
}
