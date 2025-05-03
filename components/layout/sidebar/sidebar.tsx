"use client"

import { useState } from "react"
import { SidebarItem } from "./sidebar-item"
import { ChevronLeft, ChevronRight } from "lucide-react"

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

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div
      className={`hidden md:flex flex-col border-r bg-white dark:bg-gray-800 dark:border-gray-700 transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
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
          {!collapsed && <span className="ml-2 text-xl font-semibold dark:text-white">Synergy</span>}
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        <nav className="p-2">
          {MENU_ITEMS.map((item) => (
            <SidebarItem
              key={item.label}
              icon={item.icon}
              label={item.label}
              hasSubmenu={item.hasSubmenu}
              active={item.active}
              collapsed={collapsed}
            />
          ))}

          {!collapsed && (
            <div className="mt-6 mb-2 px-3 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase">PAGES</div>
          )}
          {collapsed && <div className="mt-6 mb-2 border-t dark:border-gray-700"></div>}
          {PAGES_ITEMS.map((item) => (
            <SidebarItem
              key={item.label}
              icon={item.icon}
              label={item.label}
              hasSubmenu={item.hasSubmenu}
              active={item.active}
              collapsed={collapsed}
            />
          ))}

          {!collapsed && (
            <div className="mt-6 mb-2 px-3 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase">
              COMPONENTS
            </div>
          )}
          {collapsed && <div className="mt-6 mb-2 border-t dark:border-gray-700"></div>}
          {COMPONENTS_ITEMS.map((item) => (
            <SidebarItem
              key={item.label}
              icon={item.icon}
              label={item.label}
              hasSubmenu={item.hasSubmenu}
              active={item.active}
              collapsed={collapsed}
            />
          ))}
        </nav>
      </div>
    </div>
  )
}
