import { BaseLayoutHeader } from '@/components/layouts/base_layout/BaseLayoutHeader';
import type { ReactNode } from 'react';
import styles from './BaseLayout.module.scss';

interface BaseLayoutProps {
  className?: string
  withoutPadding?: boolean
  children: ReactNode
}

export function BaseLayout({ className, withoutPadding, children }: BaseLayoutProps) {
  const wrapperClass = withoutPadding ? styles.wrapper_without_padding : '';

  return (
    <div className="container">
      <div className={`base-layout ${className}`}>
        <BaseLayoutHeader />
        <div className={`${styles.wrapper} ${wrapperClass}`}>
          {children}
        </div>
      </div>
    </div>
  );
}
