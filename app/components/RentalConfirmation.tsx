import { TFunction } from 'i18next';
import ConfirmationForm from './ConfirmationForm';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { PaymentFormData } from './PaymentForm';

type Props = {
  t: TFunction<['translation', ...string[]], undefined>;
  register: UseFormRegister<PaymentFormData>;
  errors: FieldErrors<PaymentFormData>;
  data: PaymentFormData;
  onTrigger: () => Promise<boolean>;
  onCreateOrder: () => Promise<string>;
  onApprove: (data: Record<string, unknown>) => Promise<void>;
  onCancel: (data: Record<string, unknown>) => Promise<void>;
  loading: boolean;
};

const RentalConfirmation = ({
  t,
  register,
  errors,
  onTrigger,
  data,
  onCreateOrder,
  onApprove,
  onCancel,
  loading
}: Props) => {
  return (
    <div className="rounded-[10px] bg-white p-4 dark:bg-black dark:ring-1 dark:ring-white md:p-6">
      <div className="flex justify-between gap-4 md:items-end">
        <div>
          <h1 className="mb-1 font-bold md:text-xl md:leading-6">
            {t('confirmation_title')}
          </h1>
          <p className="text-xs font-medium leading-5 text-subTextColor md:text-sm">
            {t('confirmation_description')}
          </p>
        </div>

        <span className="min-w-16 flex-shrink-0 whitespace-nowrap text-xs font-medium text-subTextColor md:text-sm">
          {t('step_title', {
            step: 4
          })}
        </span>
      </div>

      <ConfirmationForm
        onCreateOrder={onCreateOrder}
        onApprove={onApprove}
        onCancel={onCancel}
        onTrigger={onTrigger}
        data={data}
        register={register}
        errors={errors}
        t={t}
        loading={loading}
      />
    </div>
  );
};

export default RentalConfirmation;
