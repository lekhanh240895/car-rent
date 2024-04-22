import Button from './Button';
import initTranslations from '../i18n';
import ImageWithBasePath from './ImageWithBasePath';

const i18nNamespaces = ['common', 'terms', 'policy'];

async function Footer({ locale }: { locale: string }) {
  const { t } = await initTranslations(locale, i18nNamespaces);

  return (
    <footer className="bg-background  dark:bg-black dark:text-white md:bg-white">
      <div className="divide-[#13131329 ] mx-auto max-w-[1440px] space-y-9 px-6 pt-20 md:divide-y md:px-16 ">
        <div className="flex flex-col gap-12 md:flex-row md:justify-between md:gap-28">
          <div className="md:w-[292px]">
            <div className="relative mb-4 h-7 w-28 flex-shrink-0 md:h-9 md:w-32 lg:h-11 lg:w-36">
              <ImageWithBasePath
                src={'/Logo.png'}
                alt="Logo"
                className="object-contain object-center"
                fill
                sizes="(max-width: 768px) 100vw, 100vw"
                priority
              />
            </div>
            <p className="text-subTextColor md:text-textColor"></p>
          </div>

          <div className="grid grid-cols-2 gap-x-12 gap-y-12 md:grid-cols-3 lg:gap-x-16">
            <div>
              <h2 className="mb-6 text-xl font-semibold">
                {t('footer.about.title')}
              </h2>
              <ul className="space-y-4 text-subTextColor md:text-textColor">
                <li>
                  <Button to="#" variant="text" className="inline-flex p-0">
                    {t('footer.about.points.0')}
                  </Button>
                </li>
                <li>
                  <Button to="#" variant="text" className="inline-flex p-0">
                    {t('footer.about.points.1')}
                  </Button>
                </li>
                <li>
                  <Button to="#" variant="text" className="inline-flex p-0">
                    {t('footer.about.points.2')}
                  </Button>
                </li>
                <li>
                  <Button to="#" variant="text" className="inline-flex p-0">
                    {t('footer.about.points.3')}
                  </Button>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-xl font-semibold">
                {t('footer.community.title')}
              </h2>
              <ul className="space-y-4 text-subTextColor md:text-textColor">
                <li>
                  <Button to="#" variant="text" className="inline-flex p-0">
                    {t('footer.community.points.0')}
                  </Button>
                </li>
                <li>
                  <Button to="#" variant="text" className="inline-flex p-0">
                    {t('footer.community.points.1')}
                  </Button>
                </li>
                <li>
                  <Button to="#" variant="text" className="inline-flex p-0">
                    {t('footer.community.points.2')}
                  </Button>
                </li>
                <li>
                  <Button to="#" variant="text" className="inline-flex p-0">
                    {t('footer.community.points.3')}
                  </Button>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-xl font-semibold">
                {t('footer.socials.title')}
              </h2>
              <ul className="space-y-4 text-subTextColor md:text-textColor">
                <li>
                  <Button to="#" variant="text" className="inline-flex p-0">
                    Discord
                  </Button>
                </li>
                <li>
                  <Button to="#" variant="text" className="inline-flex p-0">
                    Instagram
                  </Button>
                </li>
                <li>
                  <Button to="#" variant="text" className="inline-flex p-0">
                    Twitter
                  </Button>
                </li>
                <li>
                  <Button to="#" variant="text" className="inline-flex p-0">
                    Facebook
                  </Button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex w-full flex-wrap items-center justify-between gap-12 pb-16 pt-9">
          <h2 className="hidden font-semibold md:block">
            ©2022 MORENT. {t('footer.rights')}
          </h2>

          <div className="flex flex-1 items-center justify-between gap-10 md:justify-end">
            <Button
              to="/privacy-policy"
              variant="text"
              className="px-0 text-xs font-semibold md:text-base"
            >
              {t('policy:title')}
            </Button>
            <Button
              to="/terms-of-service"
              variant="text"
              className="px-0 text-xs font-semibold md:text-base"
            >
              {t('terms:title')}
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
