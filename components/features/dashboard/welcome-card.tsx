import { Button } from "@/components/ui/button"
import { useDashboard } from "@/components/providers/dashboard-provider"
import Image from "next/image"

export function WelcomeCard() {
  const { currentUser } = useDashboard()

  return (
    <div className="bg-[#0f172a] dark:bg-gray-800 text-white rounded-lg p-4 sm:p-6 mb-6 relative overflow-hidden">
      <div className="max-w-2xl relative z-10">
        <h2 className="text-xl sm:text-2xl font-semibold mb-2">Welcome to Synergy, {currentUser?.name || "User"} 🚀</h2>
        <p className="text-gray-300 mb-4 text-sm sm:text-base">
          An ecommerce dashboard has just that purpose. It provides your ecommerce team with a clear overview of key
          financial and website KPIs at any time.
        </p>
        <Button className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-sm sm:text-base">
          Take a Product
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
