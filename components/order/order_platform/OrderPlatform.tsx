import type { TCategory } from '@/types/api/categories';
import { OrderPlatformItem } from '@/components/order/order_platform/OrderPlatformItem';
import { OrderPlatformSelect } from '@/components/order/order_platform/OrderPlatformSelect';
import styles from './OrderPlatform.module.scss';

interface OrderPlatformProps {
  categories: TCategory[]
}

export function OrderPlatform({ categories }: OrderPlatformProps) {
  return (
    <div className={styles.order__platform}>
      <ul className={`${styles.order__platform__list} typography-menu _medium _small`} data-order-platform-list>
        {categories.map((item) => <OrderPlatformItem item={item} key={item.id} />)}
      </ul>
      <div className={styles.order__platform__select}>
        <OrderPlatformSelect categories={categories} />
      </div>
    </div>
  );
}
