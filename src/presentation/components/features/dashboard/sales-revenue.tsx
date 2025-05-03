import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useDashboard } from "@/presentation/providers/dashboard-provider"
import { Icon } from "@/presentation/components/ui/icon"

export function SalesRevenue() {
  const { salesRevenue } = useDashboard()

  if (!salesRevenue) {
    return null
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Sales Revenue Overview</h3>
          <div className="flex items-center">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
                <path d="M16 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M8 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M3 10H21" stroke="currentColor" strokeWidth="2" />
              </svg>
              Select Date
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center mb-4">
              <Icon name="dollar-sign" className="text-blue-500 mr-2" />
              <div>
                <h4 className="font-semibold">Total Sales</h4>
                <p className="text-2xl font-bold">{salesRevenue.totalSales}</p>
              </div>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <p className="text-center text-gray-600 dark:text-gray-300">
                Sales data visualization removed as requested
              </p>
            </div>
          </div>
          <div>
            <div className="flex items-center mb-4">
              <Icon name="dollar-sign" className="text-green-500 mr-2" />
              <div>
                <h4 className="font-semibold">Total Profit</h4>
                <p className="text-2xl font-bold">{salesRevenue.totalProfit}</p>
              </div>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <p className="text-center text-gray-600 dark:text-gray-300">
                Profit data visualization removed as requested
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
