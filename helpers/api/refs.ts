import { API } from '@/params';
import { axiosInstanse } from '@/helpers/api/axios';
import {
  TReferCreatePaymentRequest,
 TReferCreateRequest, TReferInfoAPI, TReferPaymentInfoAPI, TReferPaymentSystemAPI, TReferUpdateOrDeleteRequest, TReferallPaymentRequest, TReferralPaymentAPI, TRefersAPI, TRefersRequest,
} from '@/types/api/refers';

export function getLinks<T extends TRefersRequest>(data: T) {
  return axiosInstanse.get<T, TRefersAPI>(API.REFERRALS, { params: data });
}

export function updateLink<T extends TReferUpdateOrDeleteRequest>(data: T) {
  return axiosInstanse.put<T, TRefersAPI>(API.UPDATE_REFERRAL(data.id), data);
}

export function getReferralInfo() {
  return axiosInstanse.get<TReferInfoAPI>(API.REFERRALS_INFO);
}

export function createLink<T extends TReferCreateRequest>(data: T) {
  return axiosInstanse.post<T, TRefersAPI>(API.REFERRALS, data);
}

export function getReferralPayments<T extends TReferallPaymentRequest>(data: T) {
  return axiosInstanse.get<T, TReferralPaymentAPI>(API.REFERRAL_PAYMENT, { params: data });
}

export function getReferPayments<T extends TReferallPaymentRequest>(data: T) {
  return axiosInstanse.get<T, TReferralPaymentAPI>(API.REFERRAL_WITHDRAWALS, { params: data });
}

export function createReferPayment<T extends TReferCreatePaymentRequest>(data: T) {
  return axiosInstanse.post<T, TRefersRequest>(API.REFERRAL_WITHDRAWALS, data);
}

export function getReferPaymentSystems() {
  return axiosInstanse.get<TReferPaymentSystemAPI>(API.REFERRAL_PAYMENT_SYSTEMS);
}

export function getReferPaymentInfo() {
  return axiosInstanse.get<TReferPaymentInfoAPI>(API.REFERRAL_PAYMENT_INFO);
}
