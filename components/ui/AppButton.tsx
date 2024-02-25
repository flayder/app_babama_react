'use client';

import type {
  MouseEventHandler, ReactNode, ButtonHTMLAttributes,
} from 'react';
import { AppIconSprite } from '@/components/ui/Icon_sprite/AppIconSprite';
import styles from './AppButton.module.scss';

interface AppButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  typeButton?: 'details' | 'repeat' | 'question' | 'personal-wallet' | 'personal-settings' | 'pay'
  onClick?: MouseEventHandler<HTMLButtonElement>
  children?: ReactNode
}
export function AppButton({
  className, children, onClick, type, typeButton = 'details', ...restProps
}: AppButtonProps) {
  const typeButtonClass = typeButton.replace('-', '_');
  const showIcon = typeButton !== 'details' && typeButton !== 'personal-settings' && typeButton !== 'pay' && typeButton !== 'question';

  return (
    // eslint-disable-next-line react/button-has-type
    <button type={type ?? 'button'} className={`${styles[`button__${typeButtonClass}`]} ${className}`} onClick={onClick} {...restProps}>
      {typeButton === 'details' && <div className={styles.button__details__dots} />}
      {typeButton === 'pay' && null}
      {showIcon && <AppIconSprite name={typeButton} className={styles[`button__${typeButtonClass}__icon`]} />}
      {!!children && (
        <span className={styles[`button__${typeButtonClass}__text`]}>
          {children}
        </span>
      )}
    </button>
  );
}
