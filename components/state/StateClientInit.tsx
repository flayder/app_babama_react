'use client';

import type { TUserAPI } from '@/types/api/user';
import type { TPaymentSystemsAPI } from '@/types/api/payment';
import { useRef } from 'react';
import { useUser } from '@/store/user';
import { usePaymentSystems } from '@/store/paymentSystems';

interface StateClientInitProps {
  user: TUserAPI
  paymentSystems: TPaymentSystemsAPI
}

export function StateClientInit({ user, paymentSystems }: StateClientInitProps) {
  const isInit = useRef(false);

  if (!isInit.current) {
    useUser.setState({ data: user?.data ?? null });
    usePaymentSystems.setState(paymentSystems);

    isInit.current = true;
  }

  return null;
}
