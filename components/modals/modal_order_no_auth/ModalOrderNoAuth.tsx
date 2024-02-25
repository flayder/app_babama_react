import { ModalBase } from '@/components/ui/modal/ModalBase';
import type { ComponentProps } from 'react';
import { ModalHeading } from '@/components/modals/layouts/ModalHeading';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ServiceSelect } from '@/components/form/form_elements/ServiceSelect';
import { getCurrencyFormatPrice } from '@/helpers/price/getCurrencyFormatPrice';
import { AppIconSprite } from '@/components/ui/Icon_sprite/AppIconSprite';
import { AppTextarea } from '@/components/ui/inputs/AppTextarea';
import { refillBalanceGuest } from '@/helpers/api/payment';
import { usePaymentSystems } from '@/store/paymentSystems';
import { preparePaymentSystems } from '@/helpers/payment/preparePaymentSystems';
import { getUser } from '@/helpers/api/user';
import { useUser } from '@/store/user';
import modal from '../Modal.module.scss';
import styles from './ModalOrderNoAuth.module.scss';

const SCHEMA = z.object({
  comment: z.string(),
  platform: z.string(),
});

type FormInput = z.infer<typeof SCHEMA>;
type ModalBaseProps = Pick<ComponentProps<typeof ModalBase>, 'isOpened' | 'onClose'>
interface ModalOrderNoBalanceProps extends ModalBaseProps, Omit<ModalContentProps, 'paymentSystems'> {}

export function ModalOrderNoAuth({ onClose, isOpened, ...restProps }: ModalOrderNoBalanceProps) {
  const closeHandler = async () => {
    const response = await getUser();

    useUser.setState(response);

    onClose();
  };

  return (
    <ModalBase isOpened={isOpened} onClose={closeHandler}>
      <ModalContent {...restProps} />
    </ModalBase>
  );
}

interface ModalContentProps {
  price: string
  link: string
  hasComment: boolean
  orderId: string
  email: string
  count: string
  serviceTitle: string
  categoryName: string
}
function ModalContent({
  hasComment, link, count, serviceTitle, orderId: order_id, email, categoryName, price,
}: ModalContentProps) {
  const { data: paymentSystems } = usePaymentSystems();

  const newSystems = preparePaymentSystems(paymentSystems);

  const {
    register,
    control,
    handleSubmit,
  } = useForm<FormInput>({
    defaultValues: { comment: '', platform: newSystems[0].value },
    resolver: zodResolver(SCHEMA),
  });

  const submitHandler = async ({ platform }: FormInput) => {
    try {
      const requestData = {
        platform, amount: price, order_id, email,
      };

      const { data } = await refillBalanceGuest(requestData);

      document.location.replace(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={modal.modal}>
      <ModalHeading>Подтверждение заказа</ModalHeading>
      <div className="modal-content">
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className={styles.order__form__group}>
            <span className={`${styles.order__form__name} typography-menu _regular _middle`}>Соц. сеть:</span>
            <span className={styles.order__form__input}>{categoryName}</span>
          </div>
          <div className={styles.order__form__group}>
            <span className={`${styles.order__form__name} typography-menu _regular _middle`}>Услуга:</span>
            <span className={styles.order__form__input}>{serviceTitle}</span>
          </div>
          <div className={styles.order__form__group}>
            <span className={`${styles.order__form__name} typography-menu _regular _middle`}>Количество:</span>
            <span className={styles.order__form__input}>{count}</span>
          </div>
          <div className={styles.order__form__group}>
            <span className={`${styles.order__form__name} typography-menu _regular _middle`}>Ссылка:</span>
            <span className={styles.order__form__input}>{link}</span>
          </div>
          {hasComment && (
            <AppTextarea
              className={styles.order__form__text}
              label="Комментарий:"
              {...register('comment')}
            />
          )}
          <div className={styles.order__form__summary}>
            <h6 className={`${styles.order__form__summary__title} typography-heading _regular`}>
              Итоговая сумма с учетом комиссии:
            </h6>
            <div className="flex items-baseline typography _bold">
              <span className={styles.order__form__summary__number}>{ getCurrencyFormatPrice(price) }</span>
            </div>
            <ServiceSelect control={control} paySystems={newSystems} />
            <button type="submit" className={styles.order__form__summary__submit}>
              <AppIconSprite className={styles.order__form__summary__submit__icon} name="credit-card" />
              <span className="typography-menu _bold _middle">Оплатить</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
