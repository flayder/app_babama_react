import { AppLink } from '@/components/ui/AppLink';
import { ROUTES } from '@/params';
import { AppIconSprite } from '@/components/ui/Icon_sprite/AppIconSprite';
import type { TUser } from '@/types/api/user';
import { getCurrencyFormatPrice } from '@/helpers/price/getCurrencyFormatPrice';
import { useUser } from '@/store/user';
import styles from './ProfileUser.module.scss';

export function ProfileUser() {
  const { email, balance } = useUser.getState().data as TUser;

  return (
    <div className={styles.profile} data-profile>
      <AppLink href={ROUTES.ACCOUNT} className={styles.profile__item} data-personal-content-settings>
        <div className={styles.profile__icon__wrapper}>
          <AppIconSprite className={styles.profile__icon__background} name="background" size={55} />
          <AppIconSprite className={styles.profile__icon} name="user-circle" size={55} />
        </div>
        <span className={`${styles.profile__login__text} typography-menu _bold _middle`}>{email}</span>
      </AppLink>
      <div className={styles.profile__devider} />
      <AppLink
        href={ROUTES.ACCOUNT_PAY}
        className={`${styles.profile__balance} ${styles.profile__item} typography-menu _regular _middle`}
        data-personal-content-wallet
      >
        <div className={`${styles.profile__balance__icon__wrapper} ${styles.profile__icon__wrapper}`}>
          <AppIconSprite className={styles.profile__icon__background} name="background" size={55} />
          <AppIconSprite className={styles.profile__icon} name="wallet" size={55} />
        </div>
        <div className={styles.profile__balance__text}>
          Ваш баланс:
          <span className={`${styles.profile__balance__currency} typography-menu _medium _middle`} data-profile-currency="140">
            {getCurrencyFormatPrice(balance || 0)}
          </span>
        </div>
        <div className={styles.profile__balance__link}>Пополнить кошелек</div>
      </AppLink>
    </div>
  );
}
