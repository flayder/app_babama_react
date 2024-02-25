import type { ReactNode } from 'react';
import { LkLayoutHeader } from '@/components/layouts/lk_layout/LkLayoutHeader';
import styles from './LkLayout.module.scss';

interface LkLayoutProps {
  className?: string
  children: ReactNode
  isHeader?: boolean
}

export function LkLayout({ className, children, isHeader = true }: LkLayoutProps) {
  return (
    <div className="container">
      <div className={`base-layout ${className}`}>
        <div className={`${styles.wrapper}`}>
          {
            isHeader
              ? <LkLayoutHeader />
              : <div></div>
          }
          {children}
        </div>
      </div>
    </div>
  );
}
