"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { UserCard } from "@/components/users/user-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Plus, Grid, List } from "lucide-react"
import { GetUserListUseCase } from "@/core/use-cases/get-user-list"
import type { UserListItem } from "@/core/entities/user-list"
import { useLanguage, LanguageProvider } from "@/components/i18n/language-context"
import { NotificationProvider } from "@/components/notifications/notification-context"

// Componente interno que usa os hooks
function UsersPageContent() {
  const [users, setUsers] = useState<UserListItem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const { t } = useLanguage()

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true)
      try {
        const getUserList = new GetUserListUseCase()
        const result = await getUserList.execute(1, 20, searchTerm)
        setUsers(result.users)
      } catch (error) {
        console.error("Error fetching users:", error)
      } finally {
        setLoading(false)
      }
    }

    // Debounce search
    const timer = setTimeout(() => {
      fetchUsers()
    }, 300)

    return () => clearTimeout(timer)
  }, [searchTerm])

  return (
    <DashboardLayout>
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-semibold">{t.users.gridView}</h1>
          <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
            <span>{t.users.users}</span>
            <span className="mx-2">&gt;</span>
            <span className="text-gray-900 dark:text-gray-100">{t.users.gridView}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
          <div className="relative w-full sm:w-auto sm:flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder={t.users.searchPlaceholder}
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-1" />
              {t.users.addUser}
            </Button>
            <div className="flex border rounded-md">
              <Button variant="ghost" size="icon" className="rounded-r-none border-r">
                <Grid className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-l-none">
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {users.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

// Componente principal que fornece os contextos
export default function UsersPage() {
  return (
    <LanguageProvider>
      <NotificationProvider>
        <UsersPageContent />
      </NotificationProvider>
    </LanguageProvider>
  )
}
