import { TUser } from './user';

export type TReferPaymentCurrency = {
  id: number
  name: string
}

export type TReferPaymentSystem = {
  id: number
  name: string
  icon: string
  freewallet_notification: string
  requisite_notification: string
}

export type TReferPaymentSystemAPI = TReferPaymentSystem[];

export type TReferPayment = {
  id: number
  account: string
  amount: number
  description: string
  status: string
  payment_system: TReferPaymentSystem
  currency: TReferPaymentCurrency
  created_at: string
}

export type TReferPaymentAPI = {
  data: TReferPayment[],
  meta: {
    current_page: number
    from: number
    last_page: number
  }
}

export type TRefer = {
  id: number
  link: string
  visits: number
  balanced: number
  conversion: number
  earn: number
  deleted: boolean
}

export type TReferralPayment = {
  id: number
  percent: number
  amount: number
  total_amount: number
  user: TUser
  referral: TUser
  created_at: string
}

export type TReferralPaymentAPI = {
  data: TReferralPayment[],
  meta: {
    current_page: number
    from: number
    last_page: number
  }
}
export type TReferallPaymentRequest = {
  page?: number
}
export type TRefersAPI = TRefer[]

export type TReferPaymentInfoAPI = {
  referralBalance: number
  total: number
  totalBalance: number
}

export type TReferCreateRequest = {
  link: string
}

export type TReferCreatePaymentRequest = {
  payment_system_id: number
  amount: number,
  account: string
}

export interface TReferInfoAPI {
  referralBalance: number
  cashFlow: number
  paymentPercent: number
  total: number
  level: number
}

export interface TRefersRequest {
  sort?: string
  deleted?: boolean | number
  period?: string
  startDate?: string
  endDate?: string
}

export type TReferUpdateOrDeleteRequest = {
  id: number
  status?: boolean
}
