export type NotificationType = "info" | "success" | "warning" | "error"
export type NotificationCategory = "all" | "mentions" | "followers" | "invites"

export interface BaseNotification {
  id: string
  type: NotificationType
  createdAt: Date
  read: boolean
  title?: string
  message?: string
}

export interface FollowerNotification extends BaseNotification {
  category: "followers"
  username: string
  avatar: string
}

export interface CommentNotification extends BaseNotification {
  category: "mentions"
  username: string
  avatar: string
  postId: string
  comment: string
}

export interface PurchaseNotification extends BaseNotification {
  category: "invites"
  productName: string
  price: number
}

export type Notification = FollowerNotification | CommentNotification | PurchaseNotification
