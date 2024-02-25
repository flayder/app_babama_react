'use client';

import { AppButton } from '@/components/ui/AppButton';
import { getCurrencyFormatPrice } from '@/helpers/price/getCurrencyFormatPrice';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { refillBalance } from '@/helpers/api/payment';
import { RefillWallet } from '@/components/form/form_elements/RefillWallet';
import { ServiceSelect } from '@/components/form/form_elements/ServiceSelect';
import { usePaymentSystems } from '@/store/paymentSystems';
import { useUser } from '@/store/user';
import { preparePaymentSystems } from '@/helpers/payment/preparePaymentSystems';
import personal from '../Account.module.scss';
import styles from './AccountPay.module.scss';

const SCHEMA = z.object({
  amount: z.string(),
  platform: z.string(),
});

export type FormInputPay = z.infer<typeof SCHEMA>;

export function AccountPayForm() {
  const { data: paymentSystems } = usePaymentSystems();
  const { data: user } = useUser();

  const newSystems = preparePaymentSystems(paymentSystems);

  const {
    register,
    control,
    handleSubmit,
    resetField,
    setValue,
  } = useForm<FormInputPay>({
    defaultValues: { amount: '', platform: newSystems[0].value },
    resolver: zodResolver(SCHEMA),
  });

  const submitHandler = async (formData: FormInputPay) => {
    try {
      const { data } = await refillBalance(formData);

      document.location.replace(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form
      className={`${personal.personal__content__wrapper} ${styles.personal_wallet__wrapper}`}
      onSubmit={handleSubmit(submitHandler)}
    >
      <div className={`${styles.personal_wallet__balance_mobile} typography-menu _medium _middle`}>
        Ваш баланс:
        <h5 className={`${styles.personal_wallet__balance_mobile__amount} typography-heading _medium`}>
          {getCurrencyFormatPrice(user?.balance || 0)}
        </h5>
      </div>

      <RefillWallet setValue={setValue} resetField={resetField} register={register} />

      <div className={`${styles.personal_wallet__group} ${styles.personal_wallet__group_submit}`}>
        <div className={styles.personal_wallet__group__wrapper}>
          <ServiceSelect control={control} paySystems={newSystems} />
          <AppButton typeButton="personal-wallet" type="submit" className={`${styles.personal_wallet__submit} typography-menu _bold`}>
            Перейти к оплате
          </AppButton>
        </div>
      </div>
    </form>
  );
}
