'use client';

import React, { useEffect, useRef, useState } from 'react';
import Button from './Button';
import LocationSelect from './LocationSelect';
import DateSelect from './DateSelect';
import { useClickOutside } from '../hooks/useClickOutside';
import { useTranslation } from 'react-i18next';
import { useRouter, useSearchParams } from 'next/navigation';
import { addDays, parse } from 'date-fns';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { setRentalDetail } from '../redux/features/appSlice';
import { appSelector } from '../redux/selectors';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { formattedDate } from '../lib/utils';
import { CATEGORY_PAGE } from '../lib/constants';

type Props = {
  locale: string;
  buttonTitle: string;
  locations: FilterLocation[];
};

type ValuePiece = Date | null;
export type Value = ValuePiece | [ValuePiece, ValuePiece];

function PickAndDrop({ locale, buttonTitle, locations }: Props) {
  const { rentDetail } = useAppSelector(appSelector);
  const [show, setShow] = useState({
    pickUp: false,
    dropOff: false
  });
  const divRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const rentDetailRef = useRef(rentDetail);

  useEffect(() => {
    const pick_up_time = searchParams.get('pick_up_time');
    const drop_off_time = searchParams.get('drop_off_time');
    const pick_up_location_id = searchParams.get('pick_up_location_id');
    const drop_off_location_id = searchParams.get('drop_off_location_id');

    if (pick_up_time && drop_off_time) {
      const pickUpDate = parse(pick_up_time, 'yyyy-MM-dd', new Date());
      const dropOffDate = parse(drop_off_time, 'yyyy-MM-dd', new Date());

      rentDetailRef.current = {
        pickUp: {
          ...rentDetailRef.current.pickUp,
          date: pickUpDate
        },
        dropOff: {
          ...rentDetailRef.current.dropOff,
          date: dropOffDate
        }
      };
      dispatch(setRentalDetail(rentDetailRef.current));
    }
    if (pick_up_location_id && drop_off_location_id) {
      const newRentDetail = {
        pickUp: {
          ...rentDetailRef.current.pickUp,
          location:
            locations.find(
              (location) => location.id === Number(pick_up_location_id)
            ) || null
        },
        dropOff: {
          ...rentDetailRef.current.dropOff,
          location:
            locations.find(
              (location) => location.id === Number(drop_off_location_id)
            ) || null
        }
      };
      dispatch(setRentalDetail(newRentDetail));
    }
  }, [dispatch, locations, searchParams]);

  const handleChange = (value: Value, type: string) => {
    if (value && !Array.isArray(value)) {
      if (type === 'pickUp') {
        const nextDay = addDays(value, 1);

        const newRentDetail = {
          pickUp: {
            ...rentDetail.pickUp,
            date: value
          },
          dropOff: {
            ...rentDetail.pickUp,
            date: !rentDetail.dropOff.date ? nextDay : rentDetail.dropOff.date
          }
        };

        dispatch(setRentalDetail(newRentDetail));

        if (!rentDetail.dropOff.date) {
          setShow({
            pickUp: false,
            dropOff: true
          });
        } else {
          setShow({
            pickUp: false,
            dropOff: false
          });
        }
      } else {
        const newRentDetail = {
          ...rentDetail,
          dropOff: {
            ...rentDetail.dropOff,
            date: value
          }
        };
        dispatch(setRentalDetail(newRentDetail));

        setShow({
          pickUp: false,
          dropOff: false
        });
      }
    }
  };

  const handleSelectLocation = (value: FilterLocation, type: string) => {
    if (type === 'pickUp') {
      const newRentalDetail = {
        pickUp: {
          ...rentDetail.pickUp,
          location: value
        },
        dropOff: {
          ...rentDetail.dropOff,
          location: rentDetail.dropOff.location
            ? rentDetail.dropOff.location
            : value
        }
      };
      dispatch(setRentalDetail(newRentalDetail));
    } else {
      const newRentalDetail = {
        pickUp: {
          ...rentDetail.pickUp,
          location: rentDetail.pickUp.location
            ? rentDetail.pickUp.location
            : value
        },
        dropOff: {
          ...rentDetail.dropOff,
          location: value
        }
      };
      dispatch(setRentalDetail(newRentalDetail));
    }
  };

  useClickOutside(divRef, () =>
    setShow({
      pickUp: false,
      dropOff: false
    })
  );

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams);

    if (rentDetail.pickUp.date) {
      params.set('pick_up_time', formattedDate(rentDetail.pickUp.date));
    } else {
      params.delete('pick_up_time');
    }

    if (rentDetail.dropOff.date) {
      params.set('drop_off_time', formattedDate(rentDetail.dropOff.date));
    } else {
      params.delete('drop_off_time');
    }

    if (rentDetail.pickUp.location) {
      params.set(
        'pick_up_location_id',
        rentDetail.pickUp.location.id.toString()
      );
    } else {
      params.delete('pick_up_location_id');
    }

    if (rentDetail.dropOff.location) {
      params.set(
        'drop_off_location_id',
        rentDetail.dropOff.location.id.toString()
      );
    } else {
      params.delete('drop_off_location_id');
    }

    params.set('page', '1');
    params.set('limit', '9');
    router.push(`${CATEGORY_PAGE}?${params.toString()}`);
  };

  return (
    <div className="relative min-h-[208px]">
      <div className="relative z-30 flex flex-col items-center justify-center gap-4 md:gap-8 lg:flex-row lg:px-8 xl:px-14">
        <div className="h-[120px] w-full space-y-6 rounded-[10px] bg-white p-4 dark:bg-black dark:text-white dark:ring-1 dark:ring-white md:h-[unset] md:space-y-4 md:px-12 md:py-6 lg:z-20">
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-[#3563E933] p-1">
              <div className="h-2 w-2 rounded-full bg-primary"></div>
            </div>
            <h1 className="h-5 text-base font-semibold text-gray-900 dark:text-white">
              {t('filter.pick_up_title')}
            </h1>
          </div>

          <div className="grid grid-cols-2 divide-x divide-borderColor">
            <div className="h-11 pr-5 md:h-12 md:pr-6">
              <h1 className="font-bold leading-5">
                {t('filter.location_title')}
              </h1>

              <LocationSelect
                value={rentDetail.pickUp.location as FilterLocation}
                onChange={(value) => handleSelectLocation(value, 'pickUp')}
                items={locations}
              >
                <Button
                  variant="text"
                  className="relative mt-2 h-4 w-full justify-start bg-white px-0 pr-5 text-xs dark:bg-black dark:text-white dark:ring-1 dark:ring-white md:h-5"
                  rounded="lg"
                >
                  <span className="block truncate text-subTextColor">
                    {rentDetail.pickUp.location
                      ? rentDetail.pickUp.location.name
                      : t('filter.select_location_title')}
                  </span>

                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center">
                    <ChevronDownIcon
                      className="h-[14px] w-[14px] text-[#1A202C]"
                      aria-hidden="true"
                    />
                  </span>
                </Button>
              </LocationSelect>
            </div>

            <div className="h-11 px-5 md:h-12 md:px-6">
              <h1 className="font-bold leading-5">{t('filter.date_title')}</h1>

              <DateSelect
                ref={divRef}
                locale={locale}
                onChange={(value) => handleChange(value, 'pickUp')}
                value={rentDetail.pickUp.date}
                type="pickUp"
                show={show.pickUp}
                dropOffDate={rentDetail.dropOff.date}
                containerClassName="lg:right-[unset] lg:left-0"
              >
                <Button
                  variant="text"
                  className="relative mt-2 h-4 w-full justify-start bg-white px-0 pr-5 text-xs dark:bg-black dark:text-white dark:ring-1 dark:ring-white md:h-5"
                  rounded="lg"
                  onClick={() =>
                    setShow({
                      ...show,
                      pickUp: !show.pickUp,
                      dropOff: false
                    })
                  }
                >
                  <span className="block truncate text-subTextColor">
                    {rentDetail.pickUp.date
                      ? rentDetail.pickUp.date.toLocaleDateString()
                      : t('filter.select_date_title')}
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center">
                    <ChevronDownIcon
                      className="h-[14px] w-[14px] text-[#1A202C]"
                      aria-hidden="true"
                    />
                  </span>
                </Button>
              </DateSelect>
            </div>
          </div>
        </div>

        <div className="h-[120px] w-full space-y-6 rounded-[10px] bg-white p-4 dark:bg-black dark:text-white dark:ring-1 dark:ring-white md:h-[unset] md:space-y-4 md:px-12 md:py-6 lg:z-10">
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-[#54A6FF33] p-1">
              <div className="h-2 w-2 rounded-full bg-[#54A6FF]"></div>
            </div>

            <h1 className="h-5 text-base font-semibold text-gray-900 dark:text-white">
              {t('filter.drop_off_title')}
            </h1>
          </div>

          <div className="grid grid-cols-2 divide-x divide-borderColor">
            <div className="h-11 pr-5 md:h-12 md:pr-6">
              <h1 className="font-bold leading-5">
                {t('filter.location_title')}
              </h1>

              <LocationSelect
                value={rentDetail.dropOff.location as FilterLocation}
                onChange={(value) => handleSelectLocation(value, 'dropOff')}
                items={locations}
              >
                <Button
                  variant="text"
                  className="relative mt-2 h-4 w-full justify-start bg-white px-0 pr-5 text-xs dark:bg-black dark:text-white dark:ring-1 dark:ring-white md:h-5"
                  rounded="lg"
                >
                  <span className="block truncate text-subTextColor">
                    {rentDetail.dropOff.location
                      ? rentDetail.dropOff.location.name
                      : t('filter.select_location_title')}
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center">
                    <ChevronDownIcon
                      className="h-[14px] w-[14px] text-[#1A202C]"
                      aria-hidden="true"
                    />
                  </span>
                </Button>
              </LocationSelect>
            </div>

            <div className="relative h-11 px-5 md:h-12 md:px-6">
              <h1 className="font-bold leading-5">{t('filter.date_title')}</h1>

              <DateSelect
                ref={divRef}
                locale={locale}
                onChange={(value) => handleChange(value, 'dropOff')}
                value={rentDetail.dropOff.date}
                type="dropOff"
                pickUpDate={rentDetail.pickUp.date}
                show={show.dropOff}
              >
                <Button
                  variant="text"
                  className="bg-whit relative mt-2 h-4 w-full justify-start px-0 pr-5 text-xs dark:bg-black dark:text-white dark:ring-1 dark:ring-white md:h-5"
                  rounded="lg"
                  onClick={() =>
                    setShow({
                      ...show,
                      dropOff: !show.dropOff,
                      pickUp: false
                    })
                  }
                >
                  <span className="block truncate text-subTextColor">
                    {rentDetail.dropOff.date
                      ? rentDetail.dropOff.date.toLocaleDateString()
                      : t('filter.select_date_title')}
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center">
                    <ChevronDownIcon
                      className="h-[14px] w-[14px] text-[#1A202C]"
                      aria-hidden="true"
                    />
                  </span>
                </Button>
              </DateSelect>
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute left-0 top-1/2 hidden h-[120px] w-full -translate-y-10 rounded-[10px] bg-[#D9D9D929] shadow-md lg:block"></div>

      <div className="relative mt-4 flex justify-center md:mt-8">
        <Button
          variant="primary"
          className="flex min-w-full gap-8 shadow-md shadow-[#00000040] lg:min-w-[400px]"
          onClick={handleSearch}
        >
          {buttonTitle}
        </Button>
      </div>
    </div>
  );
}

export default PickAndDrop;
