"use client"

import { useState, useEffect } from "react"
import { X, Menu } from "lucide-react"
import { SidebarItem } from "../sidebar/sidebar-item"
import { Icon } from "@/components/ui/icon"
import { useDashboard } from "@/components/providers/dashboard-provider"
import Image from "next/image"

const MENU_ITEMS = [
  { icon: "mail", label: "Email" },
  { icon: "calendar", label: "Calendar", hasSubmenu: true },
  { icon: "shopping-bag", label: "Ecommerce", hasSubmenu: true, active: true },
  { icon: "users", label: "HR Management", hasSubmenu: true },
  { icon: "file-text", label: "Notes" },
  { icon: "share-2", label: "Social", hasSubmenu: true },
  { icon: "file-text", label: "Invoices", hasSubmenu: true },
  { icon: "user", label: "Users", hasSubmenu: true },
]

const PAGES_ITEMS = [
  { icon: "lock", label: "Authentication", hasSubmenu: true },
  { icon: "file", label: "Pages", hasSubmenu: true },
]

const COMPONENTS_ITEMS = [
  { icon: "grid", label: "UI Elements", hasSubmenu: true },
  { icon: "package", label: "Plugins", hasSubmenu: true },
  { icon: "navigation", label: "Navigation", hasSubmenu: true },
  { icon: "file-text", label: "Forms", hasSubmenu: true },
  { icon: "table", label: "Tables", hasSubmenu: true },
  { icon: "bar-chart-2", label: "Apexcharts", hasSubmenu: true },
  { icon: "grid", label: "Icons", hasSubmenu: true },
]

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const { currentUser } = useDashboard()

  // Close the menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (isOpen && !target.closest(".mobile-menu") && !target.closest(".mobile-menu-button")) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 mobile-menu-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle mobile menu"
      >
        <Menu size={24} />
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden transition-opacity duration-300" />
      )}

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 z-50 md:hidden transform transition-transform duration-300 ease-in-out mobile-menu ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="p-4 border-b dark:border-gray-700 flex items-center justify-between">
            <div className="flex items-center">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-emerald-600 dark:text-emerald-400"
              >
                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" />
                <path
                  d="M2 17L12 22L22 17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 12L12 17L22 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="ml-2 text-xl font-semibold dark:text-white">Synergy</span>
            </div>
            <button
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              onClick={() => setIsOpen(false)}
              aria-label="Close mobile menu"
            >
              <X size={20} />
            </button>
          </div>

          {/* User Profile */}
          <div className="p-4 border-b dark:border-gray-700">
            <div className="flex items-center">
              <Image
                src={currentUser?.avatar || "/placeholder.svg?key=ep7zs"}
                alt="Profile"
                width={40}
                height={40}
                className="rounded-full border-2 border-purple-500 dark:border-purple-400"
              />
              <div className="ml-3">
                <p className="font-medium dark:text-white">{currentUser?.name || "User"}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Administrator</p>
              </div>
            </div>
          </div>

          {/* Mobile Menu Content */}
          <div className="flex-1 overflow-y-auto">
            <nav className="p-2">
              {MENU_ITEMS.map((item) => (
                <SidebarItem
                  key={item.label}
                  icon={item.icon}
                  label={item.label}
                  hasSubmenu={item.hasSubmenu}
                  active={item.active}
                  onClick={() => setIsOpen(false)}
                />
              ))}

              <div className="mt-6 mb-2 px-3 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase">
                PAGES
              </div>
              {PAGES_ITEMS.map((item) => (
                <SidebarItem
                  key={item.label}
                  icon={item.icon}
                  label={item.label}
                  hasSubmenu={item.hasSubmenu}
                  active={item.active}
                  onClick={() => setIsOpen(false)}
                />
              ))}

              <div className="mt-6 mb-2 px-3 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase">
                COMPONENTS
              </div>
              {COMPONENTS_ITEMS.map((item) => (
                <SidebarItem
                  key={item.label}
                  icon={item.icon}
                  label={item.label}
                  hasSubmenu={item.hasSubmenu}
                  active={item.active}
                  onClick={() => setIsOpen(false)}
                />
              ))}
            </nav>
          </div>

          {/* Mobile Menu Footer */}
          <div className="p-4 border-t dark:border-gray-700">
            <div className="flex items-center justify-between">
              <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                <Icon name="settings" size={20} />
              </button>
              <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                <Icon name="bell" size={20} />
              </button>
              <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                <Icon name="mail" size={20} />
              </button>
              <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                <Icon name="log-out" size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
