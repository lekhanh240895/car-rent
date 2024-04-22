import CategoryList from '@/app/components/CategoryList';
import PickAndDrop from '@/app/components/PickAndDrop';
import Sidebar from '@/app/components/Sidebar';
import TranslationsProvider from '@/app/components/TranslationsProvider';
import { CategorySkeleton } from '@/app/components/skeletons';
import initTranslations from '@/app/i18n';
import { getFiltersTag, getLocations } from '@/app/lib/actions';
import { Metadata } from 'next';
import { Suspense } from 'react';

type Props = {
  params: {
    locale: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
};

const i18nNamespaces = ['common', 'category', 'home'];

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { t } = await initTranslations(locale, i18nNamespaces);

  return {
    title: `${t('category:document_title')}`
  };
}
export const dynamic = 'force-dynamic';

export default async function Category({
  params: { locale },
  searchParams
}: Props) {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);
  const filters = await getFiltersTag(t, locale);
  const locations = await getLocations(t, locale);

  return (
    <TranslationsProvider
      locale={locale}
      namespaces={i18nNamespaces}
      resources={resources}
    >
      <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-4">
        <Suspense>
          <Sidebar filters={filters} />
        </Suspense>

        <div className="col-span-4 md:col-span-3">
          <div className="mb-8 md:mb-11">
            <Suspense>
              <PickAndDrop
                locale={locale}
                buttonTitle={t('search.find_car_title')}
                locations={locations}
              />
            </Suspense>
          </div>

          <Suspense fallback={<CategorySkeleton />}>
            <CategoryList t={t} searchParams={searchParams} locale={locale} />
          </Suspense>
        </div>
      </div>
    </TranslationsProvider>
  );
}
