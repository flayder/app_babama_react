import {
  ReactNode, useState,
} from 'react';
import { ModalPortal } from './ModalPortal';
import styles from './ModalPopover.module.scss';

type Props = {
  className?: string
  reference: HTMLElement | null
  children?: ReactNode
}

export function ModalPopover({
  className, children, reference,
}: Props) {
  const [ref, setRef] = useState<HTMLDivElement>();
  const offset = getOffset(reference, ref);

  return (
    <ModalPortal>
      <div
        className={`${className} ${styles.popover}`}
        ref={setRef as any}
        style={offset}
      >
        {children}
      </div>
    </ModalPortal>
  );
}

function getOffset(reference: Props['reference'], refElem?: HTMLDivElement) {
  if (!reference || !refElem) return {};

  const ref = reference.getBoundingClientRect();
  const elem = refElem.getBoundingClientRect();

  const bodyScroll = Math.abs(document.body.getBoundingClientRect().top);

  return {
    left: `${ref.left + ref.width / 2 - elem.width / 2}px`,
    top: `${bodyScroll + ref.height + ref.top}px`,
  };
}
