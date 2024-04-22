import { TFunction } from 'i18next';
import RentalFilter from './RentalFilter';
import { PaymentFormData } from './PaymentForm';
import { Control, FieldErrors } from 'react-hook-form';
import { RentDetail } from '../redux/features/appSlice';

type Props = {
  t: TFunction<['translation', ...string[]], undefined>;
  car: CarDetail;
  errors: FieldErrors<PaymentFormData>;
  control: Control<PaymentFormData, any>;
  rentDetail: RentDetail;
};

const RentalInfo = ({ t, car, errors, control, rentDetail }: Props) => {
  return (
    <div className="rounded-[10px] bg-white p-4 dark:bg-black dark:ring-1 dark:ring-white md:p-6">
      <div className="flex justify-between gap-4 md:items-end">
        <div>
          <h1 className="mb-1 font-bold md:text-xl md:leading-6">
            {t('rental_info')}
          </h1>
          <p className="text-xs font-medium leading-5 text-subTextColor md:text-sm">
            {t('rental_info_notify')}
          </p>
        </div>

        <span className="min-w-16 flex-shrink-0 whitespace-nowrap text-xs font-medium text-subTextColor md:text-sm">
          {t('step_title', {
            step: 2
          })}
        </span>
      </div>

      <RentalFilter
        rentDetail={rentDetail}
        car={car}
        errors={errors}
        control={control}
      />
    </div>
  );
};

export default RentalInfo;
