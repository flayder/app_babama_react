import { Faq } from '@/components/static_pages/faq/Faq';
import { getFetchData } from '@/helpers/api/response';
import type { TFaqAPI } from '@/types/api/static-pages';
import { API } from '@/params';

export default async function Page() {
  const data = await getFetchData<TFaqAPI>(API.TOP_QUESTIONS);

  return (
    <Faq data={data} />
  );
}
