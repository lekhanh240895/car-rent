'use client';

import RentalCar from './RentalCar';
import SummaryForm from './SummaryForm';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { appSelector } from '../redux/selectors';
import { useRouter, useSearchParams } from 'next/navigation';
import { formattedDate } from '../lib/utils';
import useSWR, { Fetcher } from 'swr';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { setSummaryInfo } from '../redux/features/appSlice';
import { INVALID_COUPON } from '../lib/error-code';
import { PAYMENT_PAGE } from '../lib/constants';
import { FetchSuccess } from '../lib/ApiManager/ApiMethods';
import ApiManager from '../lib/ApiManager/ApiManager';

type Props = {
  car: CarDetail;
};

export type SummaryFormData = {
  promo_code: string;
};

const RentalSummary = ({ car }: Props) => {
  const { t, i18n } = useTranslation();
  const locale = i18n.language;

  const searchParams = useSearchParams();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<SummaryFormData>({
    defaultValues: {
      promo_code: searchParams.get('promo_code')?.toString()
    }
  });
  const [promoError, setPromoError] = useState('');
  const {
    rentDetail: {
      pickUp: { date: pick_up_time },
      dropOff: { date: drop_off_time }
    }
  } = useAppSelector(appSelector);
  const [isSuccess, setIsSuccess] = useState(false);
  const promo_code = searchParams.get('promo_code');

  const params = new URLSearchParams(searchParams);
  pick_up_time && params.set('pick_up_time', formattedDate(pick_up_time));
  drop_off_time && params.set('drop_off_time', formattedDate(drop_off_time));
  promo_code && params.set('promo_code', promo_code);

  const router = useRouter();
  const dispatch = useAppDispatch();

  const fetcher: Fetcher<FetchSuccess<RentalSummary>> = (params: string) =>
    ApiManager.getRentalSummary(locale, params).then((res) => res);

  const { data } = useSWR(
    pick_up_time && drop_off_time ? params.toString() : null,
    fetcher
  );

  const rentalSummary = data?.body.data;

  useEffect(() => {
    if (pick_up_time && drop_off_time && !promoError.includes(INVALID_COUPON)) {
      setPromoError('');
    }
  }, [drop_off_time, pick_up_time, promoError]);

  useEffect(() => {
    if (rentalSummary) {
      const { total } = rentalSummary;

      dispatch(
        setSummaryInfo({
          total
        })
      );
    } else {
      dispatch(
        setSummaryInfo({
          total: null
        })
      );
    }
  }, [dispatch, rentalSummary]);

  const onSubmit = async (data: SummaryFormData) => {
    const { promo_code } = data;

    if (pick_up_time && drop_off_time) {
      const params = new URLSearchParams(searchParams);
      if (promo_code) {
        params.set('promo_code', promo_code);
      } else {
        params.delete('promo_code');
      }
      params.set('pick_up_time', formattedDate(pick_up_time));
      params.set('drop_off_time', formattedDate(drop_off_time));
      setIsSuccess(false);
      setPromoError('');

      try {
        await ApiManager.getRentalSummary(locale, params.toString());

        promo_code && setIsSuccess(true);
        params.delete('pick_up_time');
        params.delete('drop_off_time');
        router.replace(`${PAYMENT_PAGE}?${params.toString()}`);
      } catch (e: any) {
        const error: CustomError = e.body?.error;

        if (error && error.error_id === INVALID_COUPON) {
          const { message, error_id } = error;

          const errorMessage = `${message} (${error_id})`;

          setPromoError(errorMessage);
          params.delete('promo_code');
          params.delete('pick_up_time');
          params.delete('drop_off_time');
          router.replace(`${PAYMENT_PAGE}?${params.toString()}`);
        } else {
          toast.error(t('common:error_messages.unknown_error'));
        }
      }
    } else {
      setPromoError(t('common:error_messages.rental_summary_required'));
    }
  };

  return (
    <div className="rounded-[10px] bg-white p-4 dark:bg-black dark:ring-1 dark:ring-white md:p-6">
      <h1 className="mb-1 font-bold leading-[30px] md:text-xl md:leading-6">
        {t('rental_summary_title')}
      </h1>
      <p className="mb-6 text-xs font-medium leading-5 text-subTextColor md:mb-8 md:text-sm md:leading-6">
        {t('rental_summary_description')}
      </p>

      <RentalCar t={t} item={car} />

      <SummaryForm
        onSubmit={handleSubmit(onSubmit)}
        t={t}
        register={register}
        promoError={promoError}
        isSubmitting={isSubmitting}
        isSuccess={isSuccess}
        rentalSummary={rentalSummary}
      />
    </div>
  );
};

export default RentalSummary;
