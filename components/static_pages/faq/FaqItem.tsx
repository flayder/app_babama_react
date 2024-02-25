'use client';

import type { TFaqElemItem } from '@/types/api/static-pages';
import { MouseEventHandler, useState } from 'react';
import styles from './FaqItem.module.scss';

type FaqItemProps = {
  item: TFaqElemItem
}
export function FaqItem({ item }: FaqItemProps) {
  const { text, title } = item ?? {};

  const [isActive, setIsActive] = useState(false);
  const activeClass = isActive ? styles.faq_active : '';

  const clickHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();

    setIsActive((prev) => !prev);
  };

  return (
    <li className={`${styles.faq_item} ${activeClass}`}>
      <button type="button" className={styles.faq_item__button} onClick={clickHandler}>
        <span className={`${styles.faq_item__title} typography-menu _medium`}>{title}</span>
        <div className={styles.faq_item__icon} />
      </button>
      <p className={`${styles.faq_item__content} typography-paragraph`}>{text}</p>
    </li>
  );
}
