import { Popover, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';
import FilterTab from './FilterTab';
import Button from './Button';
import { TFunction } from 'i18next';
import { UseFormRegister } from 'react-hook-form';
import { SearchFormData } from './SearchForm';

type Props = {
  children: React.ReactNode;
  t: TFunction<'translation', undefined>;
  register: UseFormRegister<SearchFormData>;
  price: number;
  filters: Filters;
  onClearFilters: () => void;
};

export default function FilterMenu({
  filters,
  price,
  register,
  t,
  children,
  onClearFilters
}: Props) {
  return (
    <Popover className="relative">
      <Popover.Button as={Fragment}>{children}</Popover.Button>
      <Popover.Overlay className="fixed inset-0" />
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute right-0 top-full z-50 mt-3 w-screen max-w-xs transform px-4 sm:max-w-sm sm:px-0 md:max-w-md lg:left-1/2 lg:max-w-xl lg:-translate-x-1/2">
          <div className="flex h-64 flex-col rounded shadow-lg ring-1 ring-black/5">
            <div className="relative flex-1 overflow-auto bg-white dark:text-black">
              <FilterTab
                t={t}
                register={register}
                filters={filters}
                price={price}
              />
            </div>

            <div className="flex h-16 items-center justify-center gap-4 border border-borderColor bg-gray-50 p-4">
              <Popover.Button as={Button} variant="primary" type="submit">
                {t('filter.submit_title')}
              </Popover.Button>
              <Button type="button" variant="outline" onClick={onClearFilters}>
                {t('filter.clear_title')}
              </Button>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
