export type TActivity = {
  has_comment: boolean
  icon: string
  id: number
  name: string
  slug: string
  category_id: number
  h1: string
  priority: number
  activity_description: string | null
  link_demo: string | null
  description: string
  seo: {
    title: string
    description: string
  }
  status: boolean
}

export type TActivitiesAPI = TActivity[]
