import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { AppIconSprite } from '@/components/ui/Icon_sprite/AppIconSprite';
import { AppInput } from '@/components/ui/inputs/AppInput';
import { userLogin } from '@/helpers/api/user';
import { useUser } from '@/store/user';
import { getExampleEmail } from '@/helpers/string/getExampleEmail';
import styles from './ModalLoginForm.module.scss';

const SCHEMA = z.object({
  email: z.string().email({ message: 'Введите email' }),
  password: z.string().min(4, 'Минимальная длина 4 символа'),
});

type FormInput = z.infer<typeof SCHEMA>;

interface ModalLoginFormProps {
  setRemember: () => void
  onClose: () => void
}

export function ModalLoginForm({ setRemember, onClose }: ModalLoginFormProps) {
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm<FormInput>({
    defaultValues: { email: '', password: '' },
    resolver: zodResolver(SCHEMA),
  });

  const submitHandler = async (data: FormInput) => {
    try {
      const response = await userLogin(data);

      useUser.setState({ data: response });

      onClose();
    } catch (e: any) {
      setError('password', { message: e.response.data?.message });
    }
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
      <div className={styles.form__entry__buttons}>
        <button className={styles.form__entry__button} data-modal-registration-enter type="submit">
          <AppIconSprite className={styles.form__entry__button__icon} name="entry" />
          <span className={`${styles.form__entry__button__text} typography-menu _bold _middle`}>Войти</span>
        </button>
        <button type="button" className={`${styles.form__entry__remember} typography-menu _bold _middle`} onClick={setRemember}>
          Забыли пароль?
        </button>
      </div>
    </form>
  );
}
