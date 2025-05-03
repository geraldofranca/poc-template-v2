"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MoreHorizontal, MessageSquare } from "lucide-react"
import Image from "next/image"
import type { UserListItem } from "@/core/entities/user-list"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/components/i18n/language-context"

interface UserCardProps {
  user: UserListItem
}

export function UserCard({ user }: UserCardProps) {
  const { t } = useLanguage()

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "admin":
        return t.users.admin
      case "subscriber":
        return t.users.subscriber
      case "editor":
        return t.users.editor
      case "developer":
        return t.users.developer
      default:
        return role
    }
  }

  return (
    <Card className="p-4 flex flex-col items-center">
      <div className="relative mb-2">
        {user.avatar ? (
          <Image
            src={user.avatar || "/placeholder.svg"}
            alt={user.name}
            width={80}
            height={80}
            className="rounded-full"
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-lg font-semibold">
            {user.initials}
          </div>
        )}
        {user.online && (
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
        )}
      </div>

      <h3 className="font-medium text-center">{user.name}</h3>
      <p className="text-sm text-blue-600 dark:text-blue-400 mb-1">@{getRoleLabel(user.role)}</p>
      <p className="text-xs text-gray-500 dark:text-gray-400 text-center mb-4">{user.address}</p>

      <div className="flex w-full mt-auto">
        <Button variant="outline" size="sm" className="flex-1 mr-1">
          <MessageSquare className="h-4 w-4 mr-1" />
          {t.users.sendMessage}
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>{t.users.viewProfile}</DropdownMenuItem>
            <DropdownMenuItem>{t.users.editUser}</DropdownMenuItem>
            <DropdownMenuItem className="text-red-600 dark:text-red-400">{t.users.deleteUser}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Card>
  )
}
