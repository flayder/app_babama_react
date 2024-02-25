export type TPaymentSystem = {
  title: string
  icon: string
  value: string
  isActive: boolean
  isDisabled: boolean
}

export type TPaymentSystemsAPI = {
  data: TPaymentSystem[]
}

export type TFundHistoryItem = {
  id: number,
  created_at: string,
  amount: number,
  remarks: string
  status: string
  trx_id: string,
  trx_type: string

}
export type TFundHistoryAPI = {
  data: TFundHistoryItem[]
}

export type TRefillBalanceAPI = {
  data: string
}
