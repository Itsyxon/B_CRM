export type DashboardWidget = {
  id: number
  title: string
  description?: string
  amount: string | number
  bonus: string
}

export type ItemPagination = {
  meta: {
    total: number
    limit: number
    page?: number
    hasMore?: boolean
    nextPage?: number | null
  }
}

export type DashboardNew = {
  id: string
  title: string
  description: string
  likes: number
  comments: number
  reposts: number
  createdAt: string
}

export type DashboardNewsWithLimit = ItemPagination & {
  data: DashboardNew[]
}
export interface NewsResponse extends ItemPagination {
  data: DashboardNew[]
}
