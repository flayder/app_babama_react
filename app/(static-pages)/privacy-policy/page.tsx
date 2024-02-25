import { getFetchData } from '@/helpers/api/response';
import { API } from '@/params';
import type { TStaticPagesAPI } from '@/types/api/static-pages';
import { StaticPages } from '@/components/static_pages/StaticPages';

export default async function StaticPage() {
  const { data } = await getFetchData<TStaticPagesAPI>(API.PRIVACY_POLICY);

  return <StaticPages data={data} />;
}
