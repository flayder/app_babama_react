import type { PaymentPageProps } from '@/types';
import type { TCheckUserDataAPI } from '@/types/api/user';
import type { TTransactionAPI } from '@/types/api/transaction';
import { PaymentSucceed } from '@/components/payment/PaymentSucceed';
import { getFetchData } from '@/helpers/api/response';
import { API } from '@/params';

export default async function Page({ searchParams }: PaymentPageProps) {
  const transactionUuid = searchParams?.Shp_user || searchParams?.m_orderid || searchParams?.MERCHANT_ORDER_ID || '';
  const { order } = await getFetchData<TTransactionAPI>(API.GET_TRANSACTION(transactionUuid)) || {};
  const { new_user } = await getFetchData<TCheckUserDataAPI>(API.CHECK_USER_STATUS(transactionUuid)) || {};

  return <PaymentSucceed isNewUser={new_user} isOrder={!!order} />;
}
