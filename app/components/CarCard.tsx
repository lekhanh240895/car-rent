import { GasIcon, SteeringIcon, OutlineHeartIcon } from './icons';
import Image from 'next/image';
import { UsersIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { TFunction } from 'i18next';
import RentalButton from './RentalButton';

type Props = {
  vertical?: boolean;
  className?: string;
  item: Car;
  t: TFunction<['translation', ...string[]], undefined>;
};

function CarCard({ t, className, vertical, item }: Props) {
  const { id, capacity, steering, gasoline, price, name, type, image } = item;
  const isDiscount = false;

  return (
    <div
      className={clsx(
        'flex flex-shrink-0 flex-col rounded-[10px] bg-white p-4 text-sm dark:border dark:border-white dark:bg-black md:h-[388px] xl:p-6',
        className,
        vertical ? 'h-60 w-full md:w-auto' : 'h-[286px] w-60 md:w-[304px]'
      )}
    >
      <div className="flex justify-between gap-4">
        <div>
          <h1 className="mb-1 text-base font-bold leading-5 md:text-xl">
            {name}
          </h1>
          <p
            className={clsx(
              'text-sub TextColor  text-xs md:text-sm',
              vertical ? 'leading-[14px]' : 'leading-5'
            )}
          >
            {type}
          </p>
        </div>

        <OutlineHeartIcon
          className={clsx('flex-shrink-0', vertical && 'h-4 w-4 md:h-6 md:w-6')}
        />
      </div>

      <div
        className={clsx(
          'flex flex-1 justify-between md:mb-6 md:flex-col',
          vertical ? 'flex-row gap-5' : 'mb-7 flex-col'
        )}
      >
        <div
          className={clsx(
            'relative grid min-w-40 flex-1',
            vertical ? 'place-items-center' : 'place-items-center'
          )}
        >
          <Image
            fill
            src={image}
            alt={name}
            priority
            className="w-60 object-contain object-center md:w-[232px]"
            sizes="(max-width: 768px) 100vw, 100vw"
          />
        </div>

        <div
          className={clsx(
            'flex gap-4 text-xs text-subTextColor md:flex-row md:justify-center md:text-sm',
            vertical
              ? 'mt-[10px] flex-col items-start md:mt-0 md:items-center'
              : 'items-center justify-center'
          )}
        >
          <div className="flex h-[14px] flex-shrink-0 items-center justify-center gap-1 md:h-6">
            <GasIcon className="h-[14px] w-[14px] md:h-6 md:w-6" />
            <span>{gasoline}L</span>
          </div>
          <div className="flex h-[14px] items-center justify-center gap-1">
            <SteeringIcon className="h-[14px] w-[14px] md:h-6 md:w-6" />
            <span>{steering}</span>
          </div>
          <div className="flex h-[14px] items-center justify-center gap-1">
            <UsersIcon className="h-[14px] w-[14px] flex-shrink-0 md:h-6 md:w-6" />
            <span>
              {capacity} {t('detail.capacity_people_title')}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 md:gap-6">
        <div className="flex-1">
          <h1 className="text-base font-bold leading-5 md:text-[20px] md:leading-6">
            ${price}/
            <span className="ml-1 text-xs text-subTextColor md:text-sm">
              {t('price_day_title')}
            </span>
          </h1>
          {isDiscount && (
            <h1 className="font-bold text-subTextColor line-through">$99.00</h1>
          )}
        </div>

        <RentalButton id={id} />
      </div>
    </div>
  );
}

export default CarCard;
