import Button from '@/app/components/Button';
import { StarIcon as OutlineStarIcon } from '@heroicons/react/24/outline';
import { OutlineHeartIcon } from '@/app/components/icons';
import { StarIcon } from '@heroicons/react/16/solid';
import { TFunction } from 'i18next';
import { PAYMENT_PAGE } from '../lib/constants';

type Props = {
  item: CarDetail;
  t: TFunction<['translation', ...string[]], undefined>;
};
function DetailCar({ item, t }: Props) {
  const {
    id,
    name,
    description,
    price,
    capacity,
    steering,
    gasoline,
    type,
    avg_rating,
    rating_count
  } = item;

  const fullStars = Math.floor(avg_rating);
  const remainingStar = 5 - fullStars;

  const isDiscount = false;
  return (
    <div className="relative flex flex-col rounded-lg bg-white p-4 dark:bg-black dark:ring-1 dark:ring-white md:p-6 md:pb-8">
      <div className="flex justify-between gap-4">
        <h1 className="mb-2 text-xl font-bold md:text-3xl md:leading-10">
          {name}
        </h1>
        <OutlineHeartIcon
          className="hidden h-6 w-6 flex-shrink-0 lg:block"
          color="currentColor"
        />
      </div>

      <div className="mb-4 flex items-center gap-2 lg:mb-8">
        <div className="flex gap-1">
          {[...Array(fullStars)].map((_, index) => (
            <StarIcon
              key={index}
              className="h-3 w-3 text-[#FBAD39] md:h-5 md:w-5"
            />
          ))}
          {[...Array(remainingStar)].map((_, index) => (
            <OutlineStarIcon
              key={index + fullStars}
              className="h-3 w-3 text-subTextColor md:h-5 md:w-5"
            />
          ))}
        </div>

        <p className="text-xs font-medium text-textColor md:text-sm">
          {rating_count > 0 ? `${rating_count}+` : rating_count}{' '}
          {t('detail.reviewer_title')}
        </p>
      </div>

      <p className="mb-4 flex-1 text-xs leading-6 text-subTextColor md:text-base md:text-textColor lg:mb-8 lg:text-xl lg:leading-10">
        {description}
      </p>

      <div className="mb-1 grid grid-cols-2 gap-x-12 gap-y-4 text-xs md:gap-x-11 md:text-base lg:text-xl">
        <div className="flex justify-between gap-2">
          <h1 className="text-subTextColor">{t('detail.type_car_title')}</h1>
          <p className="text-right font-semibold">{type}</p>
        </div>
        <div className="flex justify-between gap-2">
          <h1 className="text-subTextColor">{t('filter.capacity_title')}</h1>
          <p className="text-right font-semibold">
            {capacity} {t('detail.capacity_person_title')}
          </p>
        </div>
        <div className="flex justify-between gap-2">
          <h1 className="text-subTextColor">{t('filter.steering_title')}</h1>
          <p className="text-right font-semibold">{steering}</p>
        </div>
        <div className="flex justify-between gap-2">
          <h1 className="text-subTextColor">{t('filter.gasonline_title')}</h1>
          <p className="text-right font-semibold">{gasoline}L</p>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-4 md:mt-[68px] md:gap-6">
        <div className="flex-1">
          <h1 className="text-xl font-bold md:text-3xl">
            ${price}/
            <span className="ml-1 text-xs text-subTextColor md:text-base">
              {t('price_day_title')}
            </span>
          </h1>
          {isDiscount && (
            <h1 className="font-bold text-subTextColor line-through">$99.00</h1>
          )}
        </div>
        <Button
          to={`${PAYMENT_PAGE}?car_id=${id}`}
          variant="primary"
          className="min-w-[140px] flex-shrink-0 text-base font-bold"
          size="lg"
        >
          {t('rent_button_title')}
        </Button>
      </div>
    </div>
  );
}

export default DetailCar;
