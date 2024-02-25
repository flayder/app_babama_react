'use client';

import { AppLink } from '@/components/ui/AppLink';
import { AppImage } from '@/components/ui/AppImage';
import type { TCategory } from '@/types/api/categories';
import { usePathname } from 'next/navigation';
import { ROUTES } from '@/params';
import styles from './OrderPlatformItem.module.scss';

interface OrderPlatformItemProps {
  item: TCategory
}

// TODO: add href
export function OrderPlatformItem({ item }: OrderPlatformItemProps) {
  const pathname = usePathname();
  const {
    name, icon, slug, domain_link: domainLink,
  } = item ?? {};

  const activeClass = pathname.includes(`/${slug}`) ? styles.platform_active : '';
  const link = ROUTES.GET_PLATFORM_LINK(slug);

  return (
    <li className={`${styles.order__platform__item} ${activeClass}`}>
      <AppLink className={`${styles.order__platform__button} ${activeClass}`} href={link} scroll={false}>
        <AppImage className={styles.order__platform__icon} src={icon} alt={domainLink} height={24} width={24} />
        {name}
      </AppLink>
    </li>
  );
}
