"use client"

import type React from "react"

import type { Stat, TrafficSource } from "@/core/entities/stats"
import type { User } from "@/core/entities/user"
import { GetDashboardDataUseCase } from "@/core/use-cases/get-dashboard-data"
import { MockStatsRepository } from "@/infrastructure/repositories/mock-stats-repository"
import { MockUserRepository } from "@/infrastructure/repositories/mock-user-repository"
import { createContext, useContext, useEffect, useState } from "react"

interface DashboardContextType {
  stats: Stat[]
  trafficSources: TrafficSource[]
  salesRevenue: {
    totalSales: string
    totalProfit: string
  } | null
  currentUser: User | null
  isLoading: boolean
  error: Error | null
}

const DashboardContext = createContext<DashboardContextType>({
  stats: [],
  trafficSources: [],
  salesRevenue: null,
  currentUser: null,
  isLoading: true,
  error: null,
})

export const useDashboard = () => useContext(DashboardContext)

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [stats, setStats] = useState<Stat[]>([])
  const [trafficSources, setTrafficSources] = useState<TrafficSource[]>([])
  const [salesRevenue, setSalesRevenue] = useState<{ totalSales: string; totalProfit: string } | null>(null)
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const statsRepository = new MockStatsRepository()
        const userRepository = new MockUserRepository()
        const getDashboardData = new GetDashboardDataUseCase(statsRepository, userRepository)

        const data = await getDashboardData.execute()

        setStats(data.stats)
        setTrafficSources(data.trafficSources)
        setSalesRevenue(data.salesRevenue)
        setCurrentUser(data.currentUser)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("An unknown error occurred"))
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <DashboardContext.Provider
      value={{
        stats,
        trafficSources,
        salesRevenue,
        currentUser,
        isLoading,
        error,
      }}
    >
      {children}
    </DashboardContext.Provider>
  )
}
