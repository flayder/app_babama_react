import { AccountReferralFeedback } from '@/components/account/account_referral/AccountReferralFeedback';
import { LkLayout } from '@/components/layouts/lk_layout/LkLayout';
import personal from '../Account.module.scss';
import { AccountHistoryHeading } from './AccountHistoryHeading';

export function AccountReferralHistory() {
  return (
    <>
      <LkLayout>
        <div className={personal.personal__content}>
          <AccountHistoryHeading />
        </div>
      </LkLayout>
      <div className={personal.personal__content}>
        <AccountReferralFeedback />
      </div>
    </>
  );
}
