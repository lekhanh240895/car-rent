'use client';

import Input from './Input';
import Label from './Label';
import PriceRange from './PriceRange';
import { useTranslation } from 'react-i18next';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm, useWatch } from 'react-hook-form';
import queryString from 'query-string';
import { useEffect } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { CATEGORY_PAGE } from '../lib/constants';

type FormData = {
  sidebarFilter: {
    price: number;
    types: (string | boolean)[];
    capacities: (string | boolean)[];
  };
};

type Entry<T> = [keyof T, any];

type Props = {
  filters: Filters;
};

function Sidebar({ filters }: Props) {
  const { t } = useTranslation();
  const filtersEntries = Object.entries(filters) as Entry<Filters>[];
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const { register, setValue, control } = useForm<FormData>({
    defaultValues: {
      sidebarFilter: {
        price: filters.price.max,
        types: [],
        capacities: []
      }
    }
  });

  const types = useWatch({
    control,
    name: 'sidebarFilter.types'
  });

  const capacities = useWatch({
    control,
    name: 'sidebarFilter.capacities'
  });

  const price = useWatch({
    control,
    name: 'sidebarFilter.price'
  });

  useEffect(() => {
    // Get updated values from searchParams
    const types = searchParams.getAll('types');
    const capacities = searchParams.getAll('capacities');
    const maxPrice = searchParams.get('max_price');

    const updatedTypes = filters.types.map((filter) => {
      return types.includes(filter.id.toString())
        ? filter.id.toString()
        : false;
    });
    const updatedCapacities = filters.capacities.map((filter) => {
      return capacities.includes(filter.id.toString())
        ? filter.id.toString()
        : false;
    });

    maxPrice && setValue('sidebarFilter.price', Number(maxPrice));
    setValue('sidebarFilter.types', updatedTypes);
    setValue('sidebarFilter.capacities', updatedCapacities);
  }, [filters, searchParams, setValue]);

  const handleSelectFilter = useDebouncedCallback(() => {
    const params = new URLSearchParams(searchParams);
    params.delete('types');
    params.delete('capacities');

    const typeParams = queryString.stringify({
      types: types?.filter((v) => v && v !== 'false')
    });

    const capacityParams = queryString.stringify({
      capacities: capacities?.filter((v) => v && v !== 'false')
    });

    params.set('max_price', price?.toString());
    params.set('page', '1');

    const url = `${CATEGORY_PAGE}?${params.toString()}${typeParams && `&${typeParams}`}${capacityParams && `&${capacityParams}`}`;
    replace(url);
  }, 300);

  const filterName = (name: string) => {
    switch (name) {
      case 'types':
        return t('filter.type_title');
      case 'capacities':
        return t('filter.capacity_title');
      case 'price':
        return t('filter.price_title');
      default:
        return '';
    }
  };

  return (
    <aside className="-my-8 -ml-16 hidden bg-white p-8 dark:bg-black dark:text-white lg:-ml-16 lg:block 2xl:w-[360px]">
      <div className="space-y-14">
        {filtersEntries.map(([key, value], index) => (
          <div key={`${key} ${index}`}>
            <h1 className="mb-7 text-xs font-semibold text-subTextColor">
              {filterName(key)?.toUpperCase()}
            </h1>

            {key === 'price' ? (
              <PriceRange
                max={value.max}
                name="sidebarFilter.price"
                t={t}
                price={price}
                register={register}
                onInput={handleSelectFilter}
              />
            ) : (
              <ul className="space-y-4">
                {value.map((f: FilterType, index: number) => (
                  <li
                    key={`${f.name} ${f.id}`}
                    className="relative rounded-xl p-2 hover:bg-gray-100 dark:hover:text-black"
                  >
                    <Label
                      htmlFor={`sidebarFilter.${key}.${index}`}
                      className="mb-0 flex w-full flex-row-reverse items-center gap-3 rounded-xl text-xl font-semibold leading-6 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:text-black"
                    >
                      <span className="flex-1">
                        {f.name}{' '}
                        <span className="ml-1 text-subTextColor">
                          ({f.count})
                        </span>
                      </span>

                      <div>
                        <Input
                          type="checkbox"
                          register={register}
                          name={`sidebarFilter.${key}.${index}`}
                          className="form-checkbox h-4 w-4 border-gray-300 bg-gray-100 p-1 text-blue-600 focus:ring-blue-500"
                          rounded="md"
                          value={f.id}
                          onInput={handleSelectFilter}
                        />
                      </div>
                    </Label>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
}

export default Sidebar;
