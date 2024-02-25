import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { AppInput } from '@/components/ui/inputs/AppInput';
import { AppTextarea } from '@/components/ui/inputs/AppTextarea';
import { addQuestion } from '@/helpers/api/user';
import { useUser } from '@/store/user';
import { getExampleEmail } from '@/helpers/string/getExampleEmail';
import styles from './ModalWriteUsForm.module.scss';

const SCHEMA = z.object({
  name: z.string().nonempty({ message: 'Введите имя' }),
  email: z.string().email({ message: 'Введите email' }),
  message: z.string().max(1000).nonempty('Поле message является обязательным.'),
});

type FormInput = z.infer<typeof SCHEMA>;

interface ModalWriteUsFormProps {
  setIsThank: () => void
}

export function ModalWriteUsForm({ setIsThank }: ModalWriteUsFormProps) {
  const { data: user } = useUser();

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<FormInput>({
    defaultValues: {
      email: user?.email || '',
      name: user?.firstname || '',
      message: '',
    },
    resolver: zodResolver(SCHEMA),
  });

  const submitHandler = async (data: FormInput) => {
    try {
      await addQuestion({ ...data, subject: 'Собщения на email' });

      setIsThank();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <AppInput
        type="text"
        label="Ваше имя"
        placeholder="Как заказать раскрутку?"
        error={errors?.name?.message}
        {...register('name')}
      />
      <AppInput
        type="email"
        label="Ваш email (куда отправить)"
        placeholder={getExampleEmail()}
        error={errors?.email?.message}
        {...register('email')}
      />
      <AppTextarea
        className="typography-menu _regular _small"
        type="text"
        label="Ваш вопрос"
        placeholder="Пример вопроса"
        maxLength={1000}
        postLabel={`${watch('message').length}/1000`}
        error={errors?.message?.message}
        {...register('message')}
      />
      <div className={styles.form__buttons}>
        <button
          className={`${styles.form__button} typography-menu _bold _middle`}
          type="submit"
        >
          Отправить
        </button>
      </div>
    </form>
  );
}
