import { AppProviders } from "@/components/providers/app-providers"
import { UsersPageContent } from "@/components/users/users-page-content"

export default function UsersPage() {
  return (
    <AppProviders>
      <UsersPageContent />
    </AppProviders>
  )
}
