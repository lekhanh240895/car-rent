import { Metadata } from 'next';
import initTranslations from '@/app/i18n';
import OrderDetail from '@/app/components/OrderDetail';
import TranslationsProvider from '@/app/components/TranslationsProvider';

type Props = {
  params: {
    locale: string;
    id: string;
  };
};

const i18nNamespaces = ['order', 'common'];

export async function generateMetadata({
  params: { locale, id }
}: Props): Promise<Metadata> {
  const { t } = await initTranslations(locale, i18nNamespaces);

  return {
    title: `${t('order_details')} ${id}`
  };
}

export default async function DetailOrder({ params: { locale, id } }: Props) {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <TranslationsProvider
      locale={locale}
      namespaces={i18nNamespaces}
      resources={resources}
    >
      <div className="relative flex flex-col rounded-lg bg-white dark:bg-black dark:ring-2 dark:ring-white lg:flex-1">
        <h1 className="my-10 text-center text-3xl font-semibold uppercase md:text-4xl lg:text-5xl">
          {t('order_details')}
        </h1>

        <OrderDetail id={id} />
      </div>
    </TranslationsProvider>
  );
}
