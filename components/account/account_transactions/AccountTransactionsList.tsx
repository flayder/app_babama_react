import type { TFundHistoryItem } from '@/types/api/payment';
import { getCurrencyFormatPrice } from '@/helpers/price/getCurrencyFormatPrice';
import styles from './AccountTransactionsList.module.scss';

interface AccountTransactionsListProps {
 list: TFundHistoryItem[]
}

export function AccountTransactionsList({
  list,
}: AccountTransactionsListProps) {
  return (
    <ul className={styles.history__list}>
      {list.map(({
        created_at, remarks, trx_type, amount, status, id,
      }) => (
        <li className={styles.history__item} key={id}>
          <div className={styles.history__item__description}>
            <div className={styles.history__item__description__text}>
              <span className={`${styles.history__item__description__info} typography-menu _regular _small`}>{created_at}</span>
            </div>
          </div>

          <hr className={styles.history__item__devider} />

          <div
            className={`${styles.history__item__price} ${styles.history__item__progress} typography-menu`}
            style={{
              minWidth: '600px',
              alignItems: 'flex-start',
              paddingLeft: '15px',
              fontSize: '16px',
            }}
          >
            {remarks}
          </div>

          <hr className={styles.history__item__devider} />

          <div className={`${styles.history__item__price} typography-menu _bold`}>
            {trx_type} <span className={styles.history__item__price__currency}>{getCurrencyFormatPrice(amount)}</span>
          </div>
          <div className={styles.history__item__buttons}>
            <span>{status}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}
