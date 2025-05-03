# Temas e Estilos

Este documento descreve a implementação de temas e estilos no projeto Ecommerce Dashboard.

## Visão Geral

O projeto utiliza Tailwind CSS para estilização, com suporte a temas claro e escuro. A implementação de temas é baseada em:

1. Variáveis CSS para definir cores e outros valores
2. Classes condicionais do Tailwind para aplicar estilos específicos de tema
3. Componentes shadcn/ui para UI consistente
4. Utilitário `cn` para combinar classes condicionalmente

## Tailwind CSS

### Configuração

A configuração do Tailwind está em `tailwind.config.ts`:

\`\`\`typescript
import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        inter: ["var(--font-inter)"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
  safelist: [
    // Light mode colors
    "bg-blue-100",
    "bg-purple-100",
    "bg-green-100",
    "bg-red-100",
    "bg-emerald-100",
    "bg-cyan-100",
    "text-blue-500",
    "text-purple-500",
    "text-green-500",
    "text-red-500",
    "text-emerald-500",
    "text-cyan-500",
    // Dark mode colors
    "dark:bg-blue-900/20",
    "dark:bg-purple-900/20",
    "dark:bg-green-900/20",
    "dark:bg-red-900/20",
    "dark:bg-emerald-900/20",
    "dark:bg-cyan-900/20",
    "dark:text-blue-400",
    "dark:text-purple-400",
    "dark:text-green-400",
    "dark:text-red-400",
    "dark:text-emerald-400",
    "dark:text-cyan-400",
  ],
} satisfies Config

export default config
\`\`\`

### Variáveis CSS

As variáveis CSS para temas estão definidas em `globals.css`:

\`\`\`css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;

    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;

    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;

    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;

    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;

    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;

    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;

    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;

    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;

    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;

    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;

    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;

    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;

    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;

    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;

    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;

    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;

    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}

/* Add smooth transitions for theme switching */
.transition-theme {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Custom scrollbar for dark mode */
.dark ::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.dark ::-webkit-scrollbar-track {
  background: hsl(217.2 32.6% 17.5%);
}

.dark ::-webkit-scrollbar-thumb {
  background: hsl(215 20.2% 65.1% / 0.3);
  border-radius: 4px;
}

.dark ::-webkit-scrollbar-thumb:hover {
  background: hsl(215 20.2% 65.1% / 0.5);
}

/* Adicione estas classes para ajustar os tamanhos de fonte */
@layer utilities {
  .text-size-adjust {
    font-size: 0.9375rem; /* 15px */
  }

  .heading-size-adjust {
    font-size: 1.125rem; /* 18px */
  }

  .subheading-size-adjust {
    font-size: 1rem; /* 16px */
  }

  .small-text-adjust {
    font-size: 0.8125rem; /* 13px */
  }

  .micro-text-adjust {
    font-size: 0.75rem; /* 12px */
  }
}

/* Ajuste global para fontes */
body {
  font-size: 0.9375rem;
  line-height: 1.5;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  line-height: 1.3;
}
\`\`\`

## Tema Claro/Escuro

### Provider de Tema

O tema é gerenciado pelo `ThemeProvider` de `next-themes`:

\`\`\`typescript
// @/components/theme-provider.tsx
"use client"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
\`\`\`

### Alternância de Tema

O componente `ThemeToggle` permite alternar entre temas claro e escuro:

\`\`\`typescript
// @/components/theme-toggle.tsx
"use client"

import { Moon, Sun } from 'lucide-react'
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch by only rendering after component is mounted
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="w-8 h-8">
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="w-8 h-8"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
\`\`\`

### Uso no Layout Principal

O `ThemeProvider` é usado no layout principal da aplicação:

\`\`\`typescript
// @/app/layout.tsx
import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { Inter } from 'next/font/google'
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata = {
  title: "Ecommerce Dashboard",
  description: "A modern ecommerce dashboard",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className="font-inter">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
\`\`\`

## Utilitário `cn`

O utilitário `cn` é usado para combinar classes condicionalmente:

\`\`\`typescript
// @/lib/utils.ts
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
\`\`\`

### Exemplo de Uso

\`\`\`typescript
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

## Componentes shadcn/ui

O projeto utiliza componentes da biblioteca shadcn/ui, que são baseados em Radix UI e estilizados com Tailwind CSS.

### Exemplo: Button

\`\`\`typescript
// @/components/ui/button.tsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
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

## Estilos Específicos de Tema

Para aplicar estilos específicos de tema, usamos o prefixo `dark:` do Tailwind:

\`\`\`tsx
<div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
  Conteúdo com cores diferentes em temas claro e escuro
</div>
\`\`\`

### Exemplo: Card

\`\`\`tsx
<Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
  <CardHeader>
    <CardTitle className="text-gray-900 dark:text-gray-100">Título do Card</CardTitle>
    <CardDescription className="text-gray-500 dark:text-gray-400">Descrição do card</CardDescription>
  </CardHeader>
  <CardContent>
    <p className="text-gray-700 dark:text-gray-300">Conteúdo do card</p>
  </CardContent>
  <CardFooter className="border-t border-gray-200 dark:border-gray-700">
    <Button>Ação</Button>
  </CardFooter>
</Card>
\`\`\`

## Responsividade

O projeto segue uma abordagem mobile-first, com breakpoints padrão do Tailwind:

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

### Exemplo de Uso

\`\`\`tsx
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  {/* Itens do grid */}
</div>
\`\`\`

### Menu Mobile

Para telas pequenas, o projeto utiliza um menu mobile específico:

\`\`\`tsx
function Navigation() {
  const isMobile = useIsMobile() // Hook personalizado
  
  return (
    <>
      {isMobile ? <MobileMenu /> : <DesktopSidebar />}
    </>
  )
}
\`\`\`

## Convenções de Estilo

### 1. Cores

As cores são definidas como variáveis CSS e acessadas através de classes Tailwind:

\`\`\`css
:root {
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
}

.dark {
  --primary: 210 40% 98%;
  --primary-foreground: 222.2 47.4% 11.2%;
}
\`\`\`

\`\`\`tsx
<button className="bg-primary text-primary-foreground">Botão</button>
\`\`\`

### 2. Tipografia

A fonte principal é Inter, importada do Google Fonts:

\`\`\`tsx
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

// ...

<html className={inter.variable}>
  <body className="font-inter">
    {/* Conteúdo */}
  </body>
</html>
\`\`\`

### 3. Espaçamento

O espaçamento segue a escala do Tailwind:

\`\`\`tsx
<div className="p-4 m-2 space-y-4">
  {/* Conteúdo */}
</div>
\`\`\`

### 4. Bordas e Sombras

Bordas e sombras são consistentes em toda a aplicação:

\`\`\`tsx
<div className="border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
  {/* Conteúdo */}
</div>
\`\`\`

## Boas Práticas

### 1. Consistência

Mantenha a consistência visual em toda a aplicação:

- Use as mesmas cores para elementos semelhantes
- Mantenha o espaçamento consistente
- Use os mesmos componentes para funcionalidades semelhantes

### 2. Acessibilidade

Garanta que os estilos sejam acessíveis:

- Mantenha contraste adequado entre texto e fundo
- Use tamanhos de fonte legíveis
- Adicione estados de foco visíveis

\`\`\`tsx
<button className="focus:outline-none focus:ring-2 focus:ring-blue-500">
  Botão Acessível
</button>
\`\`\`

### 3. Performance

Otimize a performance dos estilos:

- Evite classes desnecessárias
- Use o utilitário `cn` para combinar classes condicionalmente
- Aproveite o tree-shaking do Tailwind

### 4. Organização

Organize os estilos de forma lógica:

- Layout (display, position, etc.)
- Espaçamento (margin, padding, etc.)
- Dimensões (width, height, etc.)
- Tipografia (font-size, font-weight, etc.)
- Aparência (color, background, etc.)
- Interatividade (hover, focus, etc.)

\`\`\`tsx
<div
  className={cn(
    // Layout
    "flex flex-col",
    // Espaçamento
    "p-4 gap-2",
    // Dimensões
    "w-full max-w-md",
    // Tipografia
    "text-sm font-medium",
    // Aparência
    "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg border border-gray-200 dark:border-gray-700",
    // Interatividade
    "hover:shadow-md transition-shadow duration-200"
  )}
>
  {/* Conteúdo */}
</div>
\`\`\`

## Conclusão

A abordagem de temas e estilos no projeto Ecommerce Dashboard combina a flexibilidade do Tailwind CSS com a estrutura dos componentes shadcn/ui. Isso permite criar uma interface consistente, acessível e responsiva, com suporte a temas claro e escuro.

Seguindo estas convenções e boas práticas, podemos manter um código limpo e uma experiência de usuário coesa em toda a aplicação.
