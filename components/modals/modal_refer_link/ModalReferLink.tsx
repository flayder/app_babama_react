import type { ChangeEventHandler, ComponentProps, KeyboardEventHandler } from 'react';
import type { TPromocodeAPI } from '@/types/api/promocode';
import { ModalBase } from '@/components/ui/modal/ModalBase';
import { ModalHeading } from '@/components/modals/layouts/ModalHeading';
import { AppInput } from '@/components/ui/inputs/AppInput';
import modal from '@/components/modals/Modal.module.scss';
import { useState } from 'react';
import { AppIconSprite } from '@/components/ui/Icon_sprite/AppIconSprite';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createLink } from '@/helpers/api/refs';
import styles from './ModalReferLink.module.scss';

const SCHEMA = z.object({
  link: z.string().min(4, 'Минимальная длина 4 символа'),
});

type FormInput = z.infer<typeof SCHEMA>;

type ModalBaseProps = Pick<ComponentProps<typeof ModalBase>, 'isOpened' | 'onClose'>

type ModalReferLinkProps = ModalBaseProps & {
  onSuccess: (success: boolean) => void
}

export function ModalReferLink({
  onClose, isOpened, ...restProps
}: ModalReferLinkProps) {
  return (
    <ModalBase isOpened={isOpened} onClose={onClose}>
      <ModalContent onClose={onClose} {...restProps} />
    </ModalBase>
  );
}

type ModalContentProps = Pick<ModalReferLinkProps, 'onClose' | 'onSuccess'>

function ModalContent({
  onClose,
  onSuccess,
}: ModalContentProps) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormInput>({
    defaultValues: { link: '' },
    resolver: zodResolver(SCHEMA),
  });

  const [success, setSuccess] = useState(false);
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const changeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
    if (error) {
      setError('');
    }
  };

  const submitHandler = async () => {
    try {
      const response = await createLink({ link: value });
      setValue('');
      setSuccess(true);
      onSuccess(true);
      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (e: any) {
      console.log('e', e);
      errors.link = e.response?.data?.message;
      setError(e.response?.data?.message);
    }
  };

  // const keyDownHandler: KeyboardEventHandler<HTMLDivElement> = (e) => {
  //   if (e.key === 'Enter') submitHandler();
  // };
  // onKeyDown={keyDownHandler}
  return (
    <div className={modal.modal}>
      <ModalHeading>Партнерская программа</ModalHeading>
      <div className="modal-content" role="presentation">
        <form onSubmit={handleSubmit(submitHandler)}>
          {success && <p className={`${styles.text} typography-text`}>Реферальная ссылка успешно создана!</p>}
          {!success && (
<>
            <div className={styles.label}>Реферальный код</div>
            <AppInput
              placeholder="Babama@ya.ru"
              className="typography-menu _medium _big"
              error={errors?.link?.message ?? error}
              // value={value}
              onChangeCapture={changeHandler}
              {...register('link')}
            />
          </>
)}

          {
            value
              ? (
                <div className={styles.link_block}>
                  {!errors?.link?.message && !error && <AppIconSprite name="check-fill" />}
                  <span style={{ marginTop: !errors?.link?.message && !error ? 0 : 10 }}>
                    https://babama.ru/r/{value}
                  </span>
                </div>
              )
              : <></>
          }
          {!success && (
<div className={styles.btn_wrap}>
            <button
              className={`${styles.promocode__button_return} typography-menu _bold _middle`}
              type="button"
              onClick={() => onClose()}
            >
              Отменить
            </button>
            <button className={`${styles.promocode__button} typography-menu _bold _middle`} type="submit">
              Добавить
            </button>

          </div>
)}
        </form>
      </div>
    </div>
  );
}
