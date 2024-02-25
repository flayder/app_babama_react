import { ForwardedRef, forwardRef, MouseEventHandler } from 'react';
import styles from './AppIconSprite.module.scss';

interface AppIconSpriteProps {
  className?: string
  name: string
  size?: number
  fillCurrent?: boolean
  onMouseEnter?: MouseEventHandler
onMouseLeave?: MouseEventHandler
onClick?: MouseEventHandler
}
export const AppIconSprite = forwardRef(({
  className, name, size = 24, fillCurrent = false, onMouseLeave, onMouseEnter, onClick,
}: AppIconSpriteProps, ref: ForwardedRef<SVGSVGElement>) => {
  const iconFillCurrent = fillCurrent ? styles.icon_fill_current : '';

  return (
    <svg
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      className={`icon icon-${name} ${iconFillCurrent} icon-inline ${className}`}
      ref={ref}
      width={size}
      height={size}
    >
      <use href={`#sprite_svg__icon-${name}`} />
    </svg>
  );
});
