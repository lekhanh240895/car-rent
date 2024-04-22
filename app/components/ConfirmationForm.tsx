import Label from './Label';
import Input from './Input';
import Button from './Button';
import { SafeDataIcon } from './icons';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { PaymentFormData } from './PaymentForm';
import { TFunction } from 'i18next';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { PAYMENT_METHOD_PAYPAL } from '../lib/constants';
import { useRef } from 'react';

type Props = {
  register: UseFormRegister<PaymentFormData>;
  errors: FieldErrors<PaymentFormData>;
  t: TFunction<['translation', ...string[]], undefined>;
  data: PaymentFormData;
  onTrigger: () => Promise<boolean>;
  onCreateOrder: () => Promise<string>;
  onApprove: (data: Record<string, unknown>) => Promise<void>;
  onCancel: (data: Record<string, unknown>) => Promise<void>;
  loading: boolean;
};

function ConfirmationForm({
  register,
  errors,
  t,
  data,
  onTrigger,
  onCreateOrder,
  onApprove,
  onCancel,
  loading
}: Props) {
  const { payment_method } = data;
  const showPaypalButton = payment_method === PAYMENT_METHOD_PAYPAL;
  const [{ isRejected }] = usePayPalScriptReducer();
  const submitRef = useRef<HTMLButtonElement>(null);
  return (
    <div className="mt-6 md:mt-8">
      <div className="space-y-5">
        <div className="relative flex h-16 items-center rounded-[10px] bg-background p-4 dark:border dark:border-borderColor dark:bg-black md:h-14 md:w-full">
          <Label
            htmlFor={`confirmation.email_notify`}
            className="mb-0 flex flex-row-reverse items-center gap-4 md:gap-5"
          >
            <span className="flex-1 text-xs font-medium leading-[22px] md:text-base">
              {t('confirmation_email_notify')}
            </span>

            <Input
              type="checkbox"
              className="form-checkbox h-4 w-4 p-0 text-blue-600 focus:ring-blue-500 md:h-6 md:w-6"
              rounded="sm"
              register={register}
              name={`confirmation.email_notify`}
              id={`confirmation.email_notify`}
            />
          </Label>
        </div>

        <div className="relative flex h-16 items-center rounded-[10px] bg-background p-4 dark:border dark:border-borderColor dark:bg-black md:h-14 md:w-full">
          <Label
            htmlFor={`confirmation.terms_and_services`}
            className="mb-0 flex flex-row-reverse items-center gap-4 md:gap-5"
          >
            <span className="flex-1 text-xs font-medium leading-[22px] md:text-base">
              {t('terms_and_policy')}
            </span>

            <div>
              <Input
                type="checkbox"
                className="form-checkbox h-4 w-4 p-0 text-blue-600 focus:ring-blue-500 md:h-6 md:w-6"
                rounded="sm"
                register={register}
                name={`confirmation.terms_and_services`}
                id={`confirmation.terms_and_services`}
              />
            </div>
          </Label>
        </div>
      </div>
      <p className="text-red-500">
        {errors.confirmation?.terms_and_services?.message}
      </p>

      <Button
        variant="primary"
        className="relative mb-8 mt-6 min-w-[100px] text-xs font-semibold md:h-14 md:min-w-[140px] md:rounded-lg md:text-base"
        type="submit"
        loading={loading}
        disabled={loading}
        ref={submitRef}
      >
        {t('common:rent_button_title')}

        {showPaypalButton && !isRejected && (
          <PayPalButtons
            style={{
              layout: 'horizontal',
              tagline: false,
              height: 50,
              disableMaxWidth: true
            }}
            createOrder={onCreateOrder}
            onApprove={onApprove}
            onCancel={onCancel}
            className="absolute inset-0 grid place-items-center overflow-hidden opacity-0"
            onClick={async (data, actions) => {
              submitRef.current?.click();

              const result = await onTrigger();
              if (!result) {
                return actions.reject();
              } else {
                return actions.resolve();
              }
            }}
          />
        )}
      </Button>

      <div className="mb-3 md:mb-4">
        <SafeDataIcon
          className="text-transparent dark:rounded-full dark:text-white dark:ring-1 dark:ring-white"
          color="currentColor"
        />
      </div>

      <div>
        <h1 className="mb-1 font-bold md:font-semibold">
          {t('confirmation_notify_1')}
        </h1>
        <p className="text-xs font-medium leading-5 text-subTextColor md:text-sm">
          {t('confirmation_notify_2')}
        </p>
      </div>
    </div>
  );
}

export default ConfirmationForm;
