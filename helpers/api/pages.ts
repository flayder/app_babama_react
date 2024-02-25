export type PageMeta = {
  id: number
  icon: string
  h1: string
  name: string
  description: string
  activity_description: string
  category_id?: number
  valid_link?: number
  domain_link?: string
  priority: number
  slug: string
  status: string
  has_comment?: string
  seo: {
    title: string
    description: string
  }
}
