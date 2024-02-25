'use client';

import Icons from '@/components/ui/Icon_sprite/sprite.svg';
import type { ReactNode } from 'react';
import { YandexMetrika } from '@/components/integrations/YandexMetrika';
import { TalkMe } from '@/components/integrations/TalkMe';

export function Providers({
  children,
}: {
  children: ReactNode
}) {
  return (
    <>
      <YandexMetrika />
      <TalkMe />
      <Icons />
      {children}
    </>
  );
}
