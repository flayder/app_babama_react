'use client';

import { useRef, useState } from 'react';
import styles from '@/components/order/order_service/OrderService.module.scss';
import { AppIconSprite } from './Icon_sprite/AppIconSprite';
import { PopoverBase } from './modal/PopoverBase';
import nstyles from './AppNotification.module.scss';

interface ServiceLabelProps {
  label: string
  content: string
  disabled?: boolean
  theme?: 'dark' | 'light'
}

export function AppNotification({
  label, content, disabled = false, theme = 'light',
}: ServiceLabelProps) {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const iconRef = useRef(null);

  const formattedDescription = content.replace(/\n/g, '<br>');

  const mouseEnterHandler = () => {
    !disabled && setPopoverOpen(true);
    if (theme === 'dark') {
      setTimeout(() => {
        document.querySelector('div[class*="PopoverBase_popover"]')?.classList.add('dark');
      }, 1);
    }
  };

  return (
    <div
      className={styles.service_label}
      onMouseLeave={() => setPopoverOpen(false)}
      onMouseEnter={mouseEnterHandler}
    >
      <span dangerouslySetInnerHTML={{ __html: label }} />
      <AppIconSprite
        ref={iconRef}
        className={`${styles.icon} ${disabled ? styles.icon_disabled : ''}`}
        name="question"
      />
      <PopoverBase className="tttest" reference={iconRef.current} isOpened={popoverOpen}>
        <div className={nstyles.text} dangerouslySetInnerHTML={{ __html: formattedDescription }} />
      </PopoverBase>
    </div>
  );
}
