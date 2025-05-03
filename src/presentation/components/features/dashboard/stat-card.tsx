import { Card, CardContent } from "@/components/ui/card"
import { Icon } from "@/presentation/components/ui/icon"

interface StatCardProps {
  icon: string
  iconColor: string
  value: string
  label: string
}

export function StatCard({ icon, iconColor, value, label }: StatCardProps) {
  const bgColorClass = `bg-${iconColor}-100`
  const textColorClass = `text-${iconColor}-500`

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold">{value}</p>
            <p className="text-gray-500">{label}</p>
          </div>
          <div className={`${bgColorClass} p-3 rounded-full`}>
            <Icon name={icon} className={textColorClass} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
