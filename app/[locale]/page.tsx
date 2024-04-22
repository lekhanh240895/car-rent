import { Metadata } from 'next';
import initTranslations from '../i18n';
import AdvertisingBanner from '../components/AdvertisingBanner';
import PickAndDrop from '../components/PickAndDrop';
import TranslationsProvider from '../components/TranslationsProvider';
import { Suspense } from 'react';
import { PopularsSkeleton, RecommendsSkeleton } from '../components/skeletons';
import PopularCars from '../components/PopularCars';
import RecommendCars from '../components/RecommendCars';
import { getLocations } from '../lib/actions';

type Props = {
  params: {
    locale: string;
  };
};

const i18nNamespaces = ['common', 'home'];

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { t } = await initTranslations(locale, i18nNamespaces);

  return {
    title: `${t('home:document_title')} | Morent`
  };
}

export default async function Home({ params: { locale } }: Props) {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);

  const locations = await getLocations(t, locale);

  return (
    <TranslationsProvider
      locale={locale}
      namespaces={i18nNamespaces}
      resources={resources}
    >
      <div className="space-y-8">
        <AdvertisingBanner t={t} />

        <Suspense>
          <PickAndDrop
            locale={locale}
            buttonTitle={t('search.find_car_title')}
            locations={locations}
          />
        </Suspense>

        <Suspense fallback={<PopularsSkeleton />}>
          <PopularCars t={t} locale={locale} />
        </Suspense>

        <Suspense fallback={<RecommendsSkeleton />}>
          <RecommendCars t={t} locale={locale} />
        </Suspense>
      </div>
    </TranslationsProvider>
  );
}
