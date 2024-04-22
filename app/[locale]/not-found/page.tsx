import initTranslations from '../../i18n';
import { Metadata } from 'next';
import ImageWithBasePath from '@/app/components/ImageWithBasePath';
import Button from '@/app/components/Button';

const i18nNamespaces = ['common'];

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { t } = await initTranslations(locale, i18nNamespaces);

  return {
    title: t('error_messages.not_found_title')
  };
}

const NotFound = async ({
  params: { locale }
}: {
  params: { locale: string };
}) => {
  const { t } = await initTranslations(locale, i18nNamespaces);

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-3 md:gap-5">
      <div className="relative h-[200px] w-full max-w-xs md:h-[300px] md:max-w-lg lg:max-w-2xl">
        <ImageWithBasePath
          src="/404.webp"
          alt="404 Not Found"
          className="object-contain object-center"
          priority
          fill
          sizes="(max-width: 768px) 100vw, 100vw"
        />
      </div>
      <h1 className="text-lg font-bold md:text-3xl">
        {t('error_messages.not_found_title')}
      </h1>
      <p className="text-center text-sm md:text-lg">
        {t('error_messages.not_found_description')}
      </p>

      <Button to="/" variant="primary" className="h-11">
        {t('go_to_homepage')}
      </Button>
    </main>
  );
};
export default NotFound;
