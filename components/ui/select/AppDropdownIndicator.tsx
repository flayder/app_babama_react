import { components, DropdownIndicatorProps } from 'react-select';
import type { TItem } from '@/components/ui/select/AppSelect';

type AppIndicatorsContainerProps = DropdownIndicatorProps<TItem>;

export function AppDropdownIndicator({
  children, ...props
}: AppIndicatorsContainerProps) {
  return (
    <components.IndicatorsContainer {...props}>
      {children}
    </components.IndicatorsContainer>
  );
}
