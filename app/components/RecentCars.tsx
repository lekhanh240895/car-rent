import RecentCarCard from './RecentCarCard';
import { TFunction } from 'i18next';

type Props = {
  t: TFunction<['translation', ...string[]], undefined>;
  locale: string;
  limit?: number;
  recentCarIds: number[];
};

async function RecentCars({ t, locale, recentCarIds }: Props) {
  return (
    <>
      {recentCarIds.map((id) => (
        <RecentCarCard key={id} id={id} t={t} locale={locale} />
      ))}
    </>
  );
}

export default RecentCars;
