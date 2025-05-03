import { Card, CardContent } from "@/components/ui/card"

export function BottomStats() {
  return (
    <Card>
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-center">
          <h3 className="text-xl sm:text-2xl font-bold">1,596</h3>
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
            6.8%
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
