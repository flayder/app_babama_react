import type { ComponentProps } from 'react';
import { ModalPopover } from '@/components/ui/modal/ModalPopover';
import styles from './PopoverBase.module.scss';

type PopoverProps = ComponentProps<typeof ModalPopover>

interface PopoverBaseProps extends PopoverProps {
  isOpened: boolean
}

export function PopoverBase({
  className, children, reference, isOpened,
}: PopoverBaseProps) {
  if (!isOpened) return null;

  return (
    <ModalPopover className={styles.popover} reference={reference}>
      {children}
    </ModalPopover>
  );
}
