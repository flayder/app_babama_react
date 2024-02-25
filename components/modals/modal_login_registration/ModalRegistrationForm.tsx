'use client';

import { AppInput } from '@/components/ui/inputs/AppInput';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { AppIconSprite } from '@/components/ui/Icon_sprite/AppIconSprite';
import { userSignup } from '@/helpers/api/user';
import { useUser } from '@/store/user';
import { getExampleEmail } from '@/helpers/string/getExampleEmail';
import { useEffect, useRef, useState } from 'react';
import Cookies from 'js-cookie';
import styles from './ModalRegistrationForm.module.scss';

const SCHEMA = z.object({
  email: z.string().email({ message: 'Введите email' }),
  password: z.string().min(4, 'Минимальная длина 4 символа'),
  password_confirmation: z.string().min(4, 'Минимальная длина 4 символа'),
  ref: z.string(),
}).refine((data) => data.password === data.password_confirmation, {
  message: 'Пароли не совпадают',
  path: ['password_confirmation'],
});

type FormInput = z.infer<typeof SCHEMA>;

interface ModalRegistrationFormProps {
  onClose: () => void
}

export function ModalRegistrationForm({ onClose }: ModalRegistrationFormProps) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormInput>({
    defaultValues: {
 email: '', password: '', password_confirmation: '', ref: '', 
},
    resolver: zodResolver(SCHEMA),
  });

  const [ref, setRef] = useState('');

  useEffect(() => {
    const ref = Cookies.get('ref');

    if (ref && typeof ref === 'string') {
      setRef(ref);
      register('ref', { value: ref });
    }
  }, []);

  const submitHandler = async (data: FormInput) => {
    data.ref = ref;
    const response = await userSignup(data);
    useUser.setState({ data: response });
    if (ref) {
      Cookies.remove('ref');
    }
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <AppInput
        type="email"
        label="Ваш email"
        placeholder={getExampleEmail()}
        error={errors?.email?.message}
        {...register('email')}
      />
      <AppInput
        type="password"
        label="Ваш пароль"
        placeholder="Password12345678"
        error={errors?.password?.message}
        {...register('password')}
      />
      <AppInput
        type="password"
        label="Ваш пароль"
        placeholder="Password12345678"
        error={errors?.password_confirmation?.message}
        {...register('password_confirmation')}
      />
      <AppInput
        type="text"
        label="Реферальный код"
        onChangeCapture={({ target }: any) => {
          setRef(target.value);
        }}
        value={ref}
        {...register('ref')}
      />
      <div className={styles.wrapper} data-modal-registration-refresh>
        <p className="typography-menu _regular _small">
          Я принимаю условия оферты и даю СОГЛАСИЕ на обработку своих персональных данных на условиях, указанных в политике
          конфиденциальности
        </p>
      </div>
      <button className={styles.modal_registration__reg__button} data-modal-registration-reg-button type="submit">
        <AppIconSprite className={styles.modal_registration__reg__button__icon} name="check-square" />
        <span className={`${styles.modal_registration__reg__button__text} typography-menu _bold _middle`}>
          Зарегистрироваться
        </span>
      </button>
    </form>
  );
}
