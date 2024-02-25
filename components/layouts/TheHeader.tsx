import { AppLink } from '@/components/ui/AppLink';
import { AppImage } from '@/components/ui/AppImage';
import { ROUTES } from '@/params';
import { Profile } from '@/components/profile/Profile';
import styles from './TheHeader.module.scss';

export function TheHeader() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.header__container}`}>
        <div className={styles.header__left}>
          <AppLink href={ROUTES.INDEX} className={styles.header__logo}>
            <AppImage className={styles.header__logo_icon} src="/images/logo.svg" width={240} height={50} alt="logo" />
          </AppLink>
          <p className={`${styles.header__text} typography-menu _regular _middle`}>
            Живые лайки, подписчики, комментарии и другие активности для 10 социальных сетей.
          </p>
        </div>
        <Profile />
      </div>
      <p className={`${styles.header__text} ${styles.header__text_mobile} typography-menu _regular _middle`}>
        Живые лайки, подписчики, комментарии и другие активности для 10 социальных сетей.
      </p>
    </header>
  );
}
