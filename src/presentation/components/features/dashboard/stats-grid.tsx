import { useDashboard } from "@/presentation/providers/dashboard-provider"
import { StatCard } from "./stat-card"

export function StatsGrid() {
  const { stats } = useDashboard()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {stats.map((stat) => (
        <StatCard key={stat.id} icon={stat.icon} iconColor={stat.color} value={stat.value} label={stat.label} />
      ))}
    </div>
  )
}
