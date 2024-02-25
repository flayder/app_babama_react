import { AccountPayForm } from '@/components/account/account_pay/AccountPayForm';
import { AccountPayHeading } from '@/components/account/account_pay/AccountPayHeading';
import personal from '../Account.module.scss';

export function AccountPay() {
  return (
    <div className={personal.personal__content}>
      <AccountPayHeading />
      <AccountPayForm />
    </div>
  );
}
