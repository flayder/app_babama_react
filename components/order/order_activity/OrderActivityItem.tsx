'use client';

import type { TActivity } from '@/types/api/activities';
import { AppLink } from '@/components/ui/AppLink';
import { AppImage } from '@/components/ui/AppImage';
import { usePathname } from 'next/navigation';
import { ROUTES } from '@/params';
import styles from './OrderActivityItem.module.scss';

interface OrderActivityItemProps {
  item: TActivity
  disabled: boolean
}
export function OrderActivityItem({ item, disabled }: OrderActivityItemProps) {
  const pathname = usePathname();
  const { name, icon, slug } = item ?? {};

  const activeClass = pathname.includes(`/${slug}`) ? styles.activity_active : '';
  const disableClass = !slug || disabled ? styles.activity_disabled : '';

  const platform = pathname.split('/')[1];
  const link = ROUTES.GET_ACTIVITY_LINK(platform, slug);

  return (
    <li className={styles.order_activity__item}>
      <AppLink className={`${styles.order_activity__button} ${activeClass} ${disableClass}`} href={link} scroll={false}>
        <AppImage className={styles.order_activity__icon} width={24} height={24} src={`/${icon}`} alt={name} />
        {name}
      </AppLink>
    </li>
  );
}
