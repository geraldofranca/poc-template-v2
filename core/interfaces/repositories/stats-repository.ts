import type { Stat, TrafficSource } from "@/core/entities/stats"

export interface StatsRepository {
  getStats(): Promise<Stat[]>
  getTrafficSources(): Promise<TrafficSource[]>
  getSalesRevenue(): Promise<{
    totalSales: string
    totalProfit: string
  }>
}
