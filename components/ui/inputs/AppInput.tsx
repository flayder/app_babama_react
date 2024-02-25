'use client';

import type {
  ForwardedRef, InputHTMLAttributes, MouseEventHandler, ReactNode,
} from 'react';
import { forwardRef, useId, useState } from 'react';
import { AppLabel } from '@/components/ui/inputs/elements/AppLabel';
import { AppIconSprite } from '@/components/ui/Icon_sprite/AppIconSprite';
import type { UseFormSetValue, UseFormResetField, UseFormGetValues } from 'react-hook-form/dist/types/form';
import classNames from 'classnames';
import styles from './AppInput.module.scss';

interface BaseInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> {
  className?: string
  setValue?: UseFormSetValue<any>
  getValues?: UseFormGetValues<any>
  resetField?: UseFormResetField<any>
  underInputText?: string
  label?: ReactNode | string
  error?: string
}

export const AppInput = forwardRef(({
  className, label, error, type, disabled, resetField, name, setValue,
  getValues, underInputText, value, min, max, step = 1, ...restProps
}: BaseInputProps, ref: ForwardedRef<HTMLInputElement>) => {
  const id = useId();
  const [inputType, setInputType] = useState(type);

  const showIcon = type === 'password';
  const iconName = inputType === 'text' ? 'hide' : 'show';
  const numberTypeClass = type === 'number' ? styles.input__number : '';

  const iconClickHandler: MouseEventHandler<HTMLButtonElement> = () => {
    if (type !== 'password') return;

    setInputType((prev) => (prev === 'password' ? 'text' : 'password'));
  };

  const numberHandler = (plus = true) => () => {
    if (!setValue || !getValues) return;

    const currValue = getValues(name as string);

    if (plus) {
      setValue(name as string, max && currValue >= +max ? currValue : +currValue + +step);
    } else {
      setValue(name as string, min && currValue <= +min ? currValue : +currValue - +step);
    }
  };

  const errorClassName = classNames('typography-menu _regular _error', styles.error);
  const underInputTextClassName = classNames('typography-menu _regular _small', { [styles.post_input_disable]: disabled });

  return (
    <div className={` ${className} ${styles.block}`}>
      {label && (
        <AppLabel disabled={disabled} htmlFor={id}>
          {label}
        </AppLabel>
      )}
      <div className={styles.wrapper}>
        {type === 'number' && (
          <div className={`${styles.buttons} ${styles.buttons_left}`}>
            <button
              className={`${styles.icon_button} ${styles.icon_button_purple} ${styles.icon_button_left}`}
              type="button"
              disabled={disabled}
              onClick={numberHandler(false)}
            >
              <AppIconSprite className={styles.icon_button__icon} name="minus-square" size={24} />
            </button>
          </div>
        )}
        <input
          name={name}
          className={`${styles.input} ${numberTypeClass} typography-menu _medium _big`}
          value={value}
          step={step}
          type={inputType}
          ref={ref}
          id={id}
          disabled={disabled}
          {...restProps}
        />
        <div className={styles.buttons}>
          {type === 'number' && (
            <button
              className={`${styles.icon_button} ${styles.icon_button_purple}`}
              disabled={disabled}
              type="button"
              onClick={numberHandler()}
            >
              <AppIconSprite className={styles.icon_button__icon} name="plus-square" size={24} />
            </button>
          )}
          {!!resetField && (
            <button
              className={styles.icon_button}
              disabled={disabled}
              type="button"
              onClick={() => resetField(name as string)}
            >
              <AppIconSprite className={styles.icon_button__icon} name="clean" size={24} />
            </button>
          )}
          {showIcon && (
            <button
              className={styles.icon_button}
              disabled={disabled}
              type="button"
              onClick={iconClickHandler}
            >
              <AppIconSprite className={styles.icon_button__icon} name={iconName} size={24} />
            </button>
          )}
        </div>
        {(error) && <div className={errorClassName}>{error}</div>}
      </div>
      {underInputText && <p className={underInputTextClassName}>{underInputText}</p>}
    </div>
  );
});
