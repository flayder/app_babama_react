import styles from '@/components/order/OrderTitle.module.scss';

interface OrderTitleProps {
  title: string
  description: string
}

export function OrderTitle({
  title, description,
}: OrderTitleProps) {
  return (
    <div className="container _as-xs">
      <h1 className={`${styles.title} typography-heading`}>{title}</h1>
      <p className={`${styles.description} typography-paragraph`}>{description}</p>
    </div>
  );
}
