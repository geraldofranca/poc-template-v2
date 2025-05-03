"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useDashboard } from "@/components/providers/dashboard-provider"
import { useLanguage } from "@/components/i18n/language-context"
import { formatNumber } from "@/utils/format"
import Link from "next/link"
import { Icon } from "@/components/ui/icon"

export function TrafficSources() {
  const { trafficSources } = useDashboard()
  const { t, language } = useLanguage()

  // Mapeamento de cores para modo claro e escuro
  const colorMap: Record<string, string> = {
    emerald: "bg-emerald-500 dark:bg-emerald-400",
    purple: "bg-purple-500 dark:bg-purple-400",
    cyan: "bg-cyan-500 dark:bg-cyan-400",
  }

  // Total de tráfego
  const totalTraffic = 875
  const formattedTotal = formatNumber(totalTraffic, language as any)

  return (
    <Card>
      <CardContent className="p-4 sm:p-6">
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h3 className="text-base sm:text-subheading-size-adjust font-semibold">{t.dashboard.trafficResources}</h3>
          <Link
            href="#"
            className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-xs sm:text-sm flex items-center"
          >
            {t.dashboard.viewStatus} <Icon name="chevron-right" size={16} />
          </Link>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 p-3 sm:p-6 rounded-lg text-center">
          <p className="text-gray-600 dark:text-gray-300 mb-4 small-text-adjust">{t.dashboard.salesData}</p>
          <div className="flex flex-col space-y-3 max-w-md mx-auto">
            {trafficSources.map((source) => (
              <div key={source.id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className={`inline-block w-3 h-3 ${colorMap[source.color] || "bg-gray-500"} mr-2`}></span>
                  <span className="text-xs sm:small-text-adjust text-gray-600 dark:text-gray-300">{source.name}</span>
                </div>
                <span className="font-medium dark:text-gray-200 text-xs sm:small-text-adjust">
                  {formatNumber(source.percentage, language as any)}%
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <p className="font-medium dark:text-gray-200 text-sm sm:text-size-adjust">
              {t.dashboard.total} <span className="text-lg">{formattedTotal}</span>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
