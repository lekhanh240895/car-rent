import Button from './Button';
import Review from './Review';
import clsx from 'clsx';
import MoreReviews from './MoreReviews';
import { TFunction } from 'i18next';
import { getCarReviews } from '../lib/actions';

type Props = {
  id: number;
  locale: string;
  t: TFunction<['translation', ...string[]], undefined>;
};

async function CarReview({ id, locale, t }: Props) {
  const limit = 2;
  const offset = 0;
  const params = `limit=${limit}&offset=${offset}`;

  const data = await getCarReviews(t, locale, id, params);

  const {
    items,
    pagination: { total }
  } = data;
  const skip = items.length;

  return (
    <div
      className={clsx(
        'relative mt-8 rounded-lg bg-white py-4 dark:bg-black dark:ring-1 dark:ring-white md:py-6',
        total > limit && 'pb-[80px] md:pb-[92px]'
      )}
    >
      <div className="mb-6 flex items-center gap-3 px-4 md:mb-8 md:px-6">
        <h1 className="text-xl font-semibold">{t('detail:reviews')}</h1>
        <Button variant="primary" className="h-7 min-w-11 p-0">
          {total}
        </Button>
      </div>

      <div className="max-h-96 space-y-6 overflow-auto px-4 md:max-h-[500px] md:px-6">
        {items.length > 0 ? (
          <>
            <div className="space-y-5 md:space-y-6">
              {items.map((item) => (
                <Review key={item.id} item={item} />
              ))}
            </div>

            {total > limit && <MoreReviews total={total} id={id} skip={skip} />}
          </>
        ) : (
          <h1 className="text-sm text-subTextColor md:text-lg">
            {t('detail:no_review')}
          </h1>
        )}
      </div>
    </div>
  );
}

export default CarReview;
