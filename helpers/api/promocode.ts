import { axiosInstanse } from '@/helpers/api/axios';
import { API } from '@/params';
import type { TPromocodeAPI, TPromocodeRequest } from '@/types/api/promocode';

export function validatePromocode<T extends TPromocodeRequest>(data: T) {
  return axiosInstanse.post<T, TPromocodeAPI>(API.VALIDATE_PROMOCODE, data);
}
