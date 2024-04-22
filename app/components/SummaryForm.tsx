import { TFunction } from 'i18next';
import Button from './Button';
import Input from './Input';
import { LoadingIcon } from './icons';
import { UseFormRegister } from 'react-hook-form';
import { SummaryFormData } from './RentalSummary';

type Props = {
  t: TFunction<'translation', undefined>;
  onSubmit: () => void;
  register: UseFormRegister<SummaryFormData>;
  promoError: string;
  isSubmitting: boolean;
  isSuccess: boolean;
  rentalSummary?: RentalSummary;
};
function SummaryForm({
  onSubmit,
  t,
  register,
  promoError,
  isSubmitting,
  isSuccess,
  rentalSummary
}: Props) {
  return (
    <form onSubmit={onSubmit} className="relative">
      <div className="pt-4 md:pt-8">
        <div className="mb-3 flex items-center justify-between leading-4 md:mb-6 md:leading-5">
          <h2 className="text-xs font-semibold text-subTextColor md:text-base md:font-medium md:leading-5">
            {t('rental_summary_subtotal')}
          </h2>
          <h2 className="font-semibold">
            ${!rentalSummary ? '0' : rentalSummary.subtotal}
          </h2>
        </div>

        <div className="mb-6 flex items-center justify-between leading-4 md:mb-8 md:leading-5">
          <h2 className="text-xs font-semibold text-subTextColor md:text-base md:font-medium md:leading-5">
            {t('rental_summary_tax')}
          </h2>
          <h2 className="font-semibold">
            ${!rentalSummary ? '0' : rentalSummary.tax}
          </h2>
        </div>
      </div>

      <div className="mb-6 md:mb-8">
        <div className="relative">
          <Input
            placeholder={t('rental_summary_apply_promo')}
            className="truncate border-none pl-5 pr-32 text-xs placeholder-subTextColor dark:bg-black dark:ring-1 dark:ring-borderColor md:h-14 md:pr-28 lg:pl-8 lg:text-sm"
            inputSize="sm"
            register={register}
            name="promo_code"
            disabled={isSubmitting}
          />

          <Button
            variant="text"
            className="absolute right-5 top-1/2 h-full -translate-y-1/2 py-[10px] text-xs font-semibold dark:bg-black md:py-4 lg:right-8 lg:text-base"
            type="submit"
            disabled={isSubmitting}
          >
            {t('rental_summary_apply_promo_button')}
          </Button>
        </div>

        {isSuccess && (
          <p className="mt-2 text-xs text-green-500 md:text-base">
            {t('apply_discount_success')}
          </p>
        )}

        {promoError && (
          <p className="mt-2 text-xs text-red-500 md:text-base">{promoError}</p>
        )}
      </div>

      <div className="flex items-center justify-between md:gap-8">
        <div>
          <h1 className="mb-1 font-bold md:text-xl md:leading-[30px]">
            {t('rental_summary_total_title')}
          </h1>
          <p className="h-5 text-xs text-subTextColor md:text-sm md:font-medium">
            {t('rental_summary_total_description')}
          </p>
        </div>

        <h2 className="text-xl font-bold leading-[30px] md:text-[32px] md:leading-10">
          ${!rentalSummary ? '0' : rentalSummary.total}
        </h2>
      </div>

      {isSubmitting && (
        <div className="absolute inset-0 grid place-items-center">
          <LoadingIcon className="h-10 w-10 animate-spin text-primary" />
        </div>
      )}
    </form>
  );
}

export default SummaryForm;
