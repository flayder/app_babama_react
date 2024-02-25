import type { ReactNode } from 'react';
import styles from './AppLabel.module.scss';

interface AppLabelProps {
  htmlFor: string
  postLabel?: string
  disabled?: boolean
  children: ReactNode | string;
}

export function AppLabel({
  htmlFor, children, postLabel, disabled,
}: AppLabelProps) {
  const disabledClass = disabled ? styles.label_disabled : '';

  return (
    <label className={`${styles.label} ${disabledClass} typography-menu _regular`} htmlFor={htmlFor}>
      {children}
      {postLabel && <span className="typography-menu _regular _small">{postLabel}</span>}
    </label>
  );
}
