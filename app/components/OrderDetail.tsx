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
    pick_up_time,
    pick_up_location,
    drop_off_time,
    drop_off_location,
    car_name,
    car_image,
    car_id,
    total,
    tax,
    discount,
    payment_method,
    invoice_url,
    subtotal
  } = data.body.data;

  return (
    <>
      <div className="relative h-32 w-full lg:h-56">
        <Image
          alt={car_name}
          src={car_image}
          fill
          sizes="(max-width: 768px) 100vw, 100vw"
          className="object-contain object-center"
        />
      </div>
      <div className="p-6">
        <h1 className="text-xl font-semibold uppercase md:text-2xl">
          Rental Infomation:
        </h1>
        <div className="space-y-4 p-4 pb-0 md:p-6 md:pb-0">
          <div className="flex flex-col justify-between gap-2 md:flex-row md:gap-4 md:text-xl">
            <h2 className="flex-shrink-0 font-medium">{t('name_car')}:</h2>
            <span>
              {car_name} #{car_id}
            </span>
          </div>
          <div className="flex flex-col justify-between gap-2 md:flex-row md:gap-4 md:text-xl">
            <h2 className="flex-shrink-0 font-medium">{t('pick_up')}:</h2>
            <span>
              {pick_up_location} / {pick_up_time}
            </span>
          </div>
          <div className="flex flex-col justify-between gap-2 md:flex-row md:gap-4 md:text-xl">
            <h2 className="flex-shrink-0 font-medium">{t('drop_off')}:</h2>
            <span>
              {drop_off_location} / {drop_off_time}
            </span>
          </div>
        </div>
      </div>

      <div className="p-6 pt-0">
        <h1 className="text-xl font-semibold uppercase md:text-2xl">
          {t('billing_information')}:
        </h1>
        <div className="space-y-4 p-4 pb-0 md:p-6 md:pb-0">
          <div className="flex justify-between gap-4 md:text-xl">
            <h2 className="font-medium">{t('common:filter.price_title')}:</h2>
            <span>{subtotal}$</span>
          </div>
          <div className="flex justify-between gap-4 md:text-xl">
            <h2 className="font-medium">{t('tax')}:</h2>
            <span>{tax}$</span>
          </div>

          <div className="flex justify-between gap-4 md:text-xl">
            <h2 className="font-medium">{t('discounts')}:</h2>
            <span>{discount}$</span>
          </div>

          <div className="flex justify-between gap-4 md:text-xl">
            <h2 className="font-medium">{t('total')}:</h2>
            <span>{total}$</span>
          </div>
          <div className="flex justify-between gap-4 md:text-xl">
            <h2 className="font-medium">{t('payment_method')}:</h2>
            <span>{payment_method}</span>
          </div>
        </div>
      </div>

      {invoice_url && (
        <div className="mb-10 mt-1 flex items-center justify-center">
          <Button
            variant="primary"
            className="min-w-36 uppercase"
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
