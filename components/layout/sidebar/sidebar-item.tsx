"use client"

import Link from "next/link"
import { Icon } from "@/components/ui/icon"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface SidebarItemProps {
  icon: string
  label: string
  hasSubmenu?: boolean
  active?: boolean
  href?: string
  collapsed?: boolean
  onClick?: () => void
}

export function SidebarItem({
  icon,
  label,
  hasSubmenu = false,
  active = false,
  href = "#",
  collapsed = false,
  onClick,
}: SidebarItemProps) {
  const item = (
    <Link
      href={href}
      className={`flex items-center justify-between px-3 py-2 rounded-md mb-1 ${
        active
          ? "bg-gray-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400"
          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
      } ${collapsed ? "justify-center" : ""}`}
      onClick={onClick}
    >
      <div className="flex items-center">
        <span className={`w-5 h-5 flex items-center justify-center ${collapsed ? "" : "mr-3"}`}>
          <Icon name={icon} />
        </span>
        {!collapsed && <span>{label}</span>}
      </div>
      {!collapsed && hasSubmenu && <Icon name="chevron-right" size={16} />}
    </Link>
  )

  if (collapsed) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{item}</TooltipTrigger>
          <TooltipContent side="right">
            <p>{label}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  return item
}
