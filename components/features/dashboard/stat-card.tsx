import { Card, CardContent } from "@/components/ui/card"
import { Icon } from "@/components/ui/icon"

interface StatCardProps {
  icon: string
  iconColor: string
  value: string
  label: string
}

export function StatCard({ icon, iconColor, value, label }: StatCardProps) {
  // Definindo classes de cores para modo claro e escuro
  const bgColorMap: Record<string, string> = {
    blue: "bg-blue-100 dark:bg-blue-900/20",
    purple: "bg-purple-100 dark:bg-purple-900/20",
    green: "bg-green-100 dark:bg-green-900/20",
    red: "bg-red-100 dark:bg-red-900/20",
    emerald: "bg-emerald-100 dark:bg-emerald-900/20",
    cyan: "bg-cyan-100 dark:bg-cyan-900/20",
  }

  const textColorMap: Record<string, string> = {
    blue: "text-blue-500 dark:text-blue-400",
    purple: "text-purple-500 dark:text-purple-400",
    green: "text-green-500 dark:text-green-400",
    red: "text-red-500 dark:text-red-400",
    emerald: "text-emerald-500 dark:text-emerald-400",
    cyan: "text-cyan-500 dark:text-cyan-400",
  }

  const bgColorClass = bgColorMap[iconColor] || "bg-gray-100 dark:bg-gray-800"
  const textColorClass = textColorMap[iconColor] || "text-gray-500 dark:text-gray-400"

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold">{value}</p>
            <p className="text-gray-500 dark:text-gray-400">{label}</p>
          </div>
          <div className={`${bgColorClass} p-3 rounded-full`}>
            <Icon name={icon} className={textColorClass} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
