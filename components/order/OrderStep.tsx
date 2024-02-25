import styles from '@/components/order/OrderStep.module.scss';
import type { ReactNode } from 'react';

interface OrderStepProps {
  title: string
  subtitle: string
  isBig?: boolean
  children: ReactNode;

}
export function OrderStep({
  children, title, subtitle, isBig,
}: OrderStepProps) {
  const bigClassName = isBig ? styles.order_big : '';

  return (
    <div className={`${styles.order__step} ${bigClassName}`}>
      <div className={styles.order__step__heading}>
        <span className={`${styles.order__step__subtitle} typography-menu _regular _small`}>{subtitle}</span>
        <h2 className={`${styles.order__step__title} typography-heading _medium`}>{title}</h2>
      </div>
      {children}
    </div>
  );
}
