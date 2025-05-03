"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/components/i18n/language-context"
import { formatNumber, formatCurrency, formatDate, formatDateTime, formatTime, formatTimeAgo } from "@/utils/format"

export function FormatExamples() {
  const { language, t } = useLanguage()

  // Exemplos de valores para formatação
  const number = 1234567.89
  const price = 1234.56
  const date = new Date()
  const pastDate = new Date(Date.now() - 1000 * 60 * 60 * 24 * 3) // 3 dias atrás

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.dashboard.formatExamples}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h3 className="font-medium">{t.dashboard.numberFormat}</h3>
            <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
              <p>
                <span className="font-medium">{t.dashboard.number}:</span> {formatNumber(number, language as any)}
              </p>
              <p>
                <span className="font-medium">{t.dashboard.currency}:</span> {formatCurrency(price, language as any)}
              </p>
              <p>
                <span className="font-medium">{t.dashboard.percentage}:</span>{" "}
                {formatNumber(0.3567, language as any, { style: "percent" })}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">{t.dashboard.dateFormat}</h3>
            <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
              <p>
                <span className="font-medium">{t.dashboard.shortDate}:</span>{" "}
                {formatDate(date, language as any, "short")}
              </p>
              <p>
                <span className="font-medium">{t.dashboard.longDate}:</span> {formatDate(date, language as any, "long")}
              </p>
              <p>
                <span className="font-medium">{t.dashboard.time}:</span> {formatTime(date, language as any)}
              </p>
              <p>
                <span className="font-medium">{t.dashboard.dateTime}:</span> {formatDateTime(date, language as any)}
              </p>
              <p>
                <span className="font-medium">{t.dashboard.timeAgo}:</span> {formatTimeAgo(pastDate, language as any)}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
