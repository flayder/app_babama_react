interface TStaticPagesListElem {
  id: number
  title: string
  slug: string
}

interface TStaticPage extends TStaticPagesListElem {
  content: string
}

export type TStaticPagesListAPI = {
  data: TStaticPagesListElem[]
}

export type TStaticPagesAPI = {
  data: TStaticPage
}

export interface TFaqElemItem {
  title: string
  text: string
  group_name: string
}

export interface TFaqElem {
  heading: string
  items: TFaqElemItem[]
}

export type TFaqAPI = TFaqElem[]
