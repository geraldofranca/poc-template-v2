import { Icon } from "@/presentation/components/ui/icon"

interface BreadcrumbItem {
  label: string
  href?: string
  active?: boolean
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <div className="text-sm breadcrumbs">
      <ul className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
        {items.map((item, index) => (
          <li key={index} className={`flex items-center ${index > 0 ? "ml-2" : ""}`}>
            {index > 0 && <Icon name="chevron-right" size={14} className="mr-2" />}
            <span className={item.active ? "text-gray-800 dark:text-gray-200" : ""}>{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
