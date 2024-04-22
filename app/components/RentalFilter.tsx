'use client';

import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../hooks/hooks';
import Button from './Button';
import LocationSelect from './LocationSelect';
import { RentDetail, setRentalDetail } from '../redux/features/appSlice';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import DateSelect from './DateSelect';
import { useRef, useState } from 'react';
import { Value } from './PickAndDrop';
import { useClickOutside } from '../hooks/useClickOutside';
import { PaymentFormData } from './PaymentForm';
import { Control, Controller, FieldErrors } from 'react-hook-form';

type Props = {
  car: CarDetail;
  errors: FieldErrors<PaymentFormData>;
  control: Control<PaymentFormData, any>;
  rentDetail: RentDetail;
};

function RentalFilter({ car, errors, control, rentDetail }: Props) {
  const { t, i18n } = useTranslation();
  const locale = i18n.language;
  const dispatch = useAppDispatch();
  const [show, setShow] = useState({
    pickUp: false,
    dropOff: false
  });
  const divRef = useRef<HTMLDivElement>(null);

  useClickOutside(divRef, () =>
    setShow({
      pickUp: false,
      dropOff: false
    })
  );

  const handleSelectLocation = (value: FilterLocation, type: string) => {
    if (type === 'pickUp') {
      const newRentalDetail = {
        pickUp: {
          ...rentDetail.pickUp,
          location: value
        },
        dropOff: {
          ...rentDetail.dropOff
        }
      };

      dispatch(setRentalDetail(newRentalDetail));
    } else {
      const newRentalDetail = {
        pickUp: {
          ...rentDetail.pickUp,
          location: value
        },
        dropOff: {
          ...rentDetail.dropOff,
          location: value
        }
      };
      dispatch(setRentalDetail(newRentalDetail));
    }
  };

  const handleChange = (value: Value, type: string) => {
    if (value && !Array.isArray(value)) {
      if (type === 'pickUp') {
        const newRentDetail = {
          pickUp: {
            ...rentDetail.pickUp,
            date: value
          },
          dropOff: {
            ...rentDetail.dropOff
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
          pickUp: {
            ...rentDetail.pickUp
          },
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
  const { pick_up_locations, drop_off_locations } = car;

  return (
    <div className="mt-6 space-y-6 md:mt-8 md:space-y-8">
      {/* Pick-Up */}
      <div>
        <div className="mb-5 flex items-center gap-2 md:mb-6">
          <div className="rounded-full bg-[#3563E933] p-1">
            <div className="h-2 w-2 rounded-full bg-primary"></div>
          </div>

          <h1 className="h-5 text-base font-semibold text-gray-900 dark:text-white">
            {t('common:filter.pick_up_title')}
          </h1>
        </div>

        <div className="grid grid-cols-1 space-y-5 md:grid-cols-2 md:gap-4 md:space-y-0 lg:gap-8">
          <div>
            <h1 className="mb-3 text-sm font-semibold md:mb-4 md:text-base">
              {t('common:filter.location_title')}
            </h1>

            <Controller
              control={control}
              name="rentDetail.pickUp.location"
              render={({ field: { onChange, value } }) => (
                <>
                  <LocationSelect
                    value={value}
                    onChange={(value) => {
                      handleSelectLocation(value, 'pickUp');
                      onChange(value);
                    }}
                    items={pick_up_locations}
                  >
                    <Button
                      variant="text"
                      className="w-full justify-start bg-background pl-6 dark:border dark:border-borderColor dark:bg-black md:pl-8"
                      rounded="lg"
                      size="lg"
                    >
                      <span className="block truncate text-xs font-medium leading-5 text-subTextColor">
                        {rentDetail.pickUp.location
                          ? rentDetail.pickUp.location.name
                          : t('common:filter.select_location_title')}
                      </span>

                      <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                        <ChevronDownIcon
                          className="h-[14px] w-[14px] text-subTextColor"
                          aria-hidden="true"
                        />
                      </span>
                    </Button>
                  </LocationSelect>
                  <p className="text-red-500">
                    {errors.rentDetail?.pickUp?.location?.message}
                  </p>
                </>
              )}
            />
          </div>

          <div>
            <h1 className="mb-3 text-sm font-semibold md:mb-4 md:text-base">
              {t('common:filter.date_title')}
            </h1>

            <Controller
              control={control}
              name="rentDetail.pickUp.date"
              render={({ field: { onChange, value } }) => (
                <>
                  <DateSelect
                    ref={divRef}
                    locale={locale}
                    onChange={(value) => {
                      handleChange(value, 'pickUp');
                      onChange(value);
                    }}
                    value={value}
                    type="pickUp"
                    dropOffDate={rentDetail.dropOff.date}
                    show={show.pickUp}
                  >
                    <Button
                      variant="text"
                      className="w-full justify-start bg-background pl-6 dark:border dark:border-borderColor dark:bg-black md:pl-8"
                      rounded="lg"
                      size="lg"
                      onClick={() =>
                        setShow({
                          ...show,
                          pickUp: !show.pickUp,
                          dropOff: false
                        })
                      }
                    >
                      <span className="block truncate text-xs font-medium leading-5 text-subTextColor">
                        {rentDetail.pickUp.date
                          ? rentDetail.pickUp.date.toLocaleDateString()
                          : t('common:filter.select_date_title')}
                      </span>
                      <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                        <ChevronDownIcon
                          className="h-[14px] w-[14px] text-subTextColor"
                          aria-hidden="true"
                        />
                      </span>
                    </Button>
                  </DateSelect>
                  <p className="text-red-500">
                    {errors.rentDetail?.pickUp?.date?.message}
                  </p>
                </>
              )}
            />
          </div>
        </div>
      </div>

      {/* Drop-Off */}
      <div>
        <div className="mb-5 flex items-center gap-2 md:mb-6">
          <div className="rounded-full bg-[#54A6FF33] p-1">
            <div className="h-2 w-2 rounded-full bg-[#54A6FF]"></div>
          </div>

          <h1 className="h-5 text-base font-semibold text-gray-900 dark:text-white">
            {t('common:filter.drop_off_title')}
          </h1>
        </div>

        <div className="grid grid-cols-1 space-y-5 md:grid-cols-2 md:gap-4 md:space-y-0 lg:gap-8">
          <div>
            <h1 className="mb-3 text-sm font-semibold md:mb-4 md:text-base">
              {t('common:filter.location_title')}
            </h1>

            <Controller
              control={control}
              name="rentDetail.dropOff.location"
              render={({ field: { onChange, value } }) => (
                <>
                  <LocationSelect
                    value={value}
                    onChange={(value) => {
                      handleSelectLocation(value, 'dropOff');
                      onChange(value);
                    }}
                    items={drop_off_locations}
                  >
                    <Button
                      variant="text"
                      className="w-full justify-start bg-background pl-6 dark:border dark:border-borderColor dark:bg-black md:pl-8"
                      rounded="lg"
                      size="lg"
                    >
                      <span className="block truncate text-xs font-medium leading-5 text-subTextColor">
                        {rentDetail.dropOff.location
                          ? rentDetail.dropOff.location.name
                          : t('common:filter.select_location_title')}
                      </span>

                      <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                        <ChevronDownIcon
                          className="h-[14px] w-[14px] text-subTextColor"
                          aria-hidden="true"
                        />
                      </span>
                    </Button>
                  </LocationSelect>
                  <p className="text-red-500">
                    {errors.rentDetail?.dropOff?.location?.message}
                  </p>
                </>
              )}
            />
          </div>

          <div>
            <h1 className="mb-3 text-sm font-semibold md:mb-4 md:text-base">
              {t('common:filter.date_title')}
            </h1>

            <Controller
              control={control}
              name="rentDetail.dropOff.date"
              render={({ field: { onChange, value } }) => (
                <>
                  <DateSelect
                    ref={divRef}
                    locale={locale}
                    onChange={(value) => {
                      handleChange(value, 'dropOff');
                      onChange(value);
                    }}
                    value={value}
                    type="dropOff"
                    pickUpDate={rentDetail.pickUp.date}
                    show={show.dropOff}
                  >
                    <Button
                      variant="text"
                      className="w-full justify-start bg-background pl-6 dark:border dark:border-borderColor dark:bg-black md:pl-8"
                      rounded="lg"
                      size="lg"
                      onClick={() =>
                        setShow({
                          ...show,
                          dropOff: !show.dropOff,
                          pickUp: false
                        })
                      }
                    >
                      <span className="block truncate text-xs font-medium leading-5 text-subTextColor">
                        {rentDetail.dropOff.date
                          ? rentDetail.dropOff.date.toLocaleDateString()
                          : t('common:filter.select_date_title')}
                      </span>
                      <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                        <ChevronDownIcon
                          className="h-[14px] w-[14px] text-subTextColor"
                          aria-hidden="true"
                        />
                      </span>
                    </Button>
                  </DateSelect>
                  <p className="text-red-500">
                    {errors.rentDetail?.dropOff?.date?.message}
                  </p>
                </>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RentalFilter;
