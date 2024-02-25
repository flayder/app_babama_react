import { ModalPortal } from '@/components/ui/modal/ModalPortal';
import type { ReactNode } from 'react';
import { AppIconSprite } from '@/components/ui/Icon_sprite/AppIconSprite';
import styles from './ModalBase.module.scss';

interface ModalBaseProps {
  isOpened: boolean
  onClose: () => void
  children: ReactNode;
}

export function ModalBase({
  onClose, isOpened, children,
}: ModalBaseProps) {
  if (!isOpened) return null;

  return (
    <ModalPortal>
      <div className={styles.modal}>
        <div className={styles.modal__overlay} onClick={onClose} aria-hidden />
        <div className={styles.modal__wrapper}>
          <button type="button" className={styles.modal__close} onClick={onClose}>
            <AppIconSprite name="close" className={styles.modal__close__icon} />
          </button>
          {children}
        </div>
      </div>
    </ModalPortal>
  );
}
