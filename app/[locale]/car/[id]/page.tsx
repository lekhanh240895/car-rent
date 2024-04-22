import Button from '@/app/components/Button';
import CarReview from '@/app/components/CarReview';
import DetailCar from '@/app/components/DetailCar';
import DetailRecommendCars from '@/app/components/DetailRecommendCars';
import { ImageSlider } from '@/app/components/ImageSlider';
import PickAndDrop from '@/app/components/PickAndDrop';
import RecentCars from '@/app/components/RecentCars';
import TranslationsProvider from '@/app/components/TranslationsProvider';
import { DetailSkeleton } from '@/app/components/skeletons';
import initTranslations from '@/app/i18n';
import { getCarDetail, getLocations } from '@/app/lib/actions';
import { CATEGORY_PAGE } from '@/app/lib/constants';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { Suspense } from 'react';

type Props = {
  params: {
    locale: string;
    id: string;
  };
};

const i18nNamespaces = ['common', 'detail', 'home'];

export async function generateMetadata({
  params: { locale, id }
}: {
  params: { locale: string; id: string };
}): Promise<Metadata> {
  const { t } = await initTranslations(locale, i18nNamespaces);
  const data = await getCarDetail(t, locale, Number(id));

  return {
    title: `${data.name} | ${t('detail:document_title')}`
  };
}

export default async function CarDetail({ params: { locale, id } }: Props) {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);
  const item = await getCarDetail(t, locale, Number(id));
  const locations = await getLocations(t, locale);

  const cookieStore = cookies();
  const recentCarIds: number[] = JSON.parse(
    cookieStore.get('recentCars')?.value || '[]'
  );
  const carIds = recentCarIds
    .filter((i) => i !== Number(id))
    .slice(-4)
    .reverse();

  return (
    <TranslationsProvider
      locale={locale}
      namespaces={i18nNamespaces}
      resources={resources}
    >
      <div className="space-y-8">
        <div className="mb-11">
          <Suspense>
            <PickAndDrop
              locale={locale}
              buttonTitle={t('search.update_button_title')}
              locations={locations}
            />
          </Suspense>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <ImageSlider item={item} />

          <DetailCar item={item} t={t} />
        </div>

        <CarReview id={Number(id)} locale={locale} t={t} />

        {carIds.length > 0 && (
          <div className="mt-8">
            <div className="mb-5 flex justify-between md:mb-4 md:px-5 md:py-[10px]">
              <h1 className="text-sm font-semibold leading-5 text-subTextColor md:text-base md:leading-6">
                {t('detail:recent_car')}
              </h1>
              <Button
                to="/category"
                variant="text"
                className="h-5 px-0 text-xs font-semibold text-primary md:h-6 md:text-base"
              >
                {t('view_all_title')}
              </Button>
            </div>

            <div className="-mx-6 flex gap-5 overflow-auto px-1 py-1 pl-6 scrollbar-hide md:-mx-16 md:gap-8 md:pl-16 2xl:mx-0 2xl:ml-0 2xl:grid 2xl:grid-cols-4 2xl:pl-1">
              <Suspense fallback={<DetailSkeleton />}>
                <RecentCars t={t} locale={locale} recentCarIds={carIds} />
              </Suspense>
            </div>
          </div>
        )}

        <div className="mt-8">
          <div className="mb-5 flex justify-between md:mb-4 md:px-5 md:py-[10px]">
            <h1 className="text-sm font-semibold leading-5 text-subTextColor md:text-base md:leading-6">
              {t('home:recommend_car_title')}
            </h1>
            <Button
              to={CATEGORY_PAGE}
              variant="text"
              className="h-5 px-0 text-xs font-semibold text-primary md:h-6 md:text-base"
            >
              {t('view_all_title')}
            </Button>
          </div>

          <div className="-mx-6 flex gap-5 overflow-auto px-1 pl-6 scrollbar-hide md:-mx-16 md:gap-8 md:pb-1 md:pl-16 2xl:mx-0 2xl:ml-0 2xl:grid 2xl:grid-cols-4 2xl:pl-1">
            <Suspense fallback={<DetailSkeleton />}>
              <DetailRecommendCars t={t} locale={locale} id={Number(id)} />
            </Suspense>
          </div>
        </div>
      </div>
    </TranslationsProvider>
  );
}
