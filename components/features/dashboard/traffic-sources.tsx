import { Card, CardContent } from "@/components/ui/card"
import { useDashboard } from "@/components/providers/dashboard-provider"
import Link from "next/link"
import { Icon } from "@/components/ui/icon"

export function TrafficSources() {
  const { trafficSources } = useDashboard()

  // Mapeamento de cores para modo claro e escuro
  const colorMap: Record<string, string> = {
    emerald: "bg-emerald-500 dark:bg-emerald-400",
    purple: "bg-purple-500 dark:bg-purple-400",
    cyan: "bg-cyan-500 dark:bg-cyan-400",
  }

  return (
    <Card>
      <CardContent className="p-4 sm:p-6">
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h3 className="text-base sm:text-lg font-semibold">Traffic Resources</h3>
          <Link
            href="#"
            className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-xs sm:text-sm flex items-center"
          >
            View Status <Icon name="chevron-right" size={16} />
          </Link>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 p-3 sm:p-6 rounded-lg text-center">
          <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm sm:text-base">
            Traffic sources visualization removed as requested
          </p>
          <div className="flex flex-col space-y-3 max-w-md mx-auto">
            {trafficSources.map((source) => (
              <div key={source.id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className={`inline-block w-3 h-3 ${colorMap[source.color] || "bg-gray-500"} mr-2`}></span>
                  <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">{source.name}</span>
                </div>
                <span className="font-medium dark:text-gray-200 text-xs sm:text-sm">{source.percentage}%</span>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <p className="font-medium dark:text-gray-200 text-sm sm:text-base">
              Total: <span className="text-lg sm:text-xl">875</span>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
