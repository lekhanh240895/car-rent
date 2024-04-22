'use client';
import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';
import Button from './components/Button';

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

  return (
    <html>
      <body>
        <main className="flex h-screen flex-col items-center justify-center">
          <h2 className="mb-6 text-center text-xl font-semibold md:text-3xl">
            {error.message || 'Something went wrong!'}
          </h2>
          <Button variant="primary" onClick={() => reset()}>
            Try again
          </Button>
        </main>
      </body>
    </html>
  );
}
