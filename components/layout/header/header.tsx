"use client"

import { Icon } from "@/components/ui/icon"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { ThemeToggle } from "@/components/theme-toggle"
import { useDashboard } from "@/components/providers/dashboard-provider"
import { MobileMenu } from "../mobile-menu/mobile-menu"
import { NotificationDropdown } from "@/components/notifications/notification-dropdown"
import { LanguageSelector } from "@/components/i18n/language-selector"
import { useLanguage } from "@/components/i18n/language-context"

export function Header() {
  const { currentUser } = useDashboard()
  const { t } = useLanguage()

  return (
    <header className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center">
        <MobileMenu />
        <button className="hidden md:block p-1 mr-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
          <Icon name="chevron-left" size={20} />
        </button>
        <div className="relative hidden sm:block">
          <Icon
            name="search"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
            size={16}
          />
          <Input
            className="pl-10 w-72 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
            placeholder={t.header.search}
          />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <LanguageSelector />
        <ThemeToggle />
        <div className="relative">
          <NotificationDropdown />
        </div>
        <button className="p-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hidden sm:block">
          <Icon name="settings" size={20} />
        </button>
        <button className="relative">
          <Image
            src={currentUser?.avatar || "/placeholder.svg?key=ep7zs"}
            alt="Profile"
            width={36}
            height={36}
            className="rounded-full border-2 border-purple-500 dark:border-purple-400"
          />
        </button>
      </div>
    </header>
  )
}
