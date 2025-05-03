"use client"

import { useState } from "react"
import { SidebarItem } from "./sidebar-item"
import { SidebarSubmenu } from "./sidebar-submenu"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useLanguage } from "@/components/i18n/language-context"
import { useRouter } from "next/navigation"

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
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
      onClick: () => router.push("/users"),
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

  return (
    <div
      className={`hidden md:flex flex-col border-r bg-white dark:bg-gray-800 dark:border-gray-700 transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
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
          {!collapsed && <span className="ml-2 text-lg font-semibold dark:text-white">Synergy</span>}
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
          {MENU_ITEMS.map((item) =>
            item.hasSubmenu ? (
              <SidebarSubmenu
                key={item.label}
                icon={item.icon}
                label={item.label}
                items={item.submenuItems || []}
                active={item.active}
                collapsed={collapsed}
              />
            ) : (
              <SidebarItem
                key={item.label}
                icon={item.icon}
                label={item.label}
                active={item.active}
                collapsed={collapsed}
                href={item.href}
                onClick={item.onClick}
              />
            ),
          )}

          {!collapsed && (
            <div className="mt-6 mb-2 px-3 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase">
              {t.menu.pages}
            </div>
          )}
          {collapsed && <div className="mt-6 mb-2 border-t dark:border-gray-700"></div>}
          {PAGES_ITEMS.map((item) =>
            item.hasSubmenu ? (
              <SidebarSubmenu
                key={item.label}
                icon={item.icon}
                label={item.label}
                items={item.submenuItems || []}
                active={item.active}
                collapsed={collapsed}
              />
            ) : (
              <SidebarItem
                key={item.label}
                icon={item.icon}
                label={item.label}
                active={item.active}
                collapsed={collapsed}
                href={item.href}
              />
            ),
          )}

          {!collapsed && (
            <div className="mt-6 mb-2 px-3 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase">
              {t.menu.components}
            </div>
          )}
          {collapsed && <div className="mt-6 mb-2 border-t dark:border-gray-700"></div>}
          {COMPONENTS_ITEMS.map((item) =>
            item.hasSubmenu ? (
              <SidebarSubmenu
                key={item.label}
                icon={item.icon}
                label={item.label}
                items={item.submenuItems || []}
                active={item.active}
                collapsed={collapsed}
              />
            ) : (
              <SidebarItem
                key={item.label}
                icon={item.icon}
                label={item.label}
                active={item.active}
                collapsed={collapsed}
                href={item.href}
              />
            ),
          )}
        </nav>
      </div>
    </div>
  )
}
