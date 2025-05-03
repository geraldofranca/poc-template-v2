"use client"

import { Icon } from "@/components/ui/icon"
import { useLanguage } from "@/components/i18n/language-context"

interface BreadcrumbItem {
  label: string
  href?: string
  active?: boolean
  translationKey?: string
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[]
}

export function Breadcrumb({ items = [] }: BreadcrumbProps) {
  const { t } = useLanguage()

  // Se não houver itens, usar padrão
  const defaultItems = [
    { label: t.dashboard.dashboards, translationKey: "dashboards" },
    { label: t.dashboard.ecommerce, translationKey: "ecommerce", active: true },
  ]

  const breadcrumbItems = items.length > 0 ? items : defaultItems

  return (
    <div className="text-xs sm:text-sm breadcrumbs">
      <ul className="flex items-center space-x-1 sm:space-x-2 text-gray-500 dark:text-gray-400">
        {breadcrumbItems.map((item, index) => (
          <li key={index} className={`flex items-center ${index > 0 ? "ml-1 sm:ml-2" : ""}`}>
            {index > 0 && <Icon name="chevron-right" size={14} className="mr-1 sm:mr-2" />}
            <span className={item.active ? "text-gray-800 dark:text-gray-200" : ""}>{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
