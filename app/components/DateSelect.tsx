import { Fragment, forwardRef } from 'react';
import { Transition } from '@headlessui/react';
import Calendar from 'react-calendar';
import clsx from 'clsx';
import { Value } from './PickAndDrop';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

type Props = {
  value: Date | null;
  locale: string;
  onChange: (value: Value) => void;
  type: string;
  pickUpDate?: Date | null;
  dropOffDate?: Date | null;
  show: boolean;
  children: React.ReactNode;
  containerClassName?: string;
};

type Ref = HTMLDivElement;

const DateSelect = forwardRef<Ref, Props>(
  (
    {
      value,
      onChange,
      locale,
      type,
      pickUpDate,
      dropOffDate,
      show,
      children,
      containerClassName
    },
    ref
  ) => {
    return (
      <div className="relative">
        {children}

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
          <div
            ref={ref}
            className={clsx(
              'absolute right-0 z-50 mt-2 w-auto rounded-md text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm',
              containerClassName
            )}
          >
            <Calendar
              onChange={onChange}
              locale={locale}
              view="month"
              defaultActiveStartDate={value ? value : new Date()}
              prev2Label={null}
              next2Label={null}
              returnValue={type === 'pickUp' ? 'start' : 'end'}
              prevLabel={<ChevronLeftIcon className="h-6 w-6 text-primary" />}
              nextLabel={<ChevronRightIcon className="h-6 w-6 text-primary" />}
              tileClassName={({ date }) =>
                clsx(
                  date.setHours(0, 0, 0, 0) === value?.setHours(0, 0, 0, 0) &&
                    '!bg-primary !text-white'
                )
              }
              tileDisabled={({ date, view }) => {
                switch (view) {
                  case 'month':
                    return (
                      date.setHours(0, 0, 0, 0) <
                        new Date().setHours(0, 0, 0, 0) ||
                      (pickUpDate
                        ? date.setHours(0, 0, 0, 0) <=
                          pickUpDate.setHours(0, 0, 0, 0)
                        : false) ||
                      (dropOffDate
                        ? date.setHours(0, 0, 0, 0) >=
                          dropOffDate.setHours(0, 0, 0, 0)
                        : false)
                    );
                  default:
                    return false;
                }
              }}
            />
          </div>
        </Transition>
      </div>
    );
  }
);

DateSelect.displayName = 'DateSelect';

export default DateSelect;
