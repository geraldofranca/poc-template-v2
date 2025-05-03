# Convenções de Importação

Este documento detalha as convenções de importação utilizadas no projeto Ecommerce Dashboard.

## Importações Absolutas vs. Relativas

### Importações Absolutas

Usamos importações absolutas com o prefixo `@/` para a maioria dos arquivos no projeto:

\`\`\`typescript
// Correto
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/i18n/language-context"
import type { User } from "@/core/entities/user"
\`\`\`

Benefícios:
- Facilita a navegação entre arquivos
- Evita caminhos relativos complexos (`../../../`)
- Torna o código mais legível e manutenível

### Importações Relativas

Usamos importações relativas apenas para arquivos no mesmo diretório ou em subdiretórios diretos:

\`\`\`typescript
// Correto para arquivos no mesmo diretório
import { UserCard } from "./user-card"

// Correto para arquivos em subdiretórios diretos
import { UserAvatar } from "./avatar/user-avatar"
\`\`\`

### Importações Incorretas a Evitar

\`\`\`typescript
// Incorreto: Não use caminhos relativos complexos
import { Button } from "../../../components/ui/button"

// Incorreto: Não use caminhos absolutos sem o prefixo @/
import { Button } from "components/ui/button"

// Incorreto: Não use caminhos que começam com "presentation/"
import { Header } from "@/presentation/components/layout/header" // ❌
// Correto:
import { Header } from "@/components/layout/header" // ✅
\`\`\`

## Ordem de Importações

Seguimos esta ordem para organizar as importações:

1. Importações de bibliotecas externas
2. Importações absolutas do projeto
3. Importações relativas
4. Importações de tipos (com `type` ou `interface`)

Exemplo:

\`\`\`typescript
// 1. Bibliotecas externas
import { useState, useEffect } from "react"
import { Search, Plus } from 'lucide-react'
import Image from "next/image"

// 2. Importações absolutas do projeto
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useLanguage } from "@/components/i18n/language-context"

// 3. Importações relativas
import { UserCard } from "./user-card"

// 4. Importações de tipos
import type { UserListItem } from "@/core/entities/user-list"
\`\`\`

## Importação de Tipos

Para importações que são usadas apenas para tipos, use a palavra-chave `type` para evitar que o código seja incluído no bundle:

\`\`\`typescript
// Correto
import type { User } from "@/core/entities/user"
import { type ButtonProps } from "@/components/ui/button"

// Incorreto
import { User } from "@/core/entities/user" // Se User é apenas um tipo
\`\`\`

## Importação de Componentes UI

Para componentes da biblioteca shadcn/ui, sempre importe do diretório `@/components/ui`:

\`\`\`typescript
// Correto
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

// Incorreto
import { Button } from "@radix-ui/react-button"
import { Card } from "somewhere-else"
\`\`\`

## Importação de Ícones

Para ícones, use o componente `Icon` personalizado ou importe diretamente do `lucide-react`:

\`\`\`typescript
// Usando o componente Icon personalizado
import { Icon } from "@/components/ui/icon"

// Importando diretamente do lucide-react
import { Search, Plus, ChevronDown } from 'lucide-react'
\`\`\`

## Importação de Hooks

Para hooks personalizados, importe diretamente do arquivo do hook:

\`\`\`typescript
// Correto
import { useLanguage } from "@/components/i18n/language-context"
import { useDashboard } from "@/components/providers/dashboard-provider"

// Incorreto
import { useLanguage } from "@/hooks/useLanguage"
\`\`\`

## Importação de Utilitários

Para funções utilitárias, importe do diretório `@/utils` ou `@/lib`:

\`\`\`typescript
// Correto
import { cn } from "@/lib/utils"
import { formatCurrency } from "@/utils/format"
\`\`\`

## Importação de Entidades e Casos de Uso

Para entidades e casos de uso, importe dos diretórios `@/core/entities` e `@/core/use-cases`:

\`\`\`typescript
// Correto
import type { User } from "@/core/entities/user"
import { GetUserListUseCase } from "@/core/use-cases/get-user-list"
\`\`\`

## Importação de Repositórios

Para repositórios, importe do diretório `@/infrastructure/repositories`:

\`\`\`typescript
// Correto
import { MockUserRepository } from "@/infrastructure/repositories/mock-user-repository"
\`\`\`

## Importação de Componentes de Página

Para componentes específicos de página, importe do diretório `@/components/features`:

\`\`\`typescript
// Correto
import { WelcomeCard } from "@/components/features/dashboard/welcome-card"
import { UserCard } from "@/components/users/user-card"
\`\`\`

## Importação de Componentes de Layout

Para componentes de layout, importe do diretório `@/components/layout`:

\`\`\`typescript
// Correto
import { Header } from "@/components/layout/header/header"
import { Sidebar } from "@/components/layout/sidebar/sidebar"
import { Breadcrumb } from "@/components/layout/breadcrumb"
\`\`\`

## Importação de Providers

Para providers de contexto, importe do diretório `@/components/providers`:

\`\`\`typescript
// Correto
import { AppProviders } from "@/components/providers/app-providers"
import { DashboardProvider } from "@/components/providers/dashboard-provider"
\`\`\`

## Conclusão

Seguir estas convenções de importação ajudará a manter a consistência e legibilidade do código em todo o projeto. Elas também facilitam a navegação e manutenção do código a longo prazo.
