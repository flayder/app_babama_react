import { ComponentProps } from 'react';
import { ModalBase } from '@/components/ui/modal/ModalBase';
import modal from '@/components/modals/Modal.module.scss';
import { ModalHeading } from '@/components/modals/layouts/ModalHeading';

type ModalBaseProps = Pick<ComponentProps<typeof ModalBase>, 'isOpened' | 'onClose'>

type ModalOrderRefillProps = ModalBaseProps

export function ModalRefillThank({ onClose, isOpened }: ModalOrderRefillProps) {
  return (
    <ModalBase isOpened={isOpened} onClose={onClose}>
      <ModalContent />
    </ModalBase>
  );
}

function ModalContent() {
  return (
    <div className={modal.modal}>
      <ModalHeading>Заказ отправлен в работу</ModalHeading>
      <div className="modal-content">
        <p className="typography-text">
          Теперь Вы можете в любой момент воспользоваться любыми активностями оплачивая деньгами с баланса.
        </p>
      </div>
    </div>
  );
}
