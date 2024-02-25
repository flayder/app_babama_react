import { AccountReferralFeedback } from '@/components/account/account_referral/AccountReferralFeedback';
import { LkLayout } from '@/components/layouts/lk_layout/LkLayout';
import personal from '../Account.module.scss';
import { AccountPayHeading } from './AccountPayHeading';
import { AccountBanner } from './banner/AccountBanner';
import { AccountTabs } from './tabs/AccountTabs';

export function AccountReferralPay() {
  return (
    <>
      <LkLayout>
        <div className={personal.personal__content}>
          <AccountBanner />
          <AccountTabs />
          <AccountPayHeading />
        </div>
      </LkLayout>
      <div className={personal.personal__content}>
        <AccountReferralFeedback />
      </div>
    </>
  );
}
