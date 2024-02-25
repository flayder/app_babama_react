'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { AppInput } from '@/components/ui/inputs/AppInput';
import { AppButton } from '@/components/ui/AppButton';
import { setUser } from '@/helpers/api/user';
import { useUser } from '@/store/user';
import { useState } from 'react';
import { getExampleEmail } from '@/helpers/string/getExampleEmail';
import personal from '../Account.module.scss';

const SCHEMA = z.object({
  email: z.string().email({ message: 'Введите email' }),
  firstname: z.string(),
  date: z.string(),
});

type FormInput = z.infer<typeof SCHEMA>;

export function AccountSettingsDataForm() {
  const { data: user } = useUser();

  const {
    register,
    handleSubmit,
  } = useForm<FormInput>({
    defaultValues: {
      email: user?.email || '',
      firstname: user?.firstname || '',
      date: user?.created_at ? new Date(user.created_at).toISOString().split('T')[0] : '',
    },
    resolver: zodResolver(SCHEMA),
  });

  const [buttonEnable, setButtonEnable] = useState(false);

  const changeHandler = () => setButtonEnable(true);

  const submitHandler = async ({ firstname, email }: FormInput) => {
    try {
      const response = await setUser({ firstname, email });

      useUser.setState(response);

      setButtonEnable(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form
      className={`${personal.personal__content__wrapper} ${personal.personal__wrapper}`}
      onSubmit={handleSubmit(submitHandler)}
    >
      <h4 className={`${personal.personal__wrapper__heading} typography-heading _medium`}>Общие данные:</h4>
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
            type="email"
            label="Ваш email"
            placeholder={getExampleEmail()}
            {...register('email', {
              onChange: changeHandler,
            })}
          />
        </div>
        <div className={personal.personal__group__wrapper}>
          <AppInput
            type="text"
            label="Ваше имя"
            placeholder="Тимофей"
            {...register('firstname', {
              onChange: changeHandler,
            })}
          />
        </div>
        <div className={personal.personal__group__wrapper}>
          <AppInput type="date" label="Дата регистрации" placeholder="01.02.2020" disabled {...register('date')} />
        </div>
      </div>
    </form>
  );
}
