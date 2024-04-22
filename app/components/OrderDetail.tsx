'use client';

import Image from 'next/image';
import Button from './Button';
import { Fetcher } from 'swr';
import { FetchSuccess } from '../lib/ApiManager/ApiMethods';
import ApiManager from '../lib/ApiManager/ApiManager';
import { LoadingIcon } from './icons';
import { useTranslation } from 'react-i18next';
import { INVALID_TOKEN, NOTFOUND_ORDER } from '../lib/error-code';
import { notFound } from 'next/navigation';
import useSWRImmutable from 'swr/immutable';
import { FetchException } from '../lib/exceptions';

type Props = {
  id: string;
};

function OrderDetail({ id }: Props) {
  const { t, i18n } = useTranslation();
  const locale = i18n.language;

  const fetcher: Fetcher<FetchSuccess<OrderDetail>> = (id: string) =>
    ApiManager.getOrderDetail(locale, id).then((res) => res);

  const { data, isLoading, error } = useSWRImmutable(id, fetcher, {
    revalidateOnMount: true
  });

  if (isLoading)
    return (
      <div className="absolute inset-0 grid place-items-center">
        <LoadingIcon className="h-14 w-14 text-primary" />
      </div>
    );

  if (error) {
    const e: CustomError = error?.body.error;

    if (e) {
      if (e.error_id === INVALID_TOKEN) {
        return;
      }

      if (e.error_id === NOTFOUND_ORDER) {
        notFound();
      }
      const { message, error_id } = e;
      const errorMessage = `${message} (${error_id})`;
      throw new FetchException(errorMessage);
    }
    throw new FetchException(
      t('common:error_messages.fetch_exception', {
        name: t('order_details')
      })
    );
  }

  if (!data) return;

  const {
    car_id,
    pick_up_time,
    pick_up_location,
    drop_off_time,
    drop_off_location,
    car_name,
    car_image,
    total,
    tax,
    discount,
    rental_days,
    payment_method,
    invoice_url
  } = data.body.data;

  return (
    <>
      <div className="flex flex-col items-center border-b border-black pb-6 dark:border-white lg:flex-row lg:overflow-auto lg:scrollbar-hide">
        <div className="relative h-[135px] w-full flex-shrink-0 lg:ml-6 lg:w-[140px]">
          <Image
            alt={car_name}
            src={car_image}
            fill
            sizes="(max-width: 768px) 100vw, 100vw"
            className="object-contain object-center"
          />
        </div>

        <div className="mt-8 flex w-full flex-1 flex-col items-center gap-4 lg:mt-0 lg:flex-row">
          <div className="w-full flex-1 px-6 text-left md:whitespace-nowrap lg:border-r lg:border-black lg:px-4 lg:text-center dark:lg:border-white xl:absolute xl:right-12 xl:top-8 xl:w-auto xl:border-0">
            <h2 className="mb-2 text-xl font-semibold uppercase md:text-2xl lg:font-normal lg:normal-case">
              {t('rental_confirmation')}
            </h2>
            <span className="md:text-xl">IDCAR: #{car_id}</span>
          </div>

          <div className="w-full flex-1 px-6 text-left md:whitespace-nowrap lg:border-r lg:border-black lg:px-4 lg:text-center dark:lg:border-white">
            <h2 className="mb-2 text-xl font-semibold md:text-2xl lg:font-normal">
              {car_name}
            </h2>
            <span className="md:text-xl">
              {pick_up_location} - {drop_off_location}
            </span>
          </div>

          <div className="w-full flex-1 px-6 text-left md:whitespace-nowrap lg:border-r lg:border-black lg:px-4 lg:text-center dark:lg:border-white">
            <h2 className="mb-2 text-xl font-semibold uppercase md:text-2xl lg:font-normal">
              {t('pick_up')}:
            </h2>
            <span className="md:text-xl">{pick_up_time}</span>
          </div>

          <div className="w-full flex-1 px-6 text-left md:whitespace-nowrap lg:border-r lg:border-black lg:px-4 lg:text-center dark:lg:border-white">
            <h2 className="mb-2 text-xl font-semibold uppercase md:text-2xl lg:font-normal">
              {t('drop_off')}:
            </h2>
            <span className="md:text-xl">{drop_off_time}</span>
          </div>

          <div className="w-full flex-1 px-6 text-left md:whitespace-nowrap lg:mr-9 lg:px-4 lg:text-center">
            <h2 className="mb-2 text-xl font-semibold uppercase md:text-2xl lg:font-normal">
              {t('total_rental_days')}:
            </h2>
            <span className="md:text-xl">
              {rental_days} {t('common:price_day_title')}
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 space-y-4 p-6 lg:space-y-6 lg:px-16 lg:py-8">
        <div>
          <h1 className="text-xl font-semibold uppercase md:text-2xl lg:text-3xl">
            {t('common:filter.price_title')}:
          </h1>
          <div className="space-y-4 p-4 md:p-6 lg:space-y-6">
            <div className="flex justify-between gap-4 md:text-xl lg:text-2xl">
              <h2>{t('tax')}:</h2>
              <span>{tax}$</span>
            </div>

            <div className="flex justify-between gap-4 md:text-xl lg:text-2xl">
              <h2>{t('discounts')}:</h2>
              <span>{discount}$</span>
            </div>

            <div className="flex justify-between gap-4 md:text-xl lg:text-2xl">
              <h2>{t('total')}:</h2>
              <span>{total}$</span>
            </div>
          </div>
        </div>

        <div>
          <h1 className="text-xl font-semibold uppercase md:text-2xl lg:text-3xl">
            {t('billing_information')}:
          </h1>
          <div className="p-4 md:p-6">
            <div className="flex justify-between gap-4 md:text-xl lg:text-2xl">
              <h2>{t('payment_method')}:</h2>
              <span>{payment_method}</span>
            </div>
          </div>
        </div>
      </div>

      {invoice_url && (
        <div className="mb-10 mt-1 flex items-center justify-center lg:mb-20">
          <Button
            variant="primary"
            className="h-14 min-w-36 rounded-lg bg-[#4482AE] uppercase lg:h-20 lg:min-w-64 lg:rounded-2xl lg:text-2xl"
            to={invoice_url}
          >
            {t('download_title')}
          </Button>
        </div>
      )}
    </>
  );
}

export default OrderDetail;
