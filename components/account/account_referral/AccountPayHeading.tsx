'use client';

import personal from '@/components/account/Account.module.scss';
import { AppNotification } from '@/components/ui/AppNotification';
import { AppInput } from '@/components/ui/inputs/AppInput';
import { AppSelect, TItem } from '@/components/ui/select/AppSelect';
import { AppTextarea } from '@/components/ui/inputs/AppTextarea';
import footerStyle from '@/components/layouts/footer/TheFooterFeedback.module.scss';
import {
 MouseEvent, useEffect, useRef, useState, 
} from 'react';
import { TReferPayment, TReferPaymentInfoAPI, TReferPaymentSystem } from '@/types/api/refers';
import { createReferPayment, getReferPaymentInfo, getReferPaymentSystems } from '@/helpers/api/refs';
import bannerStyle from './banner/AccountBanner.module.scss';
import styles from './AccountReferral.module.scss';

export function AccountPayHeading() {
  const init = useRef(false);
  const [all, setAll] = useState(false);
  const [selectItems, setSelectItems] = useState<TItem[]>([]);
  const [paymentSystems, setPaymentSystems] = useState<TReferPaymentSystem[]>([]);
  const [info, setInfo] = useState<TReferPaymentInfoAPI>();
  const [sum, setSum] = useState(0);
  const [acc, setAcc] = useState('');
  const [payment, setPayment] = useState<TReferPaymentSystem>();
  const [account, setAccount] = useState(false);
  const [paymentError, setPaymentError] = useState(false);
  const [amountError, setAmountError] = useState(false);

  const [success, setSuccess] = useState(false);

  const getPaymentSystems = async () => {
    const response = await getReferPaymentSystems();
    const items: TItem[] = [];

    if (Array.isArray(response.data) && response.data.length > 0) {
      response.data.map((item) => items.push({ icon: item.icon, label: item.name, value: item.id }));
      setSelectItems(items);
      setPaymentSystems(response.data);
    }
  };

  const getPaymentInfo = async () => {
    const response = await getReferPaymentInfo();

    setInfo(response.data);
  };

  useEffect(() => {
    if (!init.current) {
      init.current = true;
      getPaymentSystems();
      getPaymentInfo();
    }
  }, []);

  const paymentFormHandler = async () => {
    let error = false;
    if (success) {
      setSuccess(false);
    }

    if (!payment?.id) {
      setPaymentError(true);
      error = true;
    } else if (paymentError) setPaymentError(false);

    if (acc.length == 0) {
      setAccount(true);
      error = true;
    } else if (account) setAccount(false);

    if (sum <= 0) {
      setAmountError(true);
      error = true;
    } else if (amountError) setAmountError(false);

    if (!error && payment?.id && sum > 0 && acc.length > 0) {
      await createReferPayment({ payment_system_id: payment.id, amount: sum, account: acc });
      setSum(0);
      setSuccess(true);
      setAcc('');
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    }
  };

  const setAllPriceHandler = (event: MouseEvent<HTMLLIElement>) => {
    const bal = info?.referralBalance;
    if (bal && bal > 0) {
      if (!all) setAll(true);
      setSum(bal);
    }
  };

  const setSumHandler = (event: MouseEvent<HTMLLIElement>, num: number) => {
    if (all) setAll(false);

    setSum(num);
  };

  const paymentSystemHandler = (event: any) => {
    const paymentSystem = paymentSystems.filter((i) => i.id === event.value);
    if (paymentSystem.length > 0) setPayment(paymentSystem[0]);
  };

  const accHandler = (event: any) => {
    setAcc(event.target.value);
  };

  const sumHandler = (event: any) => {
    setSum(parseInt(event.target.value));
  };

  return (
    <>
      <div className={`${personal.personal__content__heading} ${styles.links}`}>
        <h2 className={`${personal.personal__content__title} typography-heading _medium`}>
          Оформление выплаты
        </h2>
      </div>
      <div className={`${personal.personal__content__wrapper} ${bannerStyle.referral_ban} ${styles.pay_ban}`}>
        <div className="block_pay">
          <div className="name">
            Партнерский баланс
          </div>
          <div className="price">
            {
              info?.referralBalance
              ? (
<>
                {info.referralBalance}
                <span className="cur"> ₽</span>
              </>
)
              : '-'
            }
          </div>
        </div>
        <div className="block_pay">
          <div className="name">
            Выведено из сервиса
          </div>
          <div className="price">
            {
              info?.total
              ? (
<>
                {info.total}
                <span className="cur"> ₽</span>
              </>
)
              : '-'
            }
          </div>
        </div>
        <div className="block_pay">
          <div className="name">
            Выведено на баланс
          </div>
          <div className="price">
            {
              info?.totalBalance
              ? (
<>
                {info.totalBalance}
                <span className="cur"> ₽</span>
              </>
)
              : '-'
            }
          </div>
        </div>
      </div>
      {success && (
        <h3 className={`${personal.personal__content__title} ${styles.pay_cussess} typography-menu _regular _success`}>
          Ваш запрос на вывод средств отправлен на рассмотрение! Как только операция будет одобрена, вы получите даньги на указанный счет!
        </h3>
      )}
      <div className={`${personal.personal__content__wrapper} ${bannerStyle.referral_ban} ${styles.pay_form}`}>
        <div className="form_block">
          <div className="input">
            <div className="label">
              <AppNotification label="Платежная система" theme="dark" content={payment?.freewallet_notification ?? 'Выберите платежную систему'} />
            </div>
            <AppSelect
              defaultValue={{
                label: 'Выберите платежную систему',
                value: 0,
              }}
              items={selectItems}
              onChange={(value) => paymentSystemHandler(value)}
            />
            {
              paymentError && (
                <div className="typography-menu _regular _error">Вы не выбрали платежную систему</div>
              )
            }
          </div>
          <div className="input">
            <div className="label">
              <AppNotification label="Реквезиты для вывода" theme="dark" content={payment?.requisite_notification ?? 'Нужно будет ввести реквизиты соответствующие выбранной платежной системы'} />
            </div>
            <AppTextarea value={acc} onChange={(e) => accHandler(e)} />
            {
              amountError && (
                <div className="typography-menu _regular _error">Вы не ввели нужную сумму для вывода</div>
              )
            }
          </div>
        </div>
        <div className="form_block pay_form_block">
          <div className="input">
            <div className="label">
              Сумма вывода
            </div>
            <AppInput value={sum > 0 ? sum : ''} onChange={(e) => sumHandler(e)} />
          </div>
          <ul className="prices">
            <li onClick={(e) => setSumHandler(e, 250)}>250 ₽</li>
            <li onClick={(e) => setSumHandler(e, 500)}>500 ₽</li>
            <li onClick={(e) => setSumHandler(e, 1000)}>1000 ₽</li>
            <li onClick={(e) => setSumHandler(e, 2000)}>2000 ₽</li>
            <li onClick={setAllPriceHandler}>Все</li>
          </ul>
          {
            amountError && (
              <div className="typography-menu _regular _error">Вы не ввели нужную сумму для вывода</div>
            )
          }
          <button type="button" onClick={paymentFormHandler} className={`${footerStyle.feedback__button} purple_btn`}>
            Оформить выплату
          </button>
        </div>
      </div>
    </>
  );
}
