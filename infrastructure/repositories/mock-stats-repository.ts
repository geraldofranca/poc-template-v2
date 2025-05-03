import type { Stat, TrafficSource } from "@/core/entities/stats"
import type { StatsRepository } from "@/core/interfaces/repositories/stats-repository"

export class MockStatsRepository implements StatsRepository {
  async getStats(): Promise<Stat[]> {
    return [
      {
        id: "revenue",
        value: "$236.18k",
        label: "Total Revenue",
        icon: "dollar-sign",
        color: "blue",
      },
      {
        id: "orders",
        value: "13,461",
        label: "Total Orders",
        icon: "shopping-cart",
        color: "purple",
      },
      {
        id: "delivered",
        value: "17,150",
        label: "Delivered",
        icon: "truck",
        color: "green",
      },
      {
        id: "cancelled",
        value: "3,519",
        label: "Cancelled",
        icon: "x-circle",
        color: "red",
      },
    ]
  }

  async getTrafficSources(): Promise<TrafficSource[]> {
    return [
      {
        id: "search",
        name: "Search Engine",
        percentage: 22,
        color: "emerald",
      },
      {
        id: "referral",
        name: "Referral",
        percentage: 34,
        color: "purple",
      },
      {
        id: "direct",
        name: "Direct",
        percentage: 44,
        color: "cyan",
      },
    ]
  }

  async getSalesRevenue(): Promise<{ totalSales: string; totalProfit: string }> {
    return {
      totalSales: "$1,517.36k",
      totalProfit: "$746.84k",
    }
  }
}
