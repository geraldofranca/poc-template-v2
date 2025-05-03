import {
  BarChart2,
  Bell,
  Calendar,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  File,
  FileText,
  Grid,
  Lock,
  Mail,
  Navigation,
  Package,
  Search,
  Settings,
  Share2,
  ShoppingBag,
  ShoppingCart,
  Table,
  Truck,
  User,
  Users,
  XCircle,
  type LucideIcon,
} from "lucide-react"

interface IconProps {
  name: string
  size?: number
  className?: string
}

export function Icon({ name, size = 18, className = "" }: IconProps) {
  const icons: Record<string, LucideIcon> = {
    "bar-chart-2": BarChart2,
    "chevron-left": ChevronLeft,
    "chevron-right": ChevronRight,
    "dollar-sign": DollarSign,
    "file-text": FileText,
    "shopping-bag": ShoppingBag,
    "shopping-cart": ShoppingCart,
    "share-2": Share2,
    "x-circle": XCircle,
    bell: Bell,
    calendar: Calendar,
    file: File,
    grid: Grid,
    lock: Lock,
    mail: Mail,
    navigation: Navigation,
    package: Package,
    search: Search,
    settings: Settings,
    table: Table,
    truck: Truck,
    user: User,
    users: Users,
  }

  const IconComponent = icons[name] || Grid

  return <IconComponent size={size} className={className} />
}
