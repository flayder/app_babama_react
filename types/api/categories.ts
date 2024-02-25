export type TCategory = {
  domain_link : string
  icon : string
  id : number
  name : string
  slug: string
}

export type TCategoriesAPI = {
  data: TCategory[]
}
