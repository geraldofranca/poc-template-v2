"use client"

import type { ReactNode } from "react"
import { LanguageProvider } from "@/components/i18n/language-context"
import { NotificationProvider } from "@/components/notifications/notification-context"
import { DashboardProvider } from "@/components/providers/dashboard-provider"

interface AppProvidersProps {
  children: ReactNode
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <LanguageProvider>
      <NotificationProvider>
        <DashboardProvider>{children}</DashboardProvider>
      </NotificationProvider>
    </LanguageProvider>
  )
}
