import { getFetchData } from '@/helpers/api/response';
import { API } from '@/params';
import { HistoryEmpty } from '@/components/history/HistoryEmpty.';
import { HistoryList } from '@/components/history/HistoryList';
import type { TOrdersHistoryAPI } from '@/types/api/order';
import { HistoryThankModal } from '@/components/history/HistoryThankModal';

export async function History() {
  const { data } = await getFetchData<TOrdersHistoryAPI>(API.ORDERS_HISTORY);

  return (
    <div data-history data-page-content>
      {!data.length && <HistoryEmpty />}
      {!!data.length && <HistoryList list={data} />}
      <HistoryThankModal />
    </div>
  );
}
