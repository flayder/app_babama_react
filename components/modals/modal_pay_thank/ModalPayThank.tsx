import type { ComponentProps } from 'react';
import { ModalBase } from '@/components/ui/modal/ModalBase';
import { useUser } from '@/store/user';
import { ROUTES } from '@/params';
import { ModalHeading } from '@/components/modals/layouts/ModalHeading';
import { AppLink } from '@/components/ui/AppLink';
import { AppIconSprite } from '@/components/ui/Icon_sprite/AppIconSprite';
import modal from '@/components/modals/Modal.module.scss';
import { ModalWriteUs } from '@/components/modals/modal_write_us/ModalWriteUs';
import { useState } from 'react';
import styles from './ModalPayThank.module.scss';

type ModalBaseProps = Pick<ComponentProps<typeof ModalBase>, 'isOpened' | 'onClose'>

type ModalPayThankProps = ModalBaseProps & {
  isNewUser: boolean
}

export function ModalPayThank({ isOpened, onClose, ...restProps }: ModalPayThankProps) {
  return (
    <ModalBase isOpened={isOpened} onClose={onClose}>
      <ModalContent onClose={onClose} {...restProps} />
    </ModalBase>
  );
}

function ModalContent({ isNewUser, onClose }: Pick<ModalPayThankProps, 'isNewUser' | 'onClose'>) {
  const { data: user } = useUser();
  const [writeUsOpened, setWriteUsOpened] = useState(false);

  const writeUsHandler = () => setWriteUsOpened((prev) => !prev);
  const orderClickHandler = () => onClose();

  return (
    <div className={modal.modal}>
      <ModalHeading>Заказ отправлен в работу</ModalHeading>
      <div className="modal-content">
        {isNewUser && (
          <p className={`${styles.text} typography-text`}>
            Вы можете отслеживать процесс выполнения в &quot;Истории Заказа&quot;. А так же, на Вашу почту мы только что отправили
            пароль по которому Вы можете заходить в свой личный кабинет на нашем сервисе.
            <br />
            <br />
            А если что-то пошло не так или есть вопросы,
            то пишите в <button type="button" onClick={writeUsHandler} className="typography-menu _link">техподдержку</button>
          </p>
        )}
        {!user && (
          <p className={`${styles.text} typography-text`}>
            Вы можете отслеживать процесс выполнения в &quot;Истории Заказа&quot;. Но перед этим Вам нужно авторизоваться в личном
            кабинете.
            <br />
            <br />
            Если не помните доступ, воспользуйтесь восстановления пароля или проверьте Вашу почту, он был отправлен туда при
            первом заказе. А если что-то пошло не так или есть вопросы,
            то пишите в <button type="button" onClick={writeUsHandler} className="typography-menu _link">техподдержку</button>
          </p>
        )}
        {user && !isNewUser && (
          <p className={`${styles.text} typography-text`}>
            Вы можете отслеживать процесс выполнения в &quot;Истории Заказа&quot;.
            <br />
            <br />А если что-то пошло не так или есть вопросы,
            то пишите в <button type="button" onClick={writeUsHandler} className="typography-menu _link">техподдержку</button>
          </p>
        )}
        {user && (
          <AppLink href={ROUTES.HISTORY} onClick={orderClickHandler} className={`${styles.button} ${styles.button_history}`}>
            <AppIconSprite className={`${styles.button__icon} ${styles.button__icon_ico}`} name="paper" />
            <span className="typography-menu _bold _middle">История заказов</span>
          </AppLink>
        )}
      </div>
      <ModalWriteUs isOpened={writeUsOpened} onClose={writeUsHandler} />
    </div>
  );
}
