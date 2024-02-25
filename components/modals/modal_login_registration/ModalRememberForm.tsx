import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { AppInput } from '@/components/ui/inputs/AppInput';
import { AppIconSprite } from '@/components/ui/Icon_sprite/AppIconSprite';
import { forgotPassword } from '@/helpers/api/user';
import { getExampleEmail } from '@/helpers/string/getExampleEmail';
import styles from './ModalRememberForm.module.scss';

const SCHEMA = z.object({
  email: z.string().email({ message: 'Введите email' }),
});

type FormInput = z.infer<typeof SCHEMA>;

interface ModalRememberFormProps {
  setLogin: () => void
  setThank: () => void
}

export function ModalRememberForm({ setLogin, setThank }: ModalRememberFormProps) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormInput>({
    defaultValues: { email: '' },
    resolver: zodResolver(SCHEMA),
  });

  const submitHandler = async (data: FormInput) => {
    await forgotPassword(data.email);

    setThank();
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <p className={`${styles.modal_remember__text} typography-text`}>
        После нажатия кнопки Вам придёт письмо на почту с новым паролем, который Вы сможете сменить в настройках профиля.
      </p>
      <AppInput
        type="email"
        label="Ваш email"
        placeholder={getExampleEmail()}
        error={errors?.email?.message}
        {...register('email')}
      />
      <div className={styles.modal_remember__buttons}>
        <button className={styles.modal_remember__button} type="submit">
          <AppIconSprite className={styles.modal_remember__button__icon} name="refresh" />
          <span className={`${styles.modal_remember__button__text} typography-menu _bold _middle`}>Восстановить</span>
        </button>
        <button type="button" className={`${styles.modal_remember__remember} typography-menu _bold _middle`} onClick={setLogin}>
          Вернуться ко входу
        </button>
      </div>
    </form>
  );
}
