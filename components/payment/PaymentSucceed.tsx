'use client';

import { AppLink } from '@/components/ui/AppLink';
import { useEffect } from 'react';
import { ROUTES } from '@/params';
import { useRouter } from 'next/navigation';
import styles from './PaymentSucceed.module.scss';

interface PaymentSucceedProps {
  isOrder: boolean;
  isNewUser: boolean
}

export function PaymentSucceed({ isOrder, isNewUser }: PaymentSucceedProps) {
  const router = useRouter();

  useEffect(() => {
    const link = isOrder ? ROUTES.HISTORY : ROUTES.ACCOUNT_PAY;
    const hash = isOrder && isNewUser ? '#payed_new' : '#payed';

    router.push(`${link}${hash}`);
  }, [router, isNewUser, isOrder]);

  return (
    <div className="page-home">
      <div className="container">
        <h1 className={styles.payment_succeed}>Поздравляем успешный платеж!</h1>
        <div className={styles.payment_succeed__buttons}>
          <AppLink href="#" className={styles.payment_succeed__button}>
            Вернутся обратно
          </AppLink>
        </div>
      </div>
    </div>
  );
}
