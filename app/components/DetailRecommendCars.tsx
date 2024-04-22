import CarCard from './CarCard';
import { TFunction } from 'i18next';
import { getRecommendCars } from '../lib/actions';

type Props = {
  t: TFunction<['translation', ...string[]], undefined>;
  locale: string;
  limit?: number;
  id: number;
};
3;
async function DetailRecommendCars({ t, locale, limit = 5, id }: Props) {
  const { items } = await getRecommendCars(t, locale, limit, 0);
  const recommendCars = items.filter((item) => item.id !== id).slice(0, 4);

  return (
    <>
      {recommendCars.map((item) => (
        <CarCard key={item.id} item={item} t={t} />
      ))}
    </>
  );
}

export default DetailRecommendCars;
