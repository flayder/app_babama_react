'use client';

import { AppIconSprite } from '@/components/ui/Icon_sprite/AppIconSprite';
import { ModalWriteUs } from '@/components/modals/modal_write_us/ModalWriteUs';
import { useState } from 'react';
import classNames from 'classnames';
import styles from './TheFooterFeedback.module.scss';

export function TheFooterFeedback() {
  const [isOpened, setIsOpened] = useState(false);

  const modalHandler = () => setIsOpened((prev) => !prev);

  return (
    <div className={styles.feedback}>
      <div className={classNames(styles.feedback__subtitle, 'typography-menu _regular _middle')}>задать вопрос</div>
      <a
        href={`mailto:${process.env.NEXT_PUBLIC_PROJECT_EMAIL}`}
        className={classNames(styles.feedback__email, 'typography-display _medium')}
      >
        {process.env.NEXT_PUBLIC_PROJECT_EMAIL}
      </a>
      <div className={styles.feedback__buttons}>
        <button type="button" className={classNames(styles.feedback__button, styles.feedback__item)} onClick={modalHandler}>
          <AppIconSprite className={styles.feedback__icon} name="question" size={20} />
          Задать вопрос
        </button>
        <a href="https://t.me/babamaru" className={classNames(styles.feedback__link, styles.feedback__item)}>
          <AppIconSprite className={styles.feedback__icon} name="telegram" size={20} />
          Новости и промокоды
        </a>
      </div>
      <ModalWriteUs isOpened={isOpened} onClose={modalHandler} />
    </div>
  );
}
