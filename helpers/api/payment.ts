import { API } from '@/params';
import { axiosInstanse } from '@/helpers/api/axios';
import type { TRefillBalanceAPI } from '@/types/api/payment';

interface TRefillBalance {
  amount: string
  platform: string
  order_id?: string | number
}

interface TRefillBalanceGuest extends Required<TRefillBalance> {
  email: string
}

export function refillBalance(data: TRefillBalance) {
  const { platform, amount, order_id } = data ?? {};

  return axiosInstanse.get<void, TRefillBalanceAPI>(API.GET_PAYMENT_LINK(platform, amount, order_id));
}

export function refillBalanceGuest(data: TRefillBalanceGuest) {
  const {
    platform, amount, order_id, email,
  } = data ?? {};

  return axiosInstanse.get<void, TRefillBalanceAPI>(API.GET_PAYMENT_LINK_GUEST(platform, amount, order_id, email));
}
