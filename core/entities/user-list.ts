export interface UserListItem {
  id: string
  name: string
  avatar?: string
  role: "admin" | "subscriber" | "editor" | "developer"
  address: string
  initials?: string
  online?: boolean
}

export interface UserListResponse {
  users: UserListItem[]
  total: number
  page: number
  limit: number
}
