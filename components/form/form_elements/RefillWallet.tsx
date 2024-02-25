import { AppInput } from '@/components/ui/inputs/AppInput';
import { getCurrencyFormatPrice } from '@/helpers/price/getCurrencyFormatPrice';
import type { UseFormSetValue, UseFormRegister, UseFormResetField } from 'react-hook-form/dist/types/form';
import type { FormInputPay } from '@/components/account/account_pay/AccountPayForm';
import { ChangeEventHandler, FocusEventHandler } from 'react';
import styles from './RefillWallet.module.scss';

const AMOUNTS = [250, 500, 1000, 2500];

interface RefillWalletProps {
  className?: string
  setValue: UseFormSetValue<FormInputPay>
  register: UseFormRegister<FormInputPay>
  resetField: UseFormResetField<FormInputPay>
}

export function RefillWallet({
  setValue, register, resetField, className,
}: RefillWalletProps) {
  const buttonHandler = (value: string) => {
    setValue('amount', value);
  };
  const focusHandler: FocusEventHandler<HTMLInputElement> = (e) => {
    setValue('amount', e.target.value.replace(/[^\d.,]/g, ''));
  };
  const blurHandler: FocusEventHandler<HTMLInputElement> = (e) => {
    setValue('amount', getCurrencyFormatPrice(e.target.value));
  };
  const changeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue('amount', e.target.value.replace(/[^\d.,]/g, ''));
  };

  return (
    <div className={`${styles.group} ${className}`}>
      <AppInput
        className={styles.input}
        label="Сумма пополнения"
        placeholder="1000 ₽"
        onFocus={focusHandler}
        resetField={resetField}
        {...register('amount', {
          onBlur: blurHandler,
          onChange: changeHandler,
        })}
      />
      <ul className={styles.group__shorts} data-personal-wallet-shortcuts>
        {AMOUNTS.map((val) => (
          <li className={styles.group__shorts__item} key={val}>
            <button
              type="button"
              onClick={() => buttonHandler(getCurrencyFormatPrice(val, { maximumFractionDigits: 0 }))}
              className={`${styles.group__shorts__button} typography-menu _medium _middle`}
            >
              {getCurrencyFormatPrice(val, { maximumFractionDigits: 0 })}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
