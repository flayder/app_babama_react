'use client';

import { useState } from 'react';
import { ModalWriteUs } from '@/components/modals/modal_write_us/ModalWriteUs';
import styles from './AccountTransactionsEmpty.module.scss';

export function AccountTransactionsEmpty() {
  const [opened, setOpened] = useState(false);

  const modalHandler = () => setOpened((prev) => !prev);

  return (
    <div className={styles.header}>
      <p className={`${styles.header__text} typography-menu _regular _middle`}>
        Вы ещё не сделали заказ. Если это не так, то напиши нам
        в <button type="button" onClick={modalHandler} className="typography-menu _link">тех поддержку</button>
      </p>
      <ModalWriteUs isOpened={opened} onClose={modalHandler} />
    </div>
  );
}
