import {
  ComponentProps, ForwardedRef, forwardRef, InputHTMLAttributes, useId,
} from 'react';
import { AppLabel } from '@/components/ui/inputs/elements/AppLabel';
import styles from './AppTextarea.module.scss';

type AppLabelProps = Pick<ComponentProps<typeof AppLabel>, 'postLabel'>
interface AppTextareaProps extends AppLabelProps, Omit<InputHTMLAttributes<HTMLTextAreaElement>, 'id'> {
  className?: string
  label?: string
  error?: string
}

export const AppTextarea = forwardRef(({
  className, label, postLabel, error, ...restProps
}: AppTextareaProps, ref: ForwardedRef<HTMLTextAreaElement>) => {
  const id = useId();

  return (
    <div className={styles.textarea__wrapper}>
      {label && (
      <AppLabel htmlFor={id as string} postLabel={postLabel}>
        {label}
      </AppLabel>
      )}
      <textarea className={`${styles.textarea} ${className}`} ref={ref} id={id} {...restProps} />
      {error && <div className={`${styles.error} typography-menu _regular _error`}>{error}</div>}
    </div>
  );
});
