import { FaqButton } from '@/components/static_pages/faq/FaqButton';
import personal from '@/components/account/Account.module.scss';
import styles from './AccountBanner.module.scss';

export function AccountBanner() {
  return (
    <div className={`${personal.personal__content__wrapper} ${styles.referral_ban}`}>
      <div className="left">
        <h3 className={`${personal.personal__content__title} typography-heading _medium`}>
          Получайте до <span className={styles.purple}>30%</span> от трат приведенных пользователей.
        </h3>
        <p className={`${styles.paragraph} typography-heading _small`}>
          Скопируйте свою личную партнерскую ссылку или создайте новую и поделитесь ей для получения вознаграждения. Чем больше тратят ваши рефералы, тем больше вы зарабатываете.
        </p>
      </div>
      <div className="right">
        <FaqButton />
        {/* <button className={`${styles.btn}`}>
            Написать нам
          </button> */}
      </div>
    </div>
  );
}
