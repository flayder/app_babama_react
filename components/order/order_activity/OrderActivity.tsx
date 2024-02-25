import { OrderActivityItem } from '@/components/order/order_activity/OrderActivityItem';
import type { TActivity } from '@/types/api/activities';
import { OrderActivitySelect } from '@/components/order/order_activity/OrderActivitySelect';
import styles from './OrderActivity.module.scss';

interface OrderActivityProps {
  activities: TActivity[]
  disabled: boolean
}

export async function OrderActivity({ activities, disabled }: OrderActivityProps) {
  return (
    <div className={styles.order_activity}>
      <ul className={`${styles.order_activity__list} typography-menu _medium _small`}>
        {activities.map((item) => <OrderActivityItem item={item} disabled={disabled} key={item.id} />)}
      </ul>
      <div className={styles.order_activity__select}>
        <OrderActivitySelect activities={activities} disabled={disabled} />
      </div>
    </div>
  );
}
