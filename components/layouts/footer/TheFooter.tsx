import { AppImage } from '@/components/ui/AppImage';
import { AppLink } from '@/components/ui/AppLink';
import { getFetchData } from '@/helpers/api/response';
import type { TStaticPagesListAPI } from '@/types/api/static-pages';
import { API, ROUTES } from '@/params';
import { TheFooterFeedback } from '@/components/layouts/footer/TheFooterFeedback';
import styles from './TheFooter.module.scss';

export async function TheFooter() {
  const staticPages = await getFetchData<TStaticPagesListAPI>(API.STATIC_PAGES);
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footer__container}`}>
        <div className={styles.footer__logo}>
          <AppLink href={ROUTES.INDEX} className={styles.footer__logo__link}>
            <AppImage className={styles.footer__logo__icon} src="/images/logo.svg" width={240} height={50} alt="logo" />
          </AppLink>
          <p className={`${styles.footer__logo__text} typography-menu _medium _middle`}>
            Реальные отзывы о нас на <a href="https://in-scale.ru/service/babama">IN-SCALE</a>
          </p>
        </div>
        <div className={styles.footer__warning}>
          <p className="typography-paragraph _small">
            *Компания Meta, которой принадлежит
            <br />
            Instagram и Facebook, признана в России
            <br />
            экстремистской организацией.
          </p>
        </div>
        <TheFooterFeedback />
        <nav className={styles.footer__menu}>
          <ul className={`${styles.footer__menu__list} typography-menu _middle`}>
            {staticPages.data.map(({ id, title, slug }) => (
              <li key={id}>
                <AppLink href={`/${slug}`} data-footer-link>{title}</AppLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className={`${styles.footer__copyright} typography-menu _regular _middle`}>
          <span>© 2015-{currentYear}</span> <br />
          <span>Сервис продвижения в соцсетях {process.env.NEXT_PUBLIC_PROJECT_NAME}</span>
        </div>
      </div>
    </footer>
  );
}
