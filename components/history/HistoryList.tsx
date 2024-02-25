import type { TOrderHistoryItem } from '@/types/api/order';
import { HistoryListItem } from '@/components/history/HistoryListItem';

interface HistoryListProps {
  list: TOrderHistoryItem[]
}

export function HistoryList({ list }: HistoryListProps) {
  return (
    <ul>
      {list.map((item) => (
        <HistoryListItem item={item} key={item.id} />
      ))}
    </ul>
  );
}
