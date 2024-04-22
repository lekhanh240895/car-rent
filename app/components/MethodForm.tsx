import Label from './Label';
import Input from './Input';
import { PayPalIcon } from './icons';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { PaymentFormData } from './PaymentForm';
import { TFunction } from 'i18next';
import { usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { PAYMENT_METHOD_COD, PAYMENT_METHOD_PAYPAL } from '../lib/constants';

type Props = {
  register: UseFormRegister<PaymentFormData>;
  errors: FieldErrors<PaymentFormData>;
  t: TFunction<['translation', ...string[]], undefined>;
};

function MethodForm({ register, errors, t }: Props) {
  const [{ isRejected }] = usePayPalScriptReducer();

  return (
    <>
      <div className="mt-6 space-y-5 md:mt-8 md:space-y-6">
        {!isRejected && (
          <div className="relative flex h-[52px] items-center rounded-[10px] bg-background p-4 dark:border dark:border-borderColor dark:bg-black md:h-14 md:w-full">
            <Label
              htmlFor={`payment_method.paypal`}
              className="mb-0 flex flex-row-reverse items-center justify-start gap-2 leading-5"
            >
              <span className="flex-1 text-sm font-semibold md:text-base">
                PayPal
              </span>

              <Input
                type="radio"
                className="form-radio h-4 w-4 p-0 text-blue-600 focus:ring-blue-500 md:h-6 md:w-6"
                rounded="full"
                register={register}
                name={`payment_method`}
                value={PAYMENT_METHOD_PAYPAL}
                id={`payment_method.paypal`}
              />
            </Label>

            <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
              <PayPalIcon />
            </span>
          </div>
        )}

        <div className="relative flex h-[52px] items-center rounded-[10px] bg-background p-4 dark:border dark:border-borderColor dark:bg-black md:h-14 md:w-full">
          <Label
            htmlFor={`payment_method.cod`}
            className="mb-0 flex flex-row-reverse items-center justify-start gap-2 leading-5"
          >
            <span className="flex-1 text-sm font-semibold md:text-base">
              {t('cash_on_delivery_title')}
            </span>

            <div>
              <Input
                type="radio"
                className="form-radio h-4 w-4 p-0 text-blue-600 focus:ring-blue-500 md:h-6 md:w-6"
                rounded="full"
                register={register}
                name={`payment_method`}
                id={`payment_method.cod`}
                value={PAYMENT_METHOD_COD}
              />
            </div>
          </Label>
        </div>
      </div>
      <p className="text-red-500"> {errors.payment_method?.message}</p>
    </>
  );
}

export default MethodForm;
