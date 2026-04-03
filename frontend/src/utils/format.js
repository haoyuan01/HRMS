/**
 * Format a number as Malaysian Ringgit.
 * e.g. 7500 → "RM 7,500.00"
 */
export function formatCurrency(amount) {
  if (amount == null) return '—'
  return 'RM ' + Number(amount).toLocaleString('en-MY', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

/**
 * Format a YYYY-MM-DD string to DD/MM/YYYY (Malaysian standard).
 * e.g. "2026-03-25" → "25/03/2026"
 */
export function formatDate(dateStr) {
  if (!dateStr) return '—'
  const [y, m, d] = dateStr.split('-')
  if (!y || !m || !d) return dateStr
  return `${d}/${m}/${y}`
}
