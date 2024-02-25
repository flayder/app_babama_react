'use client';

import personal from '@/components/account/Account.module.scss';
import { getCurrencyFormatPrice } from '@/helpers/price/getCurrencyFormatPrice';
import { useUser } from '@/store/user';
import { useLayoutEffect, useState } from 'react';
import { ModalRefillThank } from '@/components/modals/modal_refill_thank/ModalRefillThank';
import { usePathname, useRouter } from 'next/navigation';
import styles from './AccountPay.module.scss';

export function AccountPayHeading() {
  const { data: user } = useUser();
  const [refillModal, setRefillModal] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (window.location.hash === '#payed') {
      setRefillModal(true);

      router.replace(pathname);
    }
  }, []); // eslint-disable-line

  return (
    <div className={personal.personal__content__heading}>
      <h2 className={`${personal.personal__content__title} typography-heading _medium`}>
        Пополнение баланса:
      </h2>
      <h3 className={`${styles.personal_wallet__balance} typography-heading _medium`}>
        Ваш баланс: {getCurrencyFormatPrice(user?.balance || 0)}
      </h3>
      <ModalRefillThank isOpened={refillModal} onClose={() => setRefillModal(false)} />
    </div>
  );
}
