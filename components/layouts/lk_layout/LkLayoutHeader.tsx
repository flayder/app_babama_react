'use client';

import { AppIconSprite } from '@/components/ui/Icon_sprite/AppIconSprite';
import { AppLink } from '@/components/ui/AppLink';
import { useRouter, usePathname } from 'next/navigation';
import { ROUTES } from '@/params';
import { userLogout } from '@/helpers/api/user';
import { useUser } from '@/store/user';
import { TUser } from '@/types/api/user';
import styles from './LkLayoutHeader.module.scss';

export function LkLayoutHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { id } = useUser.getState().data as TUser;

  const compareSubLink = (route: string, parentLink?: string): boolean => {
    if (
      parentLink && pathname.indexOf(parentLink) !== -1
      && route.indexOf(parentLink) !== -1
    ) return true;

    return false;
  };

  const getActive = (route: string, parentLink?: string) => ((pathname === route || pathname !== route && compareSubLink(route, parentLink)) ? styles.tab_active : '');

  const logoutHandler = () => {
    userLogout();

    router.push(ROUTES.INDEX);

    useUser.setState({ data: null });
  };

  return (
    <div className={styles.personal_header}>
      <div className={styles.personal_header__text}>
        <h2 className={`${styles.personal_header__heading} typography-heading _medium`}>Личный кабинет</h2>
        <div className={`${styles.personal_header__subtitle} typography-menu _regular _middle`}>замечательного человека</div>
      </div>
      <div className={styles.personal_header__tabs}>
        <AppLink
          href={ROUTES.ACCOUNT}
          className={`${styles.personal_header__tab} ${getActive(ROUTES.ACCOUNT)}`}
        >
          <AppIconSprite className={styles.personal_header__tab__icon} name="gear" />
          <div className={`${styles.personal_header__tab__title} typography-menu _medium _small`}>Настройки</div>
        </AppLink>
        <AppLink
          href={ROUTES.ACCOUNT_TRANSACTIONS}
          className={`${styles.personal_header__tab} ${getActive(ROUTES.ACCOUNT_TRANSACTIONS)}`}
        >
          <AppIconSprite className={styles.personal_header__tab__icon} name="gear" />
          <div className={`${styles.personal_header__tab__title} typography-menu _medium _small`}>История транзакций</div>
        </AppLink>
        <AppLink
          href={ROUTES.ACCOUNT_PAY}
          className={`${styles.personal_header__tab} ${getActive(ROUTES.ACCOUNT_PAY)}`}
        >
          <AppIconSprite className={styles.personal_header__tab__icon} name="wallet" />
          <div className={`${styles.personal_header__tab__title} typography-menu _medium _small`}>Пополнить кошелек</div>
        </AppLink>
        { id == 2646 && (
<AppLink
  href={ROUTES.ACCOUNT_REFERRAL}
  className={`${styles.personal_header__tab} ${getActive(ROUTES.ACCOUNT_REFERRAL, ROUTES.ACCOUNT_REFERRAL)}`}
>
          <AppIconSprite className={styles.personal_header__tab__icon} name="referral" />
          <div className={`${styles.personal_header__tab__title} typography-menu _medium _small`}>Партнерка</div>
        </AppLink>
        ) }

      </div>
      <div className={styles.personal_header__buttons}>
        <button
          type="button"
          className={`${styles.personal_header__button} typography-menu _bold _small`}
          onClick={logoutHandler}
        >
          <AppIconSprite className={styles.personal_header__button__icon} name="logout" />
          <div className={styles.personal_header__button__text}>Выйти</div>
        </button>
      </div>
    </div>
  );
}
