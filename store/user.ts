import { create } from 'zustand';
import type { TUser } from '@/types/api/user';

interface UseUserType {
  data: TUser | null
  balanceDecr: (price: number) => void
}

export const useUser = create<UseUserType>((set) => ({
  data: null,
  balanceDecr: (price) => set((state) => {
    if (!state.data) return { data: state.data };

    const currentStateBalance = state.data.balance ? +state.data.balance : 0;

    return {
      data: {
        ...state.data,
        balance: String(currentStateBalance - price),
      },
    };
  }),
}));
