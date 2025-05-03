import { Card, CardContent } from "@/components/ui/card"
import { useDashboard } from "@/presentation/providers/dashboard-provider"
import Link from "next/link"
import { Icon } from "@/presentation/components/ui/icon"

export function TrafficSources() {
  const { trafficSources } = useDashboard()

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Traffic Resources</h3>
          <Link href="#" className="text-blue-500 hover:text-blue-700 text-sm flex items-center">
            View Status <Icon name="chevron-right" size={16} />
          </Link>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg text-center">
          <p className="text-gray-600 dark:text-gray-300 mb-4">Traffic sources visualization removed as requested</p>
          <div className="flex flex-col space-y-3 max-w-md mx-auto">
            {trafficSources.map((source) => (
              <div key={source.id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className={`inline-block w-3 h-3 bg-${source.color}-500 mr-2`}></span>
                  <span className="text-sm text-gray-600 dark:text-gray-300">{source.name}</span>
                </div>
                <span className="font-medium">{source.percentage}%</span>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <p className="font-medium">
              Total: <span className="text-xl">875</span>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
