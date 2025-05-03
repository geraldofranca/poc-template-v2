import { Button } from "@/components/ui/button"
import { useDashboard } from "@/presentation/providers/dashboard-provider"
import Image from "next/image"

export function WelcomeCard() {
  const { currentUser } = useDashboard()

  return (
    <div className="bg-[#0f172a] text-white rounded-lg p-6 mb-6 relative overflow-hidden">
      <div className="max-w-2xl relative z-10">
        <h2 className="text-2xl font-semibold mb-2">Welcome {currentUser?.name || "User"} 🚀</h2>
        <p className="text-gray-300 mb-4">
          An ecommerce dashboard has just that purpose. It provides your ecommerce team with a clear overview of key
          financial and website KPIs at any time.
        </p>
        <Button className="bg-blue-500 hover:bg-blue-600">Take a Product</Button>
      </div>
      <div className="absolute right-0 bottom-0 z-0">
        <Image src="/placeholder.svg?key=ic74p" alt="Ecommerce illustration" width={200} height={200} />
      </div>
    </div>
  )
}
