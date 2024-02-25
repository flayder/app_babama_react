import { components, OptionProps } from 'react-select';
import { AppImage } from '@/components/ui/AppImage';
import type { TItem } from '@/components/ui/select/AppSelect';
import styles from './AppOption.module.scss';

type AppOptionProps = OptionProps<TItem>

export function AppOption({
  children, data, isSelected, isFocused, ...props
}: AppOptionProps) {
  const optionClass = getClass(isSelected, isFocused);

  return (
    <components.Option
      className={`${styles.option} ${optionClass} typography-menu _medium _small`}
      data={data}
      isSelected={isSelected}
      isFocused={isFocused}
      {...props}
    >
      {data.icon && (
        <AppImage
          className={styles.icon}
          src={data.icon}
          alt={data.label}
          width={24}
          height={24}
        />
      )}
      {children}
    </components.Option>
  );
}

function getClass(isSelected: boolean, isFocused: boolean): string {
  switch (true) {
    case isSelected: return styles.is_selected;
    case isFocused: return styles.is_focused;
    default: return '';
  }
}
