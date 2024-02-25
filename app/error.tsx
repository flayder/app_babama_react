'use client';

import { AppLink } from '@/components/ui/AppLink';
import { ROUTES } from '@/params';

export default function Error() {
  return (
    <div>
      <h2>Непредвиденная ошибка</h2>
      <p>
        <AppLink href={ROUTES.INDEX}>Вернуться на главную</AppLink>
      </p>
    </div>
  );
}
