'use client';

import { AppInput } from '@/components/ui/inputs/AppInput';
import { Controller, useForm } from 'react-hook-form';
import { AppTextarea } from '@/components/ui/inputs/AppTextarea';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { AppSelect } from '@/components/ui/select/AppSelect';
import type { TService } from '@/types/api/services';
import type { TPromocode, TPromocodeAPI } from '@/types/api/promocode';
import type { TOrderRequest } from '@/types/api/order';
import type { TCategory } from '@/types/api/categories';
import type { TActivity } from '@/types/api/activities';
import {
  type ChangeEvent, type MouseEventHandler, useEffect, useRef, useState,
} from 'react';
import { postOrder, postOrderUnauthenticated, validateLink } from '@/helpers/api/order';
import { getCurrencyFormatPrice } from '@/helpers/price/getCurrencyFormatPrice';
import { AppIconSprite } from '@/components/ui/Icon_sprite/AppIconSprite';
import { getTotalPrice } from '@/helpers/price/getTotalPrice';
import { ModalOrderThank } from '@/components/modals/modal_order_thank/ModalOrderThank';
import { ModalOrderNoBalance } from '@/components/modals/modal_order_no_balance/ModalOrderNoBalance';
import { ModalPromocode } from '@/components/modals/modal_promocode/ModalPromocode';
import { ModalOrderNoAuth } from '@/components/modals/modal_order_no_auth/ModalOrderNoAuth';
import { ModalLoginRegistration } from '@/components/modals/modal_login_registration/ModalLoginRegistration';
import { PopoverBase } from '@/components/ui/modal/PopoverBase';
import { useUser } from '@/store/user';
import { useDebounce } from '@/hooks/useDebounce';
import { AppNotification } from '@/components/ui/AppNotification';
import styles from './OrderService.module.scss';

const GENDER_SCHEMA = z.object({
  value: z.string(),
  title: z.string(),
  label: z.string(),
  price_diff: z.string(),
});
const PARAMS_SCHEMA = z.object({
  title: z.string(),
  id: z.string(),
  value: z.string(),
  label: z.string(),
  genders: GENDER_SCHEMA.array(),
});
const SERVICE_SCHEMA = z.object({
  id: z.number(),
  title: z.string(),
  value: z.string(),
  label: z.string(),
  link: z.string().nullable(),
  min_amount: z.number(),
  max_amount: z.number(),
  api_service_id: z.number(),
  price: z.string(),
  description: z.string(),
  link_demo: z.string().nullable(),
  short_description: z.string().nullable(),
  parameters: PARAMS_SCHEMA.array(),
});

interface OrderServiceProps {
  services: TService[]
  category: TCategory
  activity: TActivity
  hasComment: boolean
  disabled: boolean
}

function prepareService(services: TService[]) {
  return services.map((service) => {
    const parameters = service.parameters.length ? service.parameters.map((param) => {
      const genders = param.genders.length
        ? param.genders.map((gender) => ({ ...gender, label: gender.title }))
        : [{
          label: 'Любой', title: 'Любой', value: 'any', price_diff: '0',
        }];

      return { ...param, genders, label: param.title };
    }) : service.parameters;

    return {
      ...service, parameters, value: service.title, label: service.title,
    };
  });
}

