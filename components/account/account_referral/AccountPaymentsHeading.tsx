'use client';

import personal from '@/components/account/Account.module.scss';
import buttonStyle from '@/components/ui/AppButton.module.scss';
import { AppScroollbar } from '@/components/ui/AppScrollbar';
import { useEffect, useRef, useState } from 'react';
import { getReferralPayments } from '@/helpers/api/refs';
import { TReferralPayment } from '@/types/api/refers';
import moment from 'moment';
import { AccountTabs } from './tabs/AccountTabs';
import { AccountBanner } from './banner/AccountBanner';
import styles from './AccountReferral.module.scss';

export function AccountPaymentsHeading() {
  const init = useRef(false);
  const [items, setItems] = useState<TReferralPayment[]>([]);
  const [reload, setReload] = useState(false);
  const pagination = useRef(1);
  const lastPagination = useRef(0);

  const getPayments = async () => {
    const response = await getReferralPayments({ page: pagination.current });
    const itemsCopy: any = [];

    items.map((item) => itemsCopy.push(item));

    lastPagination.current = response.meta.last_page;

    if (Array.isArray(response.data) && response.data.length > 0) {
      response.data.map((item) => itemsCopy.push(item));
    }

    setItems(itemsCopy);
  };

  const setPage = async () => {
    const nextPage = pagination.current + 1;

    if (nextPage <= lastPagination.current) {
      pagination.current = nextPage;
      await getPayments();
    } else {
      setReload(!reload);
    }
  };

  useEffect(() => {
    if (!init.current) {
      init.current = true;
      getPayments();
    }
  }, []);

  return (
    <>
      <AccountBanner />
      <AccountTabs />
      {
        items.length > 0 ? (
<>
          <div className={`${personal.personal__content__heading} ${styles.links}`}>
        <h2 className={`${personal.personal__content__title} typography-heading _medium`}>
          Оплаты ваших рефералов
        </h2>
      </div>
      <AppScroollbar>
        <table className={`${styles.table} ${styles.table_payment}`} style={{ touchAction: 'auto' }}>
          <thead>
            <tr>
              <th>
                №
              </th>
              <th>
                Даты оплаты
              </th>
              <th>
                Почта / id реферала
              </th>
              <th>
                Сумма
              </th>
              <th>
                Вознаграждение
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={5} />
            </tr>
            {
              items.map((item) => (
<tr key={item.id}>
                <td>
                  {item.id}
                </td>
                <td>
                  {moment(item.created_at).format('YYYY-MM-DD')}
                </td>
                <td>
                  {item?.user.email}
                  <span className={styles.gray}>id {item?.user.id}</span>
                </td>
                <td>
                  {item.amount} ₽
                </td>
                <td>
                  {item.total_amount} ₽
                </td>
              </tr>
))
            }
          </tbody>
        </table>
        </AppScroollbar>
        </>
)
        : (
        <h3 style={{ marginTop: 20 }} className={`${personal.personal__content__title} typography-heading _medium`}>
          Ваши рефералы пока не пополняли баланс
        </h3>
      )
}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}>

      {
        lastPagination.current > 0 && lastPagination.current > pagination.current && (
          <button type="button" onClick={setPage} className={buttonStyle.button__question}>
                    Показать еще
          </button>
        )
      }
      </div>
    </>
  );
}
