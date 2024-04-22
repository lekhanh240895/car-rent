'use client';

import React, { useState } from 'react';
import Button from './Button';
import CarCard from './CarCard';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import ApiManager from '../lib/ApiManager/ApiManager';
import { FetchSuccess } from '../lib/ApiManager/ApiMethods';

type Props = {
  total: number;
  cars: Car[];
};

function MoreCars({ total, cars }: Props) {
  const [moreCars, setMoreCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const limit = cars.length;
  const [skip, setSkip] = useState(limit);
  const { t, i18n } = useTranslation();
  const locale = i18n.language;

  const handleMore = async () => {
    try {
      setIsLoading(true);

      const res: FetchSuccess<SearchResult<Car[]>> =
        await ApiManager.getRecommendCars(locale, limit, skip);

      const data = res.body.data;
      const { items } = data;

      if (items.length === 0) {
        setIsEnd(true);
      } else {
        setMoreCars((prev) => prev.concat(items));
        setSkip((prev) => prev + limit);
      }
    } catch (e: any) {
      const error: CustomError = e.body?.error;

      if (error) {
        const { message, error_id } = error;

        const errorMessage = `${message} (${error_id})`;

        toast.error(errorMessage);
      } else {
        toast.error(t('ecommon:error_messages.unknown_error'));
      }
    }
    setIsLoading(false);
  };

  return (
    <>
      {moreCars.length > 0 && (
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
          {moreCars.map((item) => (
            <CarCard vertical key={item.id} item={item} t={t} />
          ))}
        </div>
      )}
      <div className="relative mb-8 mt-16 flex items-center justify-center">
        <Button
          disabled={isEnd}
          loading={isLoading}
          variant="primary"
          onClick={handleMore}
        >
          {isEnd ? t('home:no_more_cars_title') : t('show_more_title')}
        </Button>

        <p className="pointer-events-none absolute left-0 right-0 text-right text-subTextColor">
          {total} {t('car_title')}
        </p>
      </div>
    </>
  );
}

export default MoreCars;
