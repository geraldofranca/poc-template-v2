import { Breadcrumb } from "@/presentation/components/layout/breadcrumb"
import { DashboardLayout } from "@/presentation/components/layout/dashboard-layout"
import { DashboardProvider } from "@/presentation/providers/dashboard-provider"
import { WelcomeCard } from "@/presentation/components/features/dashboard/welcome-card"
import { StatsGrid } from "@/presentation/components/features/dashboard/stats-grid"
import { TrafficSources } from "@/presentation/components/features/dashboard/traffic-sources"
import { SalesRevenue } from "@/presentation/components/features/dashboard/sales-revenue"
import { BottomStats } from "@/presentation/components/features/dashboard/bottom-stats"

export default function Dashboard() {
  return (
    <DashboardProvider>
      <DashboardLayout>
        <div className="mb-4  {
  return (
    <DashboardProvider>
      <DashboardLayout>
        <div className=\"mb-4">
          <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Ecommerce</h1>
        </div>

        <div className="flex justify-between items-center mb-4">
          <Breadcrumb
            items={[
              { label: "Dashboards" },
              { label: "Ecommerce", active: true },
            ]}
          />
        </div>

        <WelcomeCard />
        <StatsGrid />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2">
            <SalesRevenue />
          </div>
          <div>
            <TrafficSources />
          </div>
        </div>

        <div className="mt-6">
          <BottomStats />
        </div>
      </DashboardLayout>
    </DashboardProvider>
  )
}
