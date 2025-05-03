import { Icon } from "@/components/ui/icon"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { ThemeToggle } from "@/components/theme-toggle"
import { useDashboard } from "@/components/providers/dashboard-provider"
import { MobileMenu } from "../mobile-menu/mobile-menu"

export function Header() {
  const { currentUser } = useDashboard()

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
            placeholder="Search for ..."
          />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button className="p-1 hidden sm:block">
          <Image src="/us-flag-waving.png" alt="US" width={24} height={24} className="rounded" />
        </button>
        <ThemeToggle />
        <div className="relative hidden sm:block">
          <button className="p-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 relative">
            <Icon name="shopping-cart" size={20} />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              3
            </span>
          </button>
        </div>
        <div className="relative hidden sm:block">
          <button className="p-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 relative">
            <Icon name="bell" size={20} />
            <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-2 h-2 flex items-center justify-center"></span>
          </button>
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
