import type { ReactNode } from 'react';

export default function StaticPagesLayout({
  children,
}: {
  children: ReactNode
}) {
  return <div>{children}</div>;
}
