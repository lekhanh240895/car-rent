import { FieldErrors, UseFormRegister } from 'react-hook-form';
import MethodForm from './MethodForm';
import { TFunction } from 'i18next';
import { PaymentFormData } from './PaymentForm';

type Props = {
  t: TFunction<['translation', ...string[]], undefined>;
  register: UseFormRegister<PaymentFormData>;
  errors: FieldErrors<PaymentFormData>;
};

const PaymentMethod = ({ t, register, errors }: Props) => {
  return (
    <div className="rounded-[10px] bg-white p-4 dark:bg-black dark:ring-1 dark:ring-white md:p-6">
      <div className="flex justify-between gap-4 md:items-end">
        <div>
          <h1 className="mb-1 font-bold md:text-xl md:leading-6">
            {t('payment_method_title')}
          </h1>
          <p className="text-xs font-medium leading-5 text-subTextColor md:text-sm">
            {t('payment_method_notify')}
          </p>
        </div>

        <span className="min-w-16 flex-shrink-0 whitespace-nowrap text-xs font-medium text-subTextColor md:text-sm">
          {t('step_title', {
            step: 3
          })}
        </span>
      </div>

      <MethodForm register={register} errors={errors} t={t} />
    </div>
  );
};

export default PaymentMethod;
