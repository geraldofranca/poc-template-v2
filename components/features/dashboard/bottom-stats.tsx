"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/components/i18n/language-context"
import { formatNumber } from "@/utils/format"

export function BottomStats() {
  const { language } = useLanguage()

  // Valor a ser formatado de acordo com o idioma
  const value = 1596
  const formattedValue = formatNumber(value, language as any)

  // Porcentagem de queda
  const percentage = 6.8
  const formattedPercentage = formatNumber(percentage, language as any, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  })

  return (
    <Card>
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-center">
          <h3 className="text-xl sm:text-2xl font-bold">{formattedValue}</h3>
          <span className="ml-2 text-red-500 dark:text-red-400 flex items-center text-xs sm:text-sm">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M18 15L12 9L6 15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {formattedPercentage}%
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
