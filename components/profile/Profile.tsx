'use client';

import { ProfileUser } from '@/components/profile/ProfileUser';
import { ProfileNoUser } from '@/components/profile/ProfileNoUser';
import { useUser } from '@/store/user';
import Cookies from 'js-cookie';
import { useSearchParams } from 'next/navigation';

export function Profile() {
  const { data: user } = useUser();
  const routerQuery = useSearchParams();

  const ref = routerQuery.get('ref');

  if (ref && typeof ref === 'string') {
    Cookies.set('ref', ref);
  }

  return (
    <>
      {user && <ProfileUser />}
      {!user && <ProfileNoUser />}
    </>
  );
}
