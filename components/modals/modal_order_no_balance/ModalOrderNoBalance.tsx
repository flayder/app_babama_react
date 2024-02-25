import { ModalBase } from '@/components/ui/modal/ModalBase';
import type { ComponentProps } from 'react';
import { ModalHeading } from '@/components/modals/layouts/ModalHeading';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { refillBalance } from '@/helpers/api/payment';
import * as z from 'zod';
import { AppButton } from '@/components/ui/AppButton';
import { RefillWallet } from '@/components/form/form_elements/RefillWallet';
import { ServiceSelect } from '@/components/form/form_elements/ServiceSelect';
import { getCurrencyFormatPrice } from '@/helpers/price/getCurrencyFormatPrice';
import { useUser } from '@/store/user';
import { usePaymentSystems } from '@/store/paymentSystems';
import { preparePaymentSystems } from '@/helpers/payment/preparePaymentSystems';
import modal from '../Modal.module.scss';
import styles from './ModalOrderNoBalance.module.scss';

const SCHEMA = z.object({
  amount: z.string(),
  platform: z.string(),
});

type FormInput = z.infer<typeof SCHEMA>;

type ModalBaseProps = Pick<ComponentProps<typeof ModalBase>, 'isOpened' | 'onClose'>

type ModalOrderNoBalanceProps = ModalBaseProps & {
  neededPrice: number
  orderId?: string | number
}

export function ModalOrderNoBalance({ onClose, isOpened, ...restProps }: ModalOrderNoBalanceProps) {
  return (
    <ModalBase isOpened={isOpened} onClose={onClose}>
      <ModalContent {...restProps} />
    </ModalBase>
  );
}

type ModalContentProps = Pick<ModalOrderNoBalanceProps, 'neededPrice' | 'orderId'>
function ModalContent({
  orderId, neededPrice,
}: ModalContentProps) {
  const { data: user } = useUser();
  const { data: paymentSystems } = usePaymentSystems();

  const differentPrice = user?.balance ? neededPrice - +user.balance : 0;
  const currentBalance = user?.balance ? getCurrencyFormatPrice(user.balance) : getCurrencyFormatPrice(0);
  const neededBalance = differentPrice > 0 ? getCurrencyFormatPrice(differentPrice) : getCurrencyFormatPrice(0);
  const newSystems = preparePaymentSystems(paymentSystems);

  const {
    register,
    control,
    handleSubmit,
    resetField,
    setValue,
  } = useForm<FormInput>({
    defaultValues: {
      amount: getCurrencyFormatPrice(differentPrice.toFixed(2)) || '',
      platform: newSystems[0].value,
    },
    resolver: zodResolver(SCHEMA),
  });

  const submitHandler = async (formData: FormInput) => {
    try {
      const requestData = orderId ? { ...formData, order_id: orderId } : formData;
      const { data } = await refillBalance(requestData);

      document.location.replace(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={modal.modal}>
      <ModalHeading>Оформление заказа</ModalHeading>
      <div className="modal-content">
        <div className="modal-thanks__wrapper">
          <p className={`${styles.text} typography-text`}>
            Заказ создан, но пока еще не оплачен. Пополните пожалуйста баланс. Можно сразу с запасом, чтобы осталось на будущие
            заказы.
          </p>
          <div className={`${styles.prices} flex items-center`}>
            <span className={`${styles.balance__name} typography-menu _regular _middle`}>Ваш баланс:</span>
            <span className="typography-menu _medium">{currentBalance}</span>
          </div>
          <div className={`${styles.prices__last} flex items-center`}>
            <span className={`${styles.balance__name} typography-menu _regular _middle`}>Нужно еще для заказа:</span>
            <span className="typography-menu _medium">{neededBalance}</span>
          </div>

          <form onSubmit={handleSubmit(submitHandler)}>
            <RefillWallet className={styles.refill__group} setValue={setValue} resetField={resetField} register={register} />

            <div className={`${styles.group} ${styles.group_submit}`}>
              <div className={styles.group__wrapper}>
                <ServiceSelect className={styles.item} control={control} paySystems={newSystems} />
                <AppButton typeButton="personal-wallet" type="submit" className={`${styles.submit} typography-menu _bold`}>
                  Перейти к оплате
                </AppButton>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
