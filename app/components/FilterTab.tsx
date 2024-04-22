import { Tab } from '@headlessui/react';
import clsx from 'clsx';
import Input from './Input';
import Label from './Label';
import PriceRange from './PriceRange';
import {
  CurrencyDollarIcon,
  TagIcon,
  UsersIcon
} from '@heroicons/react/24/outline';
import { UseFormRegister } from 'react-hook-form';
import { SearchFormData } from './SearchForm';
import { TFunction } from 'i18next';

const icons: {
  [key: string]: any;
} = {
  types: <TagIcon className="h-5 w-5" />,
  capacities: <UsersIcon className="h-5 w-5" />,
  price: <CurrencyDollarIcon className="h-5 w-5" />
};

type Props = {
  register: UseFormRegister<SearchFormData>;
  filters: Filters;
  price: number;
  t: TFunction<'translation', undefined>;
};

export default function FilterTab({ register, filters, price, t }: Props) {
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
    <div className="flex h-full w-full">
      <Tab.Group vertical>
        <Tab.List className="flex flex-col gap-2 rounded rounded-r-none border-r border-borderColor bg-background p-2">
          {Object.keys(filters).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                clsx(
                  'flex flex-1 items-center gap-2 rounded p-2.5 text-sm font-medium leading-5',
                  'ring-white/60 ring-offset-2 ring-offset-primary focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white text-primary shadow'
                    : 'hover:bg-white hover:text-primary'
                )
              }
            >
              {icons[category]}
              {filterName(category)?.toUpperCase()}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="h-full flex-1 overflow-auto p-2">
          {Object.entries(filters).map(([key, value], index) => (
            <Tab.Panel
              key={index}
              className={clsx('rounded-xl bg-white focus:outline-none')}
            >
              {key === 'price' ? (
                <div className="p-2">
                  <PriceRange
                    max={value.max}
                    register={register}
                    name="filter.price"
                    price={price}
                    t={t}
                  />
                </div>
              ) : (
                <ul className="grid grid-cols-1 gap-2 md:grid-cols-2">
                  {value.map((filter: FilterType, index: number) => (
                    <li key={`${key} ${filter.id}`}>
                      <Label
                        htmlFor={`filter.${key}.${index}`}
                        className="mb-0 flex w-full flex-row-reverse items-center gap-3 rounded-xl p-2 text-base text-gray-900 hover:bg-gray-100"
                      >
                        <span className="flex-1">{filter.name}</span>

                        <div>
                          <Input
                            type="checkbox"
                            className="form-checkbox h-4 w-4 border-gray-300 bg-gray-100 p-1 text-blue-600 focus:ring-blue-500"
                            rounded="md"
                            register={register}
                            name={`filter.${key}.${index}`}
                            value={filter.id}
                          />
                        </div>
                      </Label>
                    </li>
                  ))}
                </ul>
              )}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
