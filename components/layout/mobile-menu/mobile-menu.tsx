"use client"

import { useState, useEffect } from "react"
import { X, Menu, ChevronDown } from "lucide-react"
import { SidebarItem } from "../sidebar/sidebar-item"
import { Icon } from "@/components/ui/icon"
import { useDashboard } from "@/components/providers/dashboard-provider"
import { useLanguage } from "@/components/i18n/language-context"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

interface MobileSubmenuProps {
  label: string
  items: {
    label: string
    href?: string
    active?: boolean
  }[]
  icon: string
  active?: boolean
}

function MobileSubmenu({ label, items, icon, active = false }: MobileSubmenuProps) {
  const [isOpen, setIsOpen] = useState(active)

  return (
    <div className="mb-1">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center justify-between w-full px-3 py-2 rounded-md",
          active
            ? "bg-gray-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400"
            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700",
        )}
      >
        <div className="flex items-center">
          <span className="w-5 h-5 mr-3 flex items-center justify-center">
            <Icon name={icon} />
          </span>
          <span className="text-sm">{label}</span>
        </div>
        <ChevronDown
          size={16}
          className={cn("transition-transform duration-200", isOpen ? "transform rotate-180" : "")}
        />
      </button>

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
    </div>
  )
}

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const { currentUser } = useDashboard()
  const { t } = useLanguage()
  const router = useRouter()

  // Definindo os itens do menu com submenus
  const MENU_ITEMS = [
    { icon: "mail", label: t.menu.email, href: "#" },
    {
      icon: "calendar",
      label: t.menu.calendar,
      hasSubmenu: true,
      submenuItems: [
        { label: t.menu.dayView || "Day View", href: "#" },
        { label: t.menu.weekView || "Week View", href: "#" },
        { label: t.menu.monthView || "Month View", href: "#" },
        { label: t.menu.yearView || "Year View", href: "#" },
      ],
    },
    {
      icon: "shopping-bag",
      label: t.menu.ecommerce,
      hasSubmenu: true,
      active: true,
      submenuItems: [
        { label: t.menu.dashboard || "Dashboard", href: "/", active: true },
        { label: t.menu.products || "Products", href: "#" },
        { label: t.menu.orders || "Orders", href: "#" },
        { label: t.menu.customers || "Customers", href: "#" },
      ],
    },
    {
      icon: "users",
      label: t.menu.hrManagement,
      hasSubmenu: true,
      submenuItems: [
        { label: t.menu.employees || "Employees", href: "#" },
        { label: t.menu.payroll || "Payroll", href: "#" },
        { label: t.menu.recruitment || "Recruitment", href: "#" },
      ],
    },
    { icon: "file-text", label: t.menu.notes, href: "#" },
    {
      icon: "share-2",
      label: t.menu.social,
      hasSubmenu: true,
      submenuItems: [
        { label: t.menu.feed || "Feed", href: "#" },
        { label: t.menu.activity || "Activity", href: "#" },
        { label: t.menu.friends || "Friends", href: "#" },
      ],
    },
    {
      icon: "file-text",
      label: t.menu.invoices,
      hasSubmenu: true,
      submenuItems: [
        { label: t.menu.list || "List", href: "#" },
        { label: t.menu.create || "Create", href: "#" },
      ],
    },
    {
      icon: "user",
      label: t.menu.users,
      href: "/users",
      onClick: () => {
        router.push("/users")
        setIsOpen(false)
      },
    },
  ]

  const PAGES_ITEMS = [
    {
      icon: "lock",
      label: t.menu.authentication,
      hasSubmenu: true,
      submenuItems: [
        { label: t.menu.login || "Login", href: "#" },
        { label: t.menu.register || "Register", href: "#" },
        { label: t.menu.forgotPassword || "Forgot Password", href: "#" },
      ],
    },
    {
      icon: "file",
      label: t.menu.pagesGeneric,
      hasSubmenu: true,
      submenuItems: [
        { label: t.menu.pricing || "Pricing", href: "#" },
        { label: t.menu.faq || "FAQ", href: "#" },
        { label: t.menu.blank || "Blank", href: "#" },
      ],
    },
  ]

  const COMPONENTS_ITEMS = [
    {
      icon: "grid",
      label: t.menu.uiElements,
      hasSubmenu: true,
      submenuItems: [
        { label: t.menu.buttons || "Buttons", href: "#" },
        { label: t.menu.cards || "Cards", href: "#" },
        { label: t.menu.modals || "Modals", href: "#" },
      ],
    },
    { icon: "package", label: t.menu.plugins, href: "#" },
    { icon: "navigation", label: t.menu.navigation, href: "#" },
    { icon: "file-text", label: t.menu.forms, href: "#" },
    { icon: "table", label: t.menu.tables, href: "#" },
    { icon: "bar-chart-2", label: t.menu.apexcharts, href: "#" },
    { icon: "grid", label: t.menu.icons, href: "#" },
  ]

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
          <div className="h-[57px] px-4 border-b dark:border-gray-700 flex items-center justify-between">
            <div className="flex items-center h-full">
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
                <p className="text-sm text-gray-500 dark:text-gray-400">{t.menu.administrator}</p>
              </div>
            </div>
          </div>

          {/* Mobile Menu Content */}
          <div className="flex-1 overflow-y-auto">
            <nav className="p-2">
              {MENU_ITEMS.map((item) =>
                item.hasSubmenu ? (
                  <MobileSubmenu
                    key={item.label}
                    icon={item.icon}
                    label={item.label}
                    items={item.submenuItems || []}
                    active={item.active}
                  />
                ) : (
                  <SidebarItem
                    key={item.label}
                    icon={item.icon}
                    label={item.label}
                    active={item.active}
                    href={item.href}
                    onClick={item.onClick || (() => setIsOpen(false))}
                  />
                ),
              )}

              <div className="mt-6 mb-2 px-3 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase">
                {t.menu.pages}
              </div>
              {PAGES_ITEMS.map((item) =>
                item.hasSubmenu ? (
                  <MobileSubmenu
                    key={item.label}
                    icon={item.icon}
                    label={item.label}
                    items={item.submenuItems || []}
                    active={item.active}
                  />
                ) : (
                  <SidebarItem
                    key={item.label}
                    icon={item.icon}
                    label={item.label}
                    active={item.active}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                  />
                ),
              )}

              <div className="mt-6 mb-2 px-3 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase">
                {t.menu.components}
              </div>
              {COMPONENTS_ITEMS.map((item) =>
                item.hasSubmenu ? (
                  <MobileSubmenu
                    key={item.label}
                    icon={item.icon}
                    label={item.label}
                    items={item.submenuItems || []}
                    active={item.active}
                  />
                ) : (
                  <SidebarItem
                    key={item.label}
                    icon={item.icon}
                    label={item.label}
                    active={item.active}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                  />
                ),
              )}
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
