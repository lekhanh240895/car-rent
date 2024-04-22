import { format, parseISO } from 'date-fns';
import Image from 'next/image';
import { StarIcon as OutlineStarIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/16/solid';

type Props = {
  item: Review;
};

function Review({ item }: Props) {
  const { user_name, user_title, user_image, content, rating, updated_at } =
    item;

  const formattedDate = format(parseISO(updated_at), 'd MMMM yyyy');
  const fullStars = Math.floor(rating);
  const remainingStar = 5 - fullStars;

  return (
    <div className="flex gap-2 md:gap-4">
      <div className="relative h-11 w-11 flex-shrink-0 md:h-14 md:w-14">
        <Image
          src={user_image}
          alt={user_name}
          fill
          sizes="(max-width: 768px) 100vw, 100vw"
          className="rounded-full object-cover object-center"
          unoptimized={true}
        />
      </div>

      <div className="flex-1">
        <div className="mb-4 flex justify-between gap-4">
          <div>
            <h1 className="mb-2 font-semibold leading-5 dark:text-white md:text-xl md:font-bold">
              {user_name}
            </h1>
            <p className="text-xs font-medium text-subTextColor md:text-sm">
              {user_title}
            </p>
          </div>

          <div className="whitespace-nowrap">
            <h2 className="mb-2 text-xs font-medium leading-6 text-subTextColor md:text-sm md:leading-7">
              {formattedDate}
            </h2>

            <div className="flex gap-1 md:gap-[2px]">
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
          </div>
        </div>

        <p className="line-clamp-2 text-xs leading-6 text-subTextColor md:text-sm md:leading-7">
          {content}
        </p>
      </div>
    </div>
  );
}

export default Review;
