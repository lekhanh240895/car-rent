import Image from 'next/image';
import { StarIcon as OutlineStarIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/16/solid';
import { TFunction } from 'i18next';
import ArrowRow from './ArrowRow';

type Props = {
  t: TFunction<['translation', ...string[]], undefined>;
  item: CarDetail;
};

export default function RentalCar({ t, item }: Props) {
  const { name, avg_rating, rating_count, images } = item;

  const fullStars = Math.floor(avg_rating);
  const remainingStar = 5 - fullStars;
  return (
    <div className="flex items-center gap-4 border-b border-borderColor pb-6 md:flex-col md:pb-8 lg:flex-row">
      <div className="relative h-auto min-h-20 w-[116px] flex-shrink-0 rounded-lg bg-primary md:min-h-[108px] md:w-[132px]">
        <Image
          fill
          src={images[0].image_link}
          alt={name}
          priority
          className="w-60 object-contain object-center md:w-[232px]"
          sizes="(max-width: 768px) 100vw, 100vw"
        />

        <div className="pointer-events-none absolute -left-6 right-0 top-0 z-10 h-full gap-0 overflow-hidden">
          <ArrowRow arrowClassName="h-full w-auto" className="h-1/3" />
          <ArrowRow arrowClassName="h-full w-auto" className="ml-12 h-1/3" />
          <ArrowRow arrowClassName="h-full w-auto" className="h-1/3" />
        </div>
      </div>

      <div>
        <h1 className="mb-3 text-xl font-bold md:mb-2 md:text-[32px] md:leading-[48px]">
          {name}
        </h1>

        <div className="md:flex md:items-center md:gap-2">
          <div className="mb-1 flex gap-1 md:gap-[2px]">
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

          <p className="text-xs font-medium text-[#3D5278] dark:text-subTextColor md:text-sm">
            {rating_count > 0 ? `${rating_count}+` : rating_count}{' '}
            {t('rental_summary_reviewer')}
          </p>
        </div>
      </div>
    </div>
  );
}
