"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarSubmenuProps {
  icon: string
  label: string
  items: {
    label: string
    href?: string
    active?: boolean
  }[]
  active?: boolean
  collapsed?: boolean
}

export function SidebarSubmenu({ icon, label, items, active = false, collapsed = false }: SidebarSubmenuProps) {
  const [isOpen, setIsOpen] = useState(active)

  const toggleSubmenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="mb-1">
      <button
        onClick={toggleSubmenu}
        className={cn(
          "flex items-center justify-between w-full px-3 py-2 rounded-md",
          active
            ? "bg-gray-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400"
            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700",
          collapsed ? "justify-center" : "",
        )}
      >
        <div className="flex items-center">
          <span className={cn("w-5 h-5 flex items-center justify-center", collapsed ? "" : "mr-3")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-shopping-bag"
            >
              {icon === "shopping-bag" && (
                <>
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                  <path d="M3 6h18" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </>
              )}
              {icon === "calendar" && (
                <>
                  <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                  <line x1="16" x2="16" y1="2" y2="6" />
                  <line x1="8" x2="8" y1="2" y2="6" />
                  <line x1="3" x2="21" y1="10" y2="10" />
                </>
              )}
              {icon === "users" && (
                <>
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </>
              )}
              {icon === "file-text" && (
                <>
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" x2="8" y1="13" y2="13" />
                  <line x1="16" x2="8" y1="17" y2="17" />
                  <line x1="10" x2="8" y1="9" y2="9" />
                </>
              )}
              {icon === "share-2" && (
                <>
                  <circle cx="18" cy="5" r="3" />
                  <circle cx="6" cy="12" r="3" />
                  <circle cx="18" cy="19" r="3" />
                  <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
                  <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
                </>
              )}
              {icon === "user" && (
                <>
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </>
              )}
              {icon === "lock" && (
                <>
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </>
              )}
              {icon === "grid" && (
                <>
                  <rect width="7" height="7" x="3" y="3" rx="1" />
                  <rect width="7" height="7" x="14" y="3" rx="1" />
                  <rect width="7" height="7" x="14" y="14" rx="1" />
                  <rect width="7" height="7" x="3" y="14" rx="1" />
                </>
              )}
            </svg>
          </span>
          {!collapsed && <span className="text-sm">{label}</span>}
        </div>
        {!collapsed && (
          <ChevronDown
            size={16}
            className={cn("transition-transform duration-200", isOpen ? "transform rotate-180" : "")}
          />
        )}
      </button>

      {/* Submenu items */}
      {!collapsed && (
        <div
          className={cn(
            "pl-10 mt-1 space-y-1 overflow-hidden transition-all duration-200",
            isOpen ? "max-h-96" : "max-h-0",
          )}
        >
          {items.map((item, index) => (
            <a
              key={index}
              href={item.href || "#"}
              className={cn(
                "block py-1.5 px-2 rounded-md text-sm transition-colors",
                item.active
                  ? "bg-gray-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100",
              )}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
