import { ControlProps, components } from 'react-select';
import type { TItem } from '@/components/ui/select/AppSelect';
import styles from './AppControl.module.scss';

type AppControlProps = ControlProps<TItem>;

export function AppControl({
  children, ...props
}: AppControlProps) {
  const disableClass = props.isDisabled ? styles.control_disabled : '';

  return (
    <components.Control className={`${styles.control} ${disableClass}`} {...props}>
      {children}
    </components.Control>
  );
}
