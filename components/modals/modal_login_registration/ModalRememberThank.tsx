import { useEffect } from 'react';
import styles from './ModalRememberForm.module.scss';

interface ModalForgotThankProps {
  onClose: () => void
}

export function ModalRememberThank({ onClose }: ModalForgotThankProps) {
  useEffect(() => {
    setTimeout(() => onClose(), 3000);
  }, [onClose]);

  return (
    <div>
      <p className={`${styles.modal_remember__text} typography-text`}>
        После нажатия кнопки Вам придёт письмо на почту с новым паролем, который Вы сможете сменить в настройках профиля.
      </p>
    </div>
  );
}
