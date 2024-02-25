export type TPromocode = {
  type: 'percent' | 'count'
  count: string
  code: string
  message: string
}

export type TPromocodeAPI = TPromocode

export type TPromocodeRequest = {
  code: string
  email: string
}
