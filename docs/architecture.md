# Arquitetura do Projeto Ecommerce Dashboard

Este documento descreve a arquitetura, estrutura de diretórios e convenções utilizadas no projeto Ecommerce Dashboard.

## Índice

1. [Visão Geral](#visão-geral)
2. [Estrutura de Diretórios](#estrutura-de-diretórios)
3. [Arquitetura Clean](#arquitetura-clean)
4. [Convenções de Nomenclatura](#convenções-de-nomenclatura)
5. [Padrões de Importação](#padrões-de-importação)
6. [Componentes](#componentes)
7. [Gerenciamento de Estado](#gerenciamento-de-estado)
8. [Internacionalização (i18n)](#internacionalização-i18n)
9. [Temas e Estilos](#temas-e-estilos)
10. [Boas Práticas](#boas-práticas)

## Visão Geral

O Ecommerce Dashboard é uma aplicação Next.js que utiliza princípios de Clean Architecture para separar as responsabilidades e facilitar a manutenção. A aplicação é construída com React, TypeScript, Tailwind CSS e segue o padrão de design do shadcn/ui.

## Estrutura de Diretórios

\`\`\`
ecommerce-dashboard/
├── app/                    # Diretório de rotas do Next.js App Router
│   ├── layout.tsx          # Layout principal da aplicação
│   ├── page.tsx            # Página inicial (dashboard)
│   ├── users/              # Rota para a página de usuários
│   │   └── page.tsx        # Página de usuários
│   └── globals.css         # Estilos globais
├── components/             # Componentes React reutilizáveis
│   ├── features/           # Componentes específicos de features
│   │   ├── dashboard/      # Componentes do dashboard
│   │   └── users/          # Componentes da página de usuários
│   ├── i18n/               # Componentes de internacionalização
│   ├── layout/             # Componentes de layout
│   │   ├── header/         # Componentes do cabeçalho
│   │   ├── sidebar/        # Componentes da barra lateral
│   │   └── mobile-menu/    # Componentes do menu mobile
│   ├── notifications/      # Componentes de notificações
│   ├── providers/          # Providers de contexto React
│   ├── theme-provider.tsx  # Provider de tema
│   ├── theme-toggle.tsx    # Componente para alternar tema
│   └── ui/                 # Componentes de UI básicos (shadcn/ui)
├── core/                   # Camada de domínio (Clean Architecture)
│   ├── entities/           # Entidades de domínio
│   ├── interfaces/         # Interfaces e contratos
│   │   └── repositories/   # Interfaces de repositórios
│   └── use-cases/          # Casos de uso da aplicação
├── infrastructure/         # Camada de infraestrutura
│   └── repositories/       # Implementações de repositórios
├── lib/                    # Bibliotecas e utilitários
│   └── utils.ts            # Funções utilitárias
├── public/                 # Arquivos estáticos
│   ├── flags/              # Imagens de bandeiras para i18n
│   └── ...                 # Outros arquivos estáticos
├── utils/                  # Utilitários da aplicação
│   └── format.ts           # Funções de formatação
├── tailwind.config.ts      # Configuração do Tailwind CSS
└── package.json            # Dependências do projeto
\`\`\`

## Arquitetura Clean

O projeto segue os princípios da Clean Architecture, separando o código em camadas:

### Camadas

1. **Entidades (core/entities)**: Objetos de negócio com regras e dados.
2. **Casos de Uso (core/use-cases)**: Regras de aplicação específicas.
3. **Interfaces (core/interfaces)**: Contratos entre camadas.
4. **Infraestrutura (infrastructure)**: Implementações concretas de interfaces.
5. **Frameworks e Drivers (app, components)**: Código específico de frameworks.

### Fluxo de Dependência

As dependências fluem de fora para dentro:

\`\`\`
Frameworks/Drivers → Interfaces → Casos de Uso → Entidades
\`\`\`

Isso garante que as camadas internas não dependam das externas, facilitando testes e manutenção.

## Convenções de Nomenclatura

### Arquivos e Diretórios

- **Componentes React**: Utilizam kebab-case para nomes de arquivos (ex: `sidebar-item.tsx`)
- **Diretórios**: Utilizam kebab-case (ex: `mobile-menu/`)
- **Entidades e Interfaces**: Utilizam kebab-case (ex: `user-repository.ts`)
- **Hooks personalizados**: Prefixo `use` seguido de camelCase (ex: `useLanguage.ts`)

### Componentes e Funções

- **Componentes React**: PascalCase (ex: `SidebarItem`)
- **Funções utilitárias**: camelCase (ex: `formatCurrency`)
- **Interfaces TypeScript**: PascalCase com prefixo `I` opcional (ex: `UserListItem`)
- **Types TypeScript**: PascalCase (ex: `Language`)

## Padrões de Importação

### Importações Absolutas

O projeto utiliza importações absolutas com o prefixo `@/` para facilitar a navegação entre arquivos:

\`\`\`typescript
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/i18n/language-context"
import type { User } from "@/core/entities/user"
\`\`\`

### Ordem de Importações

Seguimos esta ordem para importações:

1. Importações de bibliotecas externas
2. Importações absolutas do projeto
3. Importações relativas
4. Importações de tipos (com `type` ou `interface`)

Exemplo:

\`\`\`typescript
import { useState, useEffect } from "react"
import { Search, Plus } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useLanguage } from "@/components/i18n/language-context"

import { UserCard } from "./user-card"

import type { UserListItem } from "@/core/entities/user-list"
\`\`\`

## Componentes

### Tipos de Componentes

1. **Componentes de UI**: Componentes básicos reutilizáveis (botões, inputs, cards)
2. **Componentes de Layout**: Estruturam a aplicação (sidebar, header)
3. **Componentes de Feature**: Específicos para funcionalidades (dashboard, users)
4. **Providers**: Gerenciam estado global e contextos

### Client vs Server Components

- Componentes que usam hooks React são marcados com `"use client"` no topo do arquivo
- Componentes que não usam estado ou efeitos podem ser Server Components (sem a diretiva)

### Props e TypeScript

- Todas as props são tipadas com interfaces TypeScript
- Props opcionais são marcadas com `?`
- Valores padrão são definidos na desestruturação de props

Exemplo:

\`\`\`typescript
interface SidebarItemProps {
  icon: string
  label: string
  hasSubmenu?: boolean
  active?: boolean
  href?: string
}

export function SidebarItem({
  icon,
  label,
  hasSubmenu = false,
  active = false,
  href = "#",
}: SidebarItemProps) {
  // ...
}
\`\`\`

## Gerenciamento de Estado

### Contextos React

O projeto utiliza React Context API para gerenciar estado global:

- **LanguageProvider**: Gerencia o idioma da aplicação
- **NotificationProvider**: Gerencia notificações
- **DashboardProvider**: Gerencia dados do dashboard
- **ThemeProvider**: Gerencia o tema (claro/escuro)

### Padrão de Uso

1. Definir o contexto e seu provider
2. Criar um hook personalizado para acessar o contexto
3. Envolver componentes que precisam do contexto com o provider

Exemplo:

\`\`\`typescript
// 1. Definir contexto e provider
const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Lógica do provider
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

// 2. Criar hook personalizado
export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

// 3. Uso em componentes
function MyComponent() {
  const { language, t } = useLanguage()
  // ...
}
\`\`\`

## Internacionalização (i18n)

### Abordagem

O projeto implementa i18n usando um contexto React personalizado:

- Suporte para múltiplos idiomas (en, es, pt)
- Detecção automática do idioma do navegador
- Persistência da preferência de idioma no localStorage
- Componente de seleção de idioma

### Uso

\`\`\`typescript
function MyComponent() {
  const { t, language, setLanguage } = useLanguage()
  
  return <h1>{t.dashboard.welcome}</h1>
}
\`\`\`

### Estrutura de Traduções

As traduções são organizadas por idioma e por seção:

\`\`\`typescript
const translations = {
  en: {
    common: { ... },
    dashboard: { ... },
    users: { ... },
  },
  es: { ... },
  pt: { ... },
}
\`\`\`

## Temas e Estilos

### Tailwind CSS

O projeto utiliza Tailwind CSS para estilização:

- Configuração personalizada em `tailwind.config.ts`
- Variáveis CSS para temas em `globals.css`
- Utilitários de classe com `cn()` para combinar classes condicionalmente

### Tema Claro/Escuro

- Implementado com `next-themes`
- Alternância entre temas com `ThemeToggle`
- Classes condicionais com `dark:` para estilos específicos do tema escuro

### Responsividade

- Design mobile-first
- Breakpoints padrão do Tailwind (sm, md, lg, xl, 2xl)
- Menu mobile específico para telas pequenas

## Boas Práticas

### Componentes

- Componentes pequenos e focados em uma única responsabilidade
- Props tipadas com TypeScript
- Valores padrão para props opcionais
- Uso de composição sobre herança

### Performance

- Uso de `memo` para componentes que renderizam frequentemente
- Uso de `useCallback` para funções passadas como props
- Uso de `useMemo` para cálculos pesados
- Lazy loading de componentes quando apropriado

### Acessibilidade

- Uso de elementos semânticos HTML
- Atributos ARIA quando necessário
- Suporte a navegação por teclado
- Contraste adequado de cores

### Segurança

- Validação de dados de entrada
- Sanitização de conteúdo dinâmico
- Proteção contra XSS

### Testes

- Testes unitários para funções e componentes
- Testes de integração para fluxos completos
- Testes de acessibilidade

## Conclusão

Esta documentação fornece uma visão geral da arquitetura e convenções do projeto Ecommerce Dashboard. Seguir estas diretrizes ajudará a manter a consistência e qualidade do código ao longo do desenvolvimento.
