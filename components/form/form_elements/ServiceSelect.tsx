import { Controller } from 'react-hook-form';
import { AppSelect } from '@/components/ui/select/AppSelect';
import type { Control } from 'react-hook-form/dist/types/form';
import type { TPaymentSystem } from '@/types/api/payment';

interface TPaySystem extends TPaymentSystem {
  label: string
}

interface ServiceSelectProps {
  className?: string
  control: Control<any>
  paySystems: TPaySystem[]
}

export function ServiceSelect({
  control, paySystems, className,
}: ServiceSelectProps) {
  return (
    <Controller
      render={({ field: { onChange, value } }) => (
        <AppSelect
          className={className}
          label="Платежная система"
          items={paySystems}
          value={paySystems.find((c) => c.value === value)}
          onChange={(val: any) => onChange(val.value)}
        />
      )}
      name="platform"
      control={control}
    />
  );
}
