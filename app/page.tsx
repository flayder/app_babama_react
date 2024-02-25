import { Advantages } from '@/components/Advantages';
import { BaseLayout } from '@/components/layouts/base_layout/BaseLayout';
import { Order } from '@/components/order/Order';

export default function Home() {
  return (
    <div className="page-home page">
      <BaseLayout withoutPadding>
        <Order />
      </BaseLayout>
      <Advantages />
    </div>
  );
}
