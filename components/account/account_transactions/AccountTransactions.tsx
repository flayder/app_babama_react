import { getFetchData } from '@/helpers/api/response';
import { API } from '@/params';
import type { TFundHistoryAPI } from '@/types/api/payment';
import { AccountTransactionsEmpty } from '@/components/account/account_transactions/AccountTransactionsEmpty';
import { AccountTransactionsList } from '@/components/account/account_transactions/AccountTransactionsList';
import personal from '../Account.module.scss';
import styles from './AccountTransactions.module.scss';

export async function AccountTransactions() {
  const { data } = await getFetchData<TFundHistoryAPI>(API.FUND_HISTORY);

  return (
    <div className={personal.personal__content}>
      <div className={personal.personal__content__heading}>
        <h2 className={`${personal.personal__content__title} typography-heading _medium`}>История транзакций:</h2>
      </div>

      <div className={`${styles.history} _transactions`} data-history data-page-content>
        {!data.length && <AccountTransactionsEmpty />}
        {!!data.length && <AccountTransactionsList list={data} />}
      </div>
    </div>
  );
}
