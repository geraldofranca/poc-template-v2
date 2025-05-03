import Link from "next/link"
import { Icon } from "@/presentation/components/ui/icon"

interface SidebarItemProps {
  icon: string
  label: string
  hasSubmenu?: boolean
  active?: boolean
  href?: string
}

export function SidebarItem({ icon, label, hasSubmenu = false, active = false, href = "#" }: SidebarItemProps) {
  return (
    <Link
      href={href}
      className={`flex items-center justify-between px-3 py-2 rounded-md mb-1 ${
        active
          ? "bg-gray-100 dark:bg-gray-700 text-blue-600"
          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
      }`}
    >
      <div className="flex items-center">
        <span className="w-5 h-5 mr-3 flex items-center justify-center">
          <Icon name={icon} />
        </span>
        <span>{label}</span>
      </div>
      {hasSubmenu && <Icon name="chevron-right" size={16} />}
    </Link>
  )
}
