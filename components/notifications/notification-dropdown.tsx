"use client"

import type React from "react"

import { useState } from "react"
import { Bell, Check, Trash2, X } from "lucide-react"
import { useNotifications } from "./notification-context"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/components/i18n/language-context"
import { cn } from "@/lib/utils"
import { formatTimeAgo } from "@/utils/format"

export function NotificationDropdown() {
  const { notifications, unreadCount, markAsRead, markAllAsRead, removeNotification, clearAllNotifications } =
    useNotifications()
  const [open, setOpen] = useState(false)
  const { t, language } = useLanguage()

  const handleMarkAsRead = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    markAsRead(id)
  }

  const handleRemove = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    removeNotification(id)
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "info":
        return <div className="w-2 h-2 rounded-full bg-blue-500" />
      case "success":
        return <div className="w-2 h-2 rounded-full bg-green-500" />
      case "warning":
        return <div className="w-2 h-2 rounded-full bg-yellow-500" />
      case "error":
        return <div className="w-2 h-2 rounded-full bg-red-500" />
      default:
        return <div className="w-2 h-2 rounded-full bg-gray-500" />
    }
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-2 h-2 flex items-center justify-center"></span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end">
        <div className="flex items-center justify-between p-4">
          <DropdownMenuLabel className="text-base">{t.common.notifications}</DropdownMenuLabel>
          <Button
            variant="ghost"
            size="sm"
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
            className="h-8 text-xs"
          >
            <Check className="mr-1 h-4 w-4" />
            {t.common.markAllAsRead}
          </Button>
        </div>
        <DropdownMenuSeparator />
        <div className="max-h-[300px] overflow-y-auto">
          {notifications.length > 0 ? (
            <DropdownMenuGroup>
              {notifications.map((notification) => (
                <DropdownMenuItem
                  key={notification.id}
                  className={cn(
                    "flex flex-col items-start p-4 cursor-default",
                    !notification.read && "bg-gray-50 dark:bg-gray-800",
                  )}
                >
                  <div className="flex items-start justify-between w-full">
                    <div className="flex items-start gap-2">
                      <div className="mt-1">{getNotificationIcon(notification.type)}</div>
                      <div>
                        <div className="font-medium">{notification.title}</div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{notification.message}</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                          {formatTimeAgo(notification.createdAt, language as any)}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={(e) => handleMarkAsRead(notification.id, e)}
                        >
                          <Check className="h-3 w-3" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={(e) => handleRemove(notification.id, e)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          ) : (
            <div className="py-6 text-center text-sm text-gray-500 dark:text-gray-400">{t.common.noNotifications}</div>
          )}
        </div>
        {notifications.length > 0 && (
          <>
            <DropdownMenuSeparator />
            <div className="p-2 text-center">
              <Button variant="ghost" size="sm" onClick={clearAllNotifications} className="text-xs">
                <Trash2 className="mr-1 h-4 w-4" />
                {t.common.clearAll}
              </Button>
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
