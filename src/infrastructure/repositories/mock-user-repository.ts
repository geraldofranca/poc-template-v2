import type { User } from "@/core/entities/user"
import type { UserRepository } from "@/core/interfaces/repositories/user-repository"

export class MockUserRepository implements UserRepository {
  async getCurrentUser(): Promise<User> {
    return {
      id: "1",
      name: "Paula Keenan",
      avatar: "/placeholder.svg?key=ep7zs",
    }
  }
}
