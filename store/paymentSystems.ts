import { create } from 'zustand';
import { TPaymentSystem } from '@/types/api/payment';

interface UsePaymentSystemsType {
  data: TPaymentSystem[]
}

export const usePaymentSystems = create<UsePaymentSystemsType>(() => ({
  data: [],
}));
