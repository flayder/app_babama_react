import './global.scss';
import { fontGotham } from '@/app/fonts';
import { Providers } from '@/app/providers';
import { TheFooter } from '@/components/layouts/footer/TheFooter';
import { TheHeader } from '@/components/layouts/TheHeader';
import type { ReactNode } from 'react';
import type { TUserAPI } from '@/types/api/user';
import type { TPaymentSystemsAPI } from '@/types/api/payment';
import { getFetchData } from '@/helpers/api/response';
import { useUser } from '@/store/user';
import { StateClientInit } from '@/components/state/StateClientInit';
import { usePaymentSystems } from '@/store/paymentSystems';
import { API } from '@/params';

export const metadata = {
  title: process.env.NEXT_PUBLIC_PROJECT_NAME,
  description: `${process.env.NEXT_PUBLIC_PROJECT_NAME} app`,
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  const user = await getFetchData<TUserAPI>(API.USER);
  const paymentSystems = await getFetchData<TPaymentSystemsAPI>(API.PAYMENT_SYSTEMS);

  useUser.setState({ data: user?.data ?? null });
  usePaymentSystems.setState(paymentSystems);

  return (
    <html lang="ru">
      <body className={fontGotham.className}>
        <StateClientInit user={user} paymentSystems={paymentSystems} />
        <Providers>
          <TheHeader />
          {children}
          <TheFooter />
        </Providers>
      </body>
    </html>
  );
}
