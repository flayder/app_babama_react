type TOrderHistoryLinks = {
  first: string
  last: string
  next: null
  prev: null
}

export type TOrderHistoryItem = {
  activity: number
  category: number
  createdAt: string
  id: number
  isPaid: boolean
  link: string
  platform: string
  price: number
  progress: number
  progressMax: number
  service: number
  status: string
  text: string
}

type TTOrderHistoryMetaLink = {
  active: boolean
  label: string
  url: string
}

type TOrderHistoryMeta = {
  current_page: number
  from: number
  last_page: number
  links: TTOrderHistoryMetaLink[]
  path: string
  per_page: number
  to: number
  total: number
}

export type TOrdersHistoryAPI = {
  data: TOrderHistoryItem[]
  links: TOrderHistoryLinks
  meta: TOrderHistoryMeta
}

export type TOrderRequest = {
  category: number
  service: number
  activity: number
  link: string
  quantity: number
  email: string
  promocode_code?: string
  country?: string
  gender?: string
}
