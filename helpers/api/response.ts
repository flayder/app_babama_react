import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

export async function getFetchData<T>(urn: string, init?: RequestInit): Promise<T> {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_API_PROXY}${urn}`;

  const cookie = cookies();
  const token = cookie.get('token');

  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      credentials: 'include',
      Authorization: `Bearer ${token?.value}`,
    },
    ...init,
  });

  if (!res.ok) {
    switch (res.status) {
      case 401:
        return {} as T;
      case 404:
        return notFound();
      default:
        console.log('error status: ', res.status);
        console.log('error url: ', url);

        throw new Error('Failed to fetch data');
    }
  }

  return res.json();
}
