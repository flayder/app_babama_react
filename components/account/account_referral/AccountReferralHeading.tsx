'use client';

import personal from '@/components/account/Account.module.scss';
import { AppIconSprite } from '@/components/ui/Icon_sprite/AppIconSprite';
import { AppNotification } from '@/components/ui/AppNotification';
import { AppSelect } from '@/components/ui/select/AppSelect';
import { AppCheckbox } from '@/components/ui/AppCheckbox';
import { AppDatepicker } from '@/components/ui/AppDatepicker';
import { AppScroollbar } from '@/components/ui/AppScrollbar';
import { ModalReferLink } from '@/components/modals/modal_refer_link/ModalReferLink';
import { useEffect, useRef, useState } from 'react';
import { TRefersAPI } from '@/types/api/refers';
import { getLinks, updateLink } from '@/helpers/api/refs';
import styles from './AccountReferral.module.scss';
import { AppTr } from '../table/AppTr';

export function AccountReferralHeading() {
  const init = useRef(false);
  const [modalLink, setModalLink] = useState(false);
  const [items, setItems] = useState<TRefersAPI>([]);
  const sort = useRef('');
  const deleted = useRef(false);
  const period = useRef('');
  const periodDateStart = useRef('');
  const periodDateEnd = useRef('');

  const getLinksData = async () => {
    let response = await getLinks(
      {
        sort: sort.current,
        deleted: +deleted.current,
        period: period.current,
        startDate: periodDateStart.current,
        endDate: periodDateEnd.current,
      },
    );

    if (Array.isArray(response)) {
      if (sort.current === 'ASC') {
        response = response.sort((a, b) => b.earn - a.earn);
      } else if (sort.current === 'DESC') {
        response = response.sort((a, b) => a.earn - b.earn);
      }
    }

    setItems(response);
  };

  const datePickerHandler = (start: string, end: string) => {
    periodDateStart.current = start;
    periodDateEnd.current = end;
    getLinksData();
  };

  useEffect(() => {
   if (!init.current) {
    init.current = true;
    getLinksData();
   }
  });

  const sortArray = [
    {
      label: 'Сегодня',
      value: 'today',
    },
    {
      label: 'Неделя',
      value: 'week',
    },
    {
      label: 'Месяц',
      value: 'month',
    },
    {
      label: '6 месяцев',
      value: 'halfyear',
    },
    {
      label: 'Год',
      value: 'year',
    },
  ];

  const modalReferLinkHandler = () => {
    setModalLink(!modalLink);
  };

  const deletedLinkCheckoutHandler = (del: boolean) => {
    deleted.current = del;
    getLinksData();
  };

  const periodHandler = (value: any) => {
    period.current = value.value;
    getLinksData();
  };

  const sortHandler = () => {
    if (sort.current === '') {
      sort.current = 'ASC';
    } else if (sort.current === 'ASC') {
      sort.current = 'DESC';
    } else if (sort.current === 'DESC') {
      sort.current = '';
    }
    getLinksData();
  };

  const deactivateLinkHandler = async (id: number, del: boolean) => {
    await updateLink({ id, del });
  };

  return (
    <>
      <ModalReferLink
        isOpened={modalLink}
        onSuccess={() => {
          getLinksData();
        }}
        onClose={modalReferLinkHandler}
      />

      <div className={`${personal.personal__content__heading} ${styles.links}`}>
        <h2 className={`${personal.personal__content__title} typography-heading _medium`}>
          Ссылки
        </h2>
      </div>

        <div className={styles.top_table_panel}>
        <div className="left">
          <div className="input border">
            <div className={styles.selectBlock}>
              <AppSelect
                items={sortArray}
                defaultValue={{
                  label: 'За все время',
                  value: '',
                }}
                isDisabled={items.length == 0}
                onChange={(value) => periodHandler(value)}
              />
            </div>
          </div>
          {
            items.length > 0 && <AppDatepicker onCompleted={(start, end) => datePickerHandler(start, end)} />
          }
        </div>
        <div className="right">
          {items.length > 0 && (
<div className="input pad links">
            <AppCheckbox label="Показать удаленные ссылки" isChecked={false} onChecked={deletedLinkCheckoutHandler} />
          </div>
)}
          <div className="input">
            <button type="button" onClick={modalReferLinkHandler} className={styles.btn_purple}>
              <span className="plus">
                +
              </span>
              <span>
                Добавить ссылку
              </span>
            </button>
          </div>
        </div>
      </div>
      {
        items.length
        ? (
<>
      <AppScroollbar>
        <table className={styles.table} style={{ touchAction: 'auto' }}>
          <thead>
            <tr>
              <th>
                Реф. ссылка
              </th>
              <th>
                Посещений
              </th>
              <th>
                Пополнили баланс
              </th>
              <th>
                <AppNotification label="Конверсия" theme="dark" content="Конверсия из перехода в пополнение" />
              </th>
              <th>
                <span className="wrap" onClick={sortHandler}>
                  <span>
                    Заработано
                  </span>
                  <span className="arrows">
                    <AppIconSprite name="arrowup" className={sort.current === 'ASC' ? 'active' : ''} />
                    <AppIconSprite className={`${styles.arrowup} ${sort.current === 'DESC' ? 'active' : ''}`} name="arrowup" />
                  </span>
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={5} />
            </tr>
            {
              items.map((item) => <AppTr key={item.link} item={item} onDeleted={(deleted) => deactivateLinkHandler(item.id, deleted)} />)
            }
          </tbody>
        </table>
      </AppScroollbar>
      </>
)
      : <h3 style={{ margin: '20px 0' }} className={`${personal.personal__content__title} typography-heading _medium`}>У вас пока нет реферальных ссылок. Создайте первую :)</h3>
      }
    </>
  );
}
