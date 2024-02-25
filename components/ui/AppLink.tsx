import Link from 'next/link';
import type { ComponentProps } from 'react';

type AppLinkProps = ComponentProps<typeof Link>

export function AppLink(props: AppLinkProps) {
  return <Link prefetch={false} {...props} />;
}
