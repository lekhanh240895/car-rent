import { Metadata } from 'next';
import initTranslations from '../../i18n';
import OrdersTable from '@/app/components/OrdersTable';
import TranslationsProvider from '@/app/components/TranslationsProvider';

type Props = {
  params: {
    locale: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
};

const i18nNamespaces = ['order', 'common'];

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { t } = await initTranslations(locale, i18nNamespaces);

  return {
    title: t('document_title')
  };
}

export const dynamic = 'force-dynamic';

export default async function Orders({ params: { locale } }: Props) {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <TranslationsProvider
      locale={locale}
      namespaces={i18nNamespaces}
      resources={resources}
    >
      <div className="relative flex flex-1 flex-col rounded-lg bg-white p-4 dark:bg-black dark:ring-2 dark:ring-white md:p-8">
        <h1 className="mb-14 text-center text-3xl font-semibold uppercase lg:text-4xl">
          {t('order_list_title')}
        </h1>

        <OrdersTable />
      </div>
    </TranslationsProvider>
  );
}
