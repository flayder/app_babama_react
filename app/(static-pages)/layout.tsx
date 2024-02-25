import { BaseLayout } from '@/components/layouts/base_layout/BaseLayout';
import type { ReactNode } from 'react';

export default function StaticPagesLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <BaseLayout>
      {children}
    </BaseLayout>
  );
}
