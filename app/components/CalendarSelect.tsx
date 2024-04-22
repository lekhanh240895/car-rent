import { Fragment } from 'react';
import { Transition } from '@headlessui/react';
import Calendar from 'react-calendar';
import clsx from 'clsx';
import { Value } from './PickAndDrop';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { RentDetail } from '../redux/features/appSlice';

type Props = {
  locale: string;
  selectRange: boolean;
  shouldDouleView: boolean;
  rentDetail: RentDetail;
  show: boolean;
  onChange: (value: Value) => void;
};

export default function CalendarSelect({
  onChange,
  locale,
  rentDetail,
  show
}: Props) {
  return (
    <Transition
      show={show}
      as={Fragment}
      enter="transition duration-100 ease-out"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-75 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0"
    >
      <div className="absolute left-1/2 z-10 mt-1 w-full -translate-x-1/2 rounded-md text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm md:w-auto xl:top-full">
        <Calendar
          onChange={onChange}
          locale={locale}
          view="month"
          prev2Label={null}
          next2Label={null}
          prevLabel={<ChevronLeftIcon className="h-6 w-6 text-primary" />}
          nextLabel={<ChevronRightIcon className="h-6 w-6 text-primary" />}
          tileClassName={({ date }) => {
            const pickUpDate = rentDetail.pickUp.date;
            const dropOffDate = rentDetail.dropOff.date;
            if (pickUpDate && dropOffDate) {
              return clsx(
                date.setHours(0, 0, 0, 0) ===
                  pickUpDate?.setHours(0, 0, 0, 0) &&
                  'bg-primary text-white rounded-l-full',
                date.setHours(0, 0, 0, 0) ===
                  dropOffDate?.setHours(0, 0, 0, 0) &&
                  'bg-primary text-white rounded-r-full',
                date.setHours(0, 0, 0, 0) < dropOffDate?.setHours(0, 0, 0, 0) &&
                  date.setHours(0, 0, 0, 0) >
                    pickUpDate?.setHours(0, 0, 0, 0) &&
                  'bg-blue-200 rounded-none'
              );
            }
          }}
          tileDisabled={({ date, view }) => {
            switch (view) {
              case 'month':
                return (
                  date.setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)
                );
              default:
                return false;
            }
          }}
        />
      </div>
    </Transition>
  );
}
