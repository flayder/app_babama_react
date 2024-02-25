import type { TFaqAPI } from '@/types/api/static-pages';
import { FaqGroup } from '@/components/static_pages/faq/FaqGroup';
import { FaqButton } from '@/components/static_pages/faq/FaqButton';
import styles from './Faq.module.scss';

interface FaqProps {
  data: TFaqAPI
}
export function Faq({ data }: FaqProps) {
  return (
    <div className={styles.faq}>
      <div className={styles.faq__header}>
        <p className={`${styles.faq__content__text} typography-menu _regular _middle`}>
          Написать в тех. поддержку
          <span className={styles.faq__content__text__extra}> через специальную форму</span>
        </p>
        <FaqButton />
      </div>
      <div className={styles.faq__content}>
        <h2 className={`${styles.faq__content__heading} typography-heading _medium`}>Популярные вопросы</h2>
        <p className={`${styles.faq__content__text} typography-menu _regular _middle`}>
          Для Вашего удобства мы собрали все популярные вопросы и разделили их по категориям. Если Вашего вопроса тут нет, то
          пишите нам в онлайн-чат или заполняйте форму выше
        </p>
        {data.map((elem) => (
          <FaqGroup elem={elem} key={elem.heading} />
        ))}
      </div>
    </div>
  );
}
