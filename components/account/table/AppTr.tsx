import { TRefer } from '@/types/api/refers';
import { useState } from 'react';
import { AppCopy } from '@/components/ui/AppCopy';
import { AppDelete } from '@/components/ui/AppDelete';
import styles from './AppTr.module.scss';

interface AppTrProps {
    item: TRefer
    onDeleted: (deleted: boolean) => void
}

export function AppTr({ item, onDeleted } : AppTrProps) {
    const [disbaled, setDisabled] = useState(item.deleted);

    const deleteHandler = (deleted: boolean) => {
        setDisabled(deleted);
        onDeleted(deleted);
    };

    return (
<tr className={`${styles.tr} ${disbaled ? 'disabled' : ''}`}>
    <td>
      <span className="wrapper">
        <span className="link">
            {item.link}
        </span>
        <span className="btns">
            <AppCopy label={item.link} />
            <AppDelete deleted={item.deleted} onClick={deleteHandler} />
        </span>
      </span>
    </td>
    <td>
      {item.visits}
    </td>
    <td>
      {item.balanced}
    </td>
    <td>
      {item.conversion}%
    </td>
    <td>
      {item.earn} ₽
    </td>
  </tr>
);
  }
