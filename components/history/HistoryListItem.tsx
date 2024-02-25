'use client';

import type { TOrderHistoryItem } from '@/types/api/order';
import { AppIconSprite } from '@/components/ui/Icon_sprite/AppIconSprite';
import { getFormatDateTime } from '@/helpers/date/getFormatDateTime';
import { AppButton } from '@/components/ui/AppButton';
import { MouseEventHandler, useState } from 'react';
import { getCurrencyFormatPrice } from '@/helpers/price/getCurrencyFormatPrice';
import { repayOrder, repeatOrder } from '@/helpers/api/order';
import { ModalOrderThank } from '@/components/modals/modal_order_thank/ModalOrderThank';
import { usePathname, useRouter } from 'next/navigation';
import { ModalOrderNoBalance } from '@/components/modals/modal_order_no_balance/ModalOrderNoBalance';
import { useUser } from '@/store/user';
import styles from './HistoryListItem.module.scss';

interface HistoryListItemProps {
  item: TOrderHistoryItem
}

export function HistoryListItem({ item }: HistoryListItemProps) {
  const {
    id, platform, createdAt, price, status, progress, progressMax, isPaid, text, link,
  } = item ?? {};
  const { data: user, balanceDecr } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const [modalThankOpened, setModalThankOpened] = useState(false);
  const [modalNoBalance, setModalNoBalance] = useState(false);

  const progressWidth = `${Math.floor((progress / progressMax) * 100)}%`;
  const hasButtonRepeat = isPaid && progress === progressMax;

  const modalThankHandler = () => setModalThankOpened((prev) => !prev);
  const modalNoBalanceHandler = () => setModalNoBalance((prev) => !prev);

  const detailsHandler: MouseEventHandler<HTMLButtonElement> = () => {
    setIsDetailsVisible((prev) => !prev);
  };
  const repayOrderHandler: MouseEventHandler<HTMLButtonElement> = async () => {
    if (user?.balance && (+user.balance >= price)) {
      try {
        await repayOrder(id);

        balanceDecr(price);
        modalThankHandler();

        setTimeout(() => {
          router.push(pathname);
          setModalThankOpened(false);
        }, 3000);
      } catch (e) {
        console.log(e);
      }
    } else {
      modalNoBalanceHandler();
    }
  };
  const repeatOrderHandler: MouseEventHandler<HTMLButtonElement> = async () => {
    await repeatOrder(id);
  };

  return (
    <li className={styles.item}>
      <div className={styles.item__description}>
        <AppIconSprite className={styles.item__description__icon} name={platform} />
        <div className={styles.item__description__text}>
          {/* <div className={`${styles.item__description__title} typography-menu _medium`}>{ activity }</div> */}
          <span className={`${styles.item__description__info} typography-menu _regular _small`}>
            ID {id}, <span>{getFormatDateTime(createdAt)}</span>
          </span>
        </div>
      </div>
      <AppButton
        typeButton="details"
        className={styles.item__button_details}
        data-tooltip="Детали"
        data-tooltip-position="bottom"
        onClick={detailsHandler}
      />
      <hr className={styles.item__devider} />
      <div className={`${styles.item__price} typography-menu _bold`}>
        {getCurrencyFormatPrice(price)}
      </div>
      {status !== 'canceled' && (
        <div className={styles.item__progress}>
          <span className={`${styles.item__progress__text} typography-menu _regular _middle`}>
            Выполнено {progress} из {progressMax}
          </span>
          <div className={styles.item__progress__wrapper}>
            <div className={styles.item__progress__line} style={{ width: progressWidth }} />
          </div>
        </div>
      )}
      {status === 'canceled' && (
        <div className={styles.item__cancel}>
          <span className={`${styles.item__progress__text} typography-menu _regular _middle`}>Отменен</span>
        </div>
      )}
      <div className={styles.item__buttons}>
        {!isPaid && (
          <AppButton
            typeButton="pay"
            className="typography-menu _bold _small"
            onClick={repayOrderHandler}
          >
            Оплатить
          </AppButton>
        )}
        {hasButtonRepeat && (
          <AppButton
            typeButton="repeat"
            className="typography-menu _bold _small"
            onClick={repeatOrderHandler}
          >
            Повторить
          </AppButton>
        )}
      </div>
      <div className={`${styles.item__details} ${!isDetailsVisible ? styles.details_hidden : ''}`}>
        <span className={`${styles.item__details__title} typography _medium`}>Опубликовано:</span>
        <span className={styles.item__details__text}>{ text }</span>
        {!!link && (
          <a href={link} className={styles.item__details__link} target="_blank" rel="noreferrer">
            { link }
          </a>
        )}
      </div>
      <ModalOrderThank isOpened={modalThankOpened} onClose={modalThankHandler} />
      <ModalOrderNoBalance isOpened={modalNoBalance} onClose={modalNoBalanceHandler} neededPrice={price} orderId={id} />
    </li>
  );
}
