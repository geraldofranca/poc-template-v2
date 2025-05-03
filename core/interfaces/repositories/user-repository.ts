import type { User } from "@/core/entities/user"

export interface UserRepository {
  getCurrentUser(): Promise<User>
}
