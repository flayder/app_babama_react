import { AccountSettingsDataForm } from '@/components/account/account_settings/AccountSettingsDataForm';
import { AccountSettingsPasswordForm } from '@/components/account/account_settings/AccountSettingsPasswordForm';
import personal from '../Account.module.scss';

export function AccountSettings() {
  return (
    <div className={personal.personal__content}>
      <div className={personal.personal__content__heading}>
        <h2 className={`${personal.personal__content__title} typography-heading _medium`}>Настройки аккаунта:</h2>
      </div>
      <AccountSettingsDataForm />
      <AccountSettingsPasswordForm />
    </div>
  );
}
