import { OrderStep } from '@/components/order/OrderStep';
import { OrderPlatform } from '@/components/order/order_platform/OrderPlatform';
import { OrderActivity } from '@/components/order/order_activity/OrderActivity';
import { OrderService } from '@/components/order/order_service/OrderService';
import { getFetchData } from '@/helpers/api/response';
import type { TCategoriesAPI, TCategory } from '@/types/api/categories';
import type { TActivitiesAPI, TActivity } from '@/types/api/activities';
import type { TServicesAPI } from '@/types/api/services';
import { API } from '@/params';
import styles from './Order.module.scss';

interface OrderProps {
  slugs?: string[]
}
export async function Order({ slugs }: OrderProps) {
  const { data: categories } = await getFetchData<TCategoriesAPI>(API.CATEGORIES);

  const selectCategoryID = slugs ? categories.find(({ slug }) => slug === slugs[0])?.id ?? categories[0].id : categories[0].id;
  const activities = await getFetchData<TActivitiesAPI>(API.GET_ACTIVITIES(selectCategoryID));
  const selectCategory = categories.find(({ id }) => id === selectCategoryID);

  const selectActivityID = slugs && slugs[1]
    ? activities.find(({ slug }) => slug === slugs[1])?.id ?? activities[0].id
    : activities[0].id;
  const selectActivity = activities.find(({ id }) => id === selectActivityID);

  const services = await getFetchData<TServicesAPI>(API.GET_SERVICES(selectCategoryID, selectActivityID));

  return (
    <div className={styles.order} data-order data-page-content>
      <OrderStep title="Площадка" subtitle="Шаг 1">
        {!!categories?.length && <OrderPlatform categories={categories} />}
      </OrderStep>
      <OrderStep title="Активности" subtitle="Шаг 2">
        {!!activities?.length && <OrderActivity activities={activities} disabled={!slugs} />}
      </OrderStep>
      <OrderStep title="Параметры" subtitle="Шаг 3" isBig>
        {!!services?.length && (
          <OrderService
            services={services}
            hasComment={selectActivity?.has_comment ?? false}
            category={selectCategory as TCategory}
            activity={selectActivity as TActivity}
            disabled={!slugs || !slugs[1]}
          />
        )}
      </OrderStep>
    </div>
  );
}
