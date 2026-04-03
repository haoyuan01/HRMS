export default function Avatar({ name, size = 'md', className = '' }) {
  const initials = name
    ? name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()
    : '?'

  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg',
  }

  return (
    <div
      className={`${sizes[size]} rounded-full flex items-center justify-center font-manrope font-semibold text-white flex-shrink-0 ${className}`}
      style={{ background: 'linear-gradient(135deg, #00288e, #1e40af)' }}
    >
      {initials}
    </div>
  )
}
