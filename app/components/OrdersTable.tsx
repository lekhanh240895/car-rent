'use client';

import Button from './Button';
import { format, parseISO } from 'date-fns';
import { Suspense } from 'react';
import Pagination from './Pagination';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'next/navigation';
import { Fetcher } from 'swr';
import { FetchSuccess } from '../lib/ApiManager/ApiMethods';
import ApiManager from '../lib/ApiManager/ApiManager';
import { LoadingIcon } from './icons';
import { ORDER_DETAIL_PAGE } from '../lib/constants';
import useSWRImmutable from 'swr/immutable';
import { INVALID_TOKEN } from '../lib/error-code';
import { FetchException } from '../lib/exceptions';

function OrdersTable() {
  const { t, i18n } = useTranslation();
  const locale = i18n.language;
  const searchParams = useSearchParams();
  const page = searchParams.get('page') || 1;
  const limit = searchParams.get('limit') || 10;
  const offset = Number(limit) * (Number(page) - 1);
  const params = new URLSearchParams();

  params.set('offset', offset.toString());
  params.set('limit', limit as string);

  const fetcher: Fetcher<FetchSuccess<SearchResult<Order[]>>> = (
    params: string
  ) => ApiManager.getOrders(locale, params).then((res) => res);

  const { data, isLoading, error } = useSWRImmutable(
    params.toString(),
    fetcher,
    {
      revalidateOnMount: true
    }
  );

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
      const { message, error_id } = e;
      const errorMessage = `${message} (${error_id})`;
      throw new FetchException(errorMessage);
    }
    throw new FetchException(t('common:error_messages.get_orders_failed'));
  }

  if (!data) return;

  const {
    items,
    pagination: { total }
  } = data?.body.data;
  const totalPages = Math.ceil(total / Number(limit));

  return (
    <div className="flex flex-1 flex-col justify-between gap-8 lg:gap-12">
      {items.length > 0 ? (
        <>
          <div className="overflow-scroll scrollbar-hide">
            <table className="table-auto border border-borderColor text-xs shadow-lg md:min-w-full md:text-base">
              <thead className="bg-background dark:bg-black">
                <tr className="text-left">
                  <th className="border border-borderColor bg-background p-2 text-center text-xs dark:bg-black md:min-w-14 md:p-4 md:text-base">
                    1
                  </th>
                  <th className="border border-borderColor p-2 text-xs uppercase md:p-4 md:text-base">
                    Id
                  </th>
                  <th className="min-w-28 whitespace-nowrap border border-borderColor p-2 text-xs  uppercase md:min-w-32 md:p-4 md:text-base">
                    {t('name_car')}
                  </th>
                  <th className="min-w-28 whitespace-nowrap border border-borderColor p-2 text-xs uppercase md:min-w-32 md:p-4 md:text-base">
                    {t('payment_date')}
                  </th>
                  <th className="min-w-28 border border-borderColor p-2 text-xs uppercase md:min-w-32 md:p-4 md:text-base">
                    {t('common:filter.price_title')}
                  </th>
                  <th className="min-w-28 whitespace-nowrap border border-borderColor p-2 text-xs uppercase md:min-w-32 md:p-4 md:text-base">
                    {t('payment_method')}
                  </th>
                  <th className="min-w-28 whitespace-nowrap border border-borderColor p-2 text-xs uppercase md:min-w-32 md:p-4 md:text-base">
                    {t('status')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => {
                  const {
                    id,
                    car_name,
                    total,
                    payment_method,
                    created_at,
                    status
                  } = item;
                  const parsedDate = parseISO(created_at);
                  const formattedDate = format(parsedDate, 'dd MMM yyyy');
                  return (
                    <tr key={item.id}>
                      <th className="border border-borderColor bg-background p-2 text-center text-xs dark:bg-black md:min-w-14 md:p-4 md:text-base">
                        {index + 2}
                      </th>
                      <td className="border border-borderColor p-2 text-xs md:p-4 md:text-base">
                        <Button
                          to={`${ORDER_DETAIL_PAGE}/${id}`}
                          variant="text"
                          className="h-full justify-start text-primary"
                        >
                          #{id}
                        </Button>
                      </td>
                      <td className="min-w-28 border border-borderColor p-2 text-xs md:min-w-32 md:p-4 md:text-base">
                        {car_name}
                      </td>
                      <td className="min-w-28 border border-borderColor p-2 text-xs md:min-w-32 md:p-4 md:text-base">
                        {formattedDate}
                      </td>
                      <td className="min-w-28 border border-borderColor p-2 text-xs md:min-w-32 md:p-4 md:text-base">
                        {total}$
                      </td>
                      <td className="min-w-28 border border-borderColor p-2 text-xs md:min-w-32 md:p-4 md:text-base">
                        {payment_method}
                      </td>
                      <td className="min-w-28 border border-borderColor p-2 text-xs md:min-w-32 md:p-4 md:text-base">
                        {status}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <Suspense>
            <Pagination totalPages={totalPages} />
          </Suspense>
        </>
      ) : (
        <h1>{t('order_list_empty')}</h1>
      )}
    </div>
  );
}

export default OrdersTable;
