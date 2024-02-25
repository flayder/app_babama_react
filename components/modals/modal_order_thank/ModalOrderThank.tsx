import { ModalBase } from '@/components/ui/modal/ModalBase';
import { ComponentProps } from 'react';
import { ModalHeading } from '@/components/modals/layouts/ModalHeading';
import { AppLink } from '@/components/ui/AppLink';
import { AppIconSprite } from '@/components/ui/Icon_sprite/AppIconSprite';
import { ROUTES } from '@/params';
import { usePathname } from 'next/navigation';
import { useUser } from '@/store/user';
import modal from '../Modal.module.scss';
import styles from './ModalOrderThank.module.scss';

type ModalBaseProps = Pick<ComponentProps<typeof ModalBase>, 'isOpened' | 'onClose'>

type ModalOrderThankProps = ModalBaseProps

export function ModalOrderThank({ isOpened, onClose }: ModalOrderThankProps) {
  return (
    <ModalBase isOpened={isOpened} onClose={onClose}>
      <ModalContent onClose={onClose} />
    </ModalBase>
  );
}

function ModalContent({ onClose }: Pick<ModalOrderThankProps, 'onClose'>) {
  const { data: user } = useUser();
  const pathname = usePathname();

  const clickHandler = () => {
    if (pathname === ROUTES.HISTORY) {
      onClose();
    }
  };

  return (
    <div className={modal.modal}>
      <ModalHeading>Спасибо за заказ!</ModalHeading>
      <div className="modal-content">
        <div className="modal-thanks__wrapper">
          <p className="modal-thanks typography-text">
            Заказ создан и отправлен в работу. Результаты Вы можете увидеть в &quot;Истории заказов&quot;
          </p>
          {user && (
            <AppLink href={ROUTES.HISTORY} onClick={clickHandler} className={`${styles.button} ${styles.button_history}`}>
              <AppIconSprite className={`${styles.button__icon} ${styles.button__icon_ico}`} name="paper" />
              <span className="typography-menu _bold _middle">Перейти в историю заказов</span>
            </AppLink>
          )}
        </div>
      </div>
    </div>
  );
}
