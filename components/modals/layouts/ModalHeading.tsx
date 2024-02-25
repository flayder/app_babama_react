import type { ReactNode } from 'react';
import styles from './ModalHeading.module.scss';

interface HeadingProps {
  className?: string;
  children: ReactNode | string;
}

export function ModalHeading({
  className,
  children,
}: HeadingProps) {
  return (
    <div className={`${styles.heading} ${className}`}>
      <div className={`${styles.heading__title} typography-menu _medium _big`}>
        {children}
      </div>
    </div>
  );
}
