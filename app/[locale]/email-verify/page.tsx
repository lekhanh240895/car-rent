import { Metadata } from 'next';
import initTranslations from '../../i18n';
import React, { Suspense } from 'react';
import EmailVerifyBody from '../../components/EmailVerifyBody';
import TranslationsProvider from '../../components/TranslationsProvider';

type Props = {
  params: {
    locale: string;
  };
};

const i18nNamespaces = ['email-verify', 'common'];

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

export default async function EmailVerify({ params: { locale } }: Props) {
  const { resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <TranslationsProvider
      resources={resources}
      locale={locale}
      namespaces={i18nNamespaces}
    >
      <div className="grid flex-1 place-items-center">
        <Suspense>
          <EmailVerifyBody />
        </Suspense>
      </div>
    </TranslationsProvider>
  );
}
