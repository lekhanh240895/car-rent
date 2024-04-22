import { Metadata } from 'next';
import initTranslations from '../../i18n';
import TranslationsProvider from '../../components/TranslationsProvider';
import LoginForm from '../../components/LoginForm';
import React, { Suspense } from 'react';

type Props = {
  params: {
    locale: string;
  };
};

const i18nNamespaces = ['common', 'login'];

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { t } = await initTranslations(locale, i18nNamespaces);

  return {
    title: t('login:document_title')
  };
}

export default async function Login({ params: { locale } }: Props) {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <TranslationsProvider
      locale={locale}
      namespaces={i18nNamespaces}
      resources={resources}
    >
      <div className="grid flex-1 place-items-center">
        <div className="mx-auto w-full max-w-[450px] rounded bg-white p-4 dark:bg-black dark:text-white dark:ring-2 dark:ring-white md:max-w-2xl md:p-10">
          <h1 className="py-4 text-center text-3xl font-bold md:py-10">
            {t('login:title')}
          </h1>

          <Suspense>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </TranslationsProvider>
  );
}
