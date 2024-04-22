import Button from './Button';
import CarCard from './CarCard';
import { TFunction } from 'i18next';
import { getPopularCars } from '../lib/actions';
import { CATEGORY_PAGE } from '../lib/constants';

type Props = {
  t: TFunction<['translation', ...string[]], undefined>;
  locale: string;
};

async function PopularCars({ t, locale }: Props) {
  const limit = 4;
  const items = await getPopularCars(t, locale, limit);

  return (
    <div>
      <div className="mb-5 flex justify-between md:px-5 md:py-[10px]">
        <h1 className="text-sm font-semibold leading-5 text-subTextColor md:text-base md:leading-6">
          {t('home:popular_car_title')}
        </h1>

        <Button
          to={CATEGORY_PAGE}
          variant="text"
          className="h-5 px-0 text-xs font-semibold text-primary md:h-6 md:text-base"
        >
          {t('view_all_title')}
        </Button>
      </div>

      <div className="-mx-6 flex gap-5 overflow-auto px-1 pl-6 scrollbar-hide md:-mx-16 md:gap-8 md:pb-1 md:pl-16 2xl:mx-0 2xl:ml-0 2xl:grid 2xl:grid-cols-4 2xl:pl-1">
        {items.map((item) => (
          <CarCard className="md:shadow-card" key={item.id} item={item} t={t} />
        ))}
      </div>
    </div>
  );
}

export default PopularCars;
