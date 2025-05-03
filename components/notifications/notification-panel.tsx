"use client"
import { useNotifications } from "./notification-context"
import { useLanguage } from "@/components/i18n/language-context"
import { X } from "lucide-react"
import Image from "next/image"
import type { NotificationCategory } from "./notification-types"
import { formatTimeAgo, formatCurrency } from "@/utils/format"

export function NotificationPanel() {
  const { filteredNotifications, unreadCount, activeCategory, setActiveCategory, markAsRead, removeNotification } =
    useNotifications()
  const { t, language } = useLanguage()

  const formatTimeIndicator = (date: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffSec = Math.floor(diffMs / 1000)
    const diffMin = Math.floor(diffSec / 60)
    const diffHours = Math.floor(diffMin / 60)
    const diffDays = Math.floor(diffHours / 24)

    if (diffSec < 60) {
      return `${diffSec} ${t.common.seconds}`
    } else if (diffMin < 60) {
      return `${diffMin} ${t.common.minutes}`
    } else if (diffHours < 24) {
      return `${diffHours} ${t.common.hours}`
    } else if (diffDays === 1) {
      return t.common.yesterday
    } else {
      return `${diffDays} ${t.common.days}`
    }
  }

  const tabs: { id: NotificationCategory; label: string }[] = [
    { id: "all", label: t.common.viewAll },
    { id: "mentions", label: t.common.mentions },
    { id: "followers", label: t.common.followers },
    { id: "invites", label: t.common.invites },
  ]

  return (
    <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 border-b dark:border-gray-700 flex items-center justify-between">
        <h2 className="text-lg font-semibold flex items-center">
          {t.common.notifications}
          {unreadCount > 0 && (
            <span className="ml-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </h2>
      </div>

      <div className="flex border-b dark:border-gray-700">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`flex-1 py-2 text-sm font-medium text-center ${
              activeCategory === tab.id
                ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
            onClick={() => setActiveCategory(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="max-h-[400px] overflow-y-auto">
        {filteredNotifications.length > 0 ? (
          <div>
            {filteredNotifications.map((notification) => {
              if ("username" in notification && "avatar" in notification && notification.category === "followers") {
                return (
                  <div
                    key={notification.id}
                    className={`p-4 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 ${
                      !notification.read ? "bg-blue-50 dark:bg-blue-900/10" : ""
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex">
                      <div className="flex-shrink-0 mr-3">
                        <Image
                          src={notification.avatar || "/placeholder.svg"}
                          alt={notification.username}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between">
                          <p className="text-sm font-medium">
                            <span className="font-bold">@{notification.username}</span> {t.common.followed}
                          </p>
                          <button
                            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                            onClick={(e) => {
                              e.stopPropagation()
                              removeNotification(notification.id)
                            }}
                          >
                            <X size={16} />
                          </button>
                        </div>
                        <div className="flex items-center mt-1">
                          <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                            <svg
                              className="w-3 h-3 mr-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                              ></path>
                            </svg>
                            {formatTimeAgo(notification.createdAt, language as any)}
                          </span>
                          <span className="ml-auto text-xs text-blue-600 dark:text-blue-400">
                            {formatTimeIndicator(notification.createdAt)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              }

              if ("username" in notification && "comment" in notification && notification.category === "mentions") {
                return (
                  <div
                    key={notification.id}
                    className={`p-4 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 ${
                      !notification.read ? "bg-blue-50 dark:bg-blue-900/10" : ""
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex">
                      <div className="flex-shrink-0 mr-3">
                        <Image
                          src={notification.avatar || "/placeholder.svg"}
                          alt={notification.username}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between">
                          <p className="text-sm font-medium">
                            <span className="font-bold">@{notification.username}</span> {t.common.commented}
                          </p>
                          <button
                            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                            onClick={(e) => {
                              e.stopPropagation()
                              removeNotification(notification.id)
                            }}
                          >
                            <X size={16} />
                          </button>
                        </div>
                        <div className="flex items-center mt-1">
                          <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                            <svg
                              className="w-3 h-3 mr-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                              ></path>
                            </svg>
                            {formatTimeAgo(notification.createdAt, language as any)}
                          </span>
                          <span className="ml-auto text-xs text-blue-600 dark:text-blue-400">
                            {formatTimeIndicator(notification.createdAt)}
                          </span>
                        </div>
                        <div className="mt-2 p-3 bg-gray-100 dark:bg-gray-700 rounded-md text-sm">
                          {notification.comment}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              }

              if ("productName" in notification && "price" in notification && notification.category === "invites") {
                // Formatar o preço de acordo com o idioma
                const formattedPrice = formatCurrency(notification.price, language as any)

                return (
                  <div
                    key={notification.id}
                    className={`p-4 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 ${
                      !notification.read ? "bg-blue-50 dark:bg-blue-900/10" : ""
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex">
                      <div className="flex-shrink-0 mr-3 bg-red-100 dark:bg-red-900/20 rounded-md p-2">
                        <svg
                          className="w-6 h-6 text-red-500 dark:text-red-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          ></path>
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between">
                          <p className="text-sm font-medium">
                            {t.common.purchased} {notification.productName} {t.common.for}{" "}
                            <span className="font-bold text-red-500 dark:text-red-400">{formattedPrice}</span>
                          </p>
                          <button
                            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                            onClick={(e) => {
                              e.stopPropagation()
                              removeNotification(notification.id)
                            }}
                          >
                            <X size={16} />
                          </button>
                        </div>
                        <div className="flex items-center mt-1">
                          <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                            <svg
                              className="w-3 h-3 mr-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                              ></path>
                            </svg>
                            {formatTimeAgo(notification.createdAt, language as any)}
                          </span>
                          <span className="ml-auto text-xs text-blue-600 dark:text-blue-400">
                            {formatTimeIndicator(notification.createdAt)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              }

              return null
            })}
          </div>
        ) : (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            <svg
              className="w-12 h-12 mx-auto mb-4 text-gray-400 dark:text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              ></path>
            </svg>
            <p>No notifications found</p>
          </div>
        )}
      </div>
    </div>
  )
}
