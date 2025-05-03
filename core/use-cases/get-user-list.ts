import type { UserListResponse } from "@/core/entities/user-list"
import { MockUserListRepository } from "@/infrastructure/repositories/mock-user-list-repository"

export class GetUserListUseCase {
  private repository: MockUserListRepository

  constructor() {
    this.repository = new MockUserListRepository()
  }

  async execute(page = 1, limit = 10, search = ""): Promise<UserListResponse> {
    return this.repository.getUserList(page, limit, search)
  }
}
