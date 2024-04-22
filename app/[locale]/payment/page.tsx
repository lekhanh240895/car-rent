import PaymentForm from '@/app/components/PaymentForm';
import RentalSummary from '@/app/components/RentalSummary';
import TranslationsProvider from '@/app/components/TranslationsProvider';
import initTranslations from '@/app/i18n';
import { getCarDetail } from '@/app/lib/actions';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

type Props = {
  params: {
    locale: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
};

const i18nNamespaces = ['payment', 'common'];

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { t } = await initTranslations(locale, i18nNamespaces);

  return {
    title: `${t('document_title')}`
  };
}

export const dynamic = 'force-dynamic';

async function Payment({ params: { locale }, searchParams }: Props) {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);
  const car_id = searchParams.car_id as string;
  if (!car_id) notFound();

  const car = await getCarDetail(t, locale, Number(car_id));

  return (
    <TranslationsProvider
      locale={locale}
      namespaces={i18nNamespaces}
      resources={resources}
    >
      <div className="flex flex-col-reverse gap-8 md:-mx-8 md:flex-row">
        <div className="md:flex-1">
          <Suspense>
            <PaymentForm car={car} />
          </Suspense>
        </div>

        <div className="md:w-80 lg:w-[492px]">
          <Suspense>
            <RentalSummary car={car} />
          </Suspense>
        </div>
      </div>
    </TranslationsProvider>
  );
}

export default Payment;
