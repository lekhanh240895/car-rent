'use client';

import BillingInfo from './BillingInfo';
import RentalInfo from './RentalInfo';
import PaymentMethod from './PaymentMethod';
import RentalConfirmation from './RentalConfirmation';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RentDetail } from '../redux/features/appSlice';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { appSelector } from '../redux/selectors';
import { useConfirmRedirectIfDirty } from '../hooks/useConfirmRedirectIfDirty';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { paymentFormSchema } from '../lib/schema';
import { formattedDate } from '../lib/utils';
import { useMemoizedFn } from 'ahooks';
import { ORDERS_PAGE, PAYMENT_METHOD_COD } from '../lib/constants';
import ApiManager from '../lib/ApiManager/ApiManager';
import { INVALID_TOKEN } from '../lib/error-code';
import { resetUserSlice } from '../redux/features/userSlice';

type Props = {
  car: CarDetail;
};

export type PaymentFormData = {
  billing_info: {
    name: string;
    address: string;
    phone_number: string;
    city: string;
  };
  payment_method: string;
  confirmation: {
    email_notify: boolean;
    terms_and_services: boolean;
  };
  rentDetail: RentDetail;
};

function PaymentForm({ car }: Props) {
  const { t, i18n } = useTranslation();
  const locale = i18n.language;
  const {
    rentDetail,
    summaryInfo: { total }
  } = useAppSelector(appSelector);
  const [error, setError] = useState('');
  const searchParams = useSearchParams();
  const car_id = searchParams.get('car_id');
  const router = useRouter();
  const isBrowser = () => typeof window !== 'undefined';
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const {
    register,
    control,
    handleSubmit,
    trigger,
    watch,
    reset,
    setError: setHookFormError,
    formState: { isSubmitting, errors, isDirty }
  } = useForm<PaymentFormData>({
    resolver: yupResolver<PaymentFormData>(paymentFormSchema(t)),
    defaultValues: {
      billing_info: {
        name: '',
        address: '',
        phone_number: '',
        city: ''
      },
      payment_method: '',
      confirmation: {
        email_notify: false,
        terms_and_services: false
      },
      rentDetail
    }
  });
  const promo_code = searchParams.get('promo_code')?.toString();

  useConfirmRedirectIfDirty(isDirty);

  const formData = watch();

  const onSubmit = async (data: PaymentFormData) => {
    const { payment_method } = data;

    if (payment_method === PAYMENT_METHOD_COD) {
      try {
        const rental_id = await memoizedCreateOrder();

        if (rental_id) {
          toast.success(t('payment_successful'), {
            autoClose: 2000,
            className: 'bg-green-500'
          });

          router.push(ORDERS_PAGE);
          router.refresh();
        }
      } catch (error) {
        toast.error(t('common:error_messages.unknown_error'));
      }
    }
  };

  const memoizedCreateOrder = useMemoizedFn(async function createOrder() {
    const {
      billing_info,
      rentDetail: { pickUp, dropOff }
    } = formData;

    if (
      total &&
      car_id &&
      pickUp.location &&
      pickUp.date &&
      dropOff.date &&
      dropOff.location
    ) {
      const pickUpDate = formattedDate(pickUp.date);
      const pickUpLocationId = pickUp.location.id;
      const dropOffDate = formattedDate(dropOff.date);
      const dropOffLocationId = dropOff.location.id;
      try {
        const res = await ApiManager.createRental(locale, {
          billing_info,
          rental_info: {
            car_id: Number(car_id),
            pick_up_time: pickUpDate,
            pick_up_location_id: pickUpLocationId,
            drop_off_time: dropOffDate,
            drop_off_location_id: dropOffLocationId
          },
          payment_method: formData.payment_method,
          promo_code,
          displayed_total: total
        });
        const { rental_id, transaction_id } = res.body.data;

        return transaction_id ? transaction_id : rental_id;
      } catch (e: any) {
        const error: CustomError = e.body?.error;

        if (error) {
          const { message, error_id } = error;
          const errorMessage = `${message} (${error_id})`;

          if (error_id === INVALID_TOKEN) {
            toast.error(t('common:error_messages.session_expired'));
            dispatch(resetUserSlice());

            const params = new URLSearchParams(searchParams);
            const currentUrl = `${pathname}?${params.toString()}`;

            const callbackParams = new URLSearchParams();
            const callbackUrl = encodeURI(currentUrl);
            callbackParams.set('callbackUrl', callbackUrl);

            router.replace(`/login?${callbackParams.toString()}`);
            router.refresh();
            return;
          }

          if (error.errors && error.errors.length > 0) {
            const fieldErrors = error.errors;

            const fieldNames: {
              [key: string]: any;
            } = {
              'billing_info.name': t('name_field'),
              'billing_info.address': t('address_field'),
              'billing_info.phone_number': t('phone_field'),
              'billing_info.city': t('city_field'),
              'rental_info.pick_up_time': t('pick_up_date'),
              'rental_info.pick_up_location': t('pick_up_location'),
              'rental_info.drop_off_time': t('drop_off_date'),
              'rental_info.drop_off_location': t('drop_off_location'),
              payment_method: t('payment_method_title')
            };

            fieldErrors.forEach((e) => {
              const { field, message, error_id } = e;
              const fieldName = fieldNames[field] || field;
              const errorMessage = `[${fieldName}] ${message} (${error_id})`;

              switch (field) {
                case 'rental_info.pick_up_time':
                  return setHookFormError('rentDetail.pickUp.date', {
                    type: 'manual',
                    message: errorMessage
                  });
                case 'rental_info.pick_up_location':
                  return setHookFormError('rentDetail.pickUp.location', {
                    type: 'manual',
                    message: errorMessage
                  });
                case 'rental_info.drop_off_time':
                  return setHookFormError('rentDetail.dropOff.date', {
                    type: 'manual',
                    message: errorMessage
                  });
                case 'rental_info.drop_off_location':
                  return setHookFormError('rentDetail.dropOff.location', {
                    type: 'manual',
                    message: errorMessage
                  });
                default:
                  return setHookFormError(field as any, {
                    type: 'manual',
                    message: errorMessage
                  });
              }
            });

            toast.error(errorMessage);
          } else {
            setError(errorMessage);
          }
          if (!isBrowser()) return;
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          toast.error(t('common:error_messages.unknown_error'));
        }
      }
    }
  });

  async function onApprove(data: { orderID?: string }) {
    try {
      await ApiManager.checkoutCapture(locale, data.orderID);

      reset();

      toast.success(t('payment_successful'), {
        autoClose: 2000,
        className: 'bg-green-500'
      });

      router.push(ORDERS_PAGE);
      router.refresh();
    } catch (e: any) {
      const error: CustomError = e.body?.error;

      if (error) {
        const { message, error_id } = error;
        const errorMessage = `${message} (${error_id})`;
        setError(errorMessage);
      } else {
        toast.error(t('common:error_messages.unknown_error'));
      }
    }
  }
  async function onCancel(data: { orderID?: string }) {
    try {
      await ApiManager.checkoutCancel(locale, data.orderID);
    } catch (e: any) {
      const error: CustomError = e.body?.error;

      if (error) {
        const { message, error_id } = error;
        const errorMessage = `${message} (${error_id})`;
        setError(errorMessage);
      } else {
        toast.error(t('common:error_messages.unknown_error'));
      }
    }
  }

  return (
    <form className="space-y-8 md:flex-1" onSubmit={handleSubmit(onSubmit)}>
      {error && (
        <div className="flex flex-wrap items-center justify-center self-center rounded-[10px] bg-[#f92d6a0d] p-4 text-red-500">
          <span>{error}</span>
        </div>
      )}

      <BillingInfo t={t} register={register} errors={errors} />

      <RentalInfo
        t={t}
        car={car}
        errors={errors}
        control={control}
        rentDetail={formData.rentDetail}
      />

      <PaymentMethod t={t} register={register} errors={errors} />

      <RentalConfirmation
        onCreateOrder={memoizedCreateOrder}
        onApprove={onApprove}
        onCancel={onCancel}
        t={t}
        register={register}
        errors={errors}
        data={formData}
        onTrigger={() => trigger()}
        loading={isSubmitting}
      />
    </form>
  );
}

export default PaymentForm;
