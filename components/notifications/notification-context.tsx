"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { v4 as uuidv4 } from "uuid"
import type { Notification, NotificationCategory } from "./notification-types"
import { useLanguage } from "@/components/i18n/language-context"

interface NotificationContextType {
  notifications: Notification[]
  unreadCount: number
  activeCategory: NotificationCategory
  setActiveCategory: (category: NotificationCategory) => void
  filteredNotifications: Notification[]
  addNotification: (notification: Omit<Notification, "id" | "createdAt" | "read">) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  removeNotification: (id: string) => void
  clearAllNotifications: () => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error("useNotifications must be used within a NotificationProvider")
  }
  return context
}

export function NotificationProvider({ children }: { children: ReactNode }) {
  const { t } = useLanguage()

  // Dados de exemplo para notificações
  const createMockNotifications = () =>
    [
      {
        id: "1",
        category: "followers",
        username: "willie_passem",
        avatar: "/diverse-group-avatars.png",
        type: "info",
        createdAt: new Date(Date.now() - 1000 * 4), // 4 segundos atrás
        read: false,
        title: t.notifications?.follower?.title || "New Follower",
        message: t.notifications?.follower?.message || "You have a new follower",
      },
      {
        id: "2",
        category: "mentions",
        username: "caroline_jessica",
        avatar: "/diverse-group-avatars.png",
        postId: "post123",
        comment: "Amazing! Fast, to the point, professional and really amazing to work with them!!!",
        type: "info",
        createdAt: new Date(Date.now() - 1000 * 60 * 15), // 15 minutos atrás
        read: false,
        title: t.notifications?.mention?.title || "New Mention",
        message: t.notifications?.mention?.message || "Someone mentioned you in a comment",
      },
      {
        id: "3",
        category: "invites",
        productName: "business plan",
        price: 199.99,
        type: "success",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 dia atrás
        read: false,
        title: t.notifications?.purchase?.title || "Purchase Successful",
        message: t.notifications?.purchase?.message || "Your purchase was successful",
      },
    ] as Notification[]

  const [notifications, setNotifications] = useState<Notification[]>(createMockNotifications())
  const [activeCategory, setActiveCategory] = useState<NotificationCategory>("all")

  const unreadCount = notifications.filter((notification) => !notification.read).length

  const filteredNotifications =
    activeCategory === "all"
      ? notifications
      : notifications.filter((notification) => "category" in notification && notification.category === activeCategory)

  const addNotification = (notification: Omit<Notification, "id" | "createdAt" | "read">) => {
    const newNotification = {
      ...notification,
      id: uuidv4(),
      createdAt: new Date(),
      read: false,
    } as Notification

    setNotifications((prev) => [newNotification, ...prev])
  }

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  const clearAllNotifications = () => {
    setNotifications([])
  }

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        activeCategory,
        setActiveCategory,
        filteredNotifications,
        addNotification,
        markAsRead,
        markAllAsRead,
        removeNotification,
        clearAllNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}
