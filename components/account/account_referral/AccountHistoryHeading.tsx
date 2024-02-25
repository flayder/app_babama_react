'use client';

import personal from '@/components/account/Account.module.scss';
import buttonStyle from '@/components/ui/AppButton.module.scss';
import { AppScroollbar } from '@/components/ui/AppScrollbar';
import { AppIconSprite } from '@/components/ui/Icon_sprite/AppIconSprite';
import { useEffect, useRef, useState } from 'react';
import { TReferPayment } from '@/types/api/refers';
import { getReferPayments } from '@/helpers/api/refs';
import moment from 'moment';
import { AccountTabs } from './tabs/AccountTabs';
import { AccountBanner } from './banner/AccountBanner';
import styles from './AccountReferral.module.scss';

export function AccountHistoryHeading() {
  const init = useRef(false);
  const [items, setItems] = useState<TReferPayment[]>([]);
  const [reload, setReload] = useState(false);
  const pagination = useRef(1);
  const lastPagination = useRef(0);

  const getPayments = async () => {
    const response = await getReferPayments({ page: pagination.current });
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
      <div className={`${personal.personal__content__heading} ${styles.links}`}>
        <h2 className={`${personal.personal__content__title} typography-heading _medium`}>
          Оплаты ваших рефералов
        </h2>
      </div>
      {
        items.length > 0
        ? (
<AppScroollbar>
        <table className={`${styles.table} ${styles.table_history}`} style={{ touchAction: 'auto' }}>
          <thead>
            <tr>
              <th>
                №
              </th>
              <th>
                Способ вывода
              </th>
              <th>
                Реквезиты для вывода
              </th>
              <th>
                Дата вывода
              </th>
              <th>
                Сумма вывода
              </th>
              <th>
                Статус вывода
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={5} />
            </tr>
            {items.map((item) => (
                <tr key={item.id}>
              <td>
                {item.id}
              </td>
              <td>
                <b>
                  {item.payment_system.icon && (
                    <img src={item.payment_system.icon} />
                  )}
                  {item.payment_system.name}
                </b>
              </td>
              <td>
                {item.account}
              </td>
              <td>
                {moment(item.created_at).format('DD.MM.YYYY')}
              </td>
              <td>
                {item.amount} ₽
              </td>
              <td>
                {
                  item.status.length === 1
                  ? item.status === '1'
                    ? <span className="success">{item.description.toLowerCase()}</span>
                    : <span className="fail">{item.description.toLowerCase()}</span>
                  : <span className="pending">{item.status}</span>
                }
              </td>
            </tr>
              ))}
          </tbody>
        </table>
      </AppScroollbar>
)
      : (
<h3 style={{ marginTop: 20 }} className={`${personal.personal__content__title} typography-heading _medium`}>
          Вы пока не выводили денег с реферального баланса
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
