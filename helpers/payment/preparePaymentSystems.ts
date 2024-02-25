import type { TPaymentSystem } from '@/types/api/payment';

export function preparePaymentSystems(paymentSystems: TPaymentSystem[]) {
  return paymentSystems.map((value) => ({ ...value, label: value.title }));
}
