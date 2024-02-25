'use client';

import type { TCategory } from '@/types/api/categories';
import { AppSelect } from '@/components/ui/select/AppSelect';
import { ROUTES } from '@/params';
import { usePathname, useRouter } from 'next/navigation';

interface OrderPlatformSelectProps {
  categories: TCategory[]
}

export function OrderPlatformSelect({
  categories,
}: OrderPlatformSelectProps) {
  const router = useRouter();
  const pathname = usePathname();

  const newCategories = categories.map((cat) => ({ ...cat, label: cat.name, value: cat.id }));

  const changeHandler = ({ slug }: TCategory) => {
    const link = ROUTES.GET_PLATFORM_LINK(slug);

    router.push(link, { scroll: false });
  };

  return (
    <AppSelect
      placeholder="Выберите площадку"
      items={newCategories}
      height={60}
      defaultValue={newCategories.find(({ slug }) => slug === pathname.split('/')[1]) || null}
      onChange={changeHandler as any}
    />
  );
}
