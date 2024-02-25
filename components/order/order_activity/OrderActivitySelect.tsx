'use client';

import type { TActivity } from '@/types/api/activities';
import { AppSelect } from '@/components/ui/select/AppSelect';
import { usePathname, useRouter } from 'next/navigation';
import { ROUTES } from '@/params';

interface OrderActivitySelectProps {
  activities: TActivity[]
  disabled: boolean
}

export function OrderActivitySelect({
  activities, disabled,
}: OrderActivitySelectProps) {
  const router = useRouter();
  const pathname = usePathname();

  const newActivities = activities.map((act) => ({
    ...act, icon: `/${act.icon}`, label: act.name, value: act.id,
  }));

  const changeHandler = ({ slug }: TActivity) => {
    const platform = pathname.split('/')[1];
    const link = ROUTES.GET_ACTIVITY_LINK(platform, slug);

    router.push(link, { scroll: false });
  };

  return (
    <AppSelect
      placeholder="Выберите активность"
      isDisabled={disabled}
      height={60}
      items={newActivities}
      defaultValue={newActivities.find(({ slug }) => slug === pathname.split('/')[2]) || null}
      onChange={changeHandler as any}
    />
  );
}
