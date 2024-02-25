import { AppLink } from '@/components/ui/AppLink';
import { ROUTES } from '@/params';
import styles from './PaymentFailed.module.scss';

export function PaymentFailed() {
  return (
    <div className="page-home">
      <div className="container">
        <h1 className={styles.payment_failed}>Неудача попробуйте снова!</h1>
        <div className={styles.payment_failed__buttons}>
          <AppLink href={ROUTES.INDEX} className={styles.payment_failed__button}>
            Вернутся обратно
          </AppLink>
        </div>
      </div>
    </div>
  );
}
