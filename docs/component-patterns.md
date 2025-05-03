# Padrões de Componentes

Este documento descreve os padrões e convenções para a criação e uso de componentes no projeto Ecommerce Dashboard.

## Tipos de Componentes

### 1. Componentes de UI

Componentes básicos reutilizáveis que formam os blocos de construção da interface:

- Botões, inputs, cards, etc.
- Localizados em `@/components/ui/`
- Baseados na biblioteca shadcn/ui

Exemplo:

\`\`\`tsx
// @/components/ui/button.tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "underline-offset-4 hover:underline text-primary",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-3 rounded-md",
        lg: "h-11 px-8 rounded-md",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
\`\`\`

### 2. Componentes de Layout

Componentes que estruturam a aplicação:

- Header, sidebar, footer, etc.
- Localizados em `@/components/layout/`

Exemplo:

\`\`\`tsx
// @/components/layout/dashboard-layout.tsx
import type React from "react"
import { Header } from "@/components/layout/header/header"
import { Sidebar } from "@/components/layout/sidebar/sidebar"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 font-inter">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 p-4">{children}</main>
      </div>
    </div>
  )
}
\`\`\`

### 3. Componentes de Feature

Componentes específicos para funcionalidades:

- Dashboard cards, user lists, etc.
- Localizados em `@/components/features/`

Exemplo:

\`\`\`tsx
// @/components/features/dashboard/welcome-card.tsx
"use client"

import { Button } from "@/components/ui/button"
import { useDashboard } from "@/components/providers/dashboard-provider"
import { useLanguage } from "@/components/i18n/language-context"
import Image from "next/image"

export function WelcomeCard() {
  const { currentUser } = useDashboard()
  const { t } = useLanguage()

  return (
    <div className="bg-[#0f172a] dark:bg-gray-800 text-white rounded-lg p-4 sm:p-6 mb-6 relative overflow-hidden">
      <div className="max-w-2xl relative z-10">
        <h2 className="text-xl sm:text-heading-size-adjust font-semibold mb-2">
          {t.dashboard.welcome} {currentUser?.name || "User"} 🚀
        </h2>
        <p className="text-gray-300 mb-4 text-size-adjust">{t.dashboard.description}</p>
        <Button className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-sm sm:text-base">
          {t.dashboard.takeProduct}
        </Button>
      </div>
      <div className="absolute right-0 bottom-0 z-0 opacity-50 sm:opacity-100">
        <Image
          src="/placeholder.svg?key=ic74p"
          alt="Ecommerce illustration"
          width={150}
          height={150}
          className="sm:w-[200px] sm:h-[200px]"
        />
      </div>
    </div>
  )
}
\`\`\`

### 4. Providers

Componentes que gerenciam estado global e contextos:

- Localizados em `@/components/providers/`

Exemplo:

\`\`\`tsx
// @/components/providers/dashboard-provider.tsx
"use client"

import type React from "react"
import type { Stat, TrafficSource } from "@/core/entities/stats"
import type { User } from "@/core/entities/user"
import { GetDashboardDataUseCase } from "@/core/use-cases/get-dashboard-data"
import { MockStatsRepository } from "@/infrastructure/repositories/mock-stats-repository"
import { MockUserRepository } from "@/infrastructure/repositories/mock-user-repository"
import { createContext, useContext, useEffect, useState } from "react"

interface DashboardContextType {
  stats: Stat[]
  trafficSources: TrafficSource[]
  salesRevenue: {
    totalSales: string
    totalProfit: string
  } | null
  currentUser: User | null
  isLoading: boolean
  error: Error | null
}

const DashboardContext = createContext<DashboardContextType>({
  stats: [],
  trafficSources: [],
  salesRevenue: null,
  currentUser: null,
  isLoading: true,
  error: null,
})

export const useDashboard = () => useContext(DashboardContext)

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  // Implementação do provider...
  
  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  )
}
\`\`\`

## Client vs Server Components

### Client Components

Componentes que usam hooks React, estado ou efeitos:

- Marcados com `"use client"` no topo do arquivo
- Exemplo: componentes interativos, formulários, etc.

\`\`\`tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export function Counter() {
  const [count, setCount] = useState(0)
  
  return (
    <div>
      <p>Count: {count}</p>
      <Button onClick={() => setCount(count + 1)}>Increment</Button>
    </div>
  )
}
\`\`\`

### Server Components

Componentes que não usam estado ou efeitos:

- Não precisam da diretiva `"use client"`
- Exemplo: componentes de exibição, layouts, etc.

\`\`\`tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface StaticCardProps {
  title: string
  content: string
}

export function StaticCard({ title, content }: StaticCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{content}</p>
      </CardContent>
    </Card>
  )
}
\`\`\`

## Props e TypeScript

### Tipagem de Props

Todas as props são tipadas com interfaces TypeScript:

\`\`\`tsx
interface UserCardProps {
  user: UserListItem
  onEdit?: (userId: string) => void
  onDelete?: (userId: string) => void
  showActions?: boolean
}

export function UserCard({
  user,
  onEdit,
  onDelete,
  showActions = true,
}: UserCardProps) {
  // ...
}
\`\`\`

### Props Opcionais

Props opcionais são marcadas com `?` e geralmente têm valores padrão:

\`\`\`tsx
interface ButtonProps {
  variant?: "primary" | "secondary" | "danger"
  size?: "sm" | "md" | "lg"
  disabled?: boolean
  onClick?: () => void
  children: React.ReactNode
}

export function Button({
  variant = "primary",
  size = "md",
  disabled = false,
  onClick,
  children,
}: ButtonProps) {
  // ...
}
\`\`\`

## Composição de Componentes

Preferimos composição sobre herança para criar componentes flexíveis:

\`\`\`tsx
// Componentes pequenos e focados
function CardHeader({ children }: { children: React.ReactNode }) {
  return <div className="p-4 border-b">{children}</div>
}

function CardTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="text-lg font-semibold">{children}</h3>
}

function CardContent({ children }: { children: React.ReactNode }) {
  return <div className="p-4">{children}</div>
}

function CardFooter({ children }: { children: React.ReactNode }) {
  return <div className="p-4 border-t">{children}</div>
}

// Componente composto
function Card({ children }: { children: React.ReactNode }) {
  return <div className="border rounded-lg shadow-sm">{children}</div>
}

// Uso
function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Card</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Card content goes here</p>
      </CardContent>
      <CardFooter>
        <Button>Action</Button>
      </CardFooter>
    </Card>
  )
}
\`\`\`

## Padrões de Renderização Condicional

### Operador Ternário

Para condicionais simples:

\`\`\`tsx
function Component({ isLoggedIn }) {
  return (
    <div>
      {isLoggedIn ? <UserProfile /> : <LoginButton />}
    </div>
  )
}
\`\`\`

### Operador Lógico &&

Para renderização condicional simples:

\`\`\`tsx
function Component({ hasError, errorMessage }) {
  return (
    <div>
      {hasError && <ErrorMessage message={errorMessage} />}
      <Content />
    </div>
  )
}
\`\`\`

### Early Return

Para condicionais mais complexas:

\`\`\`tsx
function Component({ isLoading, error, data }) {
  if (isLoading) {
    return <LoadingSpinner />
  }
  
  if (error) {
    return <ErrorMessage error={error} />
  }
  
  if (!data) {
    return <EmptyState />
  }
  
  return <DataDisplay data={data} />
}
\`\`\`

## Padrões de Estilização

### Tailwind CSS

Usamos Tailwind CSS para estilização:

\`\`\`tsx
function Button({ variant = "primary", size = "md", children }) {
  const baseClasses = "rounded-md font-medium focus:outline-none focus:ring-2"
  
  const variantClasses = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    danger: "bg-red-500 text-white hover:bg-red-600",
  }
  
  const sizeClasses = {
    sm: "py-1 px-2 text-sm",
    md: "py-2 px-4 text-base",
    lg: "py-3 px-6 text-lg",
  }
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`
  
  return <button className={classes}>{children}</button>
}
\`\`\`

### Utilitário `cn`

Usamos a função `cn` para combinar classes condicionalmente:

\`\`\`tsx
import { cn } from "@/lib/utils"

function Button({ variant, size, disabled, className, children }) {
  return (
    <button
      className={cn(
        "rounded-md font-medium",
        variant === "primary" && "bg-blue-500 text-white",
        variant === "secondary" && "bg-gray-200 text-gray-800",
        size === "sm" && "py-1 px-2 text-sm",
        size === "lg" && "py-3 px-6 text-lg",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
\`\`\`

## Padrões de Responsividade

### Design Mobile-First

Começamos com estilos para dispositivos móveis e adicionamos modificadores para telas maiores:

\`\`\`tsx
function Card() {
  return (
    <div className="p-4 sm:p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Conteúdo */}
    </div>
  )
}
\`\`\`

### Componentes Específicos para Mobile

Para interfaces significativamente diferentes em dispositivos móveis:

\`\`\`tsx
function Navigation() {
  const isMobile = useIsMobile() // Hook personalizado que verifica a largura da tela
  
  return (
    <>
      {isMobile ? <MobileNavigation /> : <DesktopNavigation />}
    </>
  )
}
\`\`\`

## Padrões de Acessibilidade

### Elementos Semânticos

Usamos elementos HTML semânticos:

\`\`\`tsx
function Article({ title, content, author, date }) {
  return (
    <article>
      <header>
        <h2>{title}</h2>
        <p>By {author} on <time dateTime={date.toISOString()}>{date.toLocaleDateString()}</time></p>
      </header>
      <div>{content}</div>
    </article>
  )
}
\`\`\`

### Atributos ARIA

Adicionamos atributos ARIA quando necessário:

\`\`\`tsx
function Tabs({ tabs, activeTab, onChange }) {
  return (
    <div role="tablist">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          role="tab"
          aria-selected={activeTab === tab.id}
          aria-controls={`panel-${tab.id}`}
          id={`tab-${tab.id}`}
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
      
      {tabs.map((tab) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`panel-${tab.id}`}
          aria-labelledby={`tab-${tab.id}`}
          hidden={activeTab !== tab.id}
        >
          {tab.content}
        </div>
      ))}
    </div>
  )
}
\`\`\`

### Navegação por Teclado

Garantimos que os componentes sejam acessíveis via teclado:

\`\`\`tsx
function Dropdown({ label, items }) {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <div>
      <button
        aria-haspopup="true"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            setIsOpen(false)
          }
        }}
      >
        {label}
      </button>
      
      {isOpen && (
        <ul role="menu">
          {items.map((item) => (
            <li key={item.id} role="menuitem">
              <button
                onClick={() => {
                  item.onClick()
                  setIsOpen(false)
                }}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
\`\`\`

## Conclusão

Seguir estes padrões de componentes ajudará a manter a consistência e qualidade do código em todo o projeto. Eles também facilitam a manutenção e extensão do código a longo prazo.
