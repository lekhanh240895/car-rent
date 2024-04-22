import CarCard from './CarCard';
import { TFunction } from 'i18next';
import queryString from 'query-string';
import Pagination from './Pagination';
import { Suspense } from 'react';
import { getCars } from '../lib/actions';

type Props = {
  locale: string;
  searchParams: { [key: string]: string | string[] | undefined };
  t: TFunction<['translation', ...string[]], undefined>;
};

async function CategoryList({ locale, searchParams, t }: Props) {
  const {
    query,
    limit = '9',
    page = '1',
    max_price,
    types,
    capacities,
    pick_up_time,
    drop_off_time,
    pick_up_location_id,
    drop_off_location_id
  } = searchParams;
  const offset = Number(limit) * (Number(page) - 1);
  let typeSearchString: string;

  if (typeof types === 'string') {
    typeSearchString = `types[]=${types}`;
  } else if (Array.isArray(types)) {
    typeSearchString = queryString.stringify(
      { types },
      { arrayFormat: 'bracket' }
    );
  } else {
    typeSearchString = '';
  }

  let capacitySearchString;

  if (typeof capacities === 'string') {
    capacitySearchString = `capacities[]=${capacities}`;
  } else if (Array.isArray(capacities)) {
    capacitySearchString = queryString.stringify(
      { capacities },
      {
        arrayFormat: 'bracket'
      }
    );
  } else {
    capacitySearchString = '';
  }

  const params = new URLSearchParams();

  query && params.set('keyword', query as string);
  params.set('offset', offset.toString());
  params.set('limit', limit as string);
  max_price && params.set('max_price', max_price as string);
  pick_up_time && params.set('pick_up_time', pick_up_time as string);
  drop_off_time && params.set('drop_off_time', drop_off_time as string);
  pick_up_location_id &&
    params.set('pick_up_location_id', pick_up_location_id as string);
  drop_off_location_id &&
    params.set('drop_off_location_id', drop_off_location_id as string);

  const finalParams = `${params.toString()}${typeSearchString && `&${typeSearchString}`}${capacitySearchString && `&${capacitySearchString}`}`;

  const data = await getCars(t, locale, finalParams);

  const {
    items,
    pagination: { total }
  } = data;
  const totalPages = Math.ceil(total / Number(limit));

  return (
    <>
      <div className="mb-12 grid grid-cols-1 gap-8 md:mb-16 md:grid-cols-2 2xl:grid-cols-3">
        {items.length > 0
          ? items.map((item) => (
              <CarCard t={t} item={item} key={item.id} vertical />
            ))
          : t('search.no_results')}
      </div>

      <Suspense>
        <Pagination totalPages={totalPages} />
      </Suspense>
    </>
  );
}

export default CategoryList;
