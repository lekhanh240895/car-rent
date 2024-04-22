import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { dir } from 'i18next';
import { Metadata } from 'next';
import { i18nConfig } from '../../i18nConfig';
import Footer from '../components/Footer';
import ReduxProvider from '../redux/Provider';
import { ToastContainer } from 'react-toastify';
import PaypalProvider from '../components/PaypalProvider';
import Header from '../components/Header';
import { Suspense } from 'react';
import { ThemeProvider } from 'next-themes';

const pjsans = Plus_Jakarta_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: '%s | Morent',
    default: 'Morent'
  }
};

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => {
    locale;
  });
}

export const dynamic = 'force-dynamic';

export default async function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang={locale} dir={dir(locale)} suppressHydrationWarning={true}>
      <body className={pjsans.className}>
        <ThemeProvider attribute="class">
          <ReduxProvider>
            <PaypalProvider locale={locale}>
              <Suspense>
                <Header locale={locale} />
              </Suspense>

              <main className="bg-background dark:bg-black dark:text-white">
                <div className="mx-auto flex min-h-screen max-w-[1440px] flex-col px-6 pb-8 pt-64 md:px-16 md:pt-56 lg:pt-40">
                  {children}
                </div>
              </main>

              <Footer locale={locale} />

              <ToastContainer
                hideProgressBar={true}
                icon={false}
                toastClassName={'bg-red-500'}
                theme="dark"
                autoClose={2000}
              />
            </PaypalProvider>
          </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
