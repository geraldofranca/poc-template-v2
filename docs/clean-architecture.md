# Clean Architecture no Projeto

Este documento descreve como a Clean Architecture é implementada no projeto Ecommerce Dashboard.

## Visão Geral da Clean Architecture

A Clean Architecture é um padrão de design de software que separa o código em camadas concêntricas, cada uma com suas próprias responsabilidades. O objetivo é criar um sistema onde as regras de negócio são independentes de detalhes externos como frameworks, bancos de dados ou interfaces de usuário.

### Princípios Fundamentais

1. **Independência de Frameworks**: O sistema não depende da existência de bibliotecas específicas.
2. **Testabilidade**: As regras de negócio podem ser testadas sem elementos externos.
3. **Independência de UI**: A interface do usuário pode mudar sem afetar o resto do sistema.
4. **Independência de Banco de Dados**: As regras de negócio não estão vinculadas a um banco de dados específico.
5. **Independência de Agentes Externos**: As regras de negócio não conhecem o mundo exterior.

### Camadas da Clean Architecture

1. **Entidades**: Objetos de negócio com regras e dados.
2. **Casos de Uso**: Regras de aplicação específicas.
3. **Adaptadores de Interface**: Convertem dados entre casos de uso e frameworks.
4. **Frameworks e Drivers**: Detalhes externos como banco de dados, web, etc.

## Implementação no Projeto

### 1. Camada de Entidades (`core/entities/`)

As entidades representam os objetos de negócio fundamentais da aplicação:

