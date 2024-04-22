'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FetchSuccess } from '../lib/ApiManager/ApiMethods';
import ApiManager from '../lib/ApiManager/ApiManager';
import { toast } from 'react-toastify';
import Review from './Review';
import Button from './Button';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

type Props = {
  total: number;
  skip: number;
  id: number;
};

function MoreReviews({ total, skip, id }: Props) {
  const [moreReviews, setMoreReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const { t, i18n } = useTranslation();
  const locale = i18n.language;

  const handleShowAll = async () => {
    if (showAll) {
      setMoreReviews([]);
      setShowAll(!showAll);
    } else {
      try {
        setIsLoading(true);

        const params = `limit=${total}&offset=${skip}`;

        const res: FetchSuccess<SearchResult<Review[]>> =
          await ApiManager.getCarReviews(locale, id, params);
        const data = res.body.data;
        const { items } = data;

        setMoreReviews(items);
        setShowAll(true);
      } catch (e: any) {
        const error: CustomError = e.body?.error;

        const { message, error_id } = error;

        const errorMessage = error
          ? `${message} (${error_id})`
          : t('common:error_messages.unknown_error');

        toast.error(errorMessage);
      }
      setIsLoading(false);
    }
  };

  return (
    <>
      {moreReviews.length > 0 && (
        <div className="space-y-5 md:space-y-6 ">
          {moreReviews.map((item) => (
            <Review key={item.id} item={item} />
          ))}
        </div>
      )}

      <div className="absolute inset-x-0 bottom-4 flex items-center justify-center md:bottom-6">
        <Button
          variant="text"
          className="h-10 min-w-[130px] text-sm font-medium text-subTextColor dark:text-white md:h-11 md:text-base md:font-semibold"
          righticon={
            <ChevronDownIcon
              className={clsx(
                'h-[14px] w-[14px] md:h-4 md:w-4',
                showAll && 'rotate-180 transition'
              )}
            />
          }
          loading={isLoading}
          onClick={handleShowAll}
        >
          {showAll ? t('detail:show_less') : t('detail:show_all')}
        </Button>
      </div>
    </>
  );
}

export default MoreReviews;
