export type TTransactionAPI = {
  id: number,
  uuid: string
  user: TransactionUser,
  order: null | unknown,
  amount: number,
  type: string
  status: string
  detail: null,
  createdAt: string
}

type TransactionUser = {
  id: number,
  firstname: string
  lastname: string | null,
  username: string | null,
  language_id: number,
  referral_id: null,
  email: string
  phone_code: null,
  phone: string
  balance: string
  api_token: null,
  image: null,
  address: string
  status: boolean,
  email_verification: boolean,
  sms_verification: boolean,
  verify_code: null,
  sent_at: null,
  last_login: null,
  email_verified_at: null,
  deleted_at: null,
  created_at: string
  updated_at: string
  fullname: string
  mobile: string
  profileName: string
  photo: string
}
