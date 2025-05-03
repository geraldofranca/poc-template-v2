"use client"

import { Breadcrumb } from "@/components/layout/breadcrumb"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { WelcomeCard } from "@/components/features/dashboard/welcome-card"
import { StatsGrid } from "@/components/features/dashboard/stats-grid"
import { TrafficSources } from "@/components/features/dashboard/traffic-sources"
import { SalesRevenue } from "@/components/features/dashboard/sales-revenue"
import { BottomStats } from "@/components/features/dashboard/bottom-stats"

export function DashboardContent() {
  return (
    <DashboardLayout>
      <div className="mb-4">
        <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Synergy Ecommerce</h1>
      </div>

      <div className="flex justify-between items-center mb-4">
        <Breadcrumb items={[{ label: "Dashboards" }, { label: "Ecommerce", active: true }]} />
      </div>

      <WelcomeCard />
      <StatsGrid />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mt-6">
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
  )
}
