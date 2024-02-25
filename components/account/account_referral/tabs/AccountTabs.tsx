'use client';

import { AppIconSprite } from '@/components/ui/Icon_sprite/AppIconSprite';
import { ROUTES } from '@/params';
import { usePathname } from 'next/navigation';
import { AppLink } from '@/components/ui/AppLink';
import styles from './AccountTabs.module.scss';

export function AccountTabs() {
  const pathname = usePathname();
  const getActive = (route: string) => (pathname === route ? 'active' : '');

  return (
    <div className={styles.tabs_panel}>
      <ul className="tab_panel">
        <li className={getActive(ROUTES.ACCOUNT_REFERRAL)}>
          <AppLink href={ROUTES.ACCOUNT_REFERRAL}>
            Реферальные данные
          </AppLink>
        </li>
        <li className={getActive(ROUTES.ACCOUNT_REFERRAL_PAYMENTS)}>
          <AppLink href={ROUTES.ACCOUNT_REFERRAL_PAYMENTS}>
            Оплаты ваших рефералов
          </AppLink>
        </li>
        <li className={getActive(ROUTES.ACCOUNT_REFERRAL_HISTORY)}>
          <AppLink href={ROUTES.ACCOUNT_REFERRAL_HISTORY}>
            История выплат
          </AppLink>
        </li>
        <li className={`${getActive(ROUTES.ACCOUNT_REFERRAL_WITHDRAWAL)} border`}>
          <AppLink href={ROUTES.ACCOUNT_REFERRAL_WITHDRAWAL}>
            <AppIconSprite className={styles.personal_header__tab__icon} name="pay-btn" />
            <span>Оформить выплату</span>
          </AppLink>
        </li>
      </ul>
    </div>
  );
}