export function OrderService({
  services, hasComment, category, activity, disabled,
}: OrderServiceProps) {
  const { data: user, balanceDecr } = useUser();
  const [modalThankOpened, setModalThankOpened] = useState(false);
  const [modalNoBalance, setModalNoBalance] = useState(false);
  const [modalNoAuth, setModalNoAuth] = useState(false);
  const [promocode, setPromocode] = useState<TPromocodeAPI | null>(null);
  const orderId = useRef<string>();

  const newServices = prepareService(services);

  const modalThankHandler = () => setModalThankOpened((prev) => !prev);
  const modalNoBalanceHandler = () => setModalNoBalance((prev) => !prev);
  const modalNoAuthHandler = () => setModalNoAuth((prev) => !prev);

  const SCHEMA = z.object({
    email: z.string().email({ message: 'Введите email' }),
    link: z.string().nonempty('Укажите ссылку').refine(async (val) => {
      try {
        if (val) await validateLink(category.id, val);

        return true;
      } catch {
        return false;
      }
    }, { message: 'Ссылка недействительна' }),
    count: z.preprocess((a) => parseInt(a as string, 10), z.number()),
    comment: z.string(),
    service: SERVICE_SCHEMA,
    country: PARAMS_SCHEMA.nullable().optional(),
    gender: GENDER_SCHEMA.nullable().optional(),
  });

  type FormInput = z.infer<typeof SCHEMA>;

  const {
    handleSubmit,
    register,
    control,
    clearErrors,
    setValue,
    trigger,
    watch,
    getValues,
    getFieldState,
    formState: { errors, isValid },
  } = useForm<FormInput>({
    mode: 'onChange',
    defaultValues: {
      service: newServices[0],
      count: (disabled || !newServices[0]?.min_amount) ? 0 : newServices[0].min_amount,
      email: user?.email ?? '',
      link: '',
      comment: '',
      country: newServices[0].parameters.length ? newServices[0].parameters[0] : null,
      gender: newServices[0].parameters.length ? newServices[0].parameters[0].genders[0] : null,
    },
    resolver: zodResolver(SCHEMA),
  });

  const serviceWatcher = watch('service');
  const countryWatch = watch('country');
  const genderWatch = watch('gender');
  const countWatcher = watch('count');
  const emailWatcher = watch('email');
  const emailInvalid = getFieldState('email').invalid;
  
  const totalPrice = getTotalPrice({
    price: serviceWatcher.price,
    count: countWatcher,
    promocode,
    parameterPriceDiff: genderWatch?.price_diff,
  });

  const { parameters } = serviceWatcher;
  const genders = countryWatch?.genders;

  const serviceChangeHandler = <T extends typeof newServices[number]>(onChange: (val: T) => void) => (val: T) => {
    setValue('count', val.min_amount);

    onChange(val);
  };
  const countryChangeHandler = <T extends typeof parameters[number]>(onChange: (val: T) => void) => (val: T) => {
    setValue('gender', val.genders[0] ?? { label: 'Любой', value: 'Любой' });

    onChange(val);
  };

  const countChangeHandler = useDebounce((e: ChangeEvent<HTMLInputElement>) => {
    setValue('count', +e.target.value);
  });
  const countBlurHandler = useDebounce(() => {
    const serviceValue = getValues('service');
    const countValue = getValues('count');

    if (+countValue > serviceValue.max_amount) {
      setValue('count', serviceValue.max_amount);
    }
    if (+countValue < serviceValue.min_amount) {
      setValue('count', serviceValue.min_amount);
    }
  });

  const submitHandler = async ({
    link, count, email, service, country, gender,
  }: FormInput) => {
    const postData: TOrderRequest = {
      category: category.id,
      service: service.id,
      activity: activity.id,
      link,
      quantity: count,
      email,
      promocode_code: promocode?.code,
    };

    if (country?.value) {
      postData.country = country.value;
      postData.gender = gender?.value;
    }

    try {
      if (user) {
        const { order_id } = await postOrder(postData);

        orderId.current = order_id;

        if (user.balance && +user.balance >= totalPrice) {
          balanceDecr(totalPrice);

          modalThankHandler();
        } else {
          modalNoBalanceHandler();
        }
      } else {
        const { order_id } = await postOrderUnauthenticated(postData);

        orderId.current = order_id;

        modalNoAuthHandler();
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (user) {
      setValue('email', user.email);
      trigger('email');
    }
  }, [user, setValue, trigger]);

  return (
    <>
      <form className={styles.services} onSubmit={handleSubmit(submitHandler)} data-order-parameters>
        <ul className={styles.services__list}>
          <li className={`${styles.services__item} ${styles.services__item_medium}`}>
            <Controller
              name="service"
              control={control}
              render={({ field: { onChange, value } }) => (
                <AppSelect
                  label={<AppNotification label="Качество активностей:" disabled={disabled} content={serviceWatcher.description} />}
                  items={newServices}
                  isDisabled={disabled}
                  value={newServices.find((c) => c.value === value.value)}
                  onChange={serviceChangeHandler(onChange)}
                />
              )}
            />
          </li>
          <li className={`${styles.services__item} ${styles.services__item_medium}`}>
            <AppInput
              className={styles.input}
              type="number"
              label="Количество:"
              min={serviceWatcher.min_amount}
              max={serviceWatcher.max_amount}
              underInputText={`Лимиты: от ${serviceWatcher.min_amount} до ${serviceWatcher.max_amount}`}
              setValue={setValue}
              getValues={getValues}
              disabled={disabled}
              {...register('count', {
                onChange: countChangeHandler,
                onBlur: countBlurHandler,
              })}
            />
          </li>
          <li className={styles.services__item}>
            <AppInput
              className={styles.input}
              label="Ссылка на материал:"
              placeholder={serviceWatcher.link_demo ?? 'Вставьте вашу ссылку'}
              onFocus={() => clearErrors('link')}
              underInputText={serviceWatcher.short_description ?? ''}
              error={errors?.link?.message}
              disabled={disabled}
              {...register('link')}
            />
          </li>
          <li className={styles.services__item}>
            <AppInput
              className={styles.input}
              type="email"
              label={<EmailLabel disabled={disabled} />}
              placeholder={`example@${process.env.NEXT_PUBLIC_PROJECT_NAME?.toLowerCase()}.ru`}
              disabled={disabled}
              error={errors?.email?.message}
              {...register('email')}
            />
          </li>
          {hasComment && (
            <li className={styles.services__item}>
              <AppTextarea
                className={styles.input}
                label="Ваш комментарий (ссылка)"
                disabled={disabled}
                {...register('comment')}
              />
            </li>
          )}
        </ul>
        {!!parameters && genders && (
          <div className={styles.services__extra}>
            <h3
              className={`${styles.services__extra__title} ${
                disabled ? styles.services__extra__title_disabled : ''
              } _disabled typography-heading _medium`}
            >
              Дополнительные параметры
            </h3>
            <ul className={`${styles.services__list} ${styles.services__list_extra}`}>
              <li className={`${styles.services__item} ${styles.services__item_small}`}>
                <Controller
                  name="country"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <AppSelect
                      label="Выберите страну"
                      items={parameters}
                      isDisabled={disabled}
                      value={parameters.find((c) => c.value === value?.value)}
                      onChange={countryChangeHandler(onChange)}
                    />
                  )}
                />
              </li>
              <li className={`${styles.services__item} ${styles.services__item_small}`}>
                <Controller
                  name="gender"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <AppSelect
                      label="Выберите пол"
                      items={genders}
                      isDisabled={disabled}
                      value={genders.find((c) => c.value === value?.value)}
                      onChange={(val) => onChange(val)}
                    />
                  )}
                />
              </li>
            </ul>
          </div>
        )}
        <div className={`${styles.summary} ${disabled ? styles.summary_disabled : ''}`}>
          <div>
            <h6 className={`${styles.summary__subheading} typography-heading _regular`}>Стоимость заказа</h6>
            <div className={`${styles.summary__count} typography _bold`}>
              <div className={`${styles.summary__count__number} ${disabled ? styles.summary__count__number_disabled : ''}`}>
                {getCurrencyFormatPrice(totalPrice)}
              </div>
            </div>
          </div>

          <PromocodeButton
            setPromocode={setPromocode}
            promocode={promocode}
            disabled={disabled}
            emailWatcher={emailWatcher}
            emailInvalid={emailInvalid}
          />

          <button type="submit" className={styles.summary__submit} disabled={!totalPrice || !isValid}>
            <AppIconSprite name="circle-check" className={styles.summary__icon} />
            <span className={`${styles.summary__submit__text} typography-menu _bold _middle`}>Заказать</span>
          </button>
          <div className="typography-menu _regular _small">
            Оплачивая заказ, Вы автоматически соглашаетесь с офертой и правилами использования нашего сервиса
          </div>
        </div>
      </form>
      <ModalOrderThank isOpened={modalThankOpened} onClose={modalThankHandler} />
      <ModalOrderNoBalance
        orderId={orderId.current}
        isOpened={modalNoBalance}
        onClose={modalNoBalanceHandler}
        neededPrice={totalPrice}
      />
      <ModalOrderNoAuth
        orderId={orderId.current as string}
        hasComment={hasComment}
        categoryName={category.name}
        serviceTitle={serviceWatcher.title}
        count={String(countWatcher)}
        email={emailWatcher}
        link={getValues('link')}
        isOpened={modalNoAuth}
        onClose={modalNoAuthHandler}
        price={String(totalPrice)}
      />
    </>
  );
}

