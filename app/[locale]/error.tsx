'use client';

import { useEffect } from 'react';
import * as Sentry from '@sentry/nextjs';
import Button from '../components/Button';
import { useTranslation } from 'react-i18next';

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  const { t } = useTranslation('common');

  return (
    <main className="flex h-full flex-1 flex-col items-center justify-center">
      <h2 className="mb-6 text-center text-xl font-semibold md:text-3xl">
        {error.message || t('error_messages.unknown_error')}
      </h2>
      <Button variant="primary" onClick={() => reset()}>
        {t('error_messages.try_again')}
      </Button>
    </main>
  );
}
