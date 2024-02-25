import { ComponentProps, useState } from 'react';
import { ModalBase } from '@/components/ui/modal/ModalBase';
import { AppIconSprite } from '@/components/ui/Icon_sprite/AppIconSprite';
import { ModalWriteUsForm } from '@/components/modals/modal_write_us/ModalWriteUsForm';
import { ModalHeading } from '@/components/modals/layouts/ModalHeading';
import { useUser } from '@/store/user';
import styles from './ModalWriteUs.module.scss';

type ModalBaseProps = Pick<ComponentProps<typeof ModalBase>, 'isOpened' | 'onClose'>

type ModalWriteUsProps = ModalBaseProps

export function ModalWriteUs({ isOpened, onClose }: ModalWriteUsProps) {
  return (
    <ModalBase isOpened={isOpened} onClose={onClose}>
      <ModalContent />
    </ModalBase>
  );
}

function ModalContent() {
  const { data: user } = useUser();
  const [isForm, setIsForm] = useState(false);
  const [isThank, setIsThank] = useState(false);

  const mailDisable = !user;
  const buttonActiveClass = mailDisable ? styles.modal__button_disabled : styles.modal__button_active;

  return (
    <div className={styles.modal}>
      {isForm && (
        <ModalHeading>{isThank ? 'Спасибо за Ваш вопрос' : 'Напишите Ваш вопрос:'}</ModalHeading>
      )}
      <div className="modal-content">
        {isForm && !isThank && <ModalWriteUsForm setIsThank={() => setIsThank(true)} />}
        {isForm && isThank && (
          <p className={`${styles.modal__text} typography-text`}>
            Обычно мы отвечаем в течении 24 часов. Бывает быстрее. Но если сейчас
            выходные или праздники, то этот срок может увеличиться до первого рабочего дня.
          </p>
        )}
        {!isForm && (
          <>
            <h5 className={`${styles.modal__title} typography-heading _medium`}>
              Куда вам удобнее ответить?
              <br />
              Там же мы Вам ответим.
            </h5>
            <div className={styles.modal__buttons}>
              <button
                type="button"
                className={`${styles.modal__button} ${buttonActiveClass} typography-menu _bold _middle`}
                onClick={() => !mailDisable && setIsForm(true)}
              >
                <AppIconSprite className={styles.modal__icon} name="mail" />
                На E-mail
              </button>
              <a
                className={`${styles.modal__button} ${styles.modal__button_active} typography-menu _bold _middle`}
                href="https://t.me/babamabot"
                target="_blank"
                rel="noreferrer"
              >
                <AppIconSprite className={styles.modal__icon} name="telega" />В Телеграм
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
