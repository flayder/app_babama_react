import { PlaceholderProps, components } from 'react-select';
import type { TItem } from '@/components/ui/select/AppSelect';
import styles from './AppPlaceholder.module.scss';

type AppPlaceholderProps = PlaceholderProps<TItem>;

export function AppPlaceholder({
  children, ...props
}: AppPlaceholderProps) {
  const disabledClass = props.isDisabled ? styles.placeholder_disabled : '';

  return (
    <components.Placeholder className={`${styles.placeholder} ${disabledClass} typography-menu _medium _small`} {...props}>
      {children}
    </components.Placeholder>
  );
}