interface EmailLabelProps {
  disabled: boolean
}
function EmailLabel({ disabled }: EmailLabelProps) {
  const { data: user } = useUser();
  const [opened, setOpened] = useState(false);

  const disableClass = disabled ? styles.label_login_disable : '';

  const buttonClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();

    if (disabled) return;

    setOpened((prev) => !prev);
  };

  if (user) return 'Ваш E-mail';

  return (
    <div>
      Ваш E-mail или <button type="button" className={`${styles.label_login} ${disableClass}`} onClick={buttonClick}>Выполните вход</button>
      <ModalLoginRegistration isOpened={opened} onClose={() => setOpened(false)} view="login" />
    </div>
  );
}

interface PromocodeButtonProps {
  emailInvalid : boolean
  emailWatcher : string
  disabled: boolean
  promocode: TPromocode | null
  setPromocode: (promocode: TPromocode | null) => void
}
function PromocodeButton({
  emailWatcher, emailInvalid, disabled, promocode, setPromocode,
}: PromocodeButtonProps) {
  const [modalPromocode, setModalPromocode] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const ref = useRef(null);

  const modalPromocodeHandler = () => setModalPromocode((prev) => !prev);

  return (
    <div
      onMouseLeave={() => setPopoverOpen(false)}
      onMouseEnter={() => !disabled && (emailInvalid || !emailWatcher) && setPopoverOpen(true)}
    >
      <button
        className={styles.summary__promo}
        disabled={emailInvalid || !emailWatcher || disabled}
        type="button"
        ref={ref}
        onClick={modalPromocodeHandler}
      >
        {promocode && <AppIconSprite className={styles.summary__promo__icon} name="check-promocode" />}
        {promocode ? 'Промокод принят' : 'Введите промокод'}
      </button>
      <PopoverBase reference={ref.current} isOpened={popoverOpen}>
        Для применения промокода Вам нужно зарегистрироваться или войти под своим емейлом в нашем сервисе.
      </PopoverBase>
      <ModalPromocode
        isOpened={modalPromocode}
        onClose={modalPromocodeHandler}
        email={emailWatcher}
        setPromocode={setPromocode}
        promocode={promocode}
      />
    </div>
  );
}
