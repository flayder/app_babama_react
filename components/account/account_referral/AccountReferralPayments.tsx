import { AccountReferralFeedback } from '@/components/account/account_referral/AccountReferralFeedback';
import { LkLayout } from '@/components/layouts/lk_layout/LkLayout';
import personal from '../Account.module.scss';
import { AccountPaymentsHeading } from './AccountPaymentsHeading';

export function AccountReferralPayments() {
  return (
    <>
      <LkLayout>
        <div className={personal.personal__content}>
          <AccountPaymentsHeading />
        </div>
      </LkLayout>
      <div className={personal.personal__content}>
        <AccountReferralFeedback />
      </div>
    </>
  );
}
