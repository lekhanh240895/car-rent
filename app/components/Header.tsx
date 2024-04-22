import ImageWithBasePath from '@/app/components/ImageWithBasePath';
import { Bars3Icon } from '@heroicons/react/24/outline';
import initTranslations from '../i18n';
import TranslationsProvider from './TranslationsProvider';
import Button from './Button';
import SearchForm from './SearchForm';
import { Suspense } from 'react';
import { getFiltersTag } from '../lib/actions';
import { cookies } from 'next/headers';
import HeaderRight from './HeaderRight';

const i18nNamespaces = ['common'];

async function Header({ locale }: { locale: string }) {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);
  const filters = await getFiltersTag(t, locale);

  const currentUser = cookies().get('currentUser')?.value;
  const user = currentUser ? JSON.parse(currentUser) : null;

  return (
    <TranslationsProvider
      resources={resources}
      locale={locale}
      namespaces={i18nNamespaces}
    >
      <header
        className="fixed left-0 right-0 top-0 z-50 
      border-y border-borderColor bg-white dark:bg-black dark:text-white"
      >
        <div className="mx-auto flex max-w-[1440px] flex-col gap-10 p-6 py-8 md:px-16 md:py-10 lg:h-32 lg:flex-row lg:items-center">
          <div className="flex flex-1 flex-wrap items-center justify-between gap-8 md:gap-x-20 lg:gap-16">
            <Button
              icon={<Bars3Icon className="h-6 w-6 text-subTextColor" />}
              className="flex h-7 w-7 md:hidden"
            >
              <span className="sr-only">Menu Icon</span>
            </Button>

            <div className="order-4 w-full justify-start p-0 md:-order-1 md:w-[unset]">
              <Button
                to="/"
                variant="text"
                className="relative h-7 w-28 flex-shrink-0 md:h-9 md:w-32 lg:h-11 lg:w-36"
              >
                <ImageWithBasePath
                  src={'/Logo.png'}
                  alt="Logo"
                  className="object-contain object-center"
                  fill
                  sizes="(max-width: 768px) 100vw, 100vw"
                  priority
                />
              </Button>
            </div>

            <div className="order-last flex flex-[1_0_300px] justify-center md:flex-[1_0_492px] lg:order-[unset] lg:flex-1">
              <Suspense>
                <SearchForm filters={filters} />
              </Suspense>
            </div>

            <HeaderRight t={t} user={user} />
          </div>
        </div>
      </header>
    </TranslationsProvider>
  );
}

export default Header;
