import { components, SingleValueProps } from 'react-select';
import { AppImage } from '@/components/ui/AppImage';
import type { TItem } from '@/components/ui/select/AppSelect';
import styles from './AppSingleValue.module.scss';

type AppValueContainerProps = SingleValueProps<TItem>;

export function AppSingleValue({
  children, data, ...props
}: AppValueContainerProps) {
  const disabledClass = props.isDisabled ? styles.single_value_disabled : '';

  return (
    <components.SingleValue
      className={`${styles.single_value} ${disabledClass} typography-menu _medium _small`}
      data={data}
      {...props}
    >
      {data.icon && <AppImage className={styles.icon} src={data.icon} alt={data.label} width={24} height={24} />}
      {children}
    </components.SingleValue>
  );
}
