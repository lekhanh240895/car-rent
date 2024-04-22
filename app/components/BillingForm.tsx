import FormItem from './FormItem';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { PaymentFormData } from './PaymentForm';
import { TFunction } from 'i18next';

type Props = {
  register: UseFormRegister<PaymentFormData>;
  errors: FieldErrors<PaymentFormData>;
  t: TFunction<['translation', ...string[]], undefined>;
};
function BillingForm({ register, errors, t }: Props) {
  return (
    <div className="mt-6 space-y-5 md:mt-8 md:grid md:grid-cols-2 md:gap-x-4 md:space-y-0 lg:gap-x-8">
      <div className="space-y-5 md:grid md:grid-flow-col md:grid-rows-2 md:gap-6 md:space-y-0">
        <FormItem
          labelProps={{
            className: 'text-sm md:text-base block mb-3 font-semibold'
          }}
          label={t('name_field')}
          name="billing_info.name"
          inputProps={{
            register,
            placeholder: t('name_field_placeholder'),
            className: 'border-none dark:ring-1 dark:ring-borderColor',
            inputSize: 'lg'
          }}
          error={errors.billing_info?.name}
        />
        <FormItem
          labelProps={{
            className: 'text-sm md:text-base block mb-3 font-semibold'
          }}
          label={t('address_field')}
          name="billing_info.address"
          inputProps={{
            register,
            placeholder: t('address_field_placeholder'),
            className: 'border-none dark:ring-1 dark:ring-borderColor',
            inputSize: 'lg'
          }}
          error={errors.billing_info?.address}
        />
      </div>
      <div className="space-y-5 md:grid md:grid-flow-col md:grid-rows-2 md:gap-6 md:space-y-0">
        <FormItem
          labelProps={{
            className: 'text-sm md:text-base block mb-3 font-semibold'
          }}
          label={t('phone_field')}
          name="billing_info.phone_number"
          inputProps={{
            register,
            placeholder: t('phone_field_placeholder'),
            className: 'border-none dark:ring-1 dark:ring-borderColor',
            inputSize: 'lg',
            type: 'tel'
          }}
          error={errors.billing_info?.phone_number}
        />
        <FormItem
          labelProps={{
            className: 'text-sm md:text-base block mb-3 font-semibold'
          }}
          label={t('city_field')}
          name="billing_info.city"
          inputProps={{
            register,
            placeholder: t('city_field_placeholder'),
            className: 'border-none dark:ring-1 dark:ring-borderColor',
            inputSize: 'lg'
          }}
          error={errors.billing_info?.city}
        />
      </div>
    </div>
  );
}

export default BillingForm;
