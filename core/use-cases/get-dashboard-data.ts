import type { Stat, TrafficSource } from "@/core/entities/stats"
import type { User } from "@/core/entities/user"
import type { StatsRepository } from "@/core/interfaces/repositories/stats-repository"
import type { UserRepository } from "@/core/interfaces/repositories/user-repository"

export class GetDashboardDataUseCase {
  constructor(
    private statsRepository: StatsRepository,
    private userRepository: UserRepository,
  ) {}

  async execute(): Promise<{
    stats: Stat[]
    trafficSources: TrafficSource[]
    salesRevenue: {
      totalSales: string
      totalProfit: string
    }
    currentUser: User
  }> {
    const [stats, trafficSources, salesRevenue, currentUser] = await Promise.all([
      this.statsRepository.getStats(),
      this.statsRepository.getTrafficSources(),
      this.statsRepository.getSalesRevenue(),
      this.userRepository.getCurrentUser(),
    ])

    return {
      stats,
      trafficSources,
      salesRevenue,
      currentUser,
    }
  }
}
