import Button from './Button';
import ArrowRow from './ArrowRow';
import Circle from './Circle';
import { TFunction } from 'i18next';
import ImageWithBasePath from './ImageWithBasePath';

type Props = {
  t: TFunction<['translation', ...string[]], undefined>;
};
function AdvertisingBanner({ t }: Props) {
  return (
    <div className="">
      <div className="flex max-w-full gap-8 overflow-y-hidden overflow-x-scroll scrollbar-hide  md:flex lg:grid lg:w-full lg:grid-cols-2">
        <div className="relative h-[232px] min-w-full overflow-hidden rounded-lg bg-[#54A6FF] p-4 text-white md:h-[360px] md:p-6 ">
          <div className="relative z-20 w-full md:w-2/3 2xl:w-1/2">
            <h1 className="mb-3 text-base font-semibold lg:text-xl xl:mb-4 xl:text-[32px] xl:leading-[48px]">
              {t('home:advertising_title_1')}
            </h1>
            <p className="mb-4 text-xs md:mb-5 md:text-base">
              {t('home:advertising_description_1')}
            </p>
            <Button
              variant="primary"
              rounded="md"
              className="h-11 min-w-32 text-xs md:min-w-[120px] md:text-base"
            >
              {t('home:rental_car_title')}
            </Button>
          </div>

          <div className="absolute bottom-1 left-1/2 z-20 ml-0 h-14 w-[196px] -translate-x-1/2 md:bottom-7 md:h-[116px] md:w-[406px] lg:ml-4">
            <ImageWithBasePath
              priority
              fill
              sizes="(max-width: 768px) 100vw, 100vw"
              src="/Advertising1.png"
              alt="Advertising 1"
              className="object-cover object-center"
            />
          </div>
          <div className="pointer-events-none absolute bottom-6 left-[35%] z-10 h-12 w-12 rounded-full border-[10px] border-[#FFFFFF0F]">
            <Circle className="h-40 w-40" />
            <Circle className="h-72 w-72" />
            <Circle className="h-96 w-96" />
            <Circle className="h-[500px] w-[500px]" />
            <Circle className="h-[600px] w-[600px]" />
            <Circle className="h-[700px] w-[700px]" />
          </div>
        </div>

        <div className="relative h-56 min-w-full rounded-lg bg-primary p-4 text-white md:h-[360px] md:p-6 ">
          <div className="relative z-20 w-full md:w-2/3 2xl:w-1/2">
            <h1 className="mb-3 text-base font-semibold lg:text-xl xl:mb-4 xl:text-[32px] xl:leading-[48px]">
              {t('home:advertising_title_2')}
            </h1>
            <p className="mb-4 text-xs md:mb-5 md:text-base">
              {t('home:advertising_description_2')}
            </p>
            <Button
              className="h-11 min-w-[120px] bg-[#54A6FF] px-5 focus:ring-slate-200"
              variant="text"
              rounded="md"
            >
              {t('home:rental_car_title')}
            </Button>
          </div>
          <div className="absolute bottom-1 left-1/2 z-20 ml-0 h-14 w-[196px] -translate-x-1/2 md:bottom-7 md:h-[116px] md:w-[340px] lg:ml-4">
            <ImageWithBasePath
              priority
              fill
              sizes="(max-width: 768px) 100vw, 100vw"
              src="/Advertising2.png"
              alt="Advertising 2"
              className="scale-x-[-1] transform object-cover object-center"
            />
          </div>
          <div className="pointer-events-none absolute -left-6 right-0 top-0 z-10 h-full gap-0 overflow-hidden">
            <ArrowRow />
            <ArrowRow className="ml-12" />
            <ArrowRow />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdvertisingBanner;
