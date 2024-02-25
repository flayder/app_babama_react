import { useRef, useState } from 'react';
import styles from '@/components/order/order_service/OrderService.module.scss';
import { AppIconSprite } from './Icon_sprite/AppIconSprite';
import { PopoverBase } from './modal/PopoverBase';
import nstyles from './AppNotification.module.scss';

interface AppCopyProps {
  label: string
}

export function AppCopy({ label } : AppCopyProps) {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const iconRef = useRef(null);

  const mouseClickHandler = async () => {
    await navigator.clipboard.writeText(label);
    setPopoverOpen(true);

    setTimeout(() => {
      setPopoverOpen(false);
    }, 3000);
  };

  return (
    <div
      className={styles.service_label}
      onClick={mouseClickHandler}
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <AppIconSprite
        ref={iconRef}
        className={`${styles.icon}`}
        name={`copy${hover ? '-active' : ''}`}
      />
      <PopoverBase className="tttest" reference={iconRef.current} isOpened={popoverOpen}>
        <div className={nstyles.text} dangerouslySetInnerHTML={{ __html: 'Скорпировано' }} />
      </PopoverBase>
    </div>
  );
}
