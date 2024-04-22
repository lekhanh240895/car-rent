import CarCard from './CarCard';
import { TFunction } from 'i18next';
import MoreCars from './MoreCars';
import { getRecommendCars } from '../lib/actions';

type Props = {
  t: TFunction<['translation', ...string[]], undefined>;
  locale: string;
  limit?: number;
};

async function RecommendCars({ t, locale, limit = 8 }: Props) {
  const {
    items: recommendCars,
    pagination: { total }
  } = await getRecommendCars(t, locale, limit, 0);

  return (
    <div>
      <h1 className="mb-5 text-sm font-semibold tracking-[-1px] text-subTextColor md:px-5 md:py-[10px] md:text-base">
        {t('home:recommend_car_title')}
      </h1>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-8 2xl:grid-cols-4">
        {recommendCars.map((item) => (
          <CarCard vertical key={item.id} item={item} t={t} />
        ))}
      </div>

      <MoreCars total={total} cars={recommendCars} />
    </div>
  );
}

export default RecommendCars;
