'use client';

import { AppButton } from '@/components/ui/AppButton';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { setUser } from '@/helpers/api/user';
import { AppInput } from '@/components/ui/inputs/AppInput';
import { useUser } from '@/store/user';
import personal from '../Account.module.scss';

const SCHEMA = z.object({
  old_password: z.string().min(4, 'Минимальная длина 4 символа'),
  new_password: z.string().min(4, 'Минимальная длина 4 символа'),
  password_confirm: z.string().min(4, 'Минимальная длина 4 символа'),
}).refine((data) => data.new_password === data.password_confirm, {
  message: 'Пароли не совпадают',
  path: ['password_confirm'],
});

type FormInput = z.infer<typeof SCHEMA>;

export function AccountSettingsPasswordForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { dirtyFields, errors },
  } = useForm<FormInput>({
    resolver: zodResolver(SCHEMA),
  });

  const buttonEnable = !!Object.keys(dirtyFields).length;

  const submitHandler = async ({ new_password, old_password }: FormInput) => {
    try {
      const response = await setUser({ new_password, old_password });

      useUser.setState(response);
      reset();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form
      className={`${personal.personal__content__wrapper} ${personal.personal__wrapper}`}
      onSubmit={handleSubmit(submitHandler)}
    >
      <h4 className={`${personal.personal__wrapper__heading} typography-heading _medium`}>
        Смена пароля:
      </h4>
      <AppButton
        type="submit"
        typeButton="personal-settings"
        disabled={!buttonEnable}
        className={`${personal.personal__submit} typography-menu _bold`}
      >
        Сохранить
      </AppButton>
      <div className={personal.personal__group}>
        <div className={personal.personal__group__wrapper}>
          <AppInput
            type="password"
            label="Старый пароль"
            placeholder="Старый пароль"
            error={errors?.old_password?.message}
            {...register('old_password')}
          />
        </div>
        <div className={personal.personal__group__wrapper}>
          <AppInput
            type="password"
            label="Новый пароль"
            placeholder="Новый пароль"
            error={errors?.new_password?.message}
            {...register('new_password')}
          />
        </div>
        <div className={personal.personal__group__wrapper}>
          <AppInput
            type="password"
            label="Подтвердите новый пароль"
            placeholder="Подтвердите новый пароль"
            error={errors?.password_confirm?.message}
            {...register('password_confirm')}
          />
        </div>
      </div>
    </form>
  );
}
