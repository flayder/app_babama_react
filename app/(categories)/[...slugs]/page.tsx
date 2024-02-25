import type { PageProps } from '@/types';
import type { Metadata } from 'next';
import type { PageMeta } from '@/helpers/api/pages';
import { BaseLayout } from '@/components/layouts/base_layout/BaseLayout';
import { Order } from '@/components/order/Order';
import { Advantages } from '@/components/Advantages';
import { getFetchData } from '@/helpers/api/response';
import { API } from '@/params';
import { OrderTitle } from '@/components/order/OrderTitle';

export async function generateMetadata(
  { params }: PageProps,
): Promise<Metadata> {
  const { slugs } = params;
  const { seo: { title, description } } = await getFetchData<PageMeta>(API.GET_CATEGORY_PAGE(slugs ?? []));

  return { title, description };
}

export default async function Page({ params }: PageProps) {
  const { h1, description } = await getFetchData<PageMeta>(API.GET_CATEGORY_PAGE(params.slugs ?? []));

  return (
    <div className="page-home page">
      <OrderTitle title={h1} description={description} />
      <BaseLayout withoutPadding>
        <Order slugs={params.slugs} />
      </BaseLayout>
      <Advantages />
    </div>
  );
}