\`\`\`typescript
// @/core/entities/user.ts
export interface User {
  id: string
  name: string
  avatar: string
}

// @/core/entities/stats.ts
export interface Stat {
  id: string
  value: string
  label: string
  icon: string
  color: string
}

export interface TrafficSource {
  id: string
  name: string
  percentage: number
  color: string
}
\`\`\`

### 2. Camada de Casos de Uso (`core/use-cases/`)

Os casos de uso implementam as regras de negócio específicas da aplicação:

\`\`\`typescript
// @/core/use-cases/get-dashboard-data.ts
import type { Stat, TrafficSource } from "@/core/entities/stats"
import type { User } from "@/core/entities/user"
import type { StatsRepository } from "@/core/interfaces/repositories/stats-repository"
import type { UserRepository } from "@/core/interfaces/repositories/user-repository"

export class GetDashboardDataUseCase {
  constructor(
    private statsRepository: StatsRepository,
    private userRepository: UserRepository,
  ) {}

  async execute(): Promise<{
    stats: Stat[]
    trafficSources: TrafficSource[]
    salesRevenue: {
      totalSales: string
      totalProfit: string
    }
    currentUser: User
  }> {
    const [stats, trafficSources, salesRevenue, currentUser] = await Promise.all([
      this.statsRepository.getStats(),
      this.statsRepository.getTrafficSources(),
      this.statsRepository.getSalesRevenue(),
      this.userRepository.getCurrentUser(),
    ])

    return {
      stats,
      trafficSources,
      salesRevenue,
      currentUser,
    }
  }
}
\`\`\`

### 3. Camada de Interfaces (`core/interfaces/`)

As interfaces definem contratos entre as camadas:

\`\`\`typescript
// @/core/interfaces/repositories/stats-repository.ts
import type { Stat, TrafficSource } from "@/core/entities/stats"

export interface StatsRepository {
  getStats(): Promise<Stat[]>
  getTrafficSources(): Promise<TrafficSource[]>
  getSalesRevenue(): Promise<{
    totalSales: string
    totalProfit: string
  }>
}

// @/core/interfaces/repositories/user-repository.ts
import type { User } from "@/core/entities/user"

export interface UserRepository {
  getCurrentUser(): Promise<User>
}
\`\`\`

### 4. Camada de Infraestrutura (`infrastructure/`)

A camada de infraestrutura implementa as interfaces definidas na camada de interfaces:

\`\`\`typescript
// @/infrastructure/repositories/mock-stats-repository.ts
import type { Stat, TrafficSource } from "@/core/entities/stats"
import type { StatsRepository } from "@/core/interfaces/repositories/stats-repository"

export class MockStatsRepository implements StatsRepository {
  async getStats(): Promise<Stat[]> {
    return [
      {
        id: "revenue",
        value: "$236.18k",
        label: "Total Revenue",
        icon: "dollar-sign",
        color: "blue",
      },
      // Mais estatísticas...
    ]
  }

  async getTrafficSources(): Promise<TrafficSource[]> {
    return [
      {
        id: "search",
        name: "Search Engine",
        percentage: 22,
        color: "emerald",
      },
      // Mais fontes de tráfego...
    ]
  }

  async getSalesRevenue(): Promise<{ totalSales: string; totalProfit: string }> {
    return {
      totalSales: "$1,517.36k",
      totalProfit: "$746.84k",
    }
  }
}
\`\`\`

### 5. Camada de Apresentação (`components/`, `app/`)

A camada de apresentação é responsável pela interface do usuário:

\`\`\`typescript
// @/components/providers/dashboard-provider.tsx
"use client"

import type React from "react"
import type { Stat, TrafficSource } from "@/core/entities/stats"
import type { User } from "@/core/entities/user"
import { GetDashboardDataUseCase } from "@/core/use-cases/get-dashboard-data"
import { MockStatsRepository } from "@/infrastructure/repositories/mock-stats-repository"
import { MockUserRepository } from "@/infrastructure/repositories/mock-user-repository"
import { createContext, useContext, useEffect, useState } from "react"

// Implementação do provider...

// @/components/features/dashboard/stats-grid.tsx
import { useDashboard } from "@/components/providers/dashboard-provider"
import { StatCard } from "./stat-card"

export function StatsGrid() {
  const { stats } = useDashboard()

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
      {stats.map((stat) => (
        <StatCard key={stat.id} icon={stat.icon} iconColor={stat.color} value={stat.value} label={stat.label} />
      ))}
    </div>
  )
}
\`\`\`

## Fluxo de Dependência

O fluxo de dependência na Clean Architecture vai de fora para dentro:

\`\`\`
Frameworks/Drivers → Interfaces → Casos de Uso → Entidades
\`\`\`

No nosso projeto:

\`\`\`
components/app → infrastructure → core/interfaces → core/use-cases → core/entities
\`\`\`

Isso significa que:

- As entidades não dependem de nada
- Os casos de uso dependem apenas das entidades
- As interfaces dependem dos casos de uso e entidades
- A infraestrutura depende das interfaces
- A apresentação depende da infraestrutura e interfaces

## Benefícios da Clean Architecture no Projeto

### 1. Testabilidade

A separação de responsabilidades facilita a escrita de testes:

\`\`\`typescript
// Teste de caso de uso
describe('GetDashboardDataUseCase', () => {
  it('should return dashboard data', async () => {
    // Arrange
    const mockStatsRepository = {
      getStats: jest.fn().mockResolvedValue([/* mocked stats */]),
      getTrafficSources: jest.fn().mockResolvedValue([/* mocked sources */]),
      getSalesRevenue: jest.fn().mockResolvedValue({
        totalSales: "$100k",
        totalProfit: "$50k"
      })
    }
    const mockUserRepository = {
      getCurrentUser: jest.fn().mockResolvedValue({
        id: "1",
        name: "Test User",
        avatar: "/test.jpg"
      })
    }
    
    const useCase = new GetDashboardDataUseCase(
      mockStatsRepository as any,
      mockUserRepository as any
    )
    
    // Act
    const result = await useCase.execute()
    
    // Assert
    expect(result).toHaveProperty('stats')
    expect(result).toHaveProperty('trafficSources')
    expect(result).toHaveProperty('salesRevenue')
    expect(result).toHaveProperty('currentUser')
    expect(mockStatsRepository.getStats).toHaveBeenCalled()
    expect(mockStatsRepository.getTrafficSources).toHaveBeenCalled()
    expect(mockStatsRepository.getSalesRevenue).toHaveBeenCalled()
    expect(mockUserRepository.getCurrentUser).toHaveBeenCalled()
  })
})
\`\`\`

### 2. Manutenibilidade

A separação clara de responsabilidades facilita a manutenção do código:

- Alterações na UI não afetam a lógica de negócio
- Mudanças na fonte de dados não afetam os casos de uso
- Novas funcionalidades podem ser adicionadas sem modificar o código existente

### 3. Flexibilidade

A arquitetura permite trocar implementações facilmente:

\`\`\`typescript
// Trocar de mock para API real
const statsRepository = process.env.USE_MOCK 
  ? new MockStatsRepository() 
  : new ApiStatsRepository()

const userRepository = process.env.USE_MOCK 
  ? new MockUserRepository() 
  : new ApiUserRepository()

const getDashboardData = new GetDashboardDataUseCase(
  statsRepository,
  userRepository
)
\`\`\`

## Desafios e Soluções

### Desafio 1: Complexidade Inicial

A Clean Architecture pode parecer complexa inicialmente, com muitas camadas e arquivos.

**Solução**: Documentação clara e exemplos de código para novos desenvolvedores.

### Desafio 2: Overhead para Funcionalidades Simples

Para funcionalidades simples, a Clean Architecture pode parecer excessiva.

**Solução**: Permitir alguma flexibilidade para casos simples, mantendo a arquitetura para funcionalidades complexas.

### Desafio 3: Integração com React e Next.js

Integrar a Clean Architecture com React e Next.js pode ser desafiador.

**Solução**: Usar providers de contexto como ponte entre a camada de apresentação e os casos de uso.

## Conclusão

A Clean Architecture no projeto Ecommerce Dashboard nos permite criar um sistema modular, testável e manutenível. Embora adicione alguma complexidade inicial, os benefícios a longo prazo em termos de manutenibilidade e flexibilidade superam os custos.

Seguir os princípios da Clean Architecture nos ajuda a criar um código que é:

- Independente de frameworks
- Testável
- Independente de UI
- Independente de banco de dados
- Independente de agentes externos

Isso resulta em um sistema que é mais fácil de entender, testar, manter e estender ao longo do tempo.
