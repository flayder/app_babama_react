import { axiosInstanse } from '@/helpers/api/axios';
import { API } from '@/params';
import type { TOrderRequest } from '@/types/api/order';
import Cookies from 'js-cookie';

export function repeatOrder(id: string | number) {
  return axiosInstanse.post(API.REPEAT_ORDER(id));
}

export function repayOrder(id: string | number) {
  return axiosInstanse.post<void, {message: string}>(API.REPAY_ORDER(id));
}

export function validateLink(categoryID: number | string, link: string) {
  return axiosInstanse.get<void, {code: number, message: string}>(API.VALIDATE_LINK(categoryID, link));
}

export function postOrder<T extends TOrderRequest>(data: T) {
  return axiosInstanse.post<T, {order_id: string, message: string}>(API.ORDER, data);
}

export async function postOrderUnauthenticated<T extends TOrderRequest>(data: T) {
  const response = await axiosInstanse.post<T, {order_id: string, message: string, token: string}>(API.ORDER_UNAUTH, data);

  if (response?.token) {
    Cookies.set('token', response.token);
    axiosInstanse.defaults.headers.Authorization = `Bearer ${response.token}`;
  }

  return response;
}
