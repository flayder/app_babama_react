import type { ReferralProps } from '@/types';
import { redirect } from 'next/navigation';

export default function Page({ params }: ReferralProps) {
  redirect(`/?ref=${params.code}`);
}
