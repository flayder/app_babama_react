import Select from 'react-select';
import { AppLabel } from '@/components/ui/inputs/elements/AppLabel';
import { ComponentProps, ReactNode, useId } from 'react';
import { AppOption } from '@/components/ui/select/AppOption';
import { AppControl } from '@/components/ui/select/AppControl';
import { AppSingleValue } from '@/components/ui/select/AppSingleValue';
import { AppPlaceholder } from '@/components/ui/select/AppPlaceholder';
import slstyles from './AppSelect.module.scss';

export type TItem = {
  value: string | number
  label: string
  icon?: string
}

type SelectProps = ComponentProps<typeof Select>
interface AppSelectProps extends Omit<SelectProps, 'components' | 'options'> {
  className?: string;
  label?: string | ReactNode
  height?: number
  items: TItem[]
  styles?: object
}

export function AppSelect({
  className, 
  items, 
  label,
  height = 40, 
  isDisabled, 
  styles, ...props
}: AppSelectProps) {
  const id = useId();

  return (
    <div className={`${className} ${slstyles.select_wrapper}`}>
      {label && <AppLabel disabled={isDisabled} htmlFor={id}>{label}</AppLabel>}
      <Select
        id={id}
        options={items}
        styles={{
          control: (data) => ({
            ...data,
            height,
            ...styles,
          }),
        }}
        isDisabled={isDisabled}
        components={{
          Option: AppOption,
          Control: AppControl,
          SingleValue: AppSingleValue,
          Placeholder: AppPlaceholder,
        }}
        {...props as any}
      />
    </div>
  );
}
