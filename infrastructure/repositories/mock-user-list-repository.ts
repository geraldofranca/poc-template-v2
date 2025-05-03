import type { UserListItem, UserListResponse } from "@/core/entities/user-list"

export class MockUserListRepository {
  async getUserList(page = 1, limit = 10, search = ""): Promise<UserListResponse> {
    const allUsers: UserListItem[] = [
      {
        id: "1",
        name: "Paula Keenan",
        avatar: "/placeholder.svg?key=ep7zs",
        role: "admin",
        address: "748 Luettgen Plain Suite South Winstonfort, NM",
        online: true,
      },
      {
        id: "2",
        name: "Marie Prohaska",
        avatar: "/placeholder.svg?key=mp23s",
        role: "subscriber",
        address: "125 Ortiz Camp Suite 471 Rippinport, US",
        online: true,
      },
      {
        id: "3",
        name: "Jaqueline Hammes",
        avatar: "/placeholder.svg?key=jh45t",
        role: "editor",
        address: "8716 Dell Manors New Ahmedmouth, WI",
        online: true,
      },
      {
        id: "4",
        name: "Angus Bergstrom",
        initials: "AB",
        role: "developer",
        address: "617 Powlowski Crossroad Apt. 716 New Victoria",
        online: true,
      },
      {
        id: "5",
        name: "Aurore Maggio",
        avatar: "/placeholder.svg?key=am67u",
        role: "subscriber",
        address: "8751 Boyer Courts Suite 532 West Fletcherside",
        online: true,
      },
      {
        id: "6",
        name: "Andrea Pesina",
        initials: "AP",
        role: "editor",
        address: "32 Maidstone Road WELLSBOROUGH",
        online: true,
      },
      {
        id: "7",
        name: "Daniel Miller",
        avatar: "/placeholder.svg?key=dm89i",
        role: "subscriber",
        address: "431 Elk Rd Little Ticonderoga, NY",
        online: true,
      },
      {
        id: "8",
        name: "Ashley Wilson",
        avatar: "/placeholder.svg?key=aw12p",
        role: "subscriber",
        address: "0816 Bradford Alley Lake Adamfort, ME",
        online: true,
      },
    ]

    // Filtrar por termo de busca se fornecido
    const filteredUsers = search
      ? allUsers.filter(
          (user) =>
            user.name.toLowerCase().includes(search.toLowerCase()) ||
            user.address.toLowerCase().includes(search.toLowerCase()) ||
            user.role.toLowerCase().includes(search.toLowerCase()),
        )
      : allUsers

    // Paginar resultados
    const paginatedUsers = filteredUsers.slice((page - 1) * limit, page * limit)

    return {
      users: paginatedUsers,
      total: filteredUsers.length,
      page,
      limit,
    }
  }
}
