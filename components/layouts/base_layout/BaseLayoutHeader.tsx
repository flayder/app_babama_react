'use client';

import { AppLink } from '@/components/ui/AppLink';
import { ROUTES } from '@/params';
import { AppIconSprite } from '@/components/ui/Icon_sprite/AppIconSprite';
import { usePathname } from 'next/navigation';
import { useUser } from '@/store/user';
import styles from './BaseLayoutHeader.module.scss';

export function BaseLayoutHeader() {
  const { data: user } = useUser();
  const pathname = usePathname();

  const getActive = (route: string) => (pathname === route ? styles.tab_active : '');

  return (
    <div className={`${styles.layout}`}>
      <div className={`${styles.layout__tabs}`}>
        <AppLink href={ROUTES.INDEX} className={` ${getActive(ROUTES.INDEX)} ${styles.layout__tab} `}>
          <AppIconSprite className={`${styles.layout__tab__icon}`} name="fire-fill" size={20} fillCurrent />
          <div className={`${styles.layout__tab__title} typography-menu _medium _small`}>Новый заказ</div>
        </AppLink>
        {user && (
          <AppLink href={ROUTES.HISTORY} className={`${styles.layout__tab} ${getActive(ROUTES.HISTORY)}`}>
            <AppIconSprite className={`${styles.layout__tab__icon}`} name="paper" size={20} fillCurrent />
            <div className={`${styles.layout__tab__title} typography-menu _medium _small`}>История заказов</div>
          </AppLink>
        )}
      </div>
      {pathname !== ROUTES.FAQ && (
        <div className={`${styles.layout__buttons}`}>
          <AppLink href={ROUTES.FAQ} className={`${styles.layout__button} typography-menu _bold _small`}>
            <AppIconSprite className={`${styles.layout__button__icon}`} name="question" size={20} />
            <div className={`${styles.layout__button__text}`}>Помощь</div>
          </AppLink>
        </div>
      )}
    </div>
  );
}
