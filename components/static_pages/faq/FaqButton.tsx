'use client';

import { AppButton } from '@/components/ui/AppButton';
import { useState } from 'react';
import { ModalWriteUs } from '@/components/modals/modal_write_us/ModalWriteUs';

interface FaqButtonProps {
  name?: string
}

export function FaqButton({ name = 'Написать нам' } : FaqButtonProps) {
  const [isOpened, setIsOpened] = useState(false);

  const modalHandler = () => setIsOpened((prev) => !prev);

  return (
    <>
      <AppButton className="typography-menu _bold _middle" typeButton="question" onClick={modalHandler}>
        {name}
      </AppButton>
      <ModalWriteUs isOpened={isOpened} onClose={modalHandler} />
    </>
  );
}
