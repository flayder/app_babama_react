import { ReactNode } from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import styles from './AppScrollbar.module.scss';
import { AppIconSprite } from './Icon_sprite/AppIconSprite';

interface AppScroollbarProps {
  children: ReactNode
} 

export function AppScroollbar({ children }: AppScroollbarProps) {
  return (
    <div className={styles.scroll}>
      <AppIconSprite className={styles.swipe} name="swipe" />
      <Scrollbars
        autoHeight
        universal
        autoHideTimeout={1000}
        autoHeightMax={50000}
      >
        {children}
      </Scrollbars>
    </div>
  );
}
