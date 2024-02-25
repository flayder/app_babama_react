export type TUser = {
  id: number
  address: string | null
  balance: string | null
  created_at: string
  email: string
  email_verified: boolean
  firstname: string
  image: string | null
  lastname: string | null
  referral_balance: number
  phone: string | null
  username: string | null
}

export type TLoginSignupAPI = {
  token: string
  user: TUser
}

export type TForgotPasswordAPI = {
  user: TUser
}

export type TLoginParams = {
  email: string
  password: string
}

export type TUserChange = {
  email?: string
  firstname?: string
  new_password?: string
  old_password?: string
}

export interface TSignupParams extends TLoginParams {
  password_confirmation: string
}

export type TUserAPI = {
  data: TUser | null
}

export type TCheckUserDataAPI = {
  new_user: boolean
}
