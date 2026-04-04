export default function StatCard({ label, value, sub, icon: Icon, accent = false }) {
  return (
    <div className="card flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <span className="section-label">{label}</span>
        {Icon && (
          <div className={`w-9 h-9 rounded-md flex items-center justify-center ${accent ? 'bg-primary' : 'bg-surface_container_low'}`}>
            <Icon size={18} className={accent ? 'text-white' : 'text-on_surface_variant'} />
          </div>
        )}
      </div>
      <p className="font-manrope font-bold text-3xl text-on_surface leading-none">{value}</p>
      {sub && <p className="font-inter text-xs text-on_surface_variant">{sub}</p>}
    </div>
  )
}
