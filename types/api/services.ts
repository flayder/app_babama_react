type TServiceParameterGender = {
  value: 'female' | 'male'
  title: 'Женский' | 'Мужской'
  price_diff: string
}

type TServiceParameter = {
  title: string
  id: string
  value: string
  genders: TServiceParameterGender[]
}

export type TService = {
  id: number
  title: string
  link: string | null
  min_amount: number
  max_amount: number
  api_service_id: number
  price: string
  description: string
  link_demo: string | null
  short_description: string | null
  parameters: TServiceParameter[]

}

export type TServicesAPI = TService[]
