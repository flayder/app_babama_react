import type { TFaqElem } from '@/types/api/static-pages';
import { FaqItem } from '@/components/static_pages/faq/FaqItem';
import styles from './FaqGroup.module.scss';

interface FaqGroupProps {
  elem: TFaqElem
}
export function FaqGroup({ elem }: FaqGroupProps) {
  const { heading, items } = elem ?? {};

  return (
    <div className={styles.faq_group}>
      <h3 className={`${styles.faq_group__heading} typography-heading _medium`}>{heading}</h3>
      <ul className="faq-group__list">
        {items.map((item) => (
          <FaqItem item={item} key={item.title} />
        ))}
      </ul>
    </div>
  );
}
