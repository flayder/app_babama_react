import type { ChangeEventHandler, ComponentProps, KeyboardEventHandler } from 'react';
import type { TPromocodeAPI } from '@/types/api/promocode';
import { ModalBase } from '@/components/ui/modal/ModalBase';
import { ModalHeading } from '@/components/modals/layouts/ModalHeading';
import { AppInput } from '@/components/ui/inputs/AppInput';
import { validatePromocode } from '@/helpers/api/promocode';
import modal from '@/components/modals/Modal.module.scss';
import { useState } from 'react';
import styles from './ModalPromocode.module.scss';

type ModalBaseProps = Pick<ComponentProps<typeof ModalBase>, 'isOpened' | 'onClose'>

type ModalPromocodeProps = ModalBaseProps & {
  email: string
  promocode: TPromocodeAPI | null
  setPromocode: (promocode: TPromocodeAPI | null) => void
}

export function ModalPromocode({
  onClose, isOpened, ...restProps
}: ModalPromocodeProps) {
  return (
    <ModalBase isOpened={isOpened} onClose={onClose}>
      <ModalContent onClose={onClose} {...restProps} />
    </ModalBase>
  );
}

type ModalContentProps = Pick<ModalPromocodeProps, 'onClose' | 'email' | 'promocode' | 'setPromocode'>

function ModalContent({
  onClose, email, setPromocode, promocode,
}: ModalContentProps) {
  const [changed, setChanged] = useState(false);
  const [success, setSuccess] = useState(false);
  const [value, setValue] = useState(promocode?.code || '');
  const [error, setError] = useState('');

  const changeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
    setChanged(e.target.value !== promocode?.code);
  };

  const submitHandler = async () => {
    try {
      const response = await validatePromocode({ code: value, email });

      setSuccess(true);
      setPromocode(response);
    } catch (e: any) {
      setError(e.response.data?.message);
    }
  };

  const keyDownHandler: KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === 'Enter') submitHandler();
  };

  return (
    <div className={modal.modal}>
      <ModalHeading>{!promocode ? 'Активация промокода' : 'Ваш промокод активирован'}</ModalHeading>
      <div className="modal-content" onKeyDown={keyDownHandler} role="presentation">
        {success && <p className={`${styles.text} typography-text`}>{promocode?.message}</p>}
        {!success && (
        <AppInput
          placeholder="********"
          className="typography-menu _medium _big"
          error={error}
          value={value}
          onChange={changeHandler}
        />
        )}
        {(!promocode || changed) && (
          <button className={`${styles.promocode__button} typography-menu _bold _middle`} onClick={submitHandler} type="button">
            Активировать
          </button>
        )}
        {promocode?.code && !changed && (
          <button
            className={`${styles.promocode__button_return} typography-menu _bold _middle`}
            type="button"
            onClick={() => onClose()}
          >
            Вернуться на страницу оплаты
          </button>
        )}
      </div>
    </div>
  );
}
