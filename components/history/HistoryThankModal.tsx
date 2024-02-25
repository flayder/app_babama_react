'use client';

import { ModalPayThank } from '@/components/modals/modal_pay_thank/ModalPayThank';
import { useLayoutEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export function HistoryThankModal() {
  const [payModal, setPayModal] = useState(false);
  const isNewUser = useRef(false);
  const pathname = usePathname();
  const router = useRouter();

  useLayoutEffect(() => {
    if (window.location.hash === '#payed' || window.location.hash === '#payed_new') {
      if (window.location.hash === '#payed_new') isNewUser.current = true;

      setPayModal(true);

      router.replace(pathname);
    }
  }, []); // eslint-disable-line

  return <ModalPayThank isOpened={payModal} onClose={() => setPayModal(false)} isNewUser={isNewUser.current} />;
}
